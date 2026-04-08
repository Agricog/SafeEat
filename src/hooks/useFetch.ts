/**
 * SafeEat — Secure API Calls (Autaimate Build Standard v2 — Layer 4)
 *
 * Custom hook for making authenticated, CSRF-protected API calls.
 *
 * Security features:
 * - SSRF protection: rejects absolute URLs (relative only)
 * - Automatic CSRF token injection on POST/PUT/DELETE
 * - Credentials: include (sends cookies for session management)
 * - Sentry error capture with PII stripping
 * - Rate limit detection and retry-after handling
 * - No API keys exposed in client code
 *
 * Usage:
 *   const { get, post, put, del, loading, error } = useFetch()
 *
 *   // GET (public, no CSRF)
 *   const menu = await get<MenuResponse>('/api/menu/abc123')
 *
 *   // POST (CSRF-protected)
 *   const result = await post<ApiSuccess<Profile>>('/api/profiles', { ... })
 *
 *   // DELETE (CSRF-protected)
 *   await del('/api/profiles/hash123')
 */

import { useState, useCallback, useRef } from 'react'
import * as Sentry from '@sentry/react'
import { getCsrfToken, CSRF_HEADER } from './csrf'
import type { ApiResponse, ApiError, FetchOptions } from '../types/api'
import { isRateLimitError } from '../types/api'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/** Default timeout for API requests (15 seconds) */
const REQUEST_TIMEOUT_MS = 15_000

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

interface UseFetchReturn {
  /** Make a GET request (no CSRF token needed) */
  get: <T>(endpoint: string, options?: Partial<FetchOptions>) => Promise<T>
  /** Make a POST request (CSRF token auto-included) */
  post: <T>(endpoint: string, body: Record<string, unknown>, options?: Partial<FetchOptions>) => Promise<T>
  /** Make a PUT request (CSRF token auto-included) */
  put: <T>(endpoint: string, body: Record<string, unknown>, options?: Partial<FetchOptions>) => Promise<T>
  /** Make a DELETE request (CSRF token auto-included) */
  del: <T>(endpoint: string, options?: Partial<FetchOptions>) => Promise<T>
  /** Fetch a blob with auth headers (Addendum H10 — authenticated downloads) */
  getBlob: (endpoint: string) => Promise<Blob | null>
  /** true while any request is in-flight */
  loading: boolean
  /** Last error message, or null */
  error: string | null
  /** Clear the error state */
  clearError: () => void
}

export function useFetch(): UseFetchReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Track in-flight requests to prevent state updates after unmount
  const mountedRef = useRef(true)

  // Cleanup on unmount
  const setMounted = useCallback(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  // Use setMounted in a useEffect in consuming components if needed
  // For now, the ref defaults to true and functions check it before setState

  /**
   * Core fetch function — all HTTP methods route through here.
   */
  const request = useCallback(async <T,>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> => {
    // SSRF protection: reject absolute URLs (Build Standard Layer 4)
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      const err = new Error('SSRF protection: Use relative URLs only')
      Sentry.captureException(err, {
        tags: { type: 'ssrf_blocked', endpoint },
      })
      throw err
    }

    if (mountedRef.current) {
      setLoading(true)
      setError(null)
    }

    try {
      // Build headers
      const headers: Record<string, string> = {
        'Accept': 'application/json',
        ...options.headers,
      }

      // Add Content-Type for requests with body
      if (options.body) {
        headers['Content-Type'] = 'application/json'
      }

      // Add CSRF token for state-changing methods
      const method = options.method || 'GET'
      if (method !== 'GET' && !options.csrfToken) {
        try {
          const token = await getCsrfToken()
          headers[CSRF_HEADER] = token
        } catch (csrfError) {
          Sentry.captureException(csrfError, {
            tags: { type: 'csrf_fetch_failed', endpoint },
          })
          throw new Error('Security token unavailable. Please refresh the page.')
        }
      } else if (options.csrfToken) {
        headers[CSRF_HEADER] = options.csrfToken
      }

      // Create abort controller for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        credentials: 'include',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Handle rate limiting (Layer 6)
      if (response.status === 429) {
        const errorData = await response.json().catch(() => null) as ApiError | null
        const retryAfter = errorData && isRateLimitError(errorData)
          ? errorData.error.retryAfterSeconds
          : 60

        const rateLimitMessage = `Too many requests. Please try again in ${retryAfter} seconds.`

        if (mountedRef.current) {
          setError(rateLimitMessage)
        }

        Sentry.captureMessage('Rate limit hit', {
          tags: { endpoint, status: 429 },
          level: 'warning',
        })

        throw new Error(rateLimitMessage)
      }

      // Handle auth errors
      if (response.status === 401) {
        if (mountedRef.current) {
          setError('Please sign in to continue.')
        }
        throw new Error('Unauthorized')
      }

      if (response.status === 403) {
        if (mountedRef.current) {
          setError('You do not have permission to perform this action.')
        }
        throw new Error('Forbidden')
      }

      // Parse response
      if (!response.ok) {
        const errorData = await response.json().catch(() => null) as ApiError | null
        const errorMessage = errorData?.error?.message || 'Request failed. Please try again.'

        // Don't leak internal error details — use the API's safe message
        if (mountedRef.current) {
          setError(errorMessage)
        }

        Sentry.captureException(new Error(`API ${method} ${endpoint} failed`), {
          tags: {
            endpoint,
            status: response.status,
            errorCode: errorData?.error?.code || 'UNKNOWN',
          },
          level: 'error',
        })

        throw new Error(errorMessage)
      }

      // 204 No Content — return empty object
      if (response.status === 204) {
        return {} as T
      }

      return await response.json() as T
    } catch (fetchError) {
      // Handle abort (timeout)
      if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
        const timeoutMessage = 'Request timed out. Please check your connection and try again.'
        if (mountedRef.current) {
          setError(timeoutMessage)
        }
        throw new Error(timeoutMessage)
      }

      // Handle network errors
      if (fetchError instanceof TypeError && fetchError.message === 'Failed to fetch') {
        const offlineMessage = 'Unable to connect. Please check your internet connection.'
        if (mountedRef.current) {
          setError(offlineMessage)
        }
        throw new Error(offlineMessage)
      }

      // Re-throw errors we've already handled above
      if (fetchError instanceof Error && mountedRef.current && !error) {
        setError(fetchError.message)
      }

      throw fetchError
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [error])

  // ---------------------------------------------------------------------------
  // Convenience methods
  // ---------------------------------------------------------------------------

  const get = useCallback(<T,>(
    endpoint: string,
    options?: Partial<FetchOptions>
  ): Promise<T> => {
    return request<T>(endpoint, { method: 'GET', ...options })
  }, [request])

  const post = useCallback(<T,>(
    endpoint: string,
    body: Record<string, unknown>,
    options?: Partial<FetchOptions>
  ): Promise<T> => {
    return request<T>(endpoint, { method: 'POST', body, ...options })
  }, [request])

  const put = useCallback(<T,>(
    endpoint: string,
    body: Record<string, unknown>,
    options?: Partial<FetchOptions>
  ): Promise<T> => {
    return request<T>(endpoint, { method: 'PUT', body, ...options })
  }, [request])

  const del = useCallback(<T,>(
    endpoint: string,
    options?: Partial<FetchOptions>
  ): Promise<T> => {
    return request<T>(endpoint, { method: 'DELETE', ...options })
  }, [request])

  /**
   * Fetch a blob with authentication headers.
   * Used for downloading PDFs (badge, compliance reports) per Addendum H10.
   *
   * window.open() doesn't send auth headers — this fetches the blob
   * directly and triggers a client-side download.
   *
   * @example
   * const blob = await getBlob('/api/venues/badge-pdf')
   * if (blob) {
   *   const url = URL.createObjectURL(blob)
   *   const a = document.createElement('a')
   *   a.href = url
   *   a.download = 'safeeat-verified-badge.pdf'
   *   document.body.appendChild(a)
   *   a.click()
   *   document.body.removeChild(a)
   *   URL.revokeObjectURL(url)
   * }
   */
  const getBlob = useCallback(async (endpoint: string): Promise<Blob | null> => {
    // SSRF protection
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      throw new Error('SSRF protection: Use relative URLs only')
    }

    if (mountedRef.current) {
      setLoading(true)
      setError(null)
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/pdf, application/octet-stream',
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        Sentry.captureException(new Error(`Blob download failed: ${endpoint}`), {
          tags: { endpoint, status: response.status },
        })
        if (mountedRef.current) {
          setError('Download failed. Please try again.')
        }
        return null
      }

      return await response.blob()
    } catch (blobError) {
      Sentry.captureException(blobError, {
        tags: { type: 'blob_download', endpoint },
      })
      if (mountedRef.current) {
        setError('Download failed. Please check your connection.')
      }
      return null
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { get, post, put, del, getBlob, loading, error, clearError }
}
