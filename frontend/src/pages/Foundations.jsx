import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Tilt from 'react-parallax-tilt';

// === IMPORTING FOUNDER PICTURES ===
import edhiPic from '../assets/edhi-pic.jpg';
import saylaniPic from '../assets/saylani-pic.jpg';
import indusPic from '../assets/indus-pic.jpg';
import shaukatPic from '../assets/shaukat-pic.jpg';
import chhipaPic from '../assets/chhipa-pic.jpg';
import alkhidmatPic from '../assets/alkhidmat-pic.jpg';
import jdcPic from '../assets/jdc-pic.jpg';
import tcfPic from '../assets/tcf-pic.jpg';
import akhuwatPic from '../assets/akhuwat-pic.jpg';
import siutPic from '../assets/siut-pic.jpg';
import lrbtPic from '../assets/lrbt-pic.jpg';
import transparentPic from '../assets/transparent-pic.jpg';

// ==========================================
// 12 FOUNDATIONS WITH HEAVY CONTENT & BRAND COLORS
// ==========================================
// These founder photos are framed very differently - some are tight head-and-
// shoulders portraits, others are wide shots. A single object-position cuts the
// top of the head off in a circular avatar, so each one gets its own focus
// point, picked by eye against the rendered circle.
const AVATAR_FOCUS = {
  edhi: '50% 0%',
  saylani: '50% 10%',
  indus: '50% 50%',
  shaukat: '50% 10%',
  alkhidmat: '50% 10%',
  chhipa: '50% 10%',
  jdc: '50% 10%',
  tcf: '50% 50%',
  akhuwat: '50% 10%',
  siut: '100% 50%',
  lrbt: '50% 0%',
  transparent: '50% 20%',
};

export const foundationsData = [
  { 
    id: 'edhi', name: 'Edhi Foundation', founder: 'Abdul Sattar Edhi', image: edhiPic, initials: 'AE', 
    color: 'from-red-500 to-red-700', textClass: 'text-red-500', bgClass: 'bg-red-500/20', borderClass: 'border-red-500/30',
    category: 'GENERAL WELFARE', 
    shortDesc: 'Pakistan\'s largest social welfare and ambulance network serving humanity 24/7.', 
    longDesc: 'The Edhi Foundation is a non-profit social welfare organization based in Pakistan, founded by the late Abdul Sattar Edhi in 1951. It operates the world\'s largest volunteer ambulance network, a feat recognized by the Guinness Book of World Records.\n\nBeyond emergency medical services, the foundation provides a massive umbrella of services including orphanages, homeless shelters, women\'s shelters, rehab centers, and animal shelters. Driven by Edhi Sahib’s philosophy of "Live and let live," the organization serves everyone regardless of their race, religion, or social status.\n\nWith thousands of volunteers and a massive fleet of vehicles, Edhi Foundation remains the first responder to natural disasters, accidents, and emergencies across Pakistan and internationally.',
    mission: 'To serve humanity without discrimination of race, religion, or social status, and to provide emergency assistance to those in absolute need.',
    stats: [ { label: 'Ambulances', value: '1,800+' }, { label: 'Lives Saved', value: 'Millions' } ],
    bank: 'HBL - 0042 1234567 01', jazzcash: '0300-1111111', easypaisa: '0345-1111111',
    phone: '115', email: 'info@edhi.org', website: 'www.edhi.org'
  },
  { 
    id: 'saylani', name: 'Saylani Welfare Trust', founder: 'Maulana Bashir Farooqi', image: saylaniPic, initials: 'BF', 
    color: 'from-green-500 to-emerald-600', textClass: 'text-green-400', bgClass: 'bg-green-500/20', borderClass: 'border-green-500/30',
    category: 'FOOD & EDUCATION', 
    shortDesc: 'Providing free meals to hundreds of thousands and cutting-edge IT education to youth.', 
    longDesc: 'Saylani Welfare International Trust was established in 1999 by renowned Islamic scholar Maulana Bashir Farooqi. What started as a mission to feed the hungry has now evolved into an internationally recognized welfare organization operating in over 63 areas of life.\n\nSaylani feeds more than 300,000 underprivileged people on a daily basis through its widespread Dastarkhwans. In recent years, their "Saylani Mass IT Training (SMIT)" program has revolutionized youth empowerment by teaching advanced programming, AI, and web development absolutely free, helping thousands secure freelance jobs and stabilize their families financially.\n\nFurthermore, Saylani actively works in providing clean drinking water (RO Plants), free healthcare, and blood banks, strictly maintaining Shariah compliance in the distribution of Zakat.',
    mission: 'To eradicate poverty by empowering the youth with modern tech skills while ensuring no one goes to sleep hungry.',
    stats: [ { label: 'Meals Daily', value: '300,000+' }, { label: 'IT Students', value: '100,000+' } ],
    bank: 'Meezan Bank - 0101 0101010 01', jazzcash: '0300-2222222', easypaisa: '0345-2222222',
    phone: '111-729-526', email: 'info@saylaniwelfare.com', website: 'www.saylaniwelfare.com'
  },
  { 
    id: 'indus', name: 'Indus Hospital & Health Network', founder: 'Dr. Abdul Bari Khan', image: indusPic, initials: 'AB', 
    color: 'from-rose-500 to-red-600', textClass: 'text-rose-400', bgClass: 'bg-rose-500/20', borderClass: 'border-rose-500/30',
    category: 'HEALTHCARE', 
    shortDesc: 'State-of-the-art, premium quality healthcare provided absolutely free of cost.', 
    longDesc: 'The Indus Hospital & Health Network (IHHN) is a massive philanthropic initiative started in 2007 by Dr. Abdul Bari Khan and his dedicated team. Their vision was unprecedented: to create a premium, state-of-the-art hospital completely free for the public, with no cash counters anywhere on the premises.\n\nToday, IHHN is not just one hospital but a nationwide health network operating multiple facilities in Karachi, Lahore, Muzaffargarh, and Badin. They provide completely free, world-class treatments including pediatric care, orthopedics, cardiology, and infectious disease management.\n\nOperating purely on Zakat and Sadaqah, Indus ensures that the dignity of the underprivileged is maintained while giving them medical treatment that rivals the most expensive private hospitals.',
    mission: 'To provide premium healthcare absolutely free of cost to millions of deserving patients without any discrimination.',
    stats: [ { label: 'Patients/Month', value: '500,000+' }, { label: 'Cash Counters', value: 'Zero' } ],
    bank: 'UBL - 1234 5678901 01', jazzcash: '0300-3333333', easypaisa: '0345-3333333',
    phone: '111-111-880', email: 'info@tih.org.pk', website: 'www.indushospital.org.pk'
  },
  { 
    id: 'shaukat', name: 'Shaukat Khanum (SKMCH&RC)', founder: 'Imran Khan', image: shaukatPic, initials: 'IK', 
    color: 'from-pink-600 to-rose-700', textClass: 'text-pink-400', bgClass: 'bg-pink-500/20', borderClass: 'border-pink-500/30',
    category: 'HEALTHCARE', 
    shortDesc: 'Pakistan’s largest cancer hospital providing free treatment to deserving patients.', 
    longDesc: 'Shaukat Khanum Memorial Cancer Hospital and Research Centre (SKMCH&RC) was founded by Imran Khan in memory of his mother, Shaukat Khanum, who passed away from cancer. Established in 1994 in Lahore, it is the largest tertiary care cancer center in Pakistan.\n\nThe hospital operates on a unique model where it heavily subsidizes or completely waves off the treatment costs for nearly 75% of its patients, funded almost entirely through the generous Zakat and donations of the Pakistani public. Cancer treatment is notoriously expensive, but SKMCH ensures that no patient is turned away strictly due to a lack of funds.\n\nWith fully operational hospitals in Lahore and Peshawar, and a massive new facility underway in Karachi, Shaukat Khanum remains a beacon of hope for cancer patients across the region.',
    mission: 'To act as a model institution to alleviate the suffering of patients with cancer through the application of modern methods of curative and palliative therapy.',
    stats: [ { label: 'Free Treatment', value: '75%' }, { label: 'Spent on Care', value: 'Rs. 70 Billion+' } ],
    bank: 'Bank of Punjab - 9876 5432109 01', jazzcash: '0300-4444444', easypaisa: '0345-4444444',
    phone: '0800-11555', email: 'fundraising@skm.org.pk', website: 'www.shaukatkhanum.org.pk'
  },
  { 
    id: 'alkhidmat', name: 'Alkhidmat Foundation', founder: 'Dr. Hafeez-ur-Rahman', image: alkhidmatPic, initials: 'HR', 
    color: 'from-cyan-500 to-blue-600', textClass: 'text-cyan-400', bgClass: 'bg-cyan-500/20', borderClass: 'border-cyan-500/30',
    category: 'RELIEF & WELFARE', 
    shortDesc: 'A leading NGO dedicated to disaster relief, orphan care, and community service.', 
    longDesc: 'Alkhidmat Foundation Pakistan is one of the leading, non-profit, and independent organizations, fully dedicated to humanitarian services. Established with a vision to serve humanity, it has vast networks across all provinces and districts of Pakistan.\n\nThey run specialized programs in Disaster Management, Health, Education, Orphan Care (through their renowned Aghosh Homes), Clean Water (WASH program), and Mawakhat (Microfinance). Whether it is the devastating floods, earthquakes, or international relief efforts (such as in Gaza and Syria), Alkhidmat volunteers are always on the front lines.\n\nTheir transparent system of Zakat distribution ensures that your charity reaches the most vulnerable members of society, strictly according to Islamic principles.',
    mission: 'Service to humanity with integrity, commitment, and a vision to build a disaster-resilient society.',
    stats: [ { label: 'Orphans Sponsored', value: '20,000+' }, { label: 'Water Projects', value: '15,000+' } ],
    bank: 'Dubai Islamic Bank - 5566 7788990 01', jazzcash: '0300-6666666', easypaisa: '0345-6666666',
    phone: '0800-44446', email: 'info@alkhidmat.org', website: 'www.alkhidmat.org'
  },
  { 
    id: 'chhipa', name: 'Chhipa Welfare', founder: 'Ramzan Chhipa', image: chhipaPic, initials: 'RC', 
    color: 'from-orange-500 to-amber-600', textClass: 'text-orange-400', bgClass: 'bg-orange-500/20', borderClass: 'border-orange-500/30',
    category: 'GENERAL WELFARE', 
    shortDesc: 'Swift ambulance service, free meals, and rescuing abandoned newborns.', 
    longDesc: 'Chhipa Welfare Association, founded by Ramzan Chhipa, is a highly active and visible welfare organization primarily operating in Karachi and expanding to other major cities of Pakistan. They are renowned for their highly responsive ambulance fleet.\n\nApart from emergency rescue operations, Chhipa provides free daily meals (Chhipa Dastarkhwan) to thousands of impoverished laborers and homeless individuals. One of their most emotionally impactful initiatives is the "Chhipa Jhoola" (cradle), which saves the lives of unwanted or abandoned newborns, ensuring they are rescued and placed with loving adoptive families.\n\nTheir grassroots presence and rapid response system make them a vital lifeline for the poorest segments of the city.',
    mission: 'Immediate response to disasters, rescuing the abandoned, and providing basic necessities to the poorest of the poor.',
    stats: [ { label: 'Meals/Day', value: '50,000+' }, { label: 'Ambulances', value: '500+' } ],
    bank: 'Habib Metro - 1122 3344556 01', jazzcash: '0300-5555555', easypaisa: '0345-5555555',
    phone: '1020', email: 'info@chhipa.org', website: 'www.chhipa.org'
  },
  { 
    id: 'jdc', name: 'JDC Foundation', founder: 'Zafar Abbas', image: jdcPic, initials: 'ZA', 
    color: 'from-red-600 to-red-800', textClass: 'text-red-500', bgClass: 'bg-red-600/20', borderClass: 'border-red-600/30',
    category: 'GENERAL WELFARE', 
    shortDesc: 'Rapid disaster response, free medical care, and massive community empowerment.', 
    longDesc: 'Jaffaria Disaster Management Cell (JDC) Foundation, led by the dynamic Zafar Abbas, is an extraordinary welfare organization that operates with an aggressive, rapid-response model. Based in Karachi, their impact is now felt nationwide.\n\nJDC is famous for stepping in where the system fails. From setting up the country’s first Free Mobile Restaurant to providing highly expensive medical equipment (like ventilators and oxygen cylinders) for free home use during crises, JDC’s approach is incredibly direct. They also run free dialysis centers, massive flood relief camps, and a large-scale Free IT City to skill the youth.\n\nYour Zakat to JDC is directly utilized in high-impact, immediate-relief projects that save lives daily.',
    mission: 'Empowering marginalized communities through rapid welfare response and establishing free modern institutions.',
    stats: [ { label: 'Volunteers', value: '10,000+' }, { label: 'Free Dials', value: '24/7' } ],
    bank: 'Habib Bank - 1122 3344556 01', jazzcash: '0300-7777777', easypaisa: '0345-7777777',
    phone: '1024', email: 'info@jdcwelfare.org', website: 'www.jdcwelfare.org'
  },
  { 
    id: 'tcf', name: 'The Citizens Foundation (TCF)', founder: 'Ateed Riaz & Others', image: tcfPic, initials: 'TC', 
    color: 'from-amber-400 to-yellow-600', textClass: 'text-amber-400', bgClass: 'bg-amber-500/20', borderClass: 'border-amber-500/30',
    category: 'EDUCATION', 
    shortDesc: 'Providing high-quality education to children in the most impoverished slums and rural areas.', 
    longDesc: 'The Citizens Foundation (TCF) was established in 1995 by a group of citizens who wanted to bring about positive social change through education. Today, it is one of Pakistan’s leading organizations in the field of education for the less privileged.\n\nTCF operates purpose-built schools in the heart of urban slums and rural communities. What makes TCF unique is its strict 50% female student ratio and an all-female faculty, which dramatically increases female literacy and community trust. The curriculum is world-class, ensuring that children of laborers and farmers receive the exact same quality of education as children from affluent families.\n\nYour Zakat funds the education, books, and uniforms of deserving children, lifting entire generations out of the cycle of poverty.',
    mission: 'To remove barriers of class and privilege and make the citizens of Pakistan agents of positive change through affordable quality education.',
    stats: [ { label: 'Schools', value: '1,800+' }, { label: 'Students', value: '280,000+' } ],
    bank: 'Standard Chartered - 0101 0101010 01', jazzcash: '0300-8888888', easypaisa: '0345-8888888',
    phone: '111-823-823', email: 'info@tcf.org.pk', website: 'www.tcf.org.pk'
  },
  { 
    id: 'akhuwat', name: 'Akhuwat Foundation', founder: 'Dr. Amjad Saqib', image: akhuwatPic, initials: 'AS', 
    color: 'from-emerald-500 to-teal-600', textClass: 'text-emerald-400', bgClass: 'bg-emerald-500/20', borderClass: 'border-emerald-500/30',
    category: 'MICROFINANCE', 
    shortDesc: 'The world’s largest Islamic, interest-free microfinance organization.', 
    longDesc: 'Founded by Dr. Amjad Saqib, Akhuwat operates on the beautiful Islamic principle of Mawakhat (brotherhood). It provides Qarz-e-Hasna (interest-free loans) to the extremely poor so they can start small businesses, buy livestock, or purchase rickshaws to become financially independent.\n\nUnlike traditional microfinance which traps the poor in high-interest debt, Akhuwat boasts an astonishing 99.9% recovery rate on completely zero-interest loans. They operate through mosques and churches, keeping their operational costs incredibly low. Akhuwat also runs free universities, clothes banks, and rehabilitation programs for the transgender community.\n\nDonating Zakat to Akhuwat ensures your money is circulated to create jobs and empower families sustainably.',
    mission: 'Poverty alleviation by empowering the socially marginalized through interest-free microfinance and education.',
    stats: [ { label: 'Loans Disbursed', value: '5 Million+' }, { label: 'Recovery Rate', value: '99.9%' } ],
    bank: 'Meezan Bank - 1234 5678901 01', jazzcash: '0300-9999999', easypaisa: '0345-9999999',
    phone: '042-111-468-372', email: 'info@akhuwat.org.pk', website: 'www.akhuwat.org.pk'
  },
  { 
    id: 'siut', name: 'SIUT', founder: 'Dr. Adibul Hasan Rizvi', image: siutPic, initials: 'AR', 
    color: 'from-blue-500 to-indigo-600', textClass: 'text-blue-400', bgClass: 'bg-blue-500/20', borderClass: 'border-blue-500/30',
    category: 'HEALTHCARE', 
    shortDesc: 'Free, highly specialized medical care, dialysis, and kidney transplants.', 
    longDesc: 'The Sindh Institute of Urology and Transplantation (SIUT) is a living miracle in Pakistan’s healthcare sector. Founded by the legendary Dr. Adibul Hasan Rizvi, SIUT provides completely free, comprehensive medical care for kidney, liver, and related diseases.\n\nDialysis and organ transplantation are among the most expensive medical procedures globally, often bankrupting families. SIUT offers these treatments to thousands of patients daily without charging a single rupee. Dr. Rizvi’s core philosophy is simple yet profound: "We don\'t let anyone die just because they cannot afford to live."\n\nYour Zakat to SIUT literally buys time and life for patients who have nowhere else to go.',
    mission: 'To provide comprehensive and modern medical care, completely free of cost, preserving the dignity of the patient.',
    stats: [ { label: 'Dialysis/Day', value: '1,200+' }, { label: 'Cost to Patient', value: 'Zero' } ],
    bank: 'National Bank - 9876 5432109 01', jazzcash: '0300-1010101', easypaisa: '0345-1010101',
    phone: '021-99215752', email: 'info@siut.org', website: 'www.siut.org'
  },
  { 
    id: 'lrbt', name: 'LRBT', founder: 'Graham Layton & Zaka Rahmatulla', image: lrbtPic, initials: 'LR', 
    color: 'from-sky-400 to-blue-500', textClass: 'text-sky-400', bgClass: 'bg-sky-500/20', borderClass: 'border-sky-500/30',
    category: 'HEALTHCARE', 
    shortDesc: 'Restoring sight, transforming lives. Free eye care for the poorest across Pakistan.', 
    longDesc: 'The Layton Rahmatulla Benevolent Trust (LRBT) was established in 1984 with a single mission: no man, woman, or child should go blind just because they cannot afford treatment. Today, LRBT is the largest non-governmental organization fighting blindness in Pakistan.\n\nThrough a massive network of 19 fully-equipped hospitals and 64 primary eye-care clinics, LRBT treats one-third of all eye patients in Pakistan. They perform highly delicate surgeries, including cataract removals and corneal transplants, completely free of charge. Blindness often plunges families deeper into poverty as the earner loses their livelihood; LRBT restores not just sight, but economic independence.\n\nYour Zakat helps bring the light of the world back to those trapped in darkness.',
    mission: 'No man, woman, or child should go blind just because they cannot afford the cost of treatment.',
    stats: [ { label: 'Patients Treated', value: '50 Million+' }, { label: 'Surgeries', value: '3 Million+' } ],
    bank: 'UBL - 1122 3344556 01', jazzcash: '0300-2020202', easypaisa: '0345-2020202',
    phone: '0800-44441', email: 'info@lrbt.org.pk', website: 'www.lrbt.org.pk'
  },
  { 
    id: 'transparent', name: 'Transparent Hands', founder: 'Rameeza Moin', image: transparentPic, initials: 'RM', 
    color: 'from-orange-400 to-orange-600', textClass: 'text-orange-400', bgClass: 'bg-orange-500/20', borderClass: 'border-orange-500/30',
    category: 'HEALTHCARE', 
    shortDesc: 'Pakistan’s premier crowdfunding platform for free medical surgeries and health camps.', 
    longDesc: 'Transparent Hands brings a modern, tech-driven approach to charity in Pakistan. It is a technological platform designed to crowdfund free medical surgeries and treatments for the underprivileged who are suffering in silence.\n\nPatients who cannot afford life-saving surgeries are registered on the platform. Donors from all over the world can read their stories, view their medical reports, and choose exactly whom they want to fund. The platform guarantees 100% transparency, ensuring that every penny goes directly to the hospital performing the surgery. They also organize massive free medical camps in remote, rural areas.\n\nThis is a highly innovative way to pay your Zakat, knowing exactly which patient’s life your money is saving.',
    mission: 'To provide a transparent, 100% verifiable digital system for donors to fund the surgeries of the absolute needy.',
    stats: [ { label: 'Surgeries Funded', value: 'Thousands' }, { label: 'Transparency', value: '100%' } ],
    bank: 'Faysal Bank - 5566 7788990 01', jazzcash: '0300-3030303', easypaisa: '0345-3030303',
    phone: '042-35227201', email: 'info@transparenthands.org', website: 'www.transparenthands.org'
  }
];

export default function Foundations() {
  return (
    <div className="w-full pb-24 framer-animate relative">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
          Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Foundations</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          Distribute your Zakat safely to FBR-approved charities making real impacts.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
        {foundationsData.map((ngo, index) => (
          <AnimatedSection key={ngo.id} delay={index * 0.1} direction="up" className="bg-[#0a0a0c] border border-white/10 p-5 sm:p-8 md:p-10 rounded-3xl hover:border-pink-500/40 transition-all group flex flex-col items-center text-center shadow-lg h-full">
            
            <Tilt glareEnable={true} glareMaxOpacity={0.4} scale={1.05} transitionSpeed={400} tiltMaxAngleX={15} tiltMaxAngleY={15}>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-pink-500 transition-colors mb-4 sm:mb-6 shadow-2xl flex-shrink-0 relative bg-white/5 cursor-pointer">
                <img 
                  src={ngo.image} 
                  alt={ngo.founder} 
                  className="w-full h-full object-cover heavy-img-hover"
                  style={{ objectPosition: AVATAR_FOCUS[ngo.id] || '50% 10%' }}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${ngo.color} hidden items-center justify-center text-white font-black text-3xl`}>
                  {ngo.initials}
                </div>
              </div>
            </Tilt>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2">{ngo.name}</h3>
            <p className={`text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed mb-1 ${ngo.textClass}`}>
              {ngo.founder}
            </p>
            <span className="bg-white/10 text-slate-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-6 inline-block border border-white/5">
              {ngo.category}
            </span>

            <p className="text-slate-400 text-sm leading-relaxed mb-5 sm:mb-8 flex-grow">
              {ngo.shortDesc}
            </p>
            
            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
              <Link to={`/foundation/${ngo.id}`} className="heavy-btn bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center">
                Learn More
              </Link>
              
              <Link to={`/donate/${ngo.id}`} className={`heavy-btn bg-gradient-to-r ${ngo.color} text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1 shadow-lg`}>
                Donate <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}