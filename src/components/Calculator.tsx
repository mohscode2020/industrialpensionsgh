import { useId, useMemo, useState } from 'react'
import { project } from '../lib/calc'
import { cedi } from '../lib/format'
import { TierKey } from './Bits'

type Tab = 't2' | 't3' | 'both'
const TABS: { id: Tab; label: string }[] = [
  { id: 't2', label: 'Tier 2' },
  { id: 't3', label: 'Tier 3' },
  { id: 'both', label: 'Tier 2 + Tier 3' },
]

function Range({ label, value, min, max, step, onChange, display }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; display: string
}) {
  const id = useId()
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-ink-2">{label}</label>
        <output htmlFor={id} className="whitespace-nowrap text-sm font-extrabold text-ink">{display}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} aria-valuetext={display}
        className="h-2 w-full cursor-pointer" />
    </div>
  )
}

export default function Calculator() {
  const [tab, setTab] = useState<Tab>('both')
  const [age, setAge] = useState(30)
  const [retireAge, setRetireAge] = useState(60)
  const [salary, setSalary] = useState(3000)
  const [tier3, setTier3] = useState(100)
  const [topUp, setTopUp] = useState(0)
  const [rate, setRate] = useState(10)
  const [bal2, setBal2] = useState(0)
  const [bal3, setBal3] = useState(0)

  const has2 = tab !== 't3'
  const has3 = tab !== 't2'
  const res = useMemo(() => project({
    age, retireAge, salary, tier3, topUp, annualReturn: rate, tier2Balance: bal2, tier3Balance: bal3, includeTier2: has2, includeTier3: has3,
  }), [age, retireAge, salary, tier3, topUp, rate, bal2, bal3, has2, has3])

  const setAgeSafe = (v: number) => { setAge(v); if (retireAge <= v) setRetireAge(Math.min(75, v + 1)) }
  const setRetireSafe = (v: number) => { setRetireAge(v); if (v <= age) setAge(Math.max(18, v - 1)) }
  const max = Math.max(1, ...res.yearly.map((y) => y.tier2 + y.tier3))
  const years = retireAge - age

  return (
    <div className="card overflow-hidden">
      <div role="tablist" aria-label="Calculator type" className="flex border-b border-line bg-page">
        {TABS.map((t) => (
          <button key={t.id} role="tab" type="button" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls="calc-panel"
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => {
              const idx = TABS.findIndex((x) => x.id === tab)
              const next = e.key === 'ArrowRight' ? TABS[(idx + 1) % 3] : e.key === 'ArrowLeft' ? TABS[(idx + 2) % 3] : null
              if (next) { setTab(next.id); document.getElementById(`tab-${next.id}`)?.focus() }
            }}
            tabIndex={tab === t.id ? 0 : -1}
            className={`flex-1 border-b-4 px-2 py-3.5 text-sm font-extrabold sm:text-base ${tab === t.id
              ? t.id === 't3' ? 'border-orange bg-white text-ink' : t.id === 't2' ? 'border-ink bg-white text-ink' : 'border-orange bg-white text-ink'
              : 'border-transparent text-neutral-500 hover:text-ink'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div id="calc-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-5">
          <Range label="Current age" value={age} min={18} max={74} step={1} onChange={setAgeSafe} display={`${age} years`} />
          <Range label="Retirement age" value={retireAge} min={19} max={75} step={1} onChange={setRetireSafe} display={`${retireAge} years`} />
          {has2 && <Range label="Monthly salary" value={salary} min={0} max={50000} step={100} onChange={setSalary} display={cedi(salary)} />}
          {has3 && <Range label="Tier 3 monthly contribution" value={tier3} min={0} max={5000} step={10} onChange={setTier3} display={cedi(tier3)} />}
          {has3 && <Range label="Extra monthly top-up (optional)" value={topUp} min={0} max={5000} step={10} onChange={setTopUp} display={cedi(topUp)} />}
          <Range label="Annual return" value={rate} min={0} max={25} step={0.5} onChange={setRate} display={`${rate}%`} />
          {has2 && <Range label="Current Tier 2 balance" value={bal2} min={0} max={500000} step={500} onChange={setBal2} display={cedi(bal2)} />}
          {has3 && <Range label="Current Tier 3 balance" value={bal3} min={0} max={500000} step={500} onChange={setBal3} display={cedi(bal3)} />}
          {has2 && <p className="text-xs text-neutral-500">Tier 2 contribution is 5% of monthly salary, paid by your employer.</p>}
        </div>

        <div aria-live="polite">
          <div className="rounded-2xl bg-ink p-5 text-white sm:p-6">
            <p className="text-sm font-semibold text-neutral-300">Estimated total at age {retireAge}</p>
            <p className="mt-1 break-words text-3xl font-black tracking-tight text-orange sm:text-4xl" data-testid="calc-total">{cedi(res.total)}</p>
            <p className="mt-1 text-xs text-neutral-400">After {years} {years === 1 ? 'year' : 'years'} of contributions</p>
            <div className={`mt-5 grid gap-3 ${has2 && has3 ? 'sm:grid-cols-2' : ''}`}>
              {has2 && (
                <div className="rounded-xl border-l-4 border-white bg-ink-2 p-3.5">
                  <p className="text-xs font-semibold text-neutral-300">Tier 2</p>
                  <p className="text-lg font-extrabold" data-testid="calc-tier2">{cedi(res.tier2)}</p>
                </div>
              )}
              {has3 && (
                <div className="rounded-xl border-l-4 border-orange bg-ink-2 p-3.5">
                  <p className="text-xs font-semibold text-neutral-300">Tier 3</p>
                  <p className="text-lg font-extrabold" data-testid="calc-tier3">{cedi(res.tier3)}</p>
                </div>
              )}
            </div>
            <div className="mt-4 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between gap-3"><span className="text-neutral-300">Monthly contribution</span><strong>{cedi(res.monthly)}</strong></div>
              {has2 && has3 && (
                <p className="mt-1 text-xs text-neutral-400">Tier 2 {cedi(res.tier2Monthly)} + Tier 3 {cedi(res.tier3Monthly)}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-extrabold">Growth year by year</h3>
              {has2 && has3 ? <TierKey /> : null}
            </div>
            {res.yearly.length ? (
              <>
                <div className="flex h-48 items-end gap-[2px] border-b border-l border-line pl-1 sm:h-56" aria-hidden>
                  {res.yearly.map((y) => (
                    <div key={y.year} className="group relative flex h-full flex-1 flex-col justify-end" title={`Age ${y.age}: ${cedi(y.tier2 + y.tier3)}`}>
                      {has3 && <div className="w-full rounded-t-[2px] bg-orange" style={{ height: `${(y.tier3 / max) * 100}%` }} />}
                      {has2 && <div className={`w-full bg-ink ${!has3 ? 'rounded-t-[2px]' : ''}`} style={{ height: `${(y.tier2 / max) * 100}%` }} />}
                    </div>
                  ))}
                </div>
                <div className="mt-1 flex justify-between text-xs text-neutral-500" aria-hidden>
                  <span>Age {age + 1}</span><span>Age {retireAge}</span>
                </div>
                <table className="sr-only">
                  <caption>Projected balance at the end of each year</caption>
                  <thead><tr><th>Age</th>{has2 && <th>Tier 2</th>}{has3 && <th>Tier 3</th>}</tr></thead>
                  <tbody>{res.yearly.map((y) => <tr key={y.year}><td>{y.age}</td>{has2 && <td>{cedi(y.tier2)}</td>}{has3 && <td>{cedi(y.tier3)}</td>}</tr>)}</tbody>
                </table>
              </>
            ) : <p className="text-sm text-neutral-500">Choose a retirement age above your current age.</p>}
          </div>
          <p className="mt-5 rounded-lg bg-orange-light px-3.5 py-2.5 text-xs font-semibold text-orange-dark">
            Illustration only. Actual returns vary and are not guaranteed.
          </p>
        </div>
      </div>
    </div>
  )
}
