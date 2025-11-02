import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function WishModal({ open, onClose, onSubmit, loading }) {
  const [text, setText] = useState('')
  const max = 500

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim() || text.length > max) return
    await onSubmit(text.trim())
    setText('')
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-yellow-500" />
          <h3 className="text-xl font-semibold">Send a wish to the universe</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your wish (max 500 characters)"
            className="w-full h-40 resize-none rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            maxLength={max}
          />
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Anonymous • Be kind and thoughtful</span>
            <span>
              {text.length} / {max}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim() || text.length > max || loading}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Send Wish'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
