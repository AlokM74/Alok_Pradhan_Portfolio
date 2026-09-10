import Timeline from '@mui/lab/Timeline'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import Chip from '@mui/material/Chip'
import WorkIcon from '@mui/icons-material/Work'
import { motion, useReducedMotion } from 'framer-motion'
import { experience } from '../data/experience.js'
import { Reveal } from './motion.jsx'

export default function Experience() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="experience" className="bg-paper py-16 sm:py-20" aria-label="Work experience">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="section-label">03 — experience</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            Experience
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Roles where I&apos;ve shipped backend services and frontend
            interfaces in production.
          </p>
        </Reveal>

        <div className="mt-6 -mx-4 sm:mx-0">
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
              px: { xs: 1, sm: 0 },
            }}
          >
            {experience.map((item, index) => (
              <TimelineItem key={item.id}>
                <TimelineOppositeContent
                  sx={{ display: { xs: 'none', md: 'block' }, maxWidth: 140 }}
                  className="font-mono text-xs text-slate-500"
                >
                  {item.duration}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <motion.div
                    initial={shouldReduceMotion ? false : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.35, delay: index * 0.15, ease: 'backOut' }}
                  >
                    <TimelineDot sx={{ bgcolor: '#8B5A2B' }}>
                      <WorkIcon fontSize="small" sx={{ color: '#fff' }} />
                    </TimelineDot>
                  </motion.div>
                  {index !== experience.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ pb: 5 }}>
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-lg sm:p-6"
                  >
                    <p className="font-mono text-xs text-slate-500 md:hidden">
                      {item.duration}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-ink sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-coffee">{item.company}</p>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
                      {item.responsibilities.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{ bgcolor: 'rgba(59,81,112,0.08)', color: '#3B5170' }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  )
}
