import CodeIcon from '@mui/icons-material/Code'
import FlagIcon from '@mui/icons-material/Flag'
import SchoolIcon from '@mui/icons-material/School'
import BuildIcon from '@mui/icons-material/Build'
import { Reveal, StaggerGroup, StaggerItem } from './motion.jsx'

const cards = [
  {
    icon: CodeIcon,
    title: 'Summary',
    body: 'A Java Full Stack Developer with hands-on experience building REST APIs and responsive web applications, focused on writing maintainable, well-tested code.',
  },
  {
    icon: FlagIcon,
    title: 'Objective',
    body: 'Looking to contribute to a product engineering team where I can grow my backend architecture skills while shipping features users actually rely on.',
  },
  {
    icon: SchoolIcon,
    title: 'Education',
    body: 'B.Tech in Computer Science & Engineering from Kalam Institute of Technology, affiliated with BPUT, Odisha.',
  },
  {
    icon: BuildIcon,
    title: 'Technologies',
    body: 'Java, Spring Boot, React, MySQL, MongoDB, Docker, AWS — with REST API design and JWT-based auth as daily tools.',
  },
]

export default function About() {
  return (
    <section id="about" className="bg-paper py-16 sm:py-20" aria-label="About me">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="section-label">01 — about</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            About Me
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            A quick look at how I work, what I&apos;m aiming for, and the
            background that got me here.
          </p>
        </Reveal>

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {cards.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-coffee/10 text-coffee transition-transform duration-300 group-hover:scale-110">
                    <Icon fontSize="small" />
                  </span>
                  <h3 className="text-base font-semibold text-ink">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
