import { useAuth } from '@clerk/clerk-react'
import { useCallback, useMemo } from 'react'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiOptions {
  method?: Method
  body?: unknown
}

export function useApi() {
  const { getToken } = useAuth()

  const request = useCallback(
    async <T = unknown>(path: string, opts: ApiOptions = {}): Promise<T> => {
      const { method = 'GET', body } = opts

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      const token = await getToken()
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const res = await fetch(path, {
        method,
        headers,
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        throw new Error(err.error || `API error ${res.status}`)
      }

      return res.json() as Promise<T>
    },
    [getToken],
  )

  return useMemo(() => ({ request }), [request])
}
