import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FormDownload, PageHero, PortalLink, PreviewNote } from '../components/Bits'
import { CheckField, ErrorSummary, Fieldset, PasswordField, SelectField, SuccessPanel, TextField } from '../components/Fields'
import { Arrow, Building, Calculator as CalcIcon, Doc, Phone, User } from '../components/Icons'
import { CONTACT, FORMS } from '../config'
import { cedi, makeRef, telHref } from '../lib/format'
import { usePageMeta } from '../lib/meta'
import { liveUrl, type PortalKey } from '../lib/portal'
import { clearSession, getSessionId, setSessionId, type Portal } from '../lib/session'
import { cleanPhone, EMAIL, focusSummary, isBlank, MOBILE, type Errors } from '../lib/validate'

/** When PORTAL_LIVE is on, preview pages forward to the real system page. */
function useLiveRedirect(key: PortalKey) {
  const url = liveUrl(key)
  useEffect(() => { if (url) window.location.replace(url) }, [url])
  return !!url
}

/* ------------------------------------------------------------------ Logins */

function AuthShell({ image, imageAlt, heading, sub, children }: { image: string; imageAlt: string; heading: string; sub: string; children: ReactNode }) {
  return (
    <section className="grid min-h-[calc(100vh-110px)] lg:grid-cols-2">
      <div className="relative h-56 overflow-hidden bg-orange sm:h-72 lg:h-auto">
        <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover object-top" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
          <p className="text-3xl font-black sm:text-4xl lg:text-5xl">{heading}</p>
          <p className="mt-2 max-w-md text-sm text-neutral-200 sm:text-base">{sub}</p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-8 lg:py-16">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </section>
  )
}

function LoginForm({ portal, idLabel, idHint, links, extra }: { portal: Portal; idLabel: string; idHint?: string; links: ReactNode; extra?: ReactNode }) {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  function submit(e: FormEvent) {
    e.preventDefault()
    const errs: Errors = {}
    if (isBlank(id)) errs.loginId = `Enter your ${idLabel.toLowerCase()}`
    if (pw.length < 6) errs.password = 'Enter your password (at least 6 characters)'
    setPw('') // never keep the password in memory longer than needed
    setErrors(errs)
    if (Object.keys(errs).length) { focusSummary(); return }
    setSessionId(portal, id.trim()) // only the ID is stored — never the password
    navigate(`/${portal}`)
  }

  return (
    <form noValidate onSubmit={submit}>
      <ErrorSummary errors={errors} />
      <div className="space-y-5">
        <TextField id="loginId" label={idLabel} hint={idHint} value={id} onChange={(e) => setId(e.target.value)} error={errors.loginId} autoComplete="username" />
        <PasswordField id="password" label="Password" value={pw} onChange={(e) => setPw(e.target.value)} error={errors.password} autoComplete="current-password" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          {portal === 'member' ? <CheckField id="remember" label="Remember me" checked={remember} onChange={setRemember} /> : <span />}
          <PortalLink to={portal === 'member' ? 'memberReset' : 'employerReset'} className="text-sm font-bold text-orange-dark hover:underline">Forgot password?</PortalLink>
        </div>
        <button type="submit" className="btn-black w-full text-base">Log in</button>
      </div>
      <div className="mt-6 space-y-2 border-t border-line pt-5 text-sm">{links}</div>
      {extra}
      <PreviewNote />
    </form>
  )
}

export function MemberLogin() {
  usePageMeta('Member login', 'Log in to the IPTC member portal to view your Tier 2 and Tier 3 balances and statements.')
  if (useLiveRedirect('memberLogin')) return null
  if (getSessionId('member')) return <Navigate to="/member" replace />
  return (
    <AuthShell image="/img/auth_member.jpg" imageAlt="A smiling woman with her elderly mother — retire in joy." heading="Every cedi counts." sub="Check your balance, view statements and track every contribution.">
      <p className="eyebrow">Member portal</p>
      <h1 className="mt-1 text-3xl font-black">Member login</h1>
      <p className="mb-6 mt-2 text-ink-2">Welcome back. Log in to see your savings.</p>
      <LoginForm portal="member" idLabel="Membership number, Ghana Card or mobile" idHint="e.g. IPT-0012345, GHA-123456789-0 or 0241234567"
        links={<>
          <p>New member? <PortalLink to="memberActivate" className="font-bold text-orange-dark hover:underline">Activate your account</PortalLink></p>
          <p>Not a member yet? <Link to="/join" className="font-bold text-orange-dark hover:underline">Join Tier 3</Link></p>
        </>} />
    </AuthShell>
  )
}

export function EmployerLogin() {
  usePageMeta('Employer login', 'Log in to the IPTC employer portal to upload contribution schedules and manage your employees.')
  if (useLiveRedirect('employerLogin')) return null
  if (getSessionId('employer')) return <Navigate to="/employer" replace />
  return (
    <AuthShell image="/img/auth_employer.jpg" imageAlt="Ghanaian workers — a mechanic, a trader, a tailor and other artisans." heading="Tier 2 made simple." sub="Upload schedules, track payments and manage your staff in one place.">
      <p className="eyebrow">Employer portal</p>
      <h1 className="mt-1 text-3xl font-black">Employer login</h1>
      <p className="mb-6 mt-2 text-ink-2">Log in to manage your company’s pension contributions.</p>
      <LoginForm portal="employer" idLabel="Employer code or username"
        links={<p>New employer? <PortalLink to="employerRegister" className="font-bold text-orange-dark hover:underline">Register your company</PortalLink></p>}
        extra={<div className="mt-4 rounded-xl bg-page p-4 text-sm">
          <p className="font-bold">Need help? Call our employer team</p>
          <p className="mt-1 flex flex-wrap gap-x-4">{CONTACT.phones.map((p) => <a key={p} href={telHref(p)} className="inline-flex items-center gap-1.5 font-semibold text-orange-dark hover:underline"><Phone width={14} height={14} />{p}</a>)}</p>
        </div>} />
    </AuthShell>
  )
}

/* -------------------------------------------------------------- Dashboards */

function Dashboard({ portal, title, cards, table, links }: {
  portal: Portal; title: string
  cards: { label: string; value: string; tone: 'black' | 'orange' | 'white' }[]
  table: { caption: string; head: string[]; rows: string[][] }
  links: { label: string; to: string; Icon: typeof User }[]
}) {
  const navigate = useNavigate()
  const id = getSessionId(portal)
  if (!id) return <Navigate to={`/${portal}/login`} replace />
  const signOut = () => { clearSession(portal); navigate(`/${portal}/login`, { replace: true }) }
  const tone = { black: 'bg-ink text-white', orange: 'bg-orange text-ink', white: 'bg-white text-ink border border-line' }
  return (
    <section className="py-10 sm:py-14"><div className="container-site">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="inline-block rounded-full bg-orange-light px-3 py-1 text-xs font-bold text-orange-dark ring-1 ring-orange/40">{title} · preview</span>
          <h1 className="mt-3 break-words text-3xl font-black">Welcome, {id}</h1>
          <p className="mt-1 text-sm font-semibold text-neutral-500">Sample figures for demonstration only</p>
        </div>
        <button type="button" onClick={signOut} className="btn-outline self-start">Sign out</button>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className={`rounded-2xl p-6 ${tone[c.tone]}`}>
            <p className="text-sm font-semibold opacity-80">{c.label}</p>
            <p className="mt-2 text-2xl font-black sm:text-3xl">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="card overflow-hidden">
          <h2 className="border-b border-line px-5 py-4 text-lg font-extrabold">{table.caption}</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <caption className="sr-only">{table.caption} (sample data)</caption>
              <thead className="bg-page text-xs uppercase tracking-wider text-neutral-500">
                <tr>{table.head.map((h) => <th key={h} scope="col" className="px-5 py-3 font-bold">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-line">
                {table.rows.map((r, k) => <tr key={k}>{r.map((c, j) => <td key={j} className={`px-5 py-3 ${j === 0 ? 'font-semibold' : 'text-ink-2'}`}>{c}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-extrabold">Quick links</h2>
          <ul className="mt-3 space-y-1">
            {links.map(({ label, to, Icon }) => (
              <li key={label}><Link to={to} className="flex items-center gap-3 rounded-lg px-2 py-2.5 font-semibold hover:bg-orange-light"><Icon className="text-orange-dark" />{label}<Arrow width={16} height={16} className="ml-auto text-neutral-400" /></Link></li>
            ))}
          </ul>
        </div>
      </div>
      <PreviewNote />
    </div></section>
  )
}

export function MemberDashboard() {
  usePageMeta('Member portal (preview)', 'Preview of the IPTC member portal.')
  const t2 = 48250.4, t3 = 12780.15
  return (
    <Dashboard portal="member" title="Member portal"
      cards={[{ label: 'Tier 2 balance', value: cedi(t2), tone: 'black' }, { label: 'Tier 3 balance', value: cedi(t3), tone: 'orange' }, { label: 'Total', value: cedi(t2 + t3), tone: 'white' }]}
      table={{ caption: 'Recent contributions', head: ['Month', 'Tier', 'Amount', 'Status'], rows: [
        ['Sep 2026', 'Tier 2', cedi(150), 'Received'], ['Sep 2026', 'Tier 3', cedi(100), 'Received'],
        ['Aug 2026', 'Tier 2', cedi(150), 'Received'], ['Aug 2026', 'Tier 3', cedi(100), 'Received'], ['Jul 2026', 'Tier 2', cedi(150), 'Received'],
      ] }}
      links={[{ label: 'Pension calculator', to: '/calculator', Icon: CalcIcon }, { label: 'Benefits and claims', to: '/benefits', Icon: Doc }, { label: 'Contact us', to: '/contact', Icon: Phone }, { label: 'FAQs', to: '/faqs', Icon: User }]} />
  )
}

export function EmployerDashboard() {
  usePageMeta('Employer portal (preview)', 'Preview of the IPTC employer portal.')
  return (
    <Dashboard portal="employer" title="Employer portal"
      cards={[{ label: 'Active employees', value: '124', tone: 'black' }, { label: 'Latest schedule', value: 'Sep 2026', tone: 'white' }, { label: 'Balance due', value: cedi(18600), tone: 'orange' }]}
      table={{ caption: 'Recent schedules', head: ['Period', 'Employees', 'Amount', 'Status'], rows: [
        ['Sep 2026', '124', cedi(18600), 'Awaiting payment'], ['Aug 2026', '122', cedi(18300), 'Paid'],
        ['Jul 2026', '121', cedi(18150), 'Paid'], ['Jun 2026', '119', cedi(17850), 'Paid'],
      ] }}
      links={[{ label: 'For employers', to: '/employers', Icon: Building }, { label: 'Paying on time', to: '/news/paying-on-time', Icon: Doc }, { label: 'Transfers to IPTC', to: '/transfers', Icon: Arrow }, { label: 'Contact us', to: '/contact', Icon: Phone }]} />
  )
}

/* --------------------------------------------------- Register / reset / activate */

const SECTORS = ['Agriculture', 'Construction', 'Education', 'Financial services', 'Health', 'Hospitality', 'Manufacturing', 'Mining and energy', 'Public sector', 'Retail and trade', 'Technology', 'Transport and logistics', 'Other']

export function EmployerRegister() {
  usePageMeta('Register your company', 'Register your company with Industrial Pensions Trust for Tier 2 and Group Tier 3 pension schemes.')
  const live = useLiveRedirect('employerRegister')
  const init = { company: '', rgNumber: '', ssnit: '', employees: '', sector: '', contactName: '', position: '', mobile: '', email: '', address: '' }
  const [v, setV] = useState(init)
  const [errors, setErrors] = useState<Errors>({})
  const [ref, setRef] = useState<string | null>(null)
  if (live) return null
  const set = (k: keyof typeof init) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }))
  function submit(e: FormEvent) {
    e.preventDefault()
    const er: Errors = {}
    if (isBlank(v.company)) er.company = 'Enter the registered company name'
    if (isBlank(v.rgNumber) || !/^[A-Za-z0-9\-/ ]{5,20}$/.test(v.rgNumber.trim())) er.rgNumber = 'Enter a valid Registrar General number, e.g. CS123456789'
    const n = Number(v.employees)
    if (isBlank(v.employees) || !Number.isInteger(n) || n < 1) er.employees = 'Enter the number of employees (1 or more)'
    if (!v.sector) er.sector = 'Choose a sector'
    if (isBlank(v.contactName)) er.contactName = 'Enter the contact person’s name'
    if (isBlank(v.position)) er.position = 'Enter the contact person’s position'
    if (!MOBILE.test(cleanPhone(v.mobile))) er.mobile = 'Enter a 10-digit mobile number starting with 0'
    if (!EMAIL.test(v.email.trim())) er.email = 'Enter a valid email address'
    if (isBlank(v.address)) er.address = 'Enter the company address'
    setErrors(er)
    if (Object.keys(er).length) { focusSummary(); return }
    setRef(makeRef('EMP-REG'))
    window.scrollTo(0, 0)
  }
  return (
    <>
      <PageHero eyebrow="For employers" title="Register your company" intro="Set up your company with IPTC for Tier 2 and Group Tier 3." />
      <section className="py-12 sm:py-16"><div className="container-site max-w-3xl">
        {ref ? (
          <SuccessPanel title="Registration received">
            <p>Your registration reference is</p>
            <p className="my-3 inline-block rounded-lg bg-ink px-4 py-2 font-mono text-lg font-bold tracking-wider text-orange sm:text-xl" data-testid="emp-ref">{ref}</p>
            <p>Our employer team will contact {v.contactName.trim()} within 2 working days to confirm your employer code and next steps.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3"><Link to="/employers" className="btn-outline">For employers</Link><Link to="/" className="btn-black">Back to home</Link></div>
          </SuccessPanel>
        ) : (
          <>
          <FormDownload href={FORMS.employerRegistration} label="Download registration form" />
          <form noValidate onSubmit={submit} className="space-y-6">
            <ErrorSummary errors={errors} />
            <Fieldset legend="Company details" step={1}>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField id="company" label="Company name" value={v.company} onChange={set('company')} error={errors.company} autoComplete="organization" className="sm:col-span-2" />
                <TextField id="rgNumber" label="Registrar General number" placeholder="CS123456789" value={v.rgNumber} onChange={set('rgNumber')} error={errors.rgNumber} />
                <TextField id="ssnit" label="SSNIT employer number" optional value={v.ssnit} onChange={set('ssnit')} />
                <TextField id="employees" label="Number of employees" type="number" min="1" inputMode="numeric" value={v.employees} onChange={set('employees')} error={errors.employees} />
                <SelectField id="sector" label="Sector" options={SECTORS} value={v.sector} onChange={set('sector')} error={errors.sector} />
                <TextField id="address" label="Company address" value={v.address} onChange={set('address')} error={errors.address} className="sm:col-span-2" />
              </div>
            </Fieldset>
            <Fieldset legend="Contact person" step={2}>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField id="contactName" label="Full name" value={v.contactName} onChange={set('contactName')} error={errors.contactName} autoComplete="name" />
                <TextField id="position" label="Position" placeholder="e.g. HR Manager" value={v.position} onChange={set('position')} error={errors.position} />
                <TextField id="mobile" label="Mobile number" inputMode="tel" placeholder="0241234567" value={v.mobile} onChange={set('mobile')} error={errors.mobile} />
                <TextField id="email" label="Email" type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
              </div>
            </Fieldset>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="btn-black px-8 text-base">Register company</button>
              <p className="text-sm text-neutral-500">Already registered? <PortalLink to="employerLogin" className="font-bold text-orange-dark underline">Employer login</PortalLink></p>
            </div>
            <PreviewNote />
          </form>
          </>
        )}
      </div></section>
    </>
  )
}

function SmallFormShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section className="py-12 sm:py-16"><div className="container-site max-w-lg">
      <div className="card p-6 sm:p-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-black sm:text-3xl">{title}</h1>
        <p className="mb-6 mt-2 text-ink-2">{intro}</p>
        {children}
      </div>
    </div></section>
  )
}

function ResetForm({ portal }: { portal: Portal }) {
  const isMember = portal === 'member'
  const [id, setId] = useState('')
  const [contact, setContact] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)
  function submit(e: FormEvent) {
    e.preventDefault()
    const er: Errors = {}
    if (isBlank(id)) er.resetId = isMember ? 'Enter your membership number or Ghana Card number' : 'Enter your employer code or username'
    const c = contact.trim()
    if (isBlank(c)) er.resetContact = 'Enter your registered mobile number or email'
    else if (!MOBILE.test(cleanPhone(c)) && !EMAIL.test(c)) er.resetContact = 'Enter a 10-digit mobile number starting with 0, or a valid email'
    setErrors(er)
    if (Object.keys(er).length) { focusSummary(); return }
    setDone(true)
  }
  if (done) return (
    <div role="status" className="rounded-xl bg-green-50 p-5 text-green-800 ring-1 ring-green-600/40">
      <p className="font-extrabold">Check your phone or email</p>
      <p className="mt-1 text-sm">If the details match our records, we have sent instructions to reset your password.</p>
      <PortalLink to={isMember ? 'memberLogin' : 'employerLogin'} className="btn-black mt-4">Back to login</PortalLink>
    </div>
  )
  return (
    <form noValidate onSubmit={submit} className="space-y-5">
      <ErrorSummary errors={errors} />
      <TextField id="resetId" label={isMember ? 'Membership number or Ghana Card' : 'Employer code or username'} value={id} onChange={(e) => setId(e.target.value)} error={errors.resetId} autoComplete="username" />
      <TextField id="resetContact" label="Registered mobile number or email" value={contact} onChange={(e) => setContact(e.target.value)} error={errors.resetContact} />
      <button type="submit" className="btn-black w-full">Send reset instructions</button>
      <p className="text-center text-sm"><PortalLink to={isMember ? 'memberLogin' : 'employerLogin'} className="font-bold text-orange-dark hover:underline">Back to login</PortalLink></p>
      <PreviewNote />
    </form>
  )
}

export function MemberReset() {
  usePageMeta('Reset member password', 'Reset your IPTC member portal password.')
  if (useLiveRedirect('memberReset')) return null
  return <SmallFormShell eyebrow="Member portal" title="Forgot password" intro="Enter your details and we will send you instructions to reset your password."><ResetForm portal="member" /></SmallFormShell>
}

export function EmployerReset() {
  usePageMeta('Reset employer password', 'Reset your IPTC employer portal password.')
  if (useLiveRedirect('employerReset')) return null
  return <SmallFormShell eyebrow="Employer portal" title="Forgot password" intro="Enter your details and we will send you instructions to reset your password."><ResetForm portal="employer" /></SmallFormShell>
}

export function MemberActivate() {
  usePageMeta('Activate member account', 'Activate your IPTC member portal account with the code sent to you by SMS.')
  const live = useLiveRedirect('memberActivate')
  const [membership, setMembership] = useState('')
  const [code, setCode] = useState('')
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)
  if (live) return null
  function submit(e: FormEvent) {
    e.preventDefault()
    const er: Errors = {}
    if (isBlank(membership)) er.membership = 'Enter your membership number'
    if (!/^\d{6}$/.test(code.trim())) er.smsCode = 'Enter the 6-digit code sent to you by SMS'
    if (pw.length < 8) er.newPassword = 'Choose a password of at least 8 characters'
    if (isBlank(pw2)) er.confirmPassword = 'Confirm your new password'
    else if (pw2 !== pw) er.confirmPassword = 'The passwords do not match'
    setErrors(er)
    if (Object.keys(er).length) { focusSummary(); return }
    setPw(''); setPw2('') // passwords are not kept
    setDone(true)
  }
  return (
    <SmallFormShell eyebrow="Member portal" title="Activate your account" intro="Use the 6-digit code we sent to your registered mobile number.">
      {done ? (
        <div role="status" className="rounded-xl bg-green-50 p-5 text-green-800 ring-1 ring-green-600/40">
          <p className="font-extrabold">Your account is activated</p>
          <p className="mt-1 text-sm">You can now log in with your membership number and new password.</p>
          <PortalLink to="memberLogin" className="btn-black mt-4">Go to member login</PortalLink>
        </div>
      ) : (
        <form noValidate onSubmit={submit} className="space-y-5">
          <ErrorSummary errors={errors} />
          <TextField id="membership" label="Membership number" value={membership} onChange={(e) => setMembership(e.target.value)} error={errors.membership} autoComplete="username" />
          <TextField id="smsCode" label="SMS code" inputMode="numeric" maxLength={6} placeholder="123456" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} error={errors.smsCode} autoComplete="one-time-code" />
          <PasswordField id="newPassword" label="New password" hint="At least 8 characters" value={pw} onChange={(e) => setPw(e.target.value)} error={errors.newPassword} autoComplete="new-password" />
          <PasswordField id="confirmPassword" label="Confirm new password" value={pw2} onChange={(e) => setPw2(e.target.value)} error={errors.confirmPassword} autoComplete="new-password" />
          <button type="submit" className="btn-black w-full">Activate account</button>
          <p className="text-center text-sm">Already active? <PortalLink to="memberLogin" className="font-bold text-orange-dark hover:underline">Log in</PortalLink></p>
          <PreviewNote />
        </form>
      )}
    </SmallFormShell>
  )
}

