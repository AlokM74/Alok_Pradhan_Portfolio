import { motion, useReducedMotion } from 'framer-motion'

import {
  FaReact,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaAws,
} from 'react-icons/fa'

import {
  SiJavascript,
  SiTailwindcss,
  SiMui,
  SiSpringboot,
  SiMysql,
  SiMongodb,
  SiPostman,
  SiSwagger,
} from 'react-icons/si'

import { TbApi } from 'react-icons/tb'
import { BsDiagram3 } from 'react-icons/bs'

import { skillCategories } from '../data/skills.js'
import { Reveal, StaggerGroup, StaggerItem } from './motion.jsx'

const SKILL_ICONS = {
  'React.js': { Icon: FaReact, color: '#61DAFB' },
  'JavaScript (ES6+)': { Icon: SiJavascript, color: '#F7DF1E' },
  HTML5: { Icon: FaHtml5, color: '#E34F26' },
  CSS3: { Icon: FaCss3Alt, color: '#1572B6' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
  'Material UI': { Icon: SiMui, color: '#007FFF' },
  Java: { Icon: FaJava, color: '#F89820' },
  'Spring Boot': { Icon: SiSpringboot, color: '#6DB33F' },
  'Spring Security': { Icon: SiSpringboot, color: '#6DB33F' },
  'Spring Data JPA': { Icon: SiSpringboot, color: '#6DB33F' },
  'REST APIs': { Icon: TbApi, color: '#3B5170' },
  Microservices: { Icon: BsDiagram3, color: '#3B5170' },
  MySQL: { Icon: SiMysql, color: '#4479A1' },
  MongoDB: { Icon: SiMongodb, color: '#47A248' },
  Git: { Icon: FaGitAlt, color: '#F05032' },
  GitHub: { Icon: FaGithub, color: '#181717' },
  Docker: { Icon: FaDocker, color: '#2496ED' },
  AWS: { Icon: FaAws, color: '#FF9900' },
  Postman: { Icon: SiPostman, color: '#FF6C37' },
  Swagger: { Icon: SiSwagger, color: '#85EA2D' },
}

function AnimatedBar({ level, color }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full"
      style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: shouldReduceMotion ? `${level}%` : 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="bg-white py-16 sm:py-20" aria-label="Skills">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="section-label">02 — skills</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            Skills &amp; Technologies
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            The stack I use daily, grouped by where it sits in the application.
          </p>
        </Reveal>

        <StaggerGroup
          as="div"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillCategories.map((category) => (
            <StaggerItem key={category.id}>
              <div
                className="h-full rounded-lg border border-slate-200 bg-paper p-6 transition-transform duration-300 hover:-translate-y-1"
                style={{ borderTopWidth: 3, borderTopColor: category.accent }}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
                  {category.title}
                </h3>

                <ul className="mt-4 space-y-4">
                  {category.skills.map((skill) => {
                    const iconData = SKILL_ICONS[skill.name]
                    const Icon = iconData?.Icon
                    const iconColor = iconData?.color ?? category.accent

                    return (
                      <li key={skill.name}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-slate-700">
                            {Icon ? (
                              <Icon
                                aria-hidden="true"
                                style={{ color: iconColor }}
                                className="h-4 w-4 shrink-0"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{ backgroundColor: iconColor }}
                              />
                            )}
                            {skill.name}
                          </span>
                          <span className="font-mono text-xs text-slate-400">
                            {skill.level}%
                          </span>
                        </div>

                        <AnimatedBar level={skill.level} color={category.accent} />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
