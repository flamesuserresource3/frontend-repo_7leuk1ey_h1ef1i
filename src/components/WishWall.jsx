import { memo } from 'react'
import { motion } from 'framer-motion'

function formatTime(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch {
    return iso
  }
}

function WishCard({ wish, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="rounded-xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm p-4 hover:shadow-md transition-shadow"
    >
      <p className="text-gray-800 leading-relaxed">{wish.text}</p>
      <div className="mt-3 text-xs text-gray-500">{formatTime(wish.created_at)}</div>
    </motion.div>
  )
}

function WishWallBase({ wishes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {wishes.map((w, i) => (
        <WishCard key={w.id} wish={w} index={i} />
      ))}
    </div>
  )
}

const WishWall = memo(WishWallBase)
export default WishWall
