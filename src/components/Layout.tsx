import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { CONTACT, SOCIAL } from '../config'
import { telHref } from '../lib/format'
import { PortalLink, whatsappHref } from './Bits'
import { Close, Facebook, Globe, Instagram, LinkedIn, Mail, Menu, Phone, WhatsApp, XLogo } from './Icons'

const NAV = [
  { to: '/schemes', label: 'Schemes' },
  { to: '/calculator', label: 'Calculator' },
  { to: '/employers', label: 'Employers' },
  { to: '/join', label: 'Join Tier 3' },
  { to: '/news', label: 'News' },
  { to: '/about', label: 'About us' },
]

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function TopBar() {
  const links = [['/contact', 'Contact'], ['/faqs', 'FAQs'], ['/careers', 'Careers'], ['/complaints', 'Complaints']]
  return (
    <div className="bg-ink text-[12px] text-neutral-300">
      <div className="container-site flex py-2 sm:justify-end">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={telHref(CONTACT.phones[0])} className="hidden items-center gap-1.5 hover:text-orange sm:inline-flex"><Phone width={13} height={13} />{CONTACT.phones[0]}</a>
          <a href={`mailto:${CONTACT.email}`} className="hidden items-center gap-1.5 hover:text-orange md:inline-flex"><Mail width={13} height={13} />{CONTACT.email}</a>
          <nav aria-label="Utility" className="flex flex-wrap gap-x-3">
            {links.map(([to, l]) => <Link key={to} to={to} className="font-semibold text-white hover:text-orange">{l}</Link>)}
          </nav>
        </div>
      </div>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const btnRef = useRef<HTMLButtonElement>(null)
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus() } }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const navCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-2.5 py-2 text-[15px] font-semibold transition-colors hover:text-orange-dark ${isActive ? 'text-orange-dark' : 'text-ink'}`

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-site flex h-[68px] items-center justify-between gap-4 lg:h-[76px]">
        <Link to="/" className="shrink-0" aria-label="Industrial Pensions Trust, home">
          <img src="/img/logo.png" alt="Industrial Pensions Trust — Every Cedi Counts!" className="h-11 w-auto lg:h-12" width={375} height={165} />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => <NavLink key={n.to} to={n.to} className={navCls}>{n.label}</NavLink>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <PortalLink to="employerLogin" className="btn-outline px-4 py-2.5">Employer login</PortalLink>
          <PortalLink to="memberLogin" className="btn-black px-4 py-2.5">Member login</PortalLink>
        </div>
        <button ref={btnRef} type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu"
          className="inline-flex items-center gap-2 rounded-lg border-2 border-ink px-3.5 py-2 text-sm font-bold lg:hidden">
          {open ? <Close width={18} height={18} /> : <Menu width={18} height={18} />} Menu
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full max-h-[calc(100vh-68px)] overflow-y-auto border-b border-line bg-white shadow-xl lg:hidden">
          <nav aria-label="Mobile" className="container-site flex flex-col py-3">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => `border-b border-line px-1 py-3.5 text-base font-bold ${isActive ? 'text-orange-dark' : 'text-ink'}`}>{n.label}</NavLink>
            ))}
            <div className="grid grid-cols-1 gap-2 py-4 min-[400px]:grid-cols-2">
              <PortalLink to="employerLogin" className="btn-outline">Employer login</PortalLink>
              <PortalLink to="memberLogin" className="btn-black">Member login</PortalLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function SocialIcons() {
  const items = [
    { href: SOCIAL.facebook, label: 'Facebook', Icon: Facebook },
    { href: SOCIAL.instagram, label: 'Instagram', Icon: Instagram },
    { href: SOCIAL.x, label: 'X (Twitter)', Icon: XLogo },
    { href: SOCIAL.linkedin, label: 'LinkedIn', Icon: LinkedIn },
  ].filter((i) => i.href.trim())
  if (!items.length) return null
  return (
    <ul className="mt-5 flex gap-2" aria-label="Social media">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`IPTC on ${label} (opens in a new tab)`}
            className="grid h-10 w-10 place-items-center rounded-full bg-ink-2 text-white hover:bg-orange hover:text-ink"><Icon /></a>
        </li>
      ))}
    </ul>
  )
}

function Footer() {
  type Item = { label: string; to?: string; portal?: 'memberLogin' | 'employerLogin' }
  const cols: { title: string; items: Item[] }[] = [
    { title: 'Schemes', items: [
      { label: 'Tier 2 occupational', to: '/schemes#tier-2' }, { label: 'Tier 3 personal', to: '/schemes#tier-3' },
      { label: 'Group Tier 3', to: '/schemes#group-tier-3' }, { label: 'Our products', to: '/products' }, { label: 'Pension calculator', to: '/calculator' }, { label: 'Join Tier 3', to: '/join' }] },
    { title: 'Services', items: [
      { label: 'Member portal', portal: 'memberLogin' }, { label: 'Employer portal', portal: 'employerLogin' },
      { label: 'For employers', to: '/employers' }, { label: 'Transfers to IPTC', to: '/transfers' }, { label: 'Benefits and claims', to: '/benefits' }] },
    { title: 'Company', items: [
      { label: 'About us', to: '/about' }, { label: 'Board and governance', to: '/governance' }, { label: 'News', to: '/news' },
      { label: 'FAQs', to: '/faqs' }, { label: 'Careers', to: '/careers' }, { label: 'Complaints', to: '/complaints' }, { label: 'Contact', to: '/contact' }] },
  ]
  const lc = 'text-sm text-neutral-300 hover:text-orange'
  return (
    <footer className="bg-ink text-white">
      <div className="container-site grid gap-10 py-12 sm:py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-block rounded-xl bg-white p-3" aria-label="Industrial Pensions Trust, home">
            <img src="/img/logo.png" alt="Industrial Pensions Trust — Every Cedi Counts!" className="h-14 w-auto" width={375} height={165} />
          </Link>
          <p className="mt-5 text-xl font-extrabold">Your Future is Worth Protecting</p>
          <p className="mt-3 text-sm text-neutral-400">
            Licensed by the National Pensions Regulatory Authority (NPRA) as a corporate trustee.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-neutral-300">
            <li className="flex items-center gap-2"><Phone width={15} height={15} className="text-orange" />
              {CONTACT.phones.map((p, i) => <span key={p}>{i > 0 && <span aria-hidden> / </span>}<a href={telHref(p)} className="hover:text-orange">{p}</a></span>)}
            </li>
            <li><a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 hover:text-orange"><Mail width={15} height={15} className="text-orange" />{CONTACT.email}</a></li>
            <li><a href={`https://${CONTACT.web}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-orange"><Globe width={15} height={15} className="text-orange" />{CONTACT.web}</a></li>
          </ul>
          <SocialIcons />
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-orange">{c.title}</h2>
            <ul className="space-y-2.5">
              {c.items.map((i) => (
                <li key={i.label}>
                  {i.portal ? <PortalLink to={i.portal} className={lc}>{i.label}</PortalLink> : <Link to={i.to!} className={lc}>{i.label}</Link>}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Industrial Pensions Trust</p>
          <p className="flex flex-wrap gap-x-2">
            <Link to="/privacy" className="hover:text-orange">Privacy</Link><span aria-hidden>·</span>
            <Link to="/terms" className="hover:text-orange">Terms</Link><span aria-hidden>·</span>
            <Link to="/privacy#data-protection" className="hover:text-orange">Data protection (Act 843)</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <button type="button" onClick={() => document.getElementById('main')?.focus()} className="sr-only z-50 rounded bg-orange px-4 py-2 font-bold text-ink focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</button>
      <ScrollToTop />
      <TopBar />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      {CONTACT.whatsapp.trim() && (
        <a href={whatsappHref(CONTACT.whatsapp)} target="_blank" rel="noopener noreferrer" aria-label="Chat with IPTC on WhatsApp (opens in a new tab)"
          className="fixed bottom-4 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105">
          <WhatsApp width={28} height={28} />
        </a>
      )}
    </div>
  )
}
