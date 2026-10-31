import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from './Icons'

const SLIDES = [
  { src: '/img/slide1.jpg', alt: 'IPTC Tier 2 Scheme — Retire in comfort with IPTC Tier 2. Financial security, long-term growth, a comfortable retirement and peace of mind.' },
  { src: '/img/slide2.jpg', alt: 'Secure your tomorrow — plan today, enjoy a worry-free retirement tomorrow. A smiling father receives a gift from his daughter.' },
  { src: '/img/slide4.jpg', alt: 'Pension for a better tomorrow — secure your future and take care of your loved ones with our pension plan. Plan today, live worry-free tomorrow. A smiling three-generation family together at home.' },
  { src: '/img/slide3.jpg', alt: 'From dream to reality — make your retirement plan a success. A market trader smiles at her fruit stall.' },
]
const INTERVAL = 6000

export default function HeroSlider() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)
  const n = SLIDES.length
  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n])

  useEffect(() => {
    if (paused) return
    const t = window.setTimeout(() => go(i + 1), INTERVAL)
    return () => window.clearTimeout(t)
  }, [i, paused, go])

  return (
    <section aria-roledescription="carousel" aria-label="IPTC highlights" className="relative bg-ink pb-14 md:pb-24"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false) }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true) }}
      onTouchEnd={(e) => {
        const start = touchX.current; touchX.current = null; setPaused(false)
        if (start === null) return
        const dx = e.changedTouches[0].clientX - start
        if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1)
      }}>
      <div className="relative mx-auto aspect-[1672/941] w-full max-w-[1672px] overflow-hidden">
        {SLIDES.map((s, k) => (
          <div key={s.src} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}`} aria-hidden={k !== i}
            className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${k === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
            <img src={s.src} alt={s.alt} className="h-full w-full object-contain" width={1672} height={941}
              loading={k === 0 ? 'eager' : 'lazy'} fetchPriority={k === 0 ? 'high' : 'auto'} draggable={false} />
          </div>
        ))}
        <button type="button" onClick={() => go(i - 1)} aria-label="Previous slide"
          className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lg hover:bg-orange sm:left-4 sm:h-12 sm:w-12">
          <ChevronLeft />
        </button>
        <button type="button" onClick={() => go(i + 1)} aria-label="Next slide"
          className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lg hover:bg-orange sm:right-4 sm:h-12 sm:w-12">
          <ChevronRight />
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-[38px] flex justify-center gap-2 md:bottom-[66px]">
        {SLIDES.map((_, k) => (
          <button key={k} type="button" onClick={() => go(k)} aria-label={`Go to slide ${k + 1}`} aria-current={k === i}
            className={`h-2.5 rounded-full transition-all ${k === i ? 'w-8 bg-orange' : 'w-2.5 bg-white/80 hover:bg-white'} ring-1 ring-ink/30`} />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">Slide {i + 1} of {n}</p>
    </section>
  )
}
