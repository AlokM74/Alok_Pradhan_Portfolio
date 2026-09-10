import WebIcon from '@mui/icons-material/Web'
import StorageIcon from '@mui/icons-material/Storage'
import ApiIcon from '@mui/icons-material/Api'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import { Reveal, StaggerGroup, StaggerItem } from './motion.jsx'

const services = [
  {
    icon: WebIcon,
    title: 'Web Development',
    description:
      'Responsive, accessible interfaces built with React, Tailwind CSS, and Material UI.',
  },
  {
    icon: StorageIcon,
    title: 'Backend Development',
    description:
      'Robust server-side logic and data modeling with Java, Spring Boot, MySQL, and MongoDB.',
  },
  {
    icon: ApiIcon,
    title: 'REST API Development',
    description:
      'Well-documented, secure REST APIs with JWT authentication and Swagger/OpenAPI specs.',
  },
  {
    icon: IntegrationInstructionsIcon,
    title: 'Full Stack Development',
    description:
      'End-to-end ownership — from database schema to a polished, deployed user interface.',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-white py-16 sm:py-20" aria-label="Services">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="section-label">06 — services</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            What I Can Help With
          </h2>
        </Reveal>

        <StaggerGroup
          as="div"
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div data-tilt className="group h-full rounded-lg border border-slate-200 bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-coffee/40 hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-coffee text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon fontSize="small" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
