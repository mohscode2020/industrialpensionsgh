import type { SVGProps } from 'react'
type P = SVGProps<SVGSVGElement>
const base = (p: P) => ({ width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...p })

export const Phone = (p: P) => <svg {...base(p)}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
export const Mail = (p: P) => <svg {...base(p)}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
export const Pin = (p: P) => <svg {...base(p)}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
export const Globe = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" /></svg>
export const Clock = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
export const Arrow = (p: P) => <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
export const ChevronLeft = (p: P) => <svg {...base(p)}><path d="m15 18-6-6 6-6" /></svg>
export const ChevronRight = (p: P) => <svg {...base(p)}><path d="m9 18 6-6-6-6" /></svg>
export const ChevronDown = (p: P) => <svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>
export const Menu = (p: P) => <svg {...base(p)}><path d="M3 6h18M3 12h18M3 18h18" /></svg>
export const Close = (p: P) => <svg {...base(p)}><path d="M18 6 6 18M6 6l12 12" /></svg>
export const Shield = (p: P) => <svg {...base(p)}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
export const Growth = (p: P) => <svg {...base(p)}><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 6-6" /><path d="M16 8h4v4" /></svg>
export const Chair = (p: P) => <svg {...base(p)}><path d="M6 10V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4" /><path d="M4 10a2 2 0 0 1 2 2v2h12v-2a2 2 0 1 1 2 2v4H4v-4a2 2 0 0 1 0-4z" /><path d="M6 18v3M18 18v3" /></svg>
export const Hands = (p: P) => <svg {...base(p)}><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a4 4 0 0 0 2.6.6H21" /><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8" /></svg>
export const User = (p: P) => <svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
export const Building = (p: P) => <svg {...base(p)}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" /></svg>
export const Calculator = (p: P) => <svg {...base(p)}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h4" /></svg>
export const Plus = (p: P) => <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>
export const Check = (p: P) => <svg {...base(p)}><path d="M20 6 9 17l-5-5" /></svg>
export const Alert = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
export const Trash = (p: P) => <svg {...base(p)}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
export const Transfer = (p: P) => <svg {...base(p)}><path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4M21 17H3" /></svg>
export const Doc = (p: P) => <svg {...base(p)}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>

const fill = (p: P) => ({ width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true, ...p })
export const Facebook = (p: P) => <svg {...fill(p)}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5z" /></svg>
export const Instagram = (p: P) => <svg {...fill(p)}><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.3-9.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2c-2.7 0-3 0-4.1.1C4 2.3 2.3 4 2.1 7.9 2 9 2 9.3 2 12s0 3 .1 4.1C2.3 20 4 21.7 7.9 21.9 9 22 9.3 22 12 22s3 0 4.1-.1c3.9-.2 5.6-1.9 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1C21.7 4 20 2.3 16.1 2.1 15 2 14.7 2 12 2zm0 1.8c2.7 0 3 0 4 .1 2.7.1 4 1.4 4.1 4.1.1 1 .1 1.3.1 4s0 3-.1 4c-.1 2.7-1.4 4-4.1 4.1-1 .1-1.3.1-4 .1s-3 0-4-.1C5.3 20 4 18.7 3.9 16c-.1-1-.1-1.3-.1-4s0-3 .1-4C4 5.3 5.3 4 8 3.9c1-.1 1.3-.1 4-.1z" /></svg>
export const XLogo = (p: P) => <svg {...fill(p)}><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" /></svg>
export const LinkedIn = (p: P) => <svg {...fill(p)}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" /></svg>
export const WhatsApp = (p: P) => <svg {...fill(p)}><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8.2 8.2 0 0 1-4.1-3.6c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1.1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z" /></svg>
