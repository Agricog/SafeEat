// SafeEat Service Worker — offline menu caching
const CACHE_VERSION = 'safeeat-v1'
const STATIC_CACHE = `${CACHE_VERSION}-static`
const API_CACHE = `${CACHE_VERSION}-api`

// App shell files to pre-cache on install
const APP_SHELL = [
  '/',
  '/favicon.svg',
  '/manifest.json',
]

// ── Install: pre-cache app shell ────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL))
  )
  self.skipWaiting()
})

// ── Activate: clean old caches ──────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('safeeat-') && key !== STATIC_CACHE && key !== API_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// ── Fetch strategies ────────────────────────────────────────────────────────

function isMenuApi(url) {
  return url.pathname.startsWith('/api/menu/')
}

function isStaticAsset(url) {
  return /\.(js|css|svg|png|jpg|jpeg|webp|woff2?|ico)$/.test(url.pathname)
}

function isDashboardApi(url) {
  return url.pathname.startsWith('/api/dashboard/')
}

// Network-first: try network, fall back to cache (for menu API)
async function networkFirst(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(API_CACHE)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await caches.match(request)
    if (cached) return cached
    return new Response(
      JSON.stringify({ error: 'You are offline. This menu was not cached yet.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// Cache-first: serve from cache, fall back to network (for static assets)
async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    return new Response('Offline', { status: 503 })
  }
}

// ── Main fetch handler ──────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return

  // Skip dashboard API — always needs fresh auth data
  if (isDashboardApi(url)) return

  // Menu API — network-first with offline cache
  if (isMenuApi(url)) {
    event.respondWith(networkFirst(event.request))
    return
  }

  // Static assets — cache-first for speed
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(event.request))
    return
  }

  // HTML navigation — network-first so the SPA always loads fresh
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/'))
    )
    return
  }
})
