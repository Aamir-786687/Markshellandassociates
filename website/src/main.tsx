import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence } from 'framer-motion'
import App from './App'
import { LoadingScreen } from '@/components/ui/Button'
import './index.css'

function Root() {
  const [loading, setLoading] = useState(true)

  return (
    <StrictMode>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && <App />}
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<Root />)
