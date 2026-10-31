import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { liveUrl, PREVIEW_ROUTES, type PortalKey } from '../lib/portal'

/** Orange-highlighted placeholder text that must be replaced before launch. */
export function Ph({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-orange-light px-1 py-0.5 font-semibold text-orange-dark ring-1 ring-orange/40">{children}</mark>
}

/** Link to a system page: the real system when PORTAL_LIVE, otherwise the preview page. Same tab. */
export function PortalLink({ to, className, children, onClick }: { to: PortalKey; className?: string; children: ReactNode; onClick?: () => void }) {
  const url = liveUrl(to)
  if (url) return <a href={url} className={className} onClick={onClick}>{children}</a>
  return <Link to={PREVIEW_ROUTES[to]} className={className} onClick={onClick}>{children}</Link>
}

export function PreviewNote() {
  return <p className="mt-6 text-center text-xs text-neutral-500">Preview: this form is not yet connected to the IPTC system.</p>
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow?: string; title: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange/90 blur-0 sm:h-96 sm:w-96" />
      <div aria-hidden className="absolute -right-10 top-28 h-40 w-40 rounded-full border-[14px] border-orange/40 sm:right-40" />
      <div className="container-site relative py-12 sm:py-16 lg:py-20">
        {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-orange">{eyebrow}</p>}
        <h1 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
        {intro && <div className="mt-4 max-w-2xl text-base text-neutral-300 sm:text-lg">{intro}</div>}
        {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, intro, center }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean }) {
  return (
    <div className={`mb-8 sm:mb-10 ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}`}>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="h-section">{title}</h2>
      {intro && <p className="mt-3 text-base text-neutral-600 sm:text-lg">{intro}</p>}
    </div>
  )
}

export function DraftBanner() {
  return (
    <div role="note" className="mb-8 rounded-xl border-2 border-dashed border-orange bg-orange-light px-4 py-3 text-sm font-bold text-orange-dark">
      Draft for IPTC legal review
    </div>
  )
}

export function TierKey() {
  return (
    <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold text-ink-2">
      <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-ink" aria-hidden />Black = Tier 2</span>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-orange" aria-hidden />Orange = Tier 3</span>
    </p>
  )
}

/** "Download hard-copy form" button. Hidden when no file is configured in FORMS. */
export function FormDownload({ href, label }: { href: string; label: string }) {
  if (!href.trim()) return null
  return (
    <div className="card mb-6 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-ink-2"><strong className="text-ink">Prefer paper?</strong> Download the form, fill it in and bring or email it to us.</p>
      <a href={href} download className="btn-outline shrink-0">{label} (PDF)</a>
    </div>
  )
}

/** WhatsApp chat link: https://wa.me/<number>. Hidden when CONTACT.whatsapp is empty. */
export const whatsappHref = (n: string) => `https://wa.me/${n.replace(/\D/g, '')}`
