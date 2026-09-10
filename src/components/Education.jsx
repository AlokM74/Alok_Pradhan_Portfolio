import SchoolIcon from '@mui/icons-material/School'
import { education } from '../data/education.js'
import { Reveal, StaggerGroup, StaggerItem } from './motion.jsx'

export default function Education() {
  return (
    <section id="education" className="bg-paper py-16 sm:py-20" aria-label="Education">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="section-label">05 — education</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            Education
          </h2>
        </Reveal>

        <StaggerGroup as="div" className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {education.map((item, index) => (
            <StaggerItem
              key={item.id}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="flex h-full gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-signal/10 text-signal">
                  <SchoolIcon fontSize="small" />
                </span>
                <div>
                  <p className="font-mono text-xs text-slate-400">{item.year}</p>
                  <h3 className="mt-1 text-base font-semibold text-ink">
                    {item.degree}
                  </h3>
                  <p className="text-sm font-medium text-slate-700">
                    {item.institution}
                  </p>
                  <p className="text-sm text-slate-500">{item.branch}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
