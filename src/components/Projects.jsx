import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import { projects } from '../data/projects.js'
import { Reveal, StaggerGroup, StaggerItem } from './motion.jsx'

export default function Projects() {
  return (
    <section id="projects" className="bg-white py-16 sm:py-20" aria-label="Projects">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="section-label">04 — projects</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            Projects
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            A selection of full-stack applications covering payments,
            admin dashboards, and e-commerce.
          </p>
        </Reveal>

        <StaggerGroup
          as="div"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <StaggerItem key={project.id} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-paper shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.name} preview`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold text-ink">
                    {project.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{ bgcolor: 'rgba(139,90,43,0.1)', color: '#6B4520' }}
                      />
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ borderColor: '#D1D5DB', color: '#14181F' }}
                    >
                      GitHub
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<LaunchIcon />}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ bgcolor: '#8B5A2B', '&:hover': { bgcolor: '#A9662B' } }}
                    >
                      Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
