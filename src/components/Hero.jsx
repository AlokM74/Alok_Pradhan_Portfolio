import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DownloadIcon from '@mui/icons-material/FileDownload'
import ThreeHero from './ThreeHero.jsx'

const NAME_COLORS = ['#A9662B', '#3B5170', '#3FA96A', '#D9A02B']

function TypewriterName({ text }) {
  const [displayed, setDisplayed] = useState('')
  const [colorIndex, setColorIndex] = useState(0)
  const [phase, setPhase] = useState('typing')
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined

    let timeout
    if (phase === 'typing') {
      if (displayed.length < text.length) {
        timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 90)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1600)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 700)
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length - 1)), 45)
      } else {
        setColorIndex((i) => (i + 1) % NAME_COLORS.length)
        timeout = setTimeout(() => setPhase('typing'), 300)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, phase, text, reducedMotion])

  if (reducedMotion) {
    return <span style={{ color: NAME_COLORS[0] }}>{text}</span>
  }

  return (
    <span aria-hidden="true" style={{ color: NAME_COLORS[colorIndex], transition: 'color 0.5s ease' }}>
      {displayed}
      <span className="ml-0.5 inline-block h-[0.85em] w-[3px] animate-caret bg-current align-middle" />
    </span>
  )
}

// Entrance choreography: each item appears in sequence on page load.
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="hero-section relative overflow-hidden bg-ink text-paper" aria-label="Introduction">
      <div className="hero-glow absolute -left-32 top-20 h-96 w-96 rounded-full bg-coffee/20 blur-3xl" />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-8 md:py-24 lg:px-8">
        <motion.div className="hero-content relative z-10"
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          variants={shouldReduceMotion ? undefined : container}
        >
          <motion.h1
            variants={shouldReduceMotion ? undefined : item}
            className="hero-title text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
          >
            Hi, I&apos;m <span className="char-line inline-block"><TypewriterName text="Alok Pradhan" /></span>
            <span className="sr-only">Alok Pradhan</span>
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? undefined : item}
            className="hero-kicker mt-3 text-xl font-medium text-coffee-light sm:text-2xl"
          >
            Java Full Stack Developer
          </motion.p>

          <motion.p
            variants={shouldReduceMotion ? undefined : item}
            className="hero-copy mt-5 max-w-md text-base leading-relaxed text-paper/75"
          >
            I design and build reliable web applications end to end —
            REST APIs with Spring Boot on the backend, responsive
            interfaces with React on the frontend, and clean data
            models in between.
          </motion.p>

          <motion.div
            variants={shouldReduceMotion ? undefined : item}
            className="hero-actions mt-8 flex flex-wrap items-center gap-3"
          >
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            >
              <Button
                data-magnetic
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => scrollTo('projects')}
                sx={{ bgcolor: '#8B5A2B', '&:hover': { bgcolor: '#A9662B' } }}
              >
                View Projects
              </Button>
            </motion.div>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            >
              <Button
                data-magnetic
                variant="outlined"
                size="large"
                startIcon={<DownloadIcon />}
                href="/resume.pdf"
                download
                sx={{
                  borderColor: 'rgba(246,247,249,0.4)',
                  color: '#F6F7F9',
                  '&:hover': { borderColor: '#F6F7F9', bgcolor: 'rgba(246,247,249,0.06)' },
                }}
              >
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? undefined : item}
            className="hero-socials mt-8 flex items-center gap-2"
          >
            <Tooltip title="GitHub">
              <IconButton
                component="a"
                href="https://github.com/alokm74"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                sx={{ color: '#F6F7F9', '&:hover': { color: '#A9662B' } }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <IconButton
                component="a"
                href="https://linkedin.com/in/alok-pradhan-m74"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                sx={{ color: '#F6F7F9', '&:hover': { color: '#A9662B' } }}
              >
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Email">
              <IconButton
                component="a"
                href="mailto:palok8163@gmail.com"
                aria-label="Send an email"
                sx={{ color: '#F6F7F9', '&:hover': { color: '#A9662B' } }}
              >
                <EmailIcon />
              </IconButton>
            </Tooltip>
          </motion.div>
        </motion.div>

        <div className="relative z-10 flex min-h-[420px] items-center justify-center md:min-h-[560px] md:justify-end">
          <ThreeHero />
        </div>
      </div>
    </section>
  )
}
