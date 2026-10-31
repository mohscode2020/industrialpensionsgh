/**
 * IPTC website — the ONE place to change site-wide settings.
 *
 * When the pension administration system is ready:
 *   1. Paste the real addresses into PORTAL_URLS below.
 *   2. Set PORTAL_LIVE = true.
 * Every login / activate / reset / register link on the site will then go
 * straight to the matching system page (same tab). While PORTAL_LIVE is false,
 * the temporary preview pages in this website are used instead.
 */
export const PORTAL_LIVE = false

export const PORTAL_URLS = {
  memberLogin: '',
  memberActivate: '',
  memberReset: '',
  employerLogin: '',
  employerRegister: '',
  employerReset: '',
}

/** Social media links. Leave a value empty ('') to hide that icon. */
export const SOCIAL = {
  facebook: '',
  instagram: '',
  x: '',
  linkedin: '',
}

/**
 * Hard-copy forms visitors can download. Put the PDF in public/forms/ and set the path,
 * e.g. '/forms/iptc-tier3-application.pdf'. Leave '' to hide the download button.
 */
export const FORMS = {
  tier3Application: '',
  employerRegistration: '',
}

export const CONTACT = {
  phones: ['030 398 5007', '050 744 4393'],
  /** WhatsApp number in international format, digits only, e.g. '233507444393'. Leave '' to hide WhatsApp. */
  whatsapp: '233507444393',
  email: 'info@industrialpensionsgh.com',
  web: 'www.industrialpensionsgh.com',
  address: 'Ring Road East, near the Police Hospital, Accra',
  hours: 'Monday to Friday, 8:00 to 17:00',
  mapsQuery: 'Oxbridge Insurance Brokers Ltd, Police Hospital, Ring Road East, Accra',
  /** Google Maps share link for "Get directions". Leave '' to use a search for mapsQuery instead. */
  mapsLink: 'https://maps.app.goo.gl/w6zgzzxXgBWJez8u6',
}
