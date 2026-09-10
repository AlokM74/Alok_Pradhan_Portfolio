import { useEffect, useState } from 'react'
import Fab from '@mui/material/Fab'
import Zoom from '@mui/material/Zoom'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { motion, useReducedMotion } from 'framer-motion'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Zoom in={visible}>
      <motion.div
        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 40 }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
      >
        <Fab
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
          size="medium"
          sx={{
            bgcolor: '#8B5A2B',
            color: '#fff',
            '&:hover': { bgcolor: '#A9662B' },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </motion.div>
    </Zoom>
  )
}
