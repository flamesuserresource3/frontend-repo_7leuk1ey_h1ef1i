import { Sparkles } from 'lucide-react'

export default function FloatingCTA({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-5 py-3 shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Sparkles className="h-5 w-5" />
      <span className="font-medium">Send wishes to the universe</span>
    </button>
  )
}
