import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GSAPExperience() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const cursor = document.querySelector('.cursor-dot')
      const follower = document.querySelector('.cursor-follower')
      const progress = document.querySelector('.scroll-progress')
      const hero = document.querySelector('#home')
      const magnetic = gsap.utils.toArray('[data-magnetic]')
      const tilt = gsap.utils.toArray('[data-tilt]')

      const moveCursor = (e) => {
        if (cursor) gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.08, overwrite: true })
        if (follower) gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, overwrite: true, ease: 'power3.out' })
      }
      window.addEventListener('pointermove', moveCursor, { passive: true })

      const updateProgress = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        if (progress) progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      }
      window.addEventListener('scroll', updateProgress, { passive: true })

      gsap.fromTo('.nav-shell', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 })
      gsap.fromTo('.hero-kicker', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.35 })
      gsap.fromTo('.hero-title .char-line', { yPercent: 110, rotateX: 70 }, { yPercent: 0, rotateX: 0, duration: 1.1, stagger: 0.09, delay: 0.45, ease: 'power4.out' })
      gsap.fromTo('.hero-copy, .hero-actions, .hero-socials', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, delay: 0.8, ease: 'power3.out' })
      gsap.fromTo('.three-hero', { opacity: 0, scale: 0.78, rotate: -6, y: 45 }, { opacity: 1, scale: 1, rotate: 0, y: 0, duration: 1.7, delay: 0.35, ease: 'expo.out' })
      gsap.fromTo('.profile-three canvas', { filter: 'blur(10px)' }, { filter: 'blur(0px)', duration: 1.3, delay: 0.55, ease: 'power3.out' })
      gsap.to('.profile-three', { yPercent: -7, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.2 } })

      gsap.to('.hero-glow', { yPercent: 25, scale: 1.18, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.4 } })
      gsap.utils.toArray('section:not(#home)').forEach((section) => {
        const els = section.querySelectorAll('.section-label, h2, p, li, article, [data-reveal]')
        if (!els.length) return
        gsap.fromTo(els, { y: 45, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.75, stagger: 0.045, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 78%', once: true }
        })
      })

      magnetic.forEach((el) => {
        const strength = 0.25
        const enter = () => gsap.to(el, { scale: 1.04, duration: 0.25 })
        const leave = () => gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.4)' })
        const move = (e) => {
          const r = el.getBoundingClientRect()
          gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength, duration: 0.25 })
        }
        el.addEventListener('pointerenter', enter)
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
      })

      tilt.forEach((el) => {
        const move = (e) => {
          const r = el.getBoundingClientRect()
          const rx = ((e.clientY - r.top) / r.height - 0.5) * -8
          const ry = ((e.clientX - r.left) / r.width - 0.5) * 10
          gsap.to(el, { rotateX: rx, rotateY: ry, transformPerspective: 900, duration: 0.35 })
        }
        const leave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
      })

      magnetic.forEach((el) => gsap.set(el, { willChange: 'transform' }))
      updateProgress()

      return () => {
        window.removeEventListener('pointermove', moveCursor)
        window.removeEventListener('scroll', updateProgress)
      }
    })
    return () => ctx.revert()
  }, [])

  return null
}
