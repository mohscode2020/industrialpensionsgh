import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageHero, PreviewNote } from '../components/Bits'
import { ContactCards, MapBlock } from '../components/ContactSection'
import { ErrorSummary, SelectField, SuccessPanel, TextArea, TextField } from '../components/Fields'
import { CONTACT } from '../config'
import { usePageMeta } from '../lib/meta'
import { cleanPhone, EMAIL, focusSummary, isBlank, MOBILE, type Errors } from '../lib/validate'

type Vals = Record<string, string>

function openMail(subject: string, lines: [string, string][]) {
  const body = lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')
  window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function useMailForm(initial: Vals, validate: (v: Vals) => Errors, send: (v: Vals) => void) {
  const [v, setV] = useState(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const set = (k: string) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }))
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) { focusSummary(); return }
    send(v)
    setSent(true)
  }
  return { v, set, errors, sent, setSent, submit }
}

const commonChecks = (v: Vals): Errors => {
  const e: Errors = {}
  if (isBlank(v.name)) e.name = 'Enter your full name'
  if (!MOBILE.test(cleanPhone(v.mobile))) e.mobile = 'Enter a 10-digit mobile number starting with 0'
  if (isBlank(v.email)) e.email = 'Enter your email address'
  else if (!EMAIL.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com'
  return e
}

function MailSent({ onBack }: { onBack: () => void }) {
  return (
    <SuccessPanel title="Your email app has opened — press Send">
      <p>We have filled in a message to {CONTACT.email} for you. Check it, then press Send in your email app.</p>
      <p className="mt-3 text-sm text-neutral-500">Email app didn’t open? Write to <a href={`mailto:${CONTACT.email}`} className="font-bold text-orange-dark underline">{CONTACT.email}</a> or call {CONTACT.phones.join(' / ')}.</p>
      <button type="button" onClick={onBack} className="btn-outline mt-6">Back to the form</button>
    </SuccessPanel>
  )
}

export function Contact() {
  usePageMeta('Contact us', `Contact Industrial Pensions Trust: call ${CONTACT.phones.join(' or ')}, email ${CONTACT.email}, or visit us on Ring Road East, Accra.`)
  const f = useMailForm({ name: '', mobile: '', email: '', subject: '', message: '' }, (v) => {
    const e = commonChecks(v)
    if (isBlank(v.message)) e.message = 'Enter your message'
    return e
  }, (v) => openMail(v.subject.trim() || 'Website enquiry', [['Name', v.name], ['Mobile', cleanPhone(v.mobile)], ['Email', v.email], ['', ''], ['Message', '\n' + v.message]]))
  const { v, set, errors } = f
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to us" intro={`We are open ${CONTACT.hours}.`} />
      <section className="py-12 sm:py-16"><div className="container-site grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <ContactCards />
        <div>
          {f.sent ? <MailSent onBack={() => f.setSent(false)} /> : (
            <form noValidate onSubmit={f.submit} className="card p-5 sm:p-8">
              <h2 className="mb-5 text-xl font-extrabold">Send us a message</h2>
              <ErrorSummary errors={errors} />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField id="name" label="Full name" value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" className="sm:col-span-2" />
                <TextField id="mobile" label="Mobile number" value={v.mobile} onChange={set('mobile')} error={errors.mobile} inputMode="tel" autoComplete="tel" placeholder="0241234567" />
                <TextField id="email" label="Email" type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
                <TextField id="subject" label="Subject" optional value={v.subject} onChange={set('subject')} className="sm:col-span-2" />
                <TextArea id="message" label="Message" value={v.message} onChange={set('message')} error={errors.message} className="sm:col-span-2" />
              </div>
              <button type="submit" className="btn-black mt-6 w-full sm:w-auto">Send message</button>
              <p className="mt-3 text-xs text-neutral-500">Pressing Send message opens your email app with your message filled in.</p>
              <PreviewNote />
            </form>
          )}
        </div>
      </div>
      <div className="container-site mt-10"><MapBlock /></div>
      </section>
    </>
  )
}

const CATEGORIES = ['Contributions not showing', 'Benefit payment', 'Transfer', 'Statement or account details', 'Customer service', 'Online portal', 'Other']

export function Complaints() {
  usePageMeta('Complaints', 'How to make a complaint to Industrial Pensions Trust and what happens next.')
  const f = useMailForm({ name: '', membership: '', mobile: '', email: '', category: '', reference: '', message: '' }, (v) => {
    const e = commonChecks(v)
    if (isBlank(v.category)) e.category = 'Choose a category'
    if (isBlank(v.message)) e.message = 'Describe your complaint'
    return e
  }, (v) => openMail(`Complaint: ${v.category}`, [['Name', v.name], ['Membership number', v.membership], ['Mobile', cleanPhone(v.mobile)], ['Email', v.email], ['Category', v.category], ['Reference', v.reference], ['', ''], ['Complaint', '\n' + v.message]]))
  const { v, set, errors } = f
  return (
    <>
      <PageHero eyebrow="Complaints" title="We want to put things right" intro="If you are not happy with our service, tell us. We will acknowledge your complaint and work to resolve it quickly." />
      <section className="py-12 sm:py-16"><div className="container-site grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <div className="prose-site">
          <h2 className="!mt-0">How we handle complaints</h2>
          <ol>
            <li>Send your complaint using this form, by phone or at our office.</li>
            <li>We acknowledge it and give you a reference.</li>
            <li>We investigate and respond in writing.</li>
            <li>If you are not satisfied, you may refer the matter to the National Pensions Regulatory Authority (NPRA).</li>
          </ol>
          <p>Call {CONTACT.phones.join(' or ')}, or see our <Link to="/faqs">FAQs</Link>.</p>
        </div>
        <div>
          {f.sent ? <MailSent onBack={() => f.setSent(false)} /> : (
            <form noValidate onSubmit={f.submit} className="card p-5 sm:p-8">
              <h2 className="mb-5 text-xl font-extrabold">Make a complaint</h2>
              <ErrorSummary errors={errors} />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField id="name" label="Full name" value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" />
                <TextField id="membership" label="Membership number" optional value={v.membership} onChange={set('membership')} />
                <TextField id="mobile" label="Mobile number" value={v.mobile} onChange={set('mobile')} error={errors.mobile} inputMode="tel" autoComplete="tel" placeholder="0241234567" />
                <TextField id="email" label="Email" type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
                <SelectField id="category" label="Category" options={CATEGORIES} value={v.category} onChange={set('category')} error={errors.category} />
                <TextField id="reference" label="Reference" optional hint="e.g. a payment or previous complaint reference" value={v.reference} onChange={set('reference')} />
                <TextArea id="message" label="Your complaint" value={v.message} onChange={set('message')} error={errors.message} className="sm:col-span-2" />
              </div>
              <button type="submit" className="btn-black mt-6 w-full sm:w-auto">Send complaint</button>
              <p className="mt-3 text-xs text-neutral-500">Pressing Send complaint opens your email app with your complaint filled in.</p>
              <PreviewNote />
            </form>
          )}
        </div>
      </div></section>
    </>
  )
}
