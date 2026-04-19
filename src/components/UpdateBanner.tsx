import { useState, useEffect } from 'react'

/**
 * Displays a banner when a new service worker is installed and waiting, so
 * long-lived tabs don't silently run stale JavaScript after a deploy. The
 * worker already calls skipWaiting() and clients.claim(), so a page reload
 * is sufficient to activate the new code.
 */
export default function UpdateBanner() {
  const [updateReady, setUpdateReady] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    let intervalId: number | undefined

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return

      // Poll for updates every hour in case the user leaves the tab open
      intervalId = window.setInterval(() => {
        reg.update().catch(() => {})
      }, 60 * 60 * 1000)

      // Fire when a new worker version has been installed
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing
        if (!newWorker) return
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setUpdateReady(true)
          }
        })
      })
    })

    return () => {
      if (intervalId !== undefined) window.clearInterval(intervalId)
    }
  }, [])

  if (!updateReady) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 max-w-md mx-4">
      <span className="text-sm">A new version of SafeEat is available.</span>
      <button
        onClick={() => window.location.reload()}
        className="px-3 py-1.5 rounded-lg bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
      >
        Refresh
      </button>
    </div>
  )
}
