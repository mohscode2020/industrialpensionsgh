import { PORTAL_LIVE, PORTAL_URLS } from '../config'

export type PortalKey = keyof typeof PORTAL_URLS

/** Temporary in-site pages used while PORTAL_LIVE = false. */
export const PREVIEW_ROUTES: Record<PortalKey, string> = {
  memberLogin: '/member/login',
  memberActivate: '/member/activate',
  memberReset: '/member/reset',
  employerLogin: '/employer/login',
  employerRegister: '/employer/register',
  employerReset: '/employer/reset',
}

/** External system URL when live (and filled in), otherwise null. */
export function liveUrl(key: PortalKey): string | null {
  const url = PORTAL_URLS[key]?.trim()
  return PORTAL_LIVE && url ? url : null
}

export function portalHref(key: PortalKey): string {
  return liveUrl(key) ?? PREVIEW_ROUTES[key]
}
