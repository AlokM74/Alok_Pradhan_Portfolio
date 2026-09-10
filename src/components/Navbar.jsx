import { useEffect, useState, useCallback } from 'react'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Detect active section
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0,
      }
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Navigation
  const handleNavigate = useCallback((id) => {
    setDrawerOpen(false)
    
    // Slight delay so drawer can unmount focus gracefully
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 100)
  }, [])

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: scrolled
          ? 'rgba(20,24,31,0.97)'
          : 'rgba(20,24,31,1)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        transition: 'background-color 0.2s ease',
      }}
    >
      <Toolbar
        sx={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: {
            xs: 2,
            sm: 3,
            lg: 4,
          },
        }}
      >
        {/* LOGO */}
        <button
          onClick={() => handleNavigate('home')}
          aria-label="Go to home section"
          className="font-mono text-base font-semibold text-paper transition-colors hover:text-coffee-light"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Alok
          <span className="text-coffee-light">.</span>
          Pradhan
        </button>

        {/* DESKTOP NAVIGATION */}
        <Box
          component="nav"
          aria-label="Primary navigation"
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'flex',
            },
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              aria-current={
                activeId === link.id ? 'page' : undefined
              }
              className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                activeId === link.id
                  ? 'text-coffee-light'
                  : 'text-paper/80 hover:text-paper'
              }`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </button>
          ))}

          {/* Hire Me */}
          <Button
            variant="contained"
            size="small"
            onClick={() => handleNavigate('contact')}
            sx={{
              ml: 1,
              bgcolor: '#8B5A2B',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#A9662B',
              },
            }}
          >
            Hire Me
          </Button>
        </Box>

        {/* MOBILE / TABLET MENU BUTTON */}
        <IconButton
          aria-label="Open navigation menu"
          onClick={() => setDrawerOpen(true)}
          sx={{
            color: '#F6F7F9',
            display: {
              xs: 'flex',
              sm: 'flex',
              md: 'none',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        disableRestoreFocus // Prevents aria-hidden focus blocking issue
        slotProps={{
          paper: {
            sx: {
              width: '40vw !important',
              minWidth: '220px',
              backgroundColor: '#0E1117 !important',
              color: '#F6F7F9',
            },
          },
        }}
      >
        <Box sx={{ height: '100%', backgroundColor: 'transparent' }}>
          {/* Drawer Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 2,
            }}
          >
            <span className="font-mono text-sm text-paper">
              Menu
            </span>

            <IconButton
              aria-label="Close navigation menu"
              onClick={() => setDrawerOpen(false)}
              sx={{
                color: '#F6F7F9',
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              mx: 2,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          />

          {/* Mobile Navigation */}
          <List sx={{ pt: 1 }}>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                selected={activeId === link.id}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: '8px',
                  color:
                    activeId === link.id
                      ? '#A9662B'
                      : '#F6F7F9',

                  '&.Mui-selected': {
                    bgcolor: 'rgba(139,90,43,0.12)',
                  },

                  '&.Mui-selected:hover': {
                    bgcolor: 'rgba(139,90,43,0.18)',
                  },

                  '&:hover': {
                    bgcolor: 'rgba(139,90,43,0.08)',
                  },
                }}
              >
                <ListItemText
                  primary={link.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: '14px',
                        fontWeight: activeId === link.id ? 600 : 500,
                      },
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          {/* Mobile Hire Me */}
          <Box sx={{ px: 2, pt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleNavigate('contact')}
              sx={{
                bgcolor: '#8B5A2B',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#A9662B',
                },
              }}
            >
              Hire Me
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  )
}