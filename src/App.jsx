import { useCallback, useEffect, useMemo, useState } from 'react'
import BackgroundGallery from './components/BackgroundGallery'
import WishWall from './components/WishWall'
import WishModal from './components/WishModal'
import FloatingCTA from './components/FloatingCTA'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' ? window.location.origin.replace('3000', '8000') : '')

export default function App() {
  const [wishes, setWishes] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/wishes?limit=90`)
      const data = await res.json()
      setWishes(data)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch wishes', e)
    }
  }, [])

  useEffect(() => {
    fetchWishes()
    const id = setInterval(fetchWishes, 5000)
    return () => clearInterval(id)
  }, [fetchWishes])

  const handleSubmit = useCallback(async (text) => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/wishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (!res.ok) throw new Error('Failed to send')
      const created = await res.json()
      setWishes((prev) => [created, ...prev])
      setOpen(false)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      alert('Could not send your wish. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <BackgroundGallery />

      <header className="relative z-10 pt-16 pb-8 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 to-rose-600 bg-clip-text text-transparent">
          Motivation Corner
        </h1>
        <p className="max-w-2xl mx-auto mt-3 text-gray-600">
          Share a kind wish, read what others wrote, and let inspiration flow.
        </p>
      </header>

      <main className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <WishWall wishes={wishes} />
        </div>
      </main>

      <FloatingCTA onClick={() => setOpen(true)} />

      <WishModal open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}
