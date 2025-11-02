import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const IMAGES = [
  'https://images.unsplash.com/photo-1535449429999-2edae27a656e?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596733430284-482538d26824?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522780355300-1e3d88d8b1e1?q=80&w=1920&auto=format&fit=crop',
]

export default function BackgroundGallery() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length)
    }, 8000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          aria-hidden
        >
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${IMAGES[index]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'saturate(95%)',
            }}
            initial={{ scale: 1.05, y: 0 }}
            animate={{ scale: 1.1, y: -20 }}
            transition={{ duration: 8, ease: 'easeInOut' }}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90 pointer-events-none" />
    </div>
  )
}
