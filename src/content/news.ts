export interface Article {
  slug: string
  title: string
  date: string
  category: string
  summary: string
  image: string
  imageAlt: string
  body: { h?: string; p?: string; list?: string[] }[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'understanding-tiers',
    title: 'Understanding the three tiers of Ghana’s pension system',
    date: '2026-09-15',
    category: 'Pension basics',
    summary: 'Tier 1, Tier 2 and Tier 3 explained in plain language — who pays, who manages your money and how each tier supports you in retirement.',
    image: '/img/slide1.jpg',
    imageAlt: 'IPTC Tier 2 Scheme banner: retire in comfort with IPTC Tier 2.',
    body: [
      { p: 'Ghana’s pension system, set up under the National Pensions Act, 2008 (Act 766), has three tiers. Together they are designed to give every worker an income and a lump sum when they stop working. Knowing how each tier works helps you plan, and helps you see where Industrial Pensions Trust fits in.' },
      { h: 'Tier 1: the basic national social security scheme' },
      { p: 'Tier 1 is managed by SSNIT. It pays a monthly pension for life once you qualify, and also covers invalidity and survivors’ benefits. It is mandatory for workers in the formal sector.' },
      { h: 'Tier 2: the mandatory occupational scheme' },
      { p: 'Tier 2 is also mandatory for formal-sector workers. Your employer pays 5% of your basic salary into a Tier 2 scheme run by a private corporate trustee licensed by the National Pensions Regulatory Authority (NPRA). The money is invested on your behalf and paid to you as a lump sum when you retire.' },
      { p: 'IPTC is a licensed corporate trustee. When your employer chooses IPTC, we manage your Tier 2 account, invest it with approved fund managers and keep it safe with an independent custodian.' },
      { h: 'Tier 3: the voluntary personal or provident fund scheme' },
      { p: 'Tier 3 is voluntary. You, your employer, or both, can contribute extra savings for your retirement. Tier 3 is also open to self-employed people and workers in the informal sector — traders, artisans, drivers, farmers and more.' },
      { list: [
        'Contributions to Tier 2 and Tier 3 together are tax-deductible up to 16.5% of your monthly salary.',
        'Tier 3 savings left for the full vesting period can be withdrawn free of tax.',
        'You can save daily, weekly or monthly, by Mobile Money or bank.',
      ] },
      { h: 'Which tier should I think about first?' },
      { p: 'If you are employed, Tier 1 and Tier 2 are already working for you — check your statements to make sure your employer is paying on time. Tier 3 is how you top up. Even a small, regular amount grows meaningfully over 20 or 30 years. Try our pension calculator to see what it could mean for you.' },
    ],
  },
  {
    slug: 'paying-on-time',
    title: 'Why paying Tier 2 contributions on time matters',
    date: '2026-08-28',
    category: 'For employers',
    summary: 'Tier 2 contributions are due by the 14th of the following month. Late payment costs your staff investment returns and can attract penalties.',
    image: '/img/slide2.jpg',
    imageAlt: 'Secure your tomorrow banner: a father receives a gift from his daughter.',
    body: [
      { p: 'Every month, employers must deduct and pay Tier 2 contributions for their employees. Under the National Pensions Act, 2008 (Act 766), contributions are due within 14 days after the end of the month in which they were earned.' },
      { h: 'What late payment costs your employees' },
      { p: 'Pension savings grow through compounding. When a contribution arrives late, it misses out on investment returns for that period — and the lost growth itself would also have grown over the years to retirement. Small delays, repeated every month, add up to a noticeably smaller lump sum.' },
      { h: 'What late payment costs your business' },
      { p: 'Unpaid or late contributions can attract surcharges and penalties under Act 766, and the NPRA may take enforcement action. Late payments also create reconciliation work and questions from staff.' },
      { h: 'How IPTC makes it easier' },
      { list: [
        'A simple contribution schedule template for your monthly upload.',
        'Clear payment instructions, including bank transfer.',
        'A dedicated employer relationship officer to help with any questions.',
        'Statements so your staff can see their contributions arrive.',
      ] },
      { p: 'Need help setting up your company with IPTC? Register your company online or call us — we will guide you through every step.' },
    ],
  },
]

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug)
export const fmtDate = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
