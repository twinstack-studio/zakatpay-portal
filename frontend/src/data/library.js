/**
 * Content for the downloadable audit reports and e-books.
 * Kept out of the page components so the documents and the cards on screen
 * always describe the same thing.
 */

export const auditReports = [
  {
    id: 'fy2025-26',
    year: '2025 - 2026',
    title: 'Annual Zakat & Sadaqah Audit',
    date: 'August 2026',
    ref: 'ZP/AUD/2026/014',
    size: '4.2 MB',
    pages: 2,
    accent: [219, 39, 119],
    collected: 486300000,
    disbursed: 486300000,
    auditor: 'Rahman Sadiq & Co.',
    summary:
      'This report covers all Zakat and Sadaqah routed through the ZakatPay platform between 1 July 2025 and 30 June 2026. Funds were verified against bank settlement records and the receiving organisations’ own acknowledgements. No variance was identified between amounts collected from donors and amounts settled to partner organisations.',
    allocations: [
      { label: 'Healthcare & Medical Relief', pct: 45 },
      { label: 'Education & Orphan Support', pct: 30 },
      { label: 'Food & Clean Water Projects', pct: 15 },
      { label: 'Emergency Disaster Relief', pct: 10 },
    ],
    methodology:
      'Testing was performed on a sample of 2,400 transactions selected on a stratified random basis across all twelve months, supplemented by full-population testing of every transaction above PKR 500,000. Settlement timing was traced from the payment gateway report to the partner organisation bank statement. Shariah compliance of each recipient category was reviewed against the eight asnaf defined in Surah At-Tawbah 9:60.',
    findings: [
      'All 2,400 sampled transactions settled to the donor-designated organisation within the stated 72-hour window.',
      'Platform operating costs were met entirely from private sponsorship; no donor funds were applied to overheads.',
      'Every receiving organisation held a valid FBR tax-exemption certificate throughout the period under review.',
      'Three organisations were removed from the platform during the year following delays in impact reporting.',
    ],
    opinion:
      'In our opinion the accompanying statements present fairly, in all material respects, the collection and disbursement of Zakat and Sadaqah by ZakatPay for the year ended 30 June 2026, in accordance with AAOIFI guidance and applicable Shariah principles.',
  },
  {
    id: 'fy2024-25',
    year: '2024 - 2025',
    title: 'Consolidated Financial Report',
    date: 'July 2025',
    ref: 'ZP/AUD/2025/009',
    size: '3.8 MB',
    pages: 2,
    accent: [147, 51, 234],
    collected: 341750000,
    disbursed: 341750000,
    auditor: 'Rahman Sadiq & Co.',
    summary:
      'The second full year of platform operation saw donor numbers grow by 62% while the average donation size remained broadly stable. This report consolidates collection, settlement and impact reporting across all eleven partner organisations active during the period.',
    allocations: [
      { label: 'Healthcare & Medical Relief', pct: 40 },
      { label: 'Education & Orphan Support', pct: 35 },
      { label: 'Food & Clean Water Projects', pct: 15 },
      { label: 'Emergency Disaster Relief', pct: 10 },
    ],
    methodology:
      'A full reconciliation was performed between gateway settlement files, the platform ledger and partner acknowledgements. Impact claims published on the platform were sampled and traced back to the underlying beneficiary records held by each organisation.',
    findings: [
      'Education allocation rose five percentage points, driven by the winter scholarship campaign.',
      'Average settlement time improved from 96 hours to 71 hours over the course of the year.',
      'Two impact claims required restatement after beneficiary counts could not be substantiated.',
      'No instance was found of donor funds being applied outside the designated category.',
    ],
    opinion:
      'In our opinion the consolidated statements give a true and fair view of the platform’s collection and disbursement activity for the year ended 30 June 2025, subject to the two restated impact claims described above.',
  },
  {
    id: 'fy2023-24',
    year: '2023 - 2024',
    title: 'Third-Party Impact & Audit',
    date: 'July 2024',
    ref: 'ZP/AUD/2024/006',
    size: '3.5 MB',
    pages: 2,
    accent: [13, 148, 136],
    collected: 198400000,
    disbursed: 198400000,
    auditor: 'Meezan Assurance Partners',
    summary:
      'This engagement combined a financial audit with an independent field verification of impact claims. Field teams visited 34 project sites across Sindh, Punjab and Khyber Pakhtunkhwa to confirm that reported beneficiaries could be identified and that delivered goods matched the stated value.',
    allocations: [
      { label: 'Healthcare & Medical Relief', pct: 35 },
      { label: 'Education & Orphan Support', pct: 30 },
      { label: 'Food & Clean Water Projects', pct: 20 },
      { label: 'Emergency Disaster Relief', pct: 15 },
    ],
    methodology:
      'Financial testing followed the same sampling approach as prior years. Field verification was conducted without prior notice to the receiving organisation, and beneficiaries were interviewed independently of project staff.',
    findings: [
      'Beneficiary records at 32 of the 34 sites visited reconciled fully to the reported figures.',
      'Two water projects were behind schedule; funds were held in escrow rather than released early.',
      'Emergency relief allocation increased following the 2023 monsoon flooding response.',
      'Cost per beneficiary was materially consistent with comparable programmes in the sector.',
    ],
    opinion:
      'Based on our financial testing and independent field verification, the reported use of funds for the year ended 30 June 2024 is fairly stated and the associated impact claims are substantiated.',
  },
  {
    id: 'fy2022-23',
    year: '2022 - 2023',
    title: 'Initial Transparency Report',
    date: 'June 2023',
    ref: 'ZP/AUD/2023/001',
    size: '2.1 MB',
    pages: 2,
    accent: [37, 99, 235],
    collected: 74900000,
    disbursed: 74900000,
    auditor: 'Meezan Assurance Partners',
    summary:
      'ZakatPay’s first published audit, covering the platform’s launch period. Transaction volumes were modest, which allowed full-population testing rather than sampling. This report establishes the baseline controls against which subsequent years are measured.',
    allocations: [
      { label: 'Healthcare & Medical Relief', pct: 50 },
      { label: 'Education & Orphan Support', pct: 25 },
      { label: 'Food & Clean Water Projects', pct: 15 },
      { label: 'Emergency Disaster Relief', pct: 10 },
    ],
    methodology:
      'Every transaction recorded during the period was tested and traced to settlement. Controls over donor data, gateway reconciliation and partner onboarding were documented and walked through with management.',
    findings: [
      'All transactions in the period were traced end to end with no exceptions.',
      'Partner onboarding checks were documented but not yet formally approved; a control gap now closed.',
      'The zero-fee policy was verified against the platform’s sponsorship agreements.',
      'Healthcare dominated allocation, reflecting the launch partnership with two hospital networks.',
    ],
    opinion:
      'In our opinion the statements for the period ended 30 June 2023 are free from material misstatement, and the platform’s stated zero-fee policy was applied consistently throughout.',
  },
];

export const ebooks = [
  {
    id: 'guide-to-zakat',
    title: 'The Ultimate Guide to Zakat',
    titleLines: ['The Ultimate', 'Guide to Zakat'],
    subtitle: 'Calculation, rules and common mistakes',
    desc: 'A comprehensive guide on calculation and rules.',
    author: 'ZakatPay Research Desk',
    edition: 'Fourth edition - 2026',
    color: 'from-pink-600 to-red-600',
    accent: [219, 39, 119],
    blurb:
      'A practical handbook for anyone working out what they owe. It covers the nisab threshold, the lunar year, which assets count, and the deductions people most often get wrong.',
    chapters: [
      {
        title: 'What Zakat Actually Is',
        body: [
          'Zakat is the third pillar of Islam and, unlike voluntary charity, it is an obligation with defined rules. It is due from every sane adult Muslim whose surplus wealth has stayed above the nisab threshold for a full lunar year.',
          'The word itself carries two meanings: purification and growth. The wealth that remains after Zakat is paid is considered purified, and the act is understood to increase rather than diminish what a person has.',
          'Zakat is not a tax on income. It is a levy on accumulated surplus wealth. Somebody with a large salary who spends it all may owe nothing, while somebody with modest earnings but significant savings may owe a considerable amount.',
        ],
        note: 'Zakat is due once per lunar (hijri) year, which is roughly eleven days shorter than the solar year.',
      },
      {
        title: 'Working Out Your Nisab',
        body: [
          'Nisab is the minimum amount of wealth a person must hold before Zakat becomes obligatory. It is defined in two ways: the value of 87.48 grams of gold, or the value of 612.36 grams of silver.',
          'The silver threshold is almost always the lower of the two, and the majority position among contemporary scholars is to use it, because a lower threshold means more people qualify to give and more of the poor benefit.',
          'Whichever standard you follow, apply it consistently year to year. Switching between gold and silver depending on which produces a smaller bill is not in the spirit of the obligation.',
        ],
      },
      {
        title: 'Which Assets Count',
        body: [
          'Zakatable assets include cash in hand and in bank accounts, gold and silver in any form, business stock held for resale, receivables you reasonably expect to collect, and shares held for trading.',
          'Assets excluded from the calculation include your primary residence, personal clothing and furniture, the vehicle you use, and the tools of your trade. These are considered items in use rather than accumulated surplus.',
          'Gold and silver jewellery is the point of most disagreement. The Hanafi position treats it as zakatable regardless of use; other schools exempt jewellery in regular personal wear. Follow the position of the school you otherwise adhere to.',
        ],
        note: 'Debts you owe and that are due within the year may generally be deducted before applying the 2.5% rate.',
      },
      {
        title: 'Common Mistakes',
        body: [
          'The most frequent error is calculating on the wrong date. Zakat is assessed on your wealth as it stands on your annual due date, not averaged across the year and not based on the day you happen to remember.',
          'The second is forgetting money that is owed to you. A loan you made to a friend and reasonably expect back is part of your zakatable wealth even though it is not in your account.',
          'The third is deducting long-term liabilities in full. A thirty-year mortgage is not deducted in its entirety; only the instalments falling due within the coming year are normally subtracted.',
        ],
      },
    ],
  },
  {
    id: 'fiqh-of-sadaqah',
    title: 'Fiqh of Sadaqah',
    titleLines: ['Fiqh of', 'Sadaqah'],
    subtitle: 'The rulings and virtues of voluntary giving',
    desc: 'Understanding the virtues of voluntary charity.',
    author: 'ZakatPay Research Desk',
    edition: 'Second edition - 2026',
    color: 'from-purple-600 to-indigo-600',
    accent: [147, 51, 234],
    blurb:
      'Where Zakat is an obligation with fixed limits, Sadaqah is open-ended. This book sets out what distinguishes the two, the forms voluntary charity can take, and the etiquette that preserves its reward.',
    chapters: [
      {
        title: 'Sadaqah and Zakat Compared',
        body: [
          'Zakat is obligatory, fixed at 2.5% of qualifying wealth, restricted to eight defined categories of recipient, and due annually. Sadaqah carries none of those constraints.',
          'Sadaqah may be given at any time, in any amount, to any person or cause that benefits others. It may be money, but it may equally be food, labour, or knowledge.',
          'Because Sadaqah is voluntary, paying it does not discharge a Zakat obligation. A person who gives generously all year still owes their Zakat separately.',
        ],
        note: 'Sadaqah given to a family member in need carries the reward of both charity and maintaining kinship ties.',
      },
      {
        title: 'Sadaqah Jariyah',
        body: [
          'Sadaqah jariyah is continuing charity: a gift whose benefit outlasts the giver. A well that still provides water, a school that still teaches, a tree that still bears fruit.',
          'The distinguishing feature is that the reward continues to accrue after death. This is why endowment structures, or waqf, have historically been the preferred vehicle for large charitable gifts in Muslim societies.',
          'Modern equivalents include funding a teacher’s salary in perpetuity, endowing medical equipment, or supporting the production of freely available beneficial knowledge.',
        ],
      },
      {
        title: 'The Etiquette of Giving',
        body: [
          'The Qur’an is explicit that charity followed by reminders of the favour, or by injury to the recipient’s dignity, is nullified. The manner of giving is not incidental to the act.',
          'Discretion is generally preferred. Giving without the recipient knowing the source protects them from obligation and protects the giver from the desire to be seen.',
          'Give from what you value. The instruction is to spend from what you love, not from what you were going to discard.',
        ],
      },
    ],
  },
  {
    id: 'ramadan-philanthropy',
    title: 'Ramadan Philanthropy',
    titleLines: ['Ramadan', 'Philanthropy'],
    subtitle: 'Planning your giving through the holy month',
    desc: 'Maximizing your spiritual rewards during the holy month.',
    author: 'ZakatPay Research Desk',
    edition: 'Third edition - 2026',
    color: 'from-emerald-600 to-teal-600',
    accent: [13, 148, 136],
    blurb:
      'Most charitable giving in Pakistan happens in a single month. This book is about giving in Ramadan deliberately rather than reactively, so that the money lands where it does the most good.',
    chapters: [
      {
        title: 'Why Ramadan Concentrates Giving',
        body: [
          'Ramadan accounts for a disproportionate share of annual charitable donations across the Muslim world. The month carries multiplied reward, and fasting itself makes the condition of the hungry immediate rather than abstract.',
          'This concentration has a practical consequence. Charities receive a large share of their annual funding in a four-week window, which makes planning difficult and can leave programmes underfunded for the rest of the year.',
          'Giving in Ramadan is entirely appropriate. Committing to a schedule that spreads the disbursement is what turns a seasonal impulse into a sustained programme.',
        ],
        note: 'Many organisations will accept a Ramadan donation and disburse it across the following twelve months on request.',
      },
      {
        title: 'Zakat al-Fitr',
        body: [
          'Zakat al-Fitr is a separate, smaller obligation due before the Eid prayer. It is paid on behalf of every member of the household, including children and dependants.',
          'The amount is traditionally measured as one sa’ of the local staple food, commonly calculated as approximately 2.25 to 3 kilograms of wheat, flour, dates or rice, or its cash equivalent.',
          'Its purpose is specific: to ensure that nobody in the community has to beg on the day of Eid. Timing therefore matters, and paying it after the Eid prayer means it counts as ordinary charity instead.',
        ],
      },
      {
        title: 'The Last Ten Nights',
        body: [
          'The final ten nights contain Laylat al-Qadr, described in the Qur’an as better than a thousand months. Worship performed on that night carries reward beyond ordinary reckoning.',
          'Because the exact night is not disclosed, a common practice is to divide an intended donation across all ten nights rather than guessing, ensuring the gift falls on Laylat al-Qadr whichever night it is.',
          'The same logic applies to other acts. Consistency across the ten nights is more reliable than concentrating effort on the twenty-seventh alone.',
        ],
      },
    ],
  },
  {
    id: 'nisab-modern-assets',
    title: 'Nisab & Modern Assets',
    titleLines: ['Nisab &', 'Modern Assets'],
    subtitle: 'Shares, funds, pensions and digital holdings',
    desc: 'How classical rules apply to shares, funds, pensions and crypto.',
    author: 'ZakatPay Research Desk',
    edition: 'First edition - 2026',
    color: 'from-amber-500 to-orange-600',
    accent: [217, 119, 6],
    blurb:
      'The classical texts did not anticipate index funds or digital assets, but the principles behind them transfer cleanly. This book applies those principles to the instruments people actually hold today.',
    chapters: [
      {
        title: 'The Underlying Principle',
        body: [
          'Every ruling on a modern asset comes back to one question: is this surplus wealth capable of growth, held by you, and accessible to you? If it is, it is generally zakatable.',
          'This is why a house you live in is exempt while a house you hold to resell is not. The asset is the same; the intention behind holding it differs, and intention is what the classical rules turn on.',
          'Applying this test yourself will resolve most novel cases without needing a specific ruling for each new financial product.',
        ],
        note: 'Where a case is genuinely unclear, the safer course is to pay. Overpaying Zakat is not a harm.',
      },
      {
        title: 'Shares and Investment Funds',
        body: [
          'Shares bought with the intention of trading are treated as trade goods: Zakat is due on their full market value on your annual due date.',
          'Shares held for long-term income are treated differently. The majority contemporary position is that Zakat is due on your proportionate share of the company’s zakatable assets, chiefly its cash and inventory, rather than on the full share price.',
          'Because that proportion is difficult to establish from published accounts, many scholars accept a practical approximation of between 25% and 40% of the holding’s market value as the zakatable base.',
        ],
      },
      {
        title: 'Pensions and Restricted Funds',
        body: [
          'The treatment of pensions turns on access. Where funds can be withdrawn, even with a penalty, most contemporary scholars hold that Zakat is due annually on the accessible balance.',
          'Where the fund is genuinely locked until retirement and the holder has no legal right to draw on it, a widely held position is that Zakat becomes due only when the funds are actually received.',
          'Employer contributions not yet vested are generally excluded, since the employee has no established ownership of them.',
        ],
      },
      {
        title: 'Digital Assets',
        body: [
          'Cryptocurrency held as an investment is treated as a tradeable asset. Zakat is calculated at 2.5% of its market value on your due date, in the same way as shares held for trading.',
          'The volatility of these assets does not change the ruling. The valuation date is your annual due date, regardless of what the price did before or after.',
          'Tokens representing a claim on an underlying real asset follow the ruling of that asset. Holdings you cannot access or value with reasonable confidence should be reviewed with a qualified scholar.',
        ],
      },
    ],
  },
  {
    id: 'zakat-business-trade',
    title: 'Zakat on Business & Trade',
    titleLines: ['Zakat on', 'Business & Trade'],
    subtitle: 'Stock, receivables and the trading balance sheet',
    desc: 'A working guide for business owners and traders.',
    author: 'ZakatPay Research Desk',
    edition: 'First edition - 2026',
    color: 'from-blue-600 to-cyan-600',
    accent: [37, 99, 235],
    blurb:
      'Business Zakat is where most miscalculation happens, usually because the owner applies personal rules to a trading balance sheet. This book sets out the calculation as a business would actually perform it.',
    chapters: [
      {
        title: 'Trade Goods',
        body: [
          'Trade goods are anything bought with the intention of resale. They are valued at current market selling price on your due date, not at what you paid for them.',
          'Fixed assets used to run the business are excluded. Delivery vehicles, machinery, computers and shop fittings generate income but are not themselves held for sale.',
          'The distinction is intention at acquisition. A vehicle bought to deliver goods is exempt; the same vehicle held on a forecourt for sale is trade stock.',
        ],
        note: 'Value stock at what you would sell it for today, not at cost and not at its original list price.',
      },
      {
        title: 'Receivables and Payables',
        body: [
          'Debts owed to the business fall into two categories. Amounts you reasonably expect to collect are added to the zakatable base in the current year.',
          'Amounts that are genuinely doubtful are excluded until recovered, at which point Zakat is normally paid for the year of receipt rather than retrospectively for every year the debt was outstanding.',
          'Short-term payables, including supplier invoices and the coming year’s instalments on business loans, are deducted before the rate is applied.',
        ],
      },
      {
        title: 'Performing the Calculation',
        body: [
          'Start with cash at bank and in hand. Add the market value of trade stock. Add collectible receivables. Add any short-term investments held by the business.',
          'From that total, subtract short-term liabilities: supplier balances, wages payable, and loan instalments falling due within the coming twelve months.',
          'Apply 2.5% to the result. In a partnership, each partner is liable for their own share in proportion to their stake, since Zakat is an individual obligation rather than a corporate one.',
        ],
      },
    ],
  },
  {
    id: 'eight-categories',
    title: 'The Eight Categories',
    titleLines: ['The Eight', 'Categories'],
    subtitle: 'Who may receive Zakat, and who may not',
    desc: 'The asnaf of Surah At-Tawbah explained in practice.',
    author: 'ZakatPay Research Desk',
    edition: 'First edition - 2026',
    color: 'from-rose-600 to-fuchsia-600',
    accent: [225, 29, 72],
    blurb:
      'Zakat may only go to eight categories of recipient, named directly in the Qur’an. This book explains each one and addresses the questions that arise when applying them today.',
    chapters: [
      {
        title: 'The Qur’anic Text',
        body: [
          'Surah At-Tawbah 9:60 names the eight categories: the poor, the needy, those employed to administer Zakat, those whose hearts are to be reconciled, those in bondage, the debt-ridden, those in the cause of Allah, and the wayfarer.',
          'This list is exhaustive rather than illustrative. Zakat directed outside these categories does not discharge the obligation, however worthwhile the cause.',
          'This is the sharpest practical difference between Zakat and Sadaqah, and the reason charities separate the two funds rather than pooling them.',
        ],
        note: 'A mosque building fund is a worthy cause but is not, on the majority view, an eligible Zakat recipient.',
      },
      {
        title: 'The Poor and the Needy',
        body: [
          'The first two categories, al-fuqara and al-masakin, together account for the large majority of Zakat distribution. Both describe people whose income does not meet their basic needs.',
          'Scholars distinguish between them by degree, with the fuqara in the more severe condition. For practical distribution the distinction rarely matters, since both are eligible.',
          'Eligibility is assessed against the nisab. A person whose surplus wealth is below the threshold may receive Zakat; a person above it may not.',
        ],
      },
      {
        title: 'The Remaining Categories',
        body: [
          'Administrators of Zakat may be paid from it, which is the basis on which collecting bodies fund their collection work. This does not extend to unrelated overheads.',
          'The debt-ridden category covers those unable to repay debts incurred for lawful and necessary purposes. Debts arising from prohibited activity do not qualify.',
          'The wayfarer is a traveller stranded without means to complete their journey, even if they are wealthy at home. Modern application includes refugees and displaced people cut off from their assets.',
        ],
      },
      {
        title: 'Who May Not Receive',
        body: [
          'Zakat may not be paid to your own dependants: parents, grandparents, children and grandchildren, or a spouse. Supporting them is already an obligation, and paying Zakat to them would discharge one duty using another.',
          'Siblings, uncles, aunts, nephews and nieces are not dependants in this sense and may receive Zakat if they are eligible. Giving to eligible relatives is in fact preferred.',
          'The descendants of the Prophet, peace be upon him, are traditionally not given Zakat, and voluntary Sadaqah is directed to them instead.',
        ],
      },
    ],
  },
];
