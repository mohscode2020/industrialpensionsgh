import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FormDownload, PageHero, PortalLink, PreviewNote } from '../components/Bits'
import { CheckField, ErrorSummary, Fieldset, SelectField, SuccessPanel, TextField } from '../components/Fields'
import { Plus, Trash } from '../components/Icons'
import { CONTACT, FORMS } from '../config'
import { makeRef } from '../lib/format'
import { usePageMeta } from '../lib/meta'
import { ageFromDob, cleanPhone, EMAIL, focusSummary, GHANA_CARD, isBlank, MOBILE, type Errors } from '../lib/validate'

const BANKS = ['Absa Bank Ghana', 'Access Bank Ghana', 'Agricultural Development Bank', 'CalBank', 'Consolidated Bank Ghana', 'Ecobank Ghana', 'Fidelity Bank Ghana', 'First Atlantic Bank', 'GCB Bank', 'National Investment Bank', 'OmniBSIC Bank', 'Prudential Bank', 'Republic Bank Ghana', 'Société Générale Ghana', 'Stanbic Bank Ghana', 'Standard Chartered Bank Ghana', 'UBA Ghana', 'Zenith Bank Ghana', 'Other']
const NETWORKS = ['MTN Mobile Money', 'Telecel Cash', 'AT Money']
const FREQUENCIES = ['Daily', 'Weekly', 'Monthly']
const RELATIONSHIPS = ['Spouse', 'Child', 'Parent', 'Sibling', 'Other relative', 'Other']
const PRODUCTS = [
  { id: 'Personal Tier 3', text: 'Flexible personal pension. Save monthly by MoMo or bank.' },
  { id: 'Cedi A Day', text: 'Personal pension for individuals in the informal sector, with annuity and funeral cover.' },
  { id: 'Nkɔsoɔ', text: 'Pensions and welfare for members of associations, welfare, family and religious groups.' },
]

interface Ben { key: number; name: string; relationship: string; mobile: string; share: string }
const emptyBen = (key: number): Ben => ({ key, name: '', relationship: '', mobile: '', share: '' })

const initial = {
  fullName: '', dob: '', gender: '', ghanaCard: '', mobile: '', email: '', address: '', occupation: '',
  product: '', amount: '', frequency: '', payment: '', network: '', momo: '', bank: '', accountName: '', accountNumber: '',
}

export default function Join() {
  usePageMeta('Join Tier 3', 'Apply online to join an IPTC Tier 3 personal pension: Personal Tier 3, Cedi A Day or Nkɔsoɔ. Pay by Mobile Money or bank.')
  const [v, setV] = useState(initial)
  const [bens, setBens] = useState<Ben[]>([emptyBen(1)])
  const [nextKey, setNextKey] = useState(2)
  const [consent1, setConsent1] = useState(false)
  const [consent2, setConsent2] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [ref, setRef] = useState<string | null>(null)

  const set = (k: keyof typeof initial) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }))
  const setBen = (key: number, k: keyof Ben) => (e: { target: { value: string } }) =>
    setBens((bs) => bs.map((b) => (b.key === key ? { ...b, [k]: e.target.value } : b)))
  const total = bens.reduce((s, b) => s + (Number(b.share) || 0), 0)
  const totalOk = Math.abs(total - 100) < 0.001

  function validate(): Errors {
    const e: Errors = {}
    if (isBlank(v.fullName) || v.fullName.trim().split(/\s+/).length < 2) e.fullName = 'Enter your full name (first and last name)'
    const age = ageFromDob(v.dob)
    if (isBlank(v.dob)) e.dob = 'Enter your date of birth'
    else if (age === null) e.dob = 'Enter a real date in the format DD/MM/YYYY'
    else if (age < 18 || age > 75) e.dob = 'You must be between 18 and 75 years old to join'
    if (!v.gender) e.gender = 'Choose your gender'
    if (!GHANA_CARD.test(v.ghanaCard.trim().toUpperCase())) e.ghanaCard = 'Enter your Ghana Card number in the format GHA-123456789-0'
    if (!MOBILE.test(cleanPhone(v.mobile))) e.mobile = 'Enter a 10-digit mobile number starting with 0'
    if (!isBlank(v.email) && !EMAIL.test(v.email.trim())) e.email = 'Enter a valid email address, or leave it blank'
    if (isBlank(v.address)) e.address = 'Enter your residential address'
    if (isBlank(v.occupation)) e.occupation = 'Enter your occupation'
    if (!v.product) e['product-0'] = 'Choose a product'
    const amt = Number(v.amount)
    if (isBlank(v.amount) || !Number.isFinite(amt) || amt <= 0) e.amount = 'Enter an amount greater than 0'
    if (!v.frequency) e.frequency = 'Choose how often you will contribute'
    if (!v.payment) e['payment-0'] = 'Choose a payment method'
    if (v.payment === 'Mobile Money') {
      if (!v.network) e.network = 'Choose your mobile network'
      if (!MOBILE.test(cleanPhone(v.momo))) e.momo = 'Enter a 10-digit MoMo number starting with 0'
    }
    if (v.payment === 'Bank') {
      if (!v.bank) e.bank = 'Choose your bank'
      if (isBlank(v.accountName)) e.accountName = 'Enter the account name'
      if (!/^\d{8,16}$/.test(v.accountNumber.replace(/\s/g, ''))) e.accountNumber = 'Enter an account number of 8 to 16 digits'
    }
    bens.forEach((b, i) => {
      const n = `Beneficiary ${i + 1}`
      if (isBlank(b.name)) e[`ben-${b.key}-name`] = `${n}: enter a name`
      if (!b.relationship) e[`ben-${b.key}-relationship`] = `${n}: choose a relationship`
      if (!MOBILE.test(cleanPhone(b.mobile))) e[`ben-${b.key}-mobile`] = `${n}: enter a 10-digit mobile number starting with 0`
      const sh = Number(b.share)
      if (isBlank(b.share) || !Number.isFinite(sh) || sh <= 0 || sh > 100) e[`ben-${b.key}-share`] = `${n}: enter a share between 1 and 100`
    })
    if (!totalOk && bens.length) e[`ben-${bens[bens.length - 1].key}-share`] ??= `Beneficiary shares must add up to 100% (now ${total}%)`
    if (!totalOk) e['ben-total'] = `Beneficiary shares must add up to 100% (now ${total}%)`
    if (!consent1) e.consent1 = 'You must confirm your details are correct'
    if (!consent2) e.consent2 = 'You must agree to the processing of your data'
    return e
  }

  function submit(ev: FormEvent) {
    ev.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) { focusSummary(); return }
    setRef(makeRef('T3-APP'))
    window.scrollTo(0, 0)
  }

  if (ref) {
    return (
      <>
        <PageHero eyebrow="Join Tier 3" title="Application received" />
        <section className="py-12 sm:py-16"><div className="container-site max-w-3xl">
          <SuccessPanel title="Thank you for applying">
            <p>Your application reference is</p>
            <p className="my-3 inline-block rounded-lg bg-ink px-4 py-2 font-mono text-lg font-bold tracking-wider text-orange sm:text-xl" data-testid="join-ref">{ref}</p>
            <p>Please keep this reference for your records.</p>
            <div className="mt-6 text-left">
              <h3 className="font-extrabold">What happens next</h3>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-2">
                <li>We check your details and Ghana Card within 2 working days.</li>
                <li>You receive your membership number and payment instructions by SMS.</li>
                <li>Make your first {v.frequency.toLowerCase()} contribution by {v.payment === 'Bank' ? 'bank' : 'Mobile Money'}.</li>
                <li>Activate your online account to track your savings.</li>
              </ol>
              <p className="mt-4 text-sm text-neutral-500">Questions? Call {CONTACT.phones.join(' / ')} quoting your reference.</p>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <PortalLink to="memberActivate" className="btn-orange">Activate account</PortalLink>
              <Link to="/" className="btn-outline">Back to home</Link>
            </div>
          </SuccessPanel>
          <PreviewNote />
        </div></section>
      </>
    )
  }

  const radioCard = (on: boolean) => `relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange ${on ? 'border-orange bg-orange-light' : 'border-line bg-white hover:border-orange/60'}`

  return (
    <>
      <PageHero eyebrow="Join Tier 3" title="Apply to join Tier 3" intro="It takes about 5 minutes. Have your Ghana Card and Mobile Money or bank details ready." />
      <section className="py-12 sm:py-16"><div className="container-site max-w-4xl">
        <FormDownload href={FORMS.tier3Application} label="Download application form" />
        <form noValidate onSubmit={submit} className="space-y-6">
          <ErrorSummary errors={Object.fromEntries(Object.entries(errors).filter(([k]) => k !== 'ben-total'))} />

          <Fieldset legend="Personal details" step={1}>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField id="fullName" label="Full name" value={v.fullName} onChange={set('fullName')} error={errors.fullName} autoComplete="name" className="sm:col-span-2" />
              <TextField id="dob" label="Date of birth" placeholder="DD/MM/YYYY" hint="Format DD/MM/YYYY. You must be 18 to 75." inputMode="numeric" maxLength={10} value={v.dob} onChange={set('dob')} error={errors.dob} autoComplete="bday" />
              <SelectField id="gender" label="Gender" options={['Female', 'Male']} value={v.gender} onChange={set('gender')} error={errors.gender} />
              <TextField id="ghanaCard" label="Ghana Card number" placeholder="GHA-123456789-0" hint="Format GHA-123456789-0" value={v.ghanaCard}
                onChange={(e) => setV((s) => ({ ...s, ghanaCard: e.target.value.toUpperCase() }))} error={errors.ghanaCard} maxLength={15} autoCapitalize="characters" />
              <TextField id="mobile" label="Mobile number" placeholder="0241234567" hint="10 digits starting with 0" inputMode="tel" value={v.mobile} onChange={set('mobile')} error={errors.mobile} autoComplete="tel" />
              <TextField id="email" label="Email" optional type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
              <TextField id="occupation" label="Occupation" placeholder="e.g. Trader, Mechanic, Teacher" value={v.occupation} onChange={set('occupation')} error={errors.occupation} />
              <TextField id="address" label="Residential address" placeholder="House number, street, town" value={v.address} onChange={set('address')} error={errors.address} autoComplete="street-address" className="sm:col-span-2" />
            </div>
          </Fieldset>

          <Fieldset legend="Choose your product" step={2}>
            <div role="radiogroup" aria-label="Product" aria-describedby={errors['product-0'] ? 'product-error' : undefined} className="grid gap-3 sm:grid-cols-3">
              {PRODUCTS.map((p, k) => (
                <label key={p.id} className={radioCard(v.product === p.id)}>
                  <input type="radio" name="product" id={`product-${k}`} value={p.id} checked={v.product === p.id} onChange={set('product')} className="sr-only" />
                  <span className="flex items-center justify-between gap-2 font-extrabold">{p.id}
                    <span aria-hidden className={`h-5 w-5 rounded-full border-2 ${v.product === p.id ? 'border-orange bg-orange shadow-[inset_0_0_0_3px_white]' : 'border-neutral-300'}`} /></span>
                  <span className="mt-1 text-sm text-ink-2">{p.text}</span>
                </label>
              ))}
            </div>
            <p className="mt-3 text-sm"><Link to="/products" className="font-semibold text-orange-dark underline">Compare products</Link></p>
            {errors['product-0'] && <p id="product-error" className="field-error">{errors['product-0']}</p>}
          </Fieldset>

          <Fieldset legend="Contribution" step={3}>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField id="amount" label="Contribution amount (GH₵)" type="number" min="0" step="0.01" inputMode="decimal" placeholder="e.g. 100" value={v.amount} onChange={set('amount')} error={errors.amount} />
              <SelectField id="frequency" label="Frequency" options={FREQUENCIES} value={v.frequency} onChange={set('frequency')} error={errors.frequency} />
            </div>
          </Fieldset>

          <Fieldset legend="Payment method" step={4}>
            <div role="radiogroup" aria-label="Payment method" className="grid gap-3 sm:grid-cols-2">
              {['Mobile Money', 'Bank'].map((m, k) => (
                <label key={m} className={radioCard(v.payment === m)}>
                  <input type="radio" name="payment" id={`payment-${k}`} value={m} checked={v.payment === m} onChange={set('payment')} className="sr-only" />
                  <span className="flex items-center justify-between font-extrabold">{m}
                    <span aria-hidden className={`h-5 w-5 rounded-full border-2 ${v.payment === m ? 'border-orange bg-orange shadow-[inset_0_0_0_3px_white]' : 'border-neutral-300'}`} /></span>
                  <span className="mt-1 text-sm text-ink-2">{m === 'Bank' ? 'Standing order or transfer from your bank account' : 'MTN, Telecel or AT Money'}</span>
                </label>
              ))}
            </div>
            {errors['payment-0'] && <p className="field-error">{errors['payment-0']}</p>}
            {v.payment === 'Mobile Money' && (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <SelectField id="network" label="Network" options={NETWORKS} value={v.network} onChange={set('network')} error={errors.network} />
                <TextField id="momo" label="MoMo number" placeholder="0241234567" inputMode="tel" value={v.momo} onChange={set('momo')} error={errors.momo} />
              </div>
            )}
            {v.payment === 'Bank' && (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <SelectField id="bank" label="Bank" options={BANKS} value={v.bank} onChange={set('bank')} error={errors.bank} className="sm:col-span-2" />
                <TextField id="accountName" label="Account name" value={v.accountName} onChange={set('accountName')} error={errors.accountName} />
                <TextField id="accountNumber" label="Account number" inputMode="numeric" value={v.accountNumber} onChange={set('accountNumber')} error={errors.accountNumber} />
              </div>
            )}
          </Fieldset>

          <Fieldset legend="Beneficiaries" step={5}>
            <p className="-mt-2 mb-5 text-sm text-ink-2">Who should receive your savings if you die? Shares must add up to 100%.</p>
            <div className="space-y-4">
              {bens.map((b, i) => (
                <div key={b.key} className="rounded-xl border border-line bg-page p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-extrabold">Beneficiary {i + 1}</p>
                    {bens.length > 1 && (
                      <button type="button" onClick={() => setBens((bs) => bs.filter((x) => x.key !== b.key))}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold text-red-700 hover:bg-red-50">
                        <Trash width={16} height={16} /> Remove<span className="sr-only"> beneficiary {i + 1}</span>
                      </button>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1.3fr_1.5fr_0.8fr]">
                    <TextField id={`ben-${b.key}-name`} label="Full name" value={b.name} onChange={setBen(b.key, 'name')} error={errors[`ben-${b.key}-name`]?.replace(/^Beneficiary \d+: /, '')} />
                    <SelectField id={`ben-${b.key}-relationship`} label="Relationship" options={RELATIONSHIPS} value={b.relationship} onChange={setBen(b.key, 'relationship')} error={errors[`ben-${b.key}-relationship`]?.replace(/^Beneficiary \d+: /, '')} />
                    <TextField id={`ben-${b.key}-mobile`} label="Mobile" inputMode="tel" placeholder="0241234567" value={b.mobile} onChange={setBen(b.key, 'mobile')} error={errors[`ben-${b.key}-mobile`]?.replace(/^Beneficiary \d+: /, '')} />
                    <TextField id={`ben-${b.key}-share`} label="Share %" type="number" min="1" max="100" inputMode="decimal" value={b.share} onChange={setBen(b.key, 'share')} error={errors[`ben-${b.key}-share`]?.replace(/^Beneficiary \d+: /, '')} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" disabled={bens.length >= 10} onClick={() => { setBens((bs) => [...bs, emptyBen(nextKey)]); setNextKey((k) => k + 1) }} className="btn-outline">
                <Plus width={18} height={18} /> Add beneficiary
              </button>
              <p aria-live="polite" data-testid="share-total"
                className={`rounded-lg px-4 py-2 text-sm font-extrabold ${totalOk ? 'bg-green-50 text-green-700 ring-1 ring-green-600/40' : 'bg-red-50 text-red-700 ring-1 ring-red-600/40'}`}>
                Total share: {Number(total.toFixed(2))}% {totalOk ? '✓' : '(must be 100%)'}
              </p>
            </div>
          </Fieldset>

          <Fieldset legend="Declaration" step={6}>
            <div className="space-y-4">
              <CheckField id="consent1" checked={consent1} onChange={setConsent1} error={errors.consent1}
                label="I confirm that the information I have given is true and complete, and I agree to the scheme rules of the IPTC Tier 3 scheme." />
              <CheckField id="consent2" checked={consent2} onChange={setConsent2} error={errors.consent2}
                label={<>I agree that IPTC may process my personal data to open and manage my pension account, in line with the Data Protection Act, 2012 (Act 843) and the <Link to="/privacy" className="font-semibold text-orange-dark underline">privacy policy</Link>.</>} />
            </div>
          </Fieldset>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="submit" className="btn-orange px-8 text-base">Submit application</button>
            <p className="text-sm text-neutral-500">Already a member? <PortalLink to="memberLogin" className="font-bold text-orange-dark underline">Log in</PortalLink></p>
          </div>
          <PreviewNote />
        </form>
      </div></section>
    </>
  )
}
