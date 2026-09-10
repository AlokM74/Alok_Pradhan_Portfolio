import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import SendIcon from '@mui/icons-material/Send'
import { Reveal, StaggerGroup, StaggerItem } from './motion.jsx'

const STORAGE_KEY = 'portfolio_contact_messages'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function validate(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!form.subject.trim()) {
    errors.subject = 'Subject is required'
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required'
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters'
  }

  return errors
}

function saveMessageToLocalStorage(entry) {
  const existingRaw = window.localStorage.getItem(STORAGE_KEY)

  const existing = existingRaw
    ? JSON.parse(existingRaw)
    : []

  const updated = [
    ...existing,
    {
      ...entry,
      submittedAt: new Date().toISOString(),
    },
  ]

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )
}

const contactDetails = [
  {
    icon: EmailIcon,
    label: 'palok8163@gmail.com',
    href: 'mailto:palok8163@gmail.com',
  },
  {
    icon: PhoneIcon,
    label: '+91 90787 08878',
    href: 'tel:+919078708878',
  },
  {
    icon: LocationOnIcon,
    label: 'Berhampur, Odisha, India',
    href: null,
  },
  {
    icon: GitHubIcon,
    label: 'github.com/alokm74',
    href: 'https://github.com/alokm74',
  },
  {
    icon: LinkedInIcon,
    label: 'linkedin.com/in/alok-pradhan-m74',
    href: 'https://linkedin.com/in/alok-pradhan-m74',
  },
]

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validate(form)

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setSnackbar({
        open: true,
        message: 'Please fix the highlighted fields.',
        severity: 'error',
      })
      return
    }

    try {
      saveMessageToLocalStorage(form)

      setSnackbar({
        open: true,
        message: 'Message saved — thank you for reaching out!',
        severity: 'success',
      })

      setForm(initialForm)
      setErrors({})
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Could not save your message. Please try again.',
        severity: 'error',
      })
    }
  }

  return (
    <section
      id="contact"
      className="bg-paper py-16 sm:py-20"
      aria-label="Contact"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <Reveal>
          <p className="section-label">
            07 — contact
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            Get In Touch
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Have a role or a project in mind? Send a message and I&apos;ll
            reply as soon as I can.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">

          <StaggerGroup as="div" className="space-y-4 lg:col-span-2">
            {contactDetails.map(({ icon: Icon, label, href }) => {
              const content = (
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-coffee/40 hover:shadow-md">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-signal/10 text-signal">
                    <Icon fontSize="small" />
                  </span>

                  <span className="break-all text-sm text-slate-700">
                    {label}
                  </span>
                </div>
              )

              return href ? (
                <StaggerItem key={label} direction="left" as="a" href={href} target={
                    href.startsWith('http')
                      ? '_blank'
                      : undefined
                  }
                  rel={
                    href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="block"
                >
                  {content}
                </StaggerItem>
              ) : (
                <StaggerItem key={label} direction="left">
                  {content}
                </StaggerItem>
              )
            })}
          </StaggerGroup>

          <Reveal
            as="form"
            direction="right"
            delay={0.1}
            onSubmit={handleSubmit}
            noValidate
            className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 shadow-card lg:col-span-3"
          >
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextField
        label="Name"
        value={form.name}
        onChange={handleChange('name')}
        error={Boolean(errors.name)}
        helperText={errors.name}
        fullWidth
        size="small"
      />
      <TextField
        label="Email"
        type="email"
        value={form.email}
        onChange={handleChange('email')}
        error={Boolean(errors.email)}
        helperText={errors.email}
        fullWidth
        size="small"
      />
    </div>

    <TextField
      label="Subject"
      value={form.subject}
      onChange={handleChange('subject')}
      error={Boolean(errors.subject)}
      helperText={errors.subject}
      fullWidth
      size="small"
    />

    <TextField
      label="Message"
      value={form.message}
      onChange={handleChange('message')}
      error={Boolean(errors.message)}
      helperText={errors.message}
      fullWidth
      multiline
      minRows={4}
      size="small"
    />

    <Button
      type="submit"
      variant="contained"
      endIcon={<SendIcon />}
      fullWidth
      sx={{ mt: 1, py: 1.25, bgcolor: '#8B5A2B', '&:hover': { bgcolor: '#A9662B' } }}
    >
      Send Message
    </Button>
  </div>
</Reveal>

        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </section>
  )
}