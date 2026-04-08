import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-5xl mb-4">🍽️</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          SafeEat
        </h1>
        <p className="text-lg text-gray-500 mb-1">
          See what&apos;s safe to eat
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Launching soon — safeeat.co.uk
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-se-green-50 text-se-green-700 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-se-green-500 animate-pulse" />
          Deploy successful
        </div>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
