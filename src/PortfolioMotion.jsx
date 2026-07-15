import { useLayoutEffect } from 'react'

export default function PortfolioMotion() {
  useLayoutEffect(() => {
    let context
    let cancelled = false

    const setupMotion = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      document.body.classList.add('portfolio-motion-active')
      document.body.style.overflow = 'hidden'

      context = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => {
          document.body.style.overflow = ''
          gsap.set('.opening-sequence', { display: 'none' })
          ScrollTrigger.refresh()
        }
      })

      intro
        .set('nav', { y: -40, opacity: 0 })
        .set('.hero-video', { scale: 1.16, filter: 'brightness(.58) saturate(.7)' })
        .set('.hero-title-char', { yPercent: 125, scaleY: .55, opacity: 0, transformOrigin: '50% 100%' })
        .set('.hero-copy .eyebrow, .hero-bottom-copy > *', { y: 45, opacity: 0 })
        .fromTo('.opening-mark', { y: 24, opacity: 0, letterSpacing: '.45em' }, { y: 0, opacity: 1, letterSpacing: '.18em', duration: 1.05 }, .15)
        .to('.opening-mark', { y: -24, opacity: 0, duration: .65, ease: 'power3.in' }, 1.05)
        .to('.opening-panel', { yPercent: -102, duration: 1.45, stagger: .08, ease: 'power4.inOut' }, .92)
        .to('.hero-video', { scale: 1, filter: 'brightness(1) saturate(1)', duration: 2.15, ease: 'power3.out' }, 1.2)
        .to('.hero-title-char', { yPercent: 0, scaleY: 1, opacity: 1, duration: 1.45, stagger: .055, ease: 'expo.out' }, 1.52)
        .to('.hero-copy .eyebrow', { y: 0, opacity: 1, duration: .9 }, 1.9)
        .to('.hero-bottom-copy > *', { y: 0, opacity: 1, duration: 1, stagger: .16 }, 2.08)
        .to('nav', { y: 0, opacity: 1, duration: 1.05 }, 2.18)

      const titleReveal = (selector, trigger) => {
        gsap.fromTo(selector,
          { y: 125, scale: .86, opacity: 0, clipPath: 'inset(0 0 100% 0)', transformOrigin: '0 100%' },
          { y: 0, scale: 1, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'expo.out', scrollTrigger: { trigger, start: 'top 82%', once: true } }
        )
      }

      titleReveal('.about-section-title', '.about')
      titleReveal('.section-head h2', '.work')
      titleReveal('.contact-title-effect', '.contact')

      const aboutTimeline = gsap.timeline({ scrollTrigger: { trigger: '.about-grid', start: 'top 80%', once: true } })
      aboutTimeline
        .fromTo('.portrait-photo', { clipPath: 'inset(0 0 100% 0)', y: 70, scale: .94 }, { clipPath: 'inset(0 0 0% 0)', y: 0, scale: 1, duration: 1.45, ease: 'power4.out' })
        .fromTo('.about-profile > .about-label, .about-profile > h2, .about-profile > p', { y: 52, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: .11, ease: 'power3.out' }, '-=.9')
        .fromTo('.about-details .profile-glow', { y: 70, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: 1.05, stagger: .13, ease: 'power3.out' }, '-=.55')

      gsap.utils.toArray('.project-case').forEach((card, index) => {
        const media = card.querySelector('.case-media')
        const copyItems = card.querySelectorAll('.case-copy > *')
        const galleryCards = card.querySelectorAll('.ip-gallery-card')
        const cardTimeline = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 84%', once: true } })
        cardTimeline.fromTo(card, { y: 110, opacity: 0, scale: .965 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: Math.min(index * .04, .12), ease: 'power3.out' })
        if (media) cardTimeline.fromTo(media, { clipPath: 'inset(0 100% 0 0)', scale: 1.07 }, { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.35, ease: 'power4.inOut' }, '-=.82')
        if (copyItems.length) cardTimeline.fromTo(copyItems, { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .1, ease: 'power3.out' }, '-=.8')
        if (galleryCards.length) cardTimeline.fromTo(galleryCards, { y: 80, opacity: 0, rotateY: -7 }, { y: 0, opacity: 1, rotateY: 0, duration: 1, stagger: .09, ease: 'power3.out' }, '-=.72')
      })

      gsap.utils.toArray('.case-media img, .case-video video, .portrait-photo img').forEach(media => {
        gsap.fromTo(media, { yPercent: -4, scale: 1.045 }, { yPercent: 4, scale: 1.045, ease: 'none', scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: .9 } })
      })

      const contactTimeline = gsap.timeline({ scrollTrigger: { trigger: '.contact-layout', start: 'top 79%', once: true } })
      contactTimeline
        .fromTo('.contact-label, .contact-copy > p, .contact-status, .resume-button', { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: .12, ease: 'power3.out' }, .25)
        .fromTo('.contact-card', { y: 100, opacity: 0, rotateY: -12, scale: .94 }, { y: 0, opacity: 1, rotateY: 0, scale: 1, duration: 1.45, ease: 'expo.out' }, .42)
      })
    }

    setupMotion()

    return () => {
      cancelled = true
      context?.revert()
      document.body.classList.remove('portfolio-motion-active')
      document.body.style.overflow = ''
    }
  }, [])

  return null
}
