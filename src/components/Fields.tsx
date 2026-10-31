import { useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import type { Errors } from '../lib/validate'
import { Alert } from './Icons'

type Base = { id: string; label: ReactNode; error?: string; hint?: ReactNode; optional?: boolean; className?: string }

function Wrap({ id, label, error, hint, optional, className, children }: Base & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-neutral-500">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="field-hint">{hint}</p>}
      {error && <p id={`${id}-error`} className="field-error">{error}</p>}
    </div>
  )
}

const describedBy = (id: string, error?: string, hint?: ReactNode) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined)

export function TextField({ id, label, error, hint, optional, className, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap {...{ id, label, error, hint, optional, className }}>
      <input id={id} name={id} className="field-input" aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} {...rest} />
    </Wrap>
  )
}

export function PasswordField({ id, label, error, hint, className, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false)
  return (
    <Wrap {...{ id, label, error, hint, className }}>
      <div className="relative">
        <input id={id} name={id} type={show ? 'text' : 'password'} className="field-input pr-20" aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} {...rest} />
        <button type="button" onClick={() => setShow((s) => !s)} aria-pressed={show} aria-controls={id}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md px-3 py-1.5 text-xs font-bold text-orange-dark hover:bg-orange-light">
          {show ? 'Hide' : 'Show'}
          <span className="sr-only"> password</span>
        </button>
      </div>
    </Wrap>
  )
}

export function SelectField({ id, label, error, hint, optional, className, options, placeholder = 'Select…', ...rest }: Base & SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; placeholder?: string }) {
  return (
    <Wrap {...{ id, label, error, hint, optional, className }}>
      <select id={id} name={id} className="field-input" aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} {...rest}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </Wrap>
  )
}

export function TextArea({ id, label, error, hint, optional, className, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap {...{ id, label, error, hint, optional, className }}>
      <textarea id={id} name={id} rows={5} className="field-input" aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} {...rest} />
    </Wrap>
  )
}

export function CheckField({ id, label, error, checked, onChange }: { id: string; label: ReactNode; error?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-ink-2">
        <input id={id} name={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-orange" />
        <span>{label}</span>
      </label>
      {error && <p id={`${id}-error`} className="field-error ml-8">{error}</p>}
    </div>
  )
}

/** Error summary listing every error with a link to its field. */
export function ErrorSummary({ errors, labels }: { errors: Errors; labels?: Record<string, string> }) {
  const keys = Object.keys(errors)
  if (!keys.length) return null
  const go = (k: string) => {
    const el = document.getElementById(k)
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); (el as HTMLElement).focus({ preventScroll: true }) }
  }
  return (
    <div id="error-summary" tabIndex={-1} role="alert" aria-labelledby="error-summary-title"
      className="mb-8 scroll-mt-28 rounded-xl border-2 border-red-600 bg-red-50 p-4 sm:p-5">
      <h2 id="error-summary-title" className="flex items-center gap-2 text-base font-extrabold text-red-800">
        <Alert /> Please correct {keys.length === 1 ? 'this error' : `these ${keys.length} errors`}
      </h2>
      <ul className="mt-3 space-y-1.5 text-sm">
        {keys.map((k) => (
          <li key={k}>
            <button type="button" onClick={() => go(k)} className="text-left font-semibold text-red-800 underline underline-offset-2 hover:text-red-950">
              {labels?.[k] ? `${labels[k]}: ` : ''}{errors[k]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Fieldset({ legend, step, children }: { legend: string; step?: number; children: ReactNode }) {
  return (
    <fieldset className="card p-5 sm:p-7">
      <legend className="sr-only">{legend}</legend>
      <div aria-hidden className="mb-5 flex items-center gap-3">
        {step !== undefined && <span className="grid h-8 w-8 place-items-center rounded-full bg-orange text-sm font-black text-ink">{step}</span>}
        <span className="text-lg font-extrabold">{legend}</span>
      </div>
      {children}
    </fieldset>
  )
}

export function SuccessPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="card border-t-4 border-t-orange p-6 text-center sm:p-10">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-orange-light text-orange-dark"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden><path d="M20 6 9 17l-5-5" /></svg></div>
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mx-auto mt-3 max-w-xl text-neutral-700">{children}</div>
    </div>
  )
}
