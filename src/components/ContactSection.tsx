import { CONTACT } from '../config'
import { mapsDirections, mapsEmbed, telHref } from '../lib/format'
import { Clock, Mail, Phone, Pin, WhatsApp } from './Icons'
import { SectionHead, whatsappHref } from './Bits'

export function ContactCards() {
  const cls = 'card flex gap-4 p-5'
  const icon = 'grid h-11 w-11 shrink-0 place-items-center rounded-full bg-orange-light text-orange-dark'
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <div className={cls}>
        <span className={icon}><Phone /></span>
        <div><h3 className="font-extrabold">Call us</h3>
          <p className="mt-1 space-x-3 text-ink-2">{CONTACT.phones.map((p) => <a key={p} href={telHref(p)} className="font-semibold hover:text-orange-dark">{p}</a>)}</p>
        </div>
      </div>
      <div className={cls}>
        <span className={icon}><Mail /></span>
        <div className="min-w-0"><h3 className="font-extrabold">Email us</h3>
          <p className="mt-1 break-words"><a href={`mailto:${CONTACT.email}`} className="font-semibold text-ink-2 hover:text-orange-dark">{CONTACT.email}</a></p>
        </div>
      </div>
      <div className={cls}>
        <span className={icon}><Pin /></span>
        <div><h3 className="font-extrabold">Visit us</h3><p className="mt-1 text-ink-2">{CONTACT.address}</p></div>
      </div>
      {CONTACT.whatsapp.trim() && (
        <div className={cls}>
          <span className={icon}><WhatsApp /></span>
          <div><h3 className="font-extrabold">WhatsApp</h3>
            <p className="mt-1"><a href={whatsappHref(CONTACT.whatsapp)} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink-2 hover:text-orange-dark">Chat with us on WhatsApp<span className="sr-only"> (opens in a new tab)</span></a></p>
          </div>
        </div>
      )}
      <div className={cls}>
        <span className={icon}><Clock /></span>
        <div><h3 className="font-extrabold">Opening hours</h3><p className="mt-1 text-ink-2">{CONTACT.hours}</p></div>
      </div>
    </div>
  )
}

export function MapBlock() {
  return (
    <div className="card overflow-hidden">
      {import.meta.env.VITE_MEMORY_ROUTER ? (
        // Preview build only: embedded maps are blocked inside the shared preview page.
        <a href={CONTACT.mapsLink.trim() || mapsDirections(CONTACT.mapsQuery)} target="_blank" rel="noopener noreferrer"
          className="relative grid h-[320px] w-full place-items-center overflow-hidden bg-orange-light text-center sm:h-[400px]"
          style={{ backgroundImage: 'linear-gradient(#E7E4DE 1px, transparent 1px), linear-gradient(90deg, #E7E4DE 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <span className="absolute left-0 right-0 top-1/2 h-3 -translate-y-1/2 bg-white" aria-hidden />
          <span className="absolute bottom-0 top-0 left-[38%] w-3 bg-white" aria-hidden />
          <span className="relative flex flex-col items-center gap-2 rounded-2xl bg-white/95 px-6 py-5 shadow-lg">
            <Pin width={36} height={36} className="text-orange-dark" />
            <span className="font-extrabold">Industrial Pensions Trust</span>
            <span className="text-sm text-ink-2">{CONTACT.address}</span>
            <span className="mt-1 text-sm font-bold text-orange-dark underline">Open in Google Maps</span>
            <span className="text-xs text-neutral-500">The live map appears on the published website.</span>
          </span>
        </a>
      ) : (
        <iframe title="Map showing the Industrial Pensions Trust office, Ring Road East, Accra" src={mapsEmbed(CONTACT.mapsQuery)}
          className="h-[320px] w-full border-0 sm:h-[400px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      )}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-2">{CONTACT.address}</p>
        <a href={CONTACT.mapsLink.trim() || mapsDirections(CONTACT.mapsQuery)} target="_blank" rel="noopener noreferrer" className="btn-orange shrink-0">
          <Pin width={18} height={18} /> Get directions<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  )
}

export default function ContactSection() {
  return (
    <section className="py-14 sm:py-20" aria-labelledby="contact-title">
      <div className="container-site">
        <SectionHead eyebrow="Contact" title={<span id="contact-title">Talk to us</span>} intro="Questions about your pension, joining Tier 3 or registering your company? We are here to help." />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.8fr]">
          <ContactCards />
          <MapBlock />
        </div>
      </div>
    </section>
  )
}
