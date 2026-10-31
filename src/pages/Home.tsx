import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import Calculator from '../components/Calculator'
import ContactSection from '../components/ContactSection'
import { PortalLink, SectionHead, TierKey } from '../components/Bits'
import { Arrow, Building, Calculator as CalcIcon, Chair, Check, Growth, Hands, Shield, User, Plus, Transfer } from '../components/Icons'
import { ARTICLES, fmtDate } from '../content/news'
import { PRODUCTS } from '../content/products'
import { usePageMeta } from '../lib/meta'

const quickCls = 'card group flex items-center gap-4 p-4 shadow-lg shadow-black/5 transition hover:-translate-y-0.5 hover:border-orange sm:p-5'
const quickIcon = 'grid h-12 w-12 shrink-0 place-items-center rounded-xl'

export const WHY = [
  { Icon: Shield, title: 'Licensed and regulated', text: 'An NPRA-licensed corporate trustee, with funds held by an independent custodian.' },
  { Icon: Growth, title: 'Long-term growth', text: 'Your savings are invested by approved fund managers for steady, long-term returns.' },
  { Icon: Hands, title: 'For every worker', text: 'Schemes for the formal and informal sector — traders, artisans, drivers and professionals.' },
  { Icon: Chair, title: 'A comfortable retirement', text: 'Build a lump sum that supplements your SSNIT pension and protects your lifestyle.' },
  { Icon: Check, title: 'Tax benefits', text: 'Tier 2 and Tier 3 contributions are tax-deductible up to 16.5% of your salary.' },
  { Icon: User, title: 'People who listen', text: 'Friendly, local support by phone, email or at our office in Accra.' },
]

export function SchemeCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <article id="tier-2-card" className="card relative overflow-hidden border-t-[6px] border-t-ink p-6 sm:p-8">
        <span className="inline-block rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">Tier 2 · Mandatory</span>
        <h3 className="mt-4 text-2xl font-black">Tier 2 occupational scheme</h3>
        <p className="mt-2 text-ink-2">Your employer pays 5% of your basic salary every month. We invest it safely and pay it to you as a lump sum when you retire.</p>
        <ul className="mt-5 space-y-2 text-sm text-ink-2">
          {['Lump sum at retirement', 'Monthly statements and online access', 'Easy transfer from your current trustee', 'Benefits paid to your beneficiaries'].map((t) => (
            <li key={t} className="flex gap-2"><Check width={18} height={18} className="mt-0.5 shrink-0 text-ink" />{t}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/schemes#tier-2" className="btn-black">About Tier 2 <Arrow width={16} height={16} /></Link>
          <Link to="/employers" className="btn-outline">For employers</Link>
        </div>
      </article>
      <article id="tier-3-card" className="card relative overflow-hidden border-t-[6px] border-t-orange p-6 sm:p-8">
        <span className="inline-block rounded-full bg-orange px-3 py-1 text-xs font-bold text-ink">Tier 3 · Voluntary</span>
        <h3 className="mt-4 text-2xl font-black">Tier 3 personal pension</h3>
        <p className="mt-2 text-ink-2">Top up your retirement savings on your own terms — daily, weekly or monthly, by Mobile Money or bank. Open to every worker.</p>
        <ul className="mt-5 space-y-2 text-sm text-ink-2">
          {['Save any amount, at your own pace', 'Formal and informal sector workers', 'Tax-deductible contributions', 'IPTC Provident Fund for employers'].map((t) => (
            <li key={t} className="flex gap-2"><Check width={18} height={18} className="mt-0.5 shrink-0 text-orange-dark" />{t}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/join" className="btn-orange">Join Tier 3 <Arrow width={16} height={16} /></Link>
          <Link to="/schemes#tier-3" className="btn-outline">About Tier 3</Link>
        </div>
      </article>
    </div>
  )
}

export function ProductCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {PRODUCTS.map((p) => (
        <article key={p.slug} className="card flex flex-col overflow-hidden border-t-[6px] border-t-orange">
          <img src={p.image} alt={p.imageAlt} loading="lazy" style={{ objectPosition: p.imagePos }} className="h-52 w-full object-cover" />
          <div className="flex flex-1 flex-col p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-dark">{p.tag}</p>
            <h3 className="mt-1 text-xl font-black">{p.name}</h3>
            <p className="mt-2 flex-1 text-sm text-ink-2">{p.summary}</p>
            <Link to={`/products/${p.slug}`} className="btn-orange mt-5 self-start">Read more<span className="sr-only"> about {p.name}</span> <Arrow width={16} height={16} /></Link>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function Home() {
  usePageMeta('Industrial Pensions Trust | Every Cedi Counts', 'Industrial Pensions Trust (IPTC) is an NPRA-licensed corporate trustee in Ghana. Tier 2 occupational and Tier 3 personal pensions, a pension calculator and online services.')
  return (
    <>
      <h1 className="sr-only">Industrial Pensions Trust — Every Cedi Counts</h1>
      <HeroSlider />

      <section aria-label="Quick actions" className="relative z-10 -mt-8 md:-mt-14">
        <div className="container-site grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <Link to="/join" className={quickCls}>
            <span className={`${quickIcon} bg-orange text-ink`}><Plus /></span>
            <span><span className="block font-extrabold">Join Tier 3</span><span className="text-sm text-neutral-500">Start saving today</span></span>
          </Link>
          <PortalLink to="memberLogin" className={quickCls}>
            <span className={`${quickIcon} bg-ink text-white`}><User /></span>
            <span><span className="block font-extrabold">Member login</span><span className="text-sm text-neutral-500">Check your balance</span></span>
          </PortalLink>
          <PortalLink to="employerLogin" className={quickCls}>
            <span className={`${quickIcon} bg-ink text-white`}><Building /></span>
            <span><span className="block font-extrabold">Employer login</span><span className="text-sm text-neutral-500">Upload schedules</span></span>
          </PortalLink>
          <Link to="/calculator" className={quickCls}>
            <span className={`${quickIcon} bg-orange-light text-orange-dark`}><CalcIcon /></span>
            <span><span className="block font-extrabold">Pension calculator</span><span className="text-sm text-neutral-500">Plan your future</span></span>
          </Link>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="schemes-title">
        <div className="container-site">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-2">Our schemes</p>
              <h2 id="schemes-title" className="h-section">Retire in comfort with IPTC</h2>
              <p className="mt-3 text-neutral-600 sm:text-lg">For financial security, supplement your statutory pension with the Industrial Pensions plan.</p>
            </div>
            <TierKey />
          </div>
          <SchemeCards />
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20" aria-labelledby="products-title">
        <div className="container-site">
          <SectionHead eyebrow="Products" title={<span id="products-title">Savings plans for every worker</span>} intro="Pension plans for informal sector workers, social and industrial groups, and company employees." />
          <ProductCards />
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="why-title">
        <div className="container-site">
          <SectionHead eyebrow="Why IPTC" title={<span id="why-title">Your future is worth protecting</span>} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map(({ Icon, title, text }) => (
              <div key={title} className="card p-6">
                <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-orange text-orange-dark"><Icon /></span>
                <h3 className="mt-4 text-lg font-extrabold">{title}</h3>
                <p className="mt-1.5 text-sm text-ink-2">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20" aria-labelledby="calc-title">
        <div className="container-site">
          <SectionHead eyebrow="Pension calculator" title={<span id="calc-title">See how your savings could grow</span>} intro="Move the sliders to estimate your Tier 2 and Tier 3 savings at retirement." />
          <Calculator />
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="join-title">
        <div className="container-site">
          <SectionHead eyebrow="How to join" title={<span id="join-title">Join Tier 3 in three simple steps</span>} center />
          <ol className="grid gap-4 md:grid-cols-3">
            {[
              ['Apply online', 'Fill in the short form with your Ghana Card, contact details and beneficiaries.'],
              ['Choose your plan', 'Pick Personal Tier 3, Cedi A Day or Nkɔsoɔ, and how much and how often to save.'],
              ['Start saving', 'Pay by Mobile Money or bank. We send your membership number by SMS.'],
            ].map(([t, d], k) => (
              <li key={t} className="card relative p-6 pt-8">
                <span className="absolute -top-4 left-6 grid h-9 w-9 place-items-center rounded-full bg-orange text-base font-black text-ink">{k + 1}</span>
                <h3 className="text-lg font-extrabold">{t}</h3>
                <p className="mt-1.5 text-sm text-ink-2">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center"><Link to="/join" className="btn-orange px-8 text-base">Join Tier 3 <Arrow width={18} height={18} /></Link></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-14 text-white sm:py-16" aria-labelledby="emp-title">
        <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange" />
        <div className="container-site relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-orange">For employers</p>
            <h2 id="emp-title" className="text-2xl font-black sm:text-3xl">Tier 2 made simple for your business</h2>
            <p className="mt-3 text-neutral-300">Register your company with IPTC, upload monthly schedules online and give your staff a trustee that cares.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PortalLink to="employerRegister" className="btn-orange">Register your company</PortalLink>
            <Link to="/transfers" className="btn-outline-white"><Transfer width={18} height={18} /> Transfer to IPTC</Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="news-title">
        <div className="container-site">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div><p className="eyebrow mb-2">News</p><h2 id="news-title" className="h-section">Latest news</h2></div>
            <Link to="/news" className="hidden text-sm font-bold text-orange-dark hover:underline sm:inline-flex sm:items-center sm:gap-1">All news <Arrow width={16} height={16} /></Link>
          </div>
          <NewsCards />
          <Link to="/news" className="btn-outline mt-6 sm:hidden">All news</Link>
        </div>
      </section>

      <div className="bg-white"><ContactSection /></div>
    </>
  )
}

export function NewsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {ARTICLES.map((a) => (
        <article key={a.slug} className="card group overflow-hidden">
          <Link to={`/news/${a.slug}`} className="block focus-visible:outline-offset-[-3px]">
            <img src={a.image} alt={a.imageAlt} loading="lazy" className="aspect-[16/9] w-full object-cover transition group-hover:opacity-90" />
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-orange-dark">{a.category} · <time dateTime={a.date}>{fmtDate(a.date)}</time></p>
              <h3 className="mt-2 text-xl font-extrabold group-hover:text-orange-dark">{a.title}</h3>
              <p className="mt-2 text-sm text-ink-2">{a.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-dark">Read more <Arrow width={16} height={16} /></span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}
