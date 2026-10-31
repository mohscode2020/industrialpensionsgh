import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { PageHero, Ph, PortalLink, SectionHead, TierKey, DraftBanner } from '../components/Bits'
import Calculator from '../components/Calculator'
import { Arrow, Check, ChevronDown, Doc, Transfer } from '../components/Icons'
import { CONTACT } from '../config'
import { ARTICLES, fmtDate, getArticle } from '../content/news'
import { FAQ_GROUPS } from '../content/faqs'
import { getProduct, PRODUCTS, type Product } from '../content/products'
import { telHref } from '../lib/format'
import { usePageMeta } from '../lib/meta'
import { NewsCards, ProductCards, SchemeCards, WHY } from './Home'

const Wrap = ({ children, narrow }: { children: React.ReactNode; narrow?: boolean }) => (
  <section className="py-12 sm:py-16"><div className={`container-site ${narrow ? 'max-w-3xl' : ''}`}>{children}</div></section>
)

export function About() {
  usePageMeta('About us', 'Industrial Pensions Trust is an NPRA-licensed corporate trustee helping Ghanaian workers in the formal and informal sectors save for a comfortable retirement.')
  return (
    <>
      <PageHero eyebrow="About us" title="Every cedi counts" intro="Industrial Pensions Trust (IPTC) helps workers across Ghana save for a retirement they can look forward to." />
      <Wrap>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="prose-site">
            <h2 className="!mt-0">Who we are</h2>
            <p>Industrial Pensions Trust is a corporate trustee licensed by the National Pensions Regulatory Authority (NPRA). We manage Tier 2 occupational and Tier 3 personal pension schemes under the National Pensions Act, 2008 (Act 766).</p>
            <p>We believe that a dignified retirement should not be only for a few. That is why our schemes serve both the formal sector and the many Ghanaians who work in the informal sector — market traders, artisans, mechanics, drivers, tailors and farmers.</p>
            <h2>Our mission</h2>
            <p>To protect and grow the retirement savings of every member, with integrity, care and clear communication — so that every cedi you save counts.</p>
            <h2>Our vision</h2>
            <p>To be Ghana’s most trusted pension trustee for working people.</p>
            <h2>Our values</h2>
            <ul>
              <li><strong>Integrity</strong> — we act in members’ best interests at all times.</li>
              <li><strong>Care</strong> — we listen and explain things in plain language.</li>
              <li><strong>Prudence</strong> — we invest for steady, long-term growth.</li>
              <li><strong>Inclusion</strong> — pensions for every worker, whatever their income.</li>
            </ul>
            <h2>How your money is protected</h2>
            <p>IPTC works with NPRA-approved fund managers and an independent custodian. The trustee, fund manager and custodian are separate, so no single party controls your money. Our schemes are audited every year and reported to the NPRA. <Link to="/governance">Read about our governance</Link>.</p>
          </div>
          <aside className="space-y-4">
            <img src="/img/auth_employer.jpg" alt="Ghanaian workers from many trades standing together in front of Independence Arch." className="w-full rounded-2xl object-cover" loading="lazy" />
            <div className="card p-5">
              <p className="text-sm text-ink-2">Licensed by the NPRA as a corporate trustee.</p>
            </div>
          </aside>
        </div>
      </Wrap>
      <section className="bg-white py-12 sm:py-16"><div className="container-site">
        <SectionHead title="Why members choose IPTC" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ Icon, title, text }) => (
            <div key={title} className="card p-6"><Icon className="text-orange-dark" /><h3 className="mt-3 font-extrabold">{title}</h3><p className="mt-1 text-sm text-ink-2">{text}</p></div>
          ))}
        </div>
      </div></section>
    </>
  )
}

export function Schemes() {
  usePageMeta('Pension schemes', 'IPTC Tier 2 occupational and Tier 3 personal pension schemes, the IPTC Provident Fund, Cedi A Day and Nkɔsoɔ.')
  return (
    <>
      <PageHero eyebrow="Schemes" title="Pension schemes for every worker" intro="Supplement your statutory SSNIT pension with IPTC Tier 2 and Tier 3.">
        <Link to="/join" className="btn-orange">Join Tier 3</Link>
        <Link to="/calculator" className="btn-outline-white">Pension calculator</Link>
      </PageHero>
      <Wrap>
        <div className="mb-8 flex justify-end"><TierKey /></div>
        <SchemeCards />
      </Wrap>
      <section id="tier-2" className="scroll-mt-24 bg-white py-12 sm:py-16"><div className="container-site grid gap-8 lg:grid-cols-2">
        <div className="prose-site">
          <p className="eyebrow">Tier 2 · Black</p>
          <h2 className="!mt-2">Tier 2 occupational scheme</h2>
          <p>Tier 2 is the mandatory occupational pension scheme for formal-sector workers. Every month your employer pays 5% of your basic salary to your Tier 2 trustee. IPTC invests it with approved fund managers, and you receive the full amount and its returns as a lump sum when you retire.</p>
          <ul>
            <li>Contributions due within 14 days after the end of each month</li>
            <li>Lump sum paid at retirement, or to your beneficiaries</li>
            <li>Tax-deductible contributions</li>
            <li>Statements and online access to your account</li>
          </ul>
        </div>
        <div className="rounded-2xl border-l-8 border-ink bg-page p-6 sm:p-8">
          <h3 className="text-xl font-extrabold">Who pays?</h3>
          <p className="mt-2 text-ink-2">Your employer deducts and pays Tier 2 contributions. Check your statement each month to make sure your contributions arrive.</p>
          <div className="mt-5 flex flex-wrap gap-3"><Link to="/employers" className="btn-black">For employers</Link><Link to="/transfers" className="btn-outline">Transfers</Link></div>
        </div>
      </div></section>
      <section id="tier-3" className="scroll-mt-24 py-12 sm:py-16"><div className="container-site grid gap-8 lg:grid-cols-2">
        <div className="prose-site">
          <p className="eyebrow">Tier 3 · Orange</p>
          <h2 className="!mt-2">Tier 3 personal pension</h2>
          <p>Tier 3 is voluntary. It lets you save more for your retirement — on top of Tier 1 and Tier 2 — or start a pension if you are self-employed. You choose how much to save and how often.</p>
          <ul>
            <li>Open to anyone aged 18 to 75 with a Ghana Card</li>
            <li>Pay daily, weekly or monthly by Mobile Money or bank</li>
            <li>Tier 2 + Tier 3 tax-deductible up to 16.5% of salary</li>
            <li>Tax-free withdrawal after the vesting period</li>
          </ul>
        </div>
        <div className="rounded-2xl border-l-8 border-orange bg-white p-6 sm:p-8">
          <h3 className="text-xl font-extrabold">Start with any amount</h3>
          <p className="mt-2 text-ink-2">Even small, regular savings grow over time. See what yours could become.</p>
          <div className="mt-5 flex flex-wrap gap-3"><Link to="/join" className="btn-orange">Join Tier 3</Link><Link to="/calculator" className="btn-outline">Calculator</Link></div>
        </div>
      </div></section>
      <section id="group-tier-3" className="scroll-mt-24 bg-white py-12 sm:py-16"><div className="container-site max-w-3xl prose-site">
        <p className="eyebrow">Tier 3 · Orange</p>
        <h2 className="!mt-2">Group Tier 3: IPTC Provident Fund Scheme</h2>
        <p>A voluntary contributory plan that strengthens company employees’ retirement savings. Employers deduct the agreed contribution from salary and may make matching contributions. Contributions become entirely tax-free after ten years, and IPTC handles administration, investment and statements.</p>
        <p><Link to="/products/provident-fund">Read more about the IPTC Provident Fund Scheme</Link></p>
        <p><Link to="/employers">Find out more for employers</Link> or <Link to="/contact">contact us</Link> for a proposal.</p>
      </div></section>
      <Wrap>
        <SectionHead eyebrow="Products" title="Our products" />
        <ProductCards />
      </Wrap>
    </>
  )
}

export function CalculatorPage() {
  usePageMeta('Pension calculator', 'Estimate your Tier 2 and Tier 3 pension savings at retirement with the IPTC pension calculator.')
  return (
    <>
      <PageHero eyebrow="Pension calculator" title="See how your savings could grow" intro="Estimate your Tier 2, Tier 3 or combined savings at retirement. Black = Tier 2, orange = Tier 3." />
      <Wrap><Calculator />
        <div className="mt-8 flex flex-wrap gap-3"><Link to="/join" className="btn-orange">Join Tier 3</Link><Link to="/schemes" className="btn-outline">Compare schemes</Link></div>
      </Wrap>
    </>
  )
}

export function Employers() {
  usePageMeta('For employers', 'Register your company with IPTC for Tier 2 and Group Tier 3. Upload monthly contribution schedules online and get dedicated employer support.')
  return (
    <>
      <PageHero eyebrow="For employers" title="Tier 2 made simple" intro="A trustee that makes compliance easy for your business and gives your staff peace of mind.">
        <PortalLink to="employerRegister" className="btn-orange">Register your company</PortalLink>
        <PortalLink to="employerLogin" className="btn-outline-white">Employer login</PortalLink>
      </PageHero>
      <Wrap>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Easy registration', 'Register online in minutes. We confirm your employer code by email.'],
            ['Online schedules', 'Upload monthly contribution schedules and track payments.'],
            ['Dedicated support', 'A named relationship officer for your company.'],
            ['Happy staff', 'Clear statements so employees can see their savings grow.'],
          ].map(([t, d]) => <div key={t} className="card border-t-4 border-t-ink p-6"><h3 className="font-extrabold">{t}</h3><p className="mt-1.5 text-sm text-ink-2">{d}</p></div>)}
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="prose-site">
            <h2 className="!mt-0">Your Tier 2 responsibilities</h2>
            <ul>
              <li>Deduct and pay 5% of each employee’s basic salary to your Tier 2 trustee.</li>
              <li>Pay within 14 days after the end of each month.</li>
              <li>Submit a contribution schedule listing each employee.</li>
              <li>Tell your trustee about new joiners and leavers.</li>
            </ul>
            <p>Late payment can attract penalties under Act 766. <Link to="/news/paying-on-time">Read why paying on time matters</Link>.</p>
          </div>
          <div className="prose-site">
            <h2 className="!mt-0">Moving your scheme to IPTC</h2>
            <p>Already with another trustee? We handle the transfer with your current trustee so your staff’s savings move safely.</p>
            <p><Link to="/transfers">See how transfers work</Link></p>
            <h2>IPTC Provident Fund Scheme</h2>
            <p>Reward and retain your people with a Group Tier 3 provident fund. <Link to="/products/provident-fund">Learn more</Link>.</p>
          </div>
        </div>
      </Wrap>
      <section className="bg-ink py-12 text-white"><div className="container-site flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div><h2 className="text-2xl font-black">Ready to get started?</h2><p className="mt-1 text-neutral-300">Call {CONTACT.phones.join(' or ')} or register online.</p></div>
        <PortalLink to="employerRegister" className="btn-orange">Register your company</PortalLink>
      </div></section>
    </>
  )
}

export function Transfers() {
  usePageMeta('Transfers to IPTC', 'How to transfer your Tier 2 or Tier 3 pension savings to Industrial Pensions Trust, for employers and individual members.')
  return (
    <>
      <PageHero eyebrow="Transfers" title="Transfer your pension to IPTC" intro="Moving your savings is simple. We work with your current trustee so you don’t have to." />
      <Wrap>
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { title: 'Employers (Tier 2)', accent: 'border-t-ink', steps: ['Your board or management decides to move to IPTC.', 'Register your company with IPTC.', 'Give notice to your current trustee, as your agreement requires.', 'IPTC requests the transfer and member records from your current trustee.', 'Funds are moved and each employee’s account is set up with IPTC.'] },
            { title: 'Individual members (Tier 3)', accent: 'border-t-orange', steps: ['Join Tier 3 with IPTC.', 'Complete a transfer request form (available from our office).', 'Attach a copy of your Ghana Card and your latest statement.', 'IPTC sends the request to your current trustee.', 'We confirm by SMS when your savings arrive.'] },
          ].map((b) => (
            <div key={b.title} className={`card border-t-[6px] ${b.accent} p-6 sm:p-8`}>
              <h2 className="flex items-center gap-2 text-xl font-extrabold"><Transfer className="text-orange-dark" />{b.title}</h2>
              <ol className="mt-4 space-y-3">
                {b.steps.map((s, k) => <li key={s} className="flex gap-3 text-ink-2"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-light text-sm font-black text-orange-dark">{k + 1}</span>{s}</li>)}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-8 text-ink-2">Transfers follow NPRA guidelines. Your savings stay invested until they are moved. Questions? <Link to="/contact" className="font-bold text-orange-dark underline">Contact us</Link>.</p>
        <div className="mt-6 flex flex-wrap gap-3"><PortalLink to="employerRegister" className="btn-black">Register your company</PortalLink><Link to="/join" className="btn-orange">Join Tier 3</Link></div>
      </Wrap>
    </>
  )
}

export function Benefits() {
  usePageMeta('Benefits and claims', 'When and how to claim your IPTC Tier 2 and Tier 3 pension benefits, and the documents you need.')
  return (
    <>
      <PageHero eyebrow="Benefits and claims" title="Claiming your benefits" intro="When the time comes, we make it easy to receive what you have saved." />
      <Wrap>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['Retirement', 'Receive your Tier 2 lump sum when you reach retirement age.'],
            ['Death', 'Your savings are paid to the beneficiaries you nominated.'],
            ['Emigration', 'Non-Ghanaians leaving Ghana permanently may claim their savings.'],
            ['Tier 3 withdrawals', 'Withdraw Tier 3 savings; tax-free after the vesting period.'],
          ].map(([t, d]) => <div key={t} className="card p-6"><h2 className="text-lg font-extrabold">{t}</h2><p className="mt-1.5 text-sm text-ink-2">{d}</p></div>)}
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="prose-site">
            <h2 className="!mt-0">How to make a claim</h2>
            <ol>
              <li>Collect a benefit claim form from our office or ask us to email one.</li>
              <li>Complete the form and attach the documents listed.</li>
              <li>Submit it at our office or by email to {CONTACT.email}.</li>
              <li>We verify your claim and pay into your bank or Mobile Money account.</li>
            </ol>
          </div>
          <div className="card p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold"><Doc className="text-orange-dark" /> Documents you need</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-2">
              {['Ghana Card', 'Completed benefit claim form', 'Bank statement or Mobile Money details', 'Letter from employer (Tier 2 retirement)', 'Death certificate and letters of administration (death claims)'].map((d) => (
                <li key={d} className="flex gap-2"><Check width={18} height={18} className="shrink-0 text-orange-dark" />{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </Wrap>
    </>
  )
}

export function News() {
  usePageMeta('News', 'News, guides and announcements from Industrial Pensions Trust.')
  return (
    <>
      <PageHero eyebrow="News" title="News and guides" intro="Updates from IPTC and simple guides to help you plan your retirement." />
      <Wrap>
        <div className="mb-8 rounded-2xl border-l-8 border-orange bg-white p-5 sm:p-6">
          <p className="eyebrow">Announcement</p>
          <p className="mt-1 text-lg font-bold"><Ph>[Latest IPTC announcement]</Ph></p>
        </div>
        <NewsCards />
      </Wrap>
    </>
  )
}

export function Article() {
  const { slug = '' } = useParams()
  const a = getArticle(slug)
  return a ? <ArticleBody a={a} /> : <NotFound />
}

function ArticleBody({ a }: { a: NonNullable<ReturnType<typeof getArticle>> }) {
  usePageMeta(a.title, a.summary)
  const other = ARTICLES.find((x) => x.slug !== a.slug)!
  return (
    <>
      <PageHero eyebrow={a.category} title={a.title} intro={<time dateTime={a.date}>{fmtDate(a.date)}</time>} />
      <Wrap narrow>
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500"><Link to="/" className="hover:text-orange-dark">Home</Link> / <Link to="/news" className="hover:text-orange-dark">News</Link></nav>
        <img src={a.image} alt={a.imageAlt} className="mb-8 w-full rounded-2xl" />
        <div className="prose-site">
          <p className="text-lg font-semibold !text-ink">{a.summary}</p>
          {a.body.map((b, k) => b.h ? <h2 key={k}>{b.h}</h2> : b.list ? <ul key={k}>{b.list.map((l) => <li key={l}>{l}</li>)}</ul> : <p key={k}>{b.p}</p>)}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {a.slug === 'paying-on-time' ? <PortalLink to="employerRegister" className="btn-black">Register your company</PortalLink> : <Link to="/calculator" className="btn-orange">Try the calculator</Link>}
          <Link to="/news" className="btn-outline">All news</Link>
        </div>
        <div className="mt-12 border-t border-line pt-6">
          <p className="text-sm font-bold text-neutral-500">Read next</p>
          <Link to={`/news/${other.slug}`} className="mt-1 inline-flex items-center gap-2 text-lg font-extrabold hover:text-orange-dark">{other.title} <Arrow /></Link>
        </div>
      </Wrap>
    </>
  )
}

export function Faqs() {
  usePageMeta('FAQs', 'Answers to common questions about IPTC, Tier 2, Tier 3 and online services.')
  const [open, setOpen] = useState<string | null>(null)
  return (
    <>
      <PageHero eyebrow="FAQs" title="Frequently asked questions" intro="Can’t find your answer? Call us or send a message." />
      <Wrap narrow>
        {FAQ_GROUPS.map((g, gi) => (
          <div key={g.title} className="mb-10">
            <h2 className="mb-4 text-xl font-extrabold">{g.title}</h2>
            <div className="card divide-y divide-line">
              {g.items.map((f, fi) => {
                const id = `faq-${gi}-${fi}`
                const isOpen = open === id
                return (
                  <div key={id}>
                    <h3>
                      <button type="button" id={`${id}-btn`} aria-expanded={isOpen} aria-controls={`${id}-panel`} onClick={() => setOpen(isOpen ? null : id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold hover:text-orange-dark">
                        {f.q}<ChevronDown className={`shrink-0 transition-transform ${isOpen ? 'rotate-180 text-orange-dark' : ''}`} />
                      </button>
                    </h3>
                    <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} hidden={!isOpen} className="px-5 pb-5 text-ink-2">{f.a}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold">Still have a question?</p>
          <div className="flex flex-wrap gap-3"><a href={telHref(CONTACT.phones[0])} className="btn-outline">Call {CONTACT.phones[0]}</a><Link to="/contact" className="btn-black">Send a message</Link></div>
        </div>
      </Wrap>
    </>
  )
}

export function Governance() {
  usePageMeta('Board and governance', 'The IPTC board of trustees, governance structure and how your pension savings are protected.')
  const board = [
    ['[Board Chair name]', 'Chairperson'], ['[Trustee name]', 'Independent Trustee'], ['[Trustee name]', 'Member-nominated Trustee'],
    ['[Trustee name]', 'Employer-nominated Trustee'], ['[Trustee name]', 'Trustee'], ['[Chief Executive name]', 'Chief Executive Officer'],
  ]
  return (
    <>
      <PageHero eyebrow="Governance" title="Board and governance" intro="Strong governance keeps your savings safe and your interests first." />
      <Wrap>
        <h2 className="mb-6 text-2xl font-extrabold">Board of trustees</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {board.map(([n, r], k) => (
            <div key={k} className="card flex items-center gap-4 p-5">
              <div aria-hidden className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-orange-light text-xl font-black text-orange-dark">{k + 1}</div>
              <div><p className="font-bold"><Ph>{n}</Ph></p><p className="mt-1 text-sm text-neutral-500">{r}</p></div>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ['Trustee', 'Industrial Pensions Trust administers the schemes and acts in members’ best interests.'],
            ['Fund managers', 'NPRA-approved fund managers invest scheme assets within the investment guidelines.'],
            ['Custodian', 'An independent custodian holds the scheme assets, separate from the trustee and fund managers.'],
          ].map(([t, d]) => <div key={t} className="card p-6"><h3 className="text-lg font-extrabold">{t}</h3><p className="mt-1.5 text-sm text-ink-2">{d}</p></div>)}
        </div>
        <div className="prose-site mt-10 max-w-3xl">
          <h2>Oversight and reporting</h2>
          <ul>
            <li>Licensed and supervised by the National Pensions Regulatory Authority (NPRA).</li>
            <li>Annual independent audit of each scheme.</li>
            <li>Board committees for investment, audit and risk.</li>
            <li>Regular statements to members and reports to the NPRA.</li>
          </ul>
        </div>
      </Wrap>
    </>
  )
}

export function Careers() {
  usePageMeta('Careers', 'Work with Industrial Pensions Trust and help Ghanaian workers secure their future.')
  return (
    <>
      <PageHero eyebrow="Careers" title="Build a career that protects futures" intro="Join a team helping workers across Ghana save for a comfortable retirement." />
      <Wrap narrow>
        <div className="prose-site">
          <h2 className="!mt-0">Working at IPTC</h2>
          <p>We are a growing team of pension, finance, customer service and technology professionals. We value integrity, care and a commitment to serving members well.</p>
          <h2>Current vacancies</h2>
          <p>There are no open vacancies at the moment. We welcome speculative applications from people with experience in pensions administration, customer service, sales and IT.</p>
          <p>Email your CV and a short cover letter to <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Careers enquiry')}`}>{CONTACT.email}</a> with “Careers” in the subject line.</p>
        </div>
      </Wrap>
    </>
  )
}

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <Wrap narrow><DraftBanner /><div className="prose-site">{children}</div></Wrap>
    </>
  )
}

export function Privacy() {
  usePageMeta('Privacy policy', 'How Industrial Pensions Trust collects, uses and protects your personal data under the Data Protection Act, 2012 (Act 843).')
  return (
    <LegalPage title="Privacy policy">
      <p>This policy explains how Industrial Pensions Trust (“IPTC”, “we”) collects, uses and protects your personal data.</p>
      <h2>Information we collect</h2>
      <ul><li>Identity details such as your name, date of birth and Ghana Card number.</li><li>Contact details such as mobile number, email and address.</li><li>Employment, contribution and payment details.</li><li>Beneficiary details you give us.</li></ul>
      <h2>How we use it</h2>
      <ul><li>To open and manage your pension account.</li><li>To process contributions, transfers and benefit payments.</li><li>To meet our legal and regulatory duties to the NPRA and other authorities.</li><li>To contact you about your account.</li></ul>
      <h2>Sharing</h2>
      <p>We share data only with parties involved in running your scheme (such as fund managers, the custodian and auditors), with regulators, or where the law requires it. We do not sell your data.</p>
      <h2 id="data-protection" className="scroll-mt-24">Data protection (Act 843)</h2>
      <p>IPTC processes personal data in line with the Data Protection Act, 2012 (Act 843). You have the right to ask for a copy of your data, to ask us to correct it and to object to certain processing. To make a request, email {CONTACT.email}.</p>
      <h2>Security</h2>
      <p>We use appropriate technical and organisational measures to protect your data.</p>
      <h2>This website</h2>
      <p>This website does not use advertising cookies. Contact forms open your own email app; nothing you type is stored by this website.</p>
      <h2>Contact</h2>
      <p>{CONTACT.address}. Phone {CONTACT.phones.join(' / ')}. Email {CONTACT.email}.</p>
    </LegalPage>
  )
}

export function Terms() {
  usePageMeta('Terms of use', 'Terms of use for the Industrial Pensions Trust website.')
  return (
    <LegalPage title="Terms of use">
      <p>By using this website you agree to these terms.</p>
      <h2>Information only</h2>
      <p>The content on this website is general information and is not financial advice. Please contact us or a licensed adviser before making decisions about your pension.</p>
      <h2>Calculator</h2>
      <p>The pension calculator gives an illustration only. Actual returns vary and are not guaranteed.</p>
      <h2>Accuracy</h2>
      <p>We try to keep information accurate and up to date but do not guarantee it. Scheme rules and the National Pensions Act, 2008 (Act 766) take precedence over this website.</p>
      <h2>Online services</h2>
      <p>You are responsible for keeping your login details safe. Never share your password or SMS codes with anyone, including IPTC staff.</p>
      <h2>Links</h2>
      <p>We are not responsible for the content of external websites linked from this site.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Republic of Ghana.</p>
    </LegalPage>
  )
}

export function NotFound() {
  usePageMeta('Page not found', 'The page you are looking for could not be found.')
  return (
    <Wrap narrow>
      <div className="py-10 text-center">
        <p className="text-6xl font-black text-orange">404</p>
        <h1 className="mt-4 text-3xl font-black">Page not found</h1>
        <p className="mt-2 text-ink-2">The page you are looking for has moved or does not exist.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3"><Link to="/" className="btn-black">Go to home</Link><Link to="/contact" className="btn-outline">Contact us</Link></div>
      </div>
    </Wrap>
  )
}

export function Products() {
  usePageMeta('Our products', 'IPTC pension products: Nkɔsoɔ Pensions & Welfare Scheme, Cedi A Day Pension Scheme and the IPTC Provident Fund Scheme.')
  return (
    <>
      <PageHero eyebrow="Products" title="Our products" intro="Pension plans for informal sector workers, social and industrial groups, and company employees.">
        <Link to="/join" className="btn-orange">Join Tier 3</Link>
        <Link to="/calculator" className="btn-outline-white">Pension calculator</Link>
      </PageHero>
      <Wrap><ProductCards /></Wrap>
    </>
  )
}

export function ProductDetail() {
  const { slug = '' } = useParams()
  const p = getProduct(slug)
  return p ? <ProductBody p={p} /> : <NotFound />
}

function ProductBody({ p }: { p: Product }) {
  usePageMeta(p.name, p.summary)
  const others = PRODUCTS.filter((x) => x.slug !== p.slug)
  return (
    <>
      <PageHero eyebrow={`${p.tier} · ${p.tag}`} title={p.name} intro={p.summary}>
        {p.cta === 'join'
          ? <Link to="/join" className="btn-orange">Join now</Link>
          : <PortalLink to="employerRegister" className="btn-orange">Register your company</PortalLink>}
        <Link to="/contact" className="btn-outline-white">Talk to us</Link>
      </PageHero>
      <Wrap>
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500"><Link to="/" className="hover:text-orange-dark">Home</Link> / <Link to="/products" className="hover:text-orange-dark">Products</Link></nav>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <img src={p.image} alt={p.imageAlt} style={{ objectPosition: p.imagePos }} className="h-72 w-full rounded-2xl object-cover lg:h-full lg:max-h-[520px]" />
          <div>
            {p.intro && <p className="mb-6 text-lg text-ink-2">{p.intro}</p>}
            <h2 className="mb-4 text-2xl font-extrabold">Benefits</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.benefits.map((b) => (
                <li key={b.title} className="card border-l-4 border-l-orange p-5">
                  <h3 className="flex items-center gap-2 font-extrabold"><Check width={18} height={18} className="shrink-0 text-orange-dark" />{b.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-2">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-line pt-6">
          <p className="text-sm font-bold text-neutral-500">Other products</p>
          <ul className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-8">
            {others.map((o) => <li key={o.slug}><Link to={`/products/${o.slug}`} className="inline-flex items-center gap-2 text-lg font-extrabold hover:text-orange-dark">{o.name} <Arrow /></Link></li>)}
          </ul>
        </div>
      </Wrap>
    </>
  )
}
