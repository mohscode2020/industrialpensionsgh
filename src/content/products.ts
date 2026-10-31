// Product wording from IPTC's PRODUCTS document.
export interface Product {
  slug: string
  name: string
  tag: string
  tier: 'Tier 3'
  summary: string
  image: string
  imagePos: string
  imageAlt: string
  intro?: string
  benefits: { title: string; text: string }[]
  cta: 'join' | 'employer'
}

export const PRODUCTS: Product[] = [
  {
    slug: 'nkosoo',
    name: 'Nkɔsoɔ Pensions & Welfare Scheme',
    tag: 'Informal sector groups',
    tier: 'Tier 3',
    summary: 'This is our premier retirement solution, specifically designed to cater to members in the informal sector who are affiliated with social and industrial groups. This includes associations, family groups, welfare groups, religious organizations, networks, partnerships, clubs, and more.',
    image: '/img/auth_employer.jpg',
    imagePos: 'center 30%',
    imageAlt: 'Ghanaian workers from many trades — a mechanic, a trader, a tailor and artisans — standing together.',
    benefits: [
      { title: 'Welfare', text: 'Members can access funds to address social needs when required.' },
      { title: 'Retirement & Pension', text: 'Eligible members receive benefits upon retirement, death, or total and permanent disability.' },
      { title: 'Annuity', text: 'This benefit ensures a steady income stream for members once they reach retirement age.' },
      { title: 'Funeral Insurance Cover', text: 'In the unfortunate event of a member’s passing, this insurance policy guarantees a predetermined amount to cover related funeral expenses.' },
    ],
    cta: 'join',
  },
  {
    slug: 'cedi-a-day',
    name: 'Cedi A Day Pension Scheme',
    tag: 'Personal pension · informal sector',
    tier: 'Tier 3',
    summary: 'The Cedi A Day Pension Scheme is a tailored personal pension solution crafted for individuals operating within the informal sector. Our objective is to address the unique retirement requirements of everyday workers, ensuring a secure future.',
    image: '/img/slide3.jpg',
    imagePos: '22% center',
    imageAlt: 'A smiling market trader in a yellow apron at her fruit stall.',
    benefits: [
      { title: 'Retirement & Pension', text: 'Accessible after a member retires, dies, or experiences permanent and total disability.' },
      { title: 'Annuity', text: 'Upon retirement, a steady income is assured through this benefit.' },
      { title: 'Funeral Insurance Cover', text: 'In the unfortunate event of a contributor’s passing, this insurance policy guarantees a predetermined amount to cover associated funeral expenses.' },
    ],
    cta: 'join',
  },
  {
    slug: 'provident-fund',
    name: 'IPTC Provident Fund Scheme',
    tag: 'For company employees',
    tier: 'Tier 3',
    summary: 'A voluntary contributory plan aiming to strengthen company employees’ retirement savings. By participating in this plan, individuals can accumulate an additional lump sum to supplement their mandatory pension, ensuring a more secure and comfortable retirement.',
    image: '/img/slide1.jpg',
    imagePos: '18% center',
    imageAlt: 'A smiling young professional in a suit holding an IPTC brochure.',
    intro: 'Welcome to IPTC’s Provident Fund Scheme, a dedicated initiative aimed at securing the financial future of our valued employees. This structured savings scheme is carefully crafted to provide a safety net during retirement and critical life events.',
    benefits: [
      { title: 'Retirement Security', text: 'At its core, the IPTC Provident Fund is designed to give employees a steady and reliable source of income after retirement. Employees contribute a portion of their salary during their working years, building a robust nest egg for their retirement years.' },
      { title: 'Voluntary Contributions', text: 'Flexibility is key. The Provident Fund allows voluntary contributions, so employees can actively shape their financial future. Contributions can be a percentage of salary or a fixed amount, providing choice and control.' },
      { title: 'Employer Involvement', text: 'Employers deduct the agreed contribution from the employee’s salary and, in certain cases, may make matching contributions, increasing the fund’s growth potential.' },
      { title: 'Investment and Growth', text: 'The funds accumulated within the IPTC Provident Fund are prudently invested in a diverse range of financial instruments. This approach aims to optimise growth over time and maximise the fund’s value, for better benefits at retirement.' },
      { title: 'Withdrawal', text: 'Employees can access their Provident Fund on reaching the eligible retirement age, or in specific circumstances such as disability, severe illness or emigration. The fund pays a lump sum to the contributor or their beneficiaries, giving financial stability at critical moments.' },
      { title: 'Tax Exemption', text: 'Enjoy peace of mind: your contributions become entirely tax-free after ten years.' },
      { title: 'Regulation and Oversight', text: 'IPTC’s Provident Fund operates under strict regulation and oversight by the relevant government bodies. This ensures compliance, transparency and prudent fund management, and builds trust among our contributors.' },
    ],
    cta: 'employer',
  },
]

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug)
