export const isBlank = (v: string) => !v || !v.trim()
export const GHANA_CARD = /^GHA-\d{9}-\d$/
export const MOBILE = /^0\d{9}$/
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const cleanPhone = (v: string) => v.replace(/[\s-]/g, '')

/** Returns age in whole years for a DD/MM/YYYY string, or null if not a real date. */
export function ageFromDob(v: string, today = new Date()): number | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v.trim())
  if (!m) return null
  const d = +m[1], mo = +m[2], y = +m[3]
  const date = new Date(y, mo - 1, d)
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null
  if (date > today) return null
  let age = today.getFullYear() - y
  if (today.getMonth() < mo - 1 || (today.getMonth() === mo - 1 && today.getDate() < d)) age--
  return age
}

export type Errors = Record<string, string>

/** Focus + scroll to the error summary after render. */
export function focusSummary(id = 'error-summary') {
  requestAnimationFrame(() => {
    const el = document.getElementById(id)
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); el.focus({ preventScroll: true }) }
  })
}
