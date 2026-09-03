import React from 'react';
import { BookOpen, Award, Quote, CheckCircle2, AlertCircle, Bookmark } from 'lucide-react';

// === PICTURES IMPORT ===
import taqiUsmaniPic from '../assets/taqi-usmani.jpg';
import tariqJameelPic from '../assets/tariq-jameel.jpg';
import israrAhmedPic from '../assets/israr-ahmed.jpg';
import ismailMenkPic from '../assets/ismail-menk.jpg';

// === SCHOLARS DATA ===
const scholars = [
  {
    id: 1,
    name: "Justice (Retd) Mufti Taqi Usmani",
    qualification: "Vice President, Darul Uloom Karachi | Former Judge, Federal Shariat Court",
    image: taqiUsmaniPic,
    fatwa: "Zakat is not a tax; it is a fundamental act of worship. Modern financial instruments like shares and bonds are subject to Zakat. If shares are purchased with the intent of trading (capital gain), Zakat is payable on their market value.",
  },
  {
    id: 2,
    name: "Maulana Tariq Jameel",
    qualification: "Renowned Islamic Scholar | Recipient of Pride of Performance",
    image: tariqJameelPic,
    fatwa: "Zakat purifies your remaining wealth. When you withhold Zakat, the unpaid amount ruins the purity of your halal earnings. It is a right of the poor over the wealth of the rich, not a favor we do for them.",
  },
  {
    id: 3,
    name: "Dr. Israr Ahmed (Late)",
    qualification: "Islamic Philosopher | Founder of Tanzeem-e-Islami",
    image: israrAhmedPic,
    fatwa: "The socio-economic balance of an Islamic society rests on Zakat and Sadaqah. It prevents the accumulation of wealth in a few hands. True faith requires spending what you love in the way of Allah.",
  },
  {
    id: 4,
    name: "Mufti Ismail Menk",
    qualification: "Grand Mufti of Zimbabwe | Global Islamic Lecturer",
    image: ismailMenkPic,
    fatwa: "When calculating Zakat, do not look for loopholes. Be generous with Allah, and Allah will be generous with you. Pay slightly more than your calculated amount to cover any unintentional miscalculations.",
  }
];

const generalRulings = [
  {
    title: "Zakat on Real Estate & Plots",
    desc: "If a plot or property is bought with the strict intention of reselling it for profit (trading), Zakat is obligatory on its current market value. If it's bought to build a house for personal use, or given on rent, there is no Zakat on its capital value (only the saved rental income is Zakatable)."
  },
  {
    title: "Zakat on Gold & Silver Jewelry",
    desc: "According to the Hanafi school of thought, Zakat is obligatory on all gold and silver jewelry, whether it is worn daily, occasionally, or kept in a safe, provided it reaches the Nisab (87.48 grams of gold or 612.36 grams of silver)."
  },
  {
    title: "Zakat on Business Inventory",
    desc: "All raw materials and finished goods meant for sale must be evaluated at their current wholesale market price on your Zakat valuation date. Machinery, factory buildings, and fixtures are exempt from Zakat."
  }
];

export default function IslamicRulings() {
  return (
    <div className="w-full pb-24 framer-animate">
      
      {/* HERO SECTION */}
      <div className="bg-white/5 border-b border-white/10 py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="w-20 h-20 mx-auto bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center mb-6 border border-pink-500/30">
            <BookOpen size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Islamic <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Rulings & Fatwas</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Understand the Fiqh of Zakat and Sadaqah through the light of the Quran, Sunnah, and consensus of recognized Islamic scholars.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mt-16 space-y-24">
        
        {/* QURAN & HADITH SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Bookmark className="text-pink-500" size={28} />
            <h2 className="text-3xl font-black text-white">The Divine Command</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#0a0a0c] to-black border border-white/10 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl"></div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-purple-400"/> From the Quran
              </h3>
              <p className="text-2xl text-pink-400 font-bold mb-4 leading-loose" dir="rtl">
                وَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ وَٱرْكَعُوا۟ مَعَ ٱلرَّٰكِعِينَ
              </p>
              <p className="text-slate-300 italic mb-4 leading-relaxed">
                "And establish prayer and give zakat, and bow with those who bow [in worship and obedience]."
              </p>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">— Surah Al-Baqarah (2:43)</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#0a0a0c] to-black border border-white/10 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-3xl"></div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-pink-400"/> From the Sunnah
              </h3>
              <p className="text-slate-300 italic mb-4 leading-relaxed text-lg">
                The Prophet Muhammad (ﷺ) said: <br/>
                "Allah has made Zakat obligatory upon them, to be taken from their rich and given to their poor."
              </p>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-auto">— Sahih al-Bukhari 1395</p>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SCHOLARS SECTION (UPDATED IMAGE ALIGNMENT) */}
        {/* ========================================== */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <Award className="text-purple-500" size={28} />
            <h2 className="text-3xl font-black text-white">Expert Opinions & Fatwas</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {scholars.map((scholar) => (
              <div key={scholar.id} className="bg-[#0a0a0c] border border-white/10 p-8 md:p-10 rounded-3xl hover:border-pink-500/40 transition-all group flex flex-col items-center text-center shadow-lg">
                
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-pink-500 transition-colors mb-6 shadow-2xl flex-shrink-0">
                  {/* Yahan object-top ko object-center kar diya gaya hai */}
                  <img src={scholar.image} alt={scholar.name} className="w-full h-full object-cover object-center" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{scholar.name}</h3>
                <p className="text-pink-400 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed mb-8 px-4">
                  {scholar.qualification}
                </p>
                
                <div className="bg-white/5 p-6 md:p-8 rounded-2xl relative w-full text-left flex-grow border border-white/5">
                  <Quote className="absolute top-4 right-4 text-white/5" size={48} />
                  <p className="text-slate-300 text-base leading-relaxed relative z-10 italic">
                    "{scholar.fatwa}"
                  </p>
                </div>
                
              </div>
            ))}
          </div>
        </section>

        {/* COMMON RULINGS */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <AlertCircle className="text-blue-500" size={28} />
            <h2 className="text-3xl font-black text-white">Modern Zakat Scenarios</h2>
          </div>
          <div className="space-y-4">
            {generalRulings.map((ruling, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl hover:bg-white/10 transition-colors flex gap-4 md:gap-6 items-start">
                <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{ruling.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    {ruling.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}