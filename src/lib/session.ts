/** Only the sign-in ID is kept (sessionStorage). Passwords are never stored. */
export type Portal = 'member' | 'employer'
const key = (p: Portal) => `iptc.preview.${p}.id`

export function getSessionId(p: Portal): string | null {
  try { return sessionStorage.getItem(key(p)) } catch { return null }
}
export function setSessionId(p: Portal, id: string) {
  try { sessionStorage.setItem(key(p), id) } catch { /* storage unavailable */ }
}
export function clearSession(p: Portal) {
  try { sessionStorage.removeItem(key(p)) } catch { /* storage unavailable */ }
}
