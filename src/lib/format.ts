const fmt = new Intl.NumberFormat('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
export const cedi = (n: number) => `GH₵ ${fmt.format(Number.isFinite(n) ? n : 0)}`
export const num = (n: number) => new Intl.NumberFormat('en-GH').format(n)
export const telHref = (p: string) => `tel:+233${p.replace(/\D/g, '').replace(/^0/, '')}`
export const mapsEmbed = (q: string) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`
export const mapsDirections = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
export const makeRef = (prefix: string) =>
  `${prefix}-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`
