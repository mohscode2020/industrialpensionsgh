export interface CalcInput {
  age: number
  retireAge: number
  salary: number
  tier3: number
  topUp: number
  annualReturn: number // percent, e.g. 10
  tier2Balance: number
  tier3Balance: number
  includeTier2: boolean
  includeTier3: boolean
}

export interface YearPoint { year: number; age: number; tier2: number; tier3: number }

export interface CalcResult {
  tier2: number
  tier3: number
  total: number
  tier2Monthly: number
  tier3Monthly: number
  monthly: number
  months: number
  yearly: YearPoint[]
}

export const TIER2_RATE = 0.05

/**
 * Monthly compounding: r = annual rate / 12.
 * Each month: balance = balance × (1 + r) + contribution.
 */
export function project(i: CalcInput): CalcResult {
  const r = i.annualReturn / 100 / 12
  const years = Math.max(0, Math.round(i.retireAge - i.age))
  const months = years * 12
  const tier2Monthly = i.includeTier2 ? i.salary * TIER2_RATE : 0
  const tier3Monthly = i.includeTier3 ? i.tier3 + i.topUp : 0
  let b2 = i.includeTier2 ? i.tier2Balance : 0
  let b3 = i.includeTier3 ? i.tier3Balance : 0
  const yearly: YearPoint[] = []
  for (let m = 1; m <= months; m++) {
    b2 = b2 * (1 + r) + tier2Monthly
    b3 = b3 * (1 + r) + tier3Monthly
    if (m % 12 === 0) yearly.push({ year: m / 12, age: i.age + m / 12, tier2: b2, tier3: b3 })
  }
  const round = (n: number) => Math.round(n * 100) / 100
  return {
    tier2: round(b2),
    tier3: round(b3),
    total: round(b2) + round(b3),
    tier2Monthly,
    tier3Monthly,
    monthly: tier2Monthly + tier3Monthly,
    months,
    yearly,
  }
}
