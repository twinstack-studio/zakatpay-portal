import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  User, LogOut, Phone, Mail, ChevronDown, Heart, Globe, MessageCircle, 
  BookOpen, Newspaper, PlaySquare, Shield, Menu, X, ArrowRight
} from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import CustomCursor from './components/CustomCursor';

// === COMPONENTS & PAGES ===
import ZakatCalculator from './components/ZakatCalculator';
import DonationHistory from './components/DonationHistory';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Donate from './pages/Donate';
import Checkout from './pages/Checkout';

import { PageWrapper, NewsletterCTA } from './components/Shared';
import HomePage from './pages/Home';
import { 
  AboutPage, ChairmansMessagePage, PrivacyPolicyPage, TermsConditionsPage, 
  TaxExemptionPage, EBookPage, NewsletterArchivePage, AuditReportsPage, FAQPage 
} from './pages/AboutPages';

import Foundations from './pages/Foundations';
import FoundationDetail from './pages/FoundationDetail';
import PartnerNGO from './pages/PartnerNGO';
import IslamicRulings from './pages/IslamicRulings';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import News from './pages/News';
import Videos from './pages/Videos';
import AdminDashboard from './pages/AdminDashboard';

// =======================================================
// 🌟 PREMIUM GLOBAL ANIMATIONS CSS
// =======================================================
const PremiumAnimations = () => (
  <style>{`
    .premium-reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1); }
    .premium-reveal-scale { opacity: 0; transform: scale(0.92); transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1); }
    .premium-visible { opacity: 1 !important; transform: translateY(0) scale(1) !important; }
    @keyframes float-premium { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
    .animate-float-premium { animation: float-premium 4s ease-in-out infinite; }
    @keyframes slide-down { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .nav-animate { animation: slide-down 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    @keyframes gradient-text { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    .animate-gradient-text { background-size: 200% 200%; animation: gradient-text 4s ease infinite; }
  `}</style>
);

// === HEAVY / PREMIUM LOGO COMPONENT ===
const CustomLogo = () => (
  <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1.05} transitionSpeed={400} tiltMaxAngleX={10} tiltMaxAngleY={10} style={{ transformStyle: 'preserve-3d' }}>
    <div className="flex items-center gap-3 md:gap-4 group cursor-pointer" style={{ transform: 'translateZ(30px)' }}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 blur-[18px] opacity-40 group-hover:opacity-70 transition-opacity duration-500 rounded-full"></div>
        <div className="relative w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 p-[2px] md:p-[3px] rounded-xl md:rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
          <div className="w-full h-full bg-gradient-to-b from-[#2a2a2c] to-[#050505] rounded-[10px] md:rounded-[13px] flex items-center justify-center overflow-hidden shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)]">
             <div className="absolute top-0 left-0 w-full h-[35%] bg-gradient-to-b from-white/20 to-transparent"></div>
             <svg viewBox="0 0 100 100" className="w-6 h-6 md:w-9 md:h-9 relative z-10 drop-shadow-[0_5px_5px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300" fill="none">
                <defs>
                  <linearGradient id="heavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f472b6" /> <stop offset="100%" stopColor="#c084fc" /> 
                  </linearGradient>
                  <linearGradient id="heavyGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#db2777" /> <stop offset="100%" stopColor="#9333ea" /> 
                  </linearGradient>
                </defs>
                <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" stroke="url(#heavyGradDark)" strokeWidth="8" strokeLinejoin="round" />
                <path d="M 32 35 H 68 L 32 65 H 68" stroke="url(#heavyGrad)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col" style={{ transform: 'translateZ(20px)' }}>
        <span className="block text-xl md:text-3xl lg:text-4xl tracking-tighter leading-none mt-1">
          <span className="font-black text-white drop-shadow-[0_3px_5px_rgba(0,0,0,1)]">ZAKAT</span>
          <span className="font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-500 drop-shadow-sm">PAY</span>
        </span>
        <span className="block text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mt-1 ml-1">
          Digital Portal
        </span>
      </div>
    </div>
  </Tilt>
);

// === TRANSLATIONS ===
const translations = {
  'ENGLISH': { home: 'Home', about: 'About', rulings: 'Islamic Rulings', media: 'Media', calc: 'Zakat Calculator', foundations: 'Foundations', dashboard: 'Donor Dashboard', partner: 'Partner NGO', payZakat: 'Pay Zakat', login: 'Login' },
  'اردو': { home: 'ہوم', about: 'ہمارے بارے میں', rulings: 'اسلامی احکامات', media: 'میڈیا', calc: 'زکوٰۃ کیلکولیٹر', foundations: 'فلاحی ادارے', dashboard: 'ڈونر ڈیش بورڈ', partner: 'شراکت دار', payZakat: 'زکوٰۃ ادا کریں', login: 'لاگ ان' },
  'العربية': { home: 'الرئيسية', about: 'معلومات عنا', rulings: 'أحكام إسلامية', media: 'وسائط', calc: 'حاسبة الزكاة', foundations: 'مؤسسات خيرية', dashboard: 'لوحة المتبرع', partner: 'منظمة شريكة', payZakat: 'ادفع الزكاة', login: 'تسجيل الدخول' }
};

// === HEAVY 3D ANIMATED AYAT ===
const AnimatedAyat = () => {
  const ayatText = "مَّثَلُ ٱلَّذِينَ يُنفِقُونَ أَمْوَٰلَهُمْ فِى سَبِيلِ ٱللَّهِ كَمَثَلِ حَبَّةٍ أَنۢبَتَتْ سَبْعَ سَنَابِلَ فِى كُلِّ سُنبُلَةٍ مِّا۟ئَةُ حَبَّةٍ ۗ وَٱللَّهُ يُضَـٰعِفُ لِمَن يَشَآءُ";
  const words = ayatText.split(" ");
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16 md:py-24 text-center mt-auto overflow-hidden border-t border-white/5" dir="ltr" style={{ perspective: '1500px' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] h-[150%] bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-indigo-600/20 blur-[80px] md:blur-[100px] -z-10 rounded-full animate-float-premium"></div>
      <motion.div initial={{ rotateX: 45, opacity: 0, y: 100, scale: 0.8 }} whileInView={{ rotateX: 0, opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.2, type: "spring", bounce: 0.3 }} viewport={{ once: false, margin: "-100px" }} className="relative transform-gpu">
        <motion.div animate={{ y: [0, -10, 0], rotateZ: [0, 1, -1, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 md:mb-12 leading-[2] md:leading-[2] flex flex-wrap justify-center gap-x-3 md:gap-x-5 gap-y-6 md:gap-y-8" dir="rtl">
            {words.map((word, i) => (
              <motion.span key={i} initial={{ opacity: 0, x: -50, filter: 'blur(10px)', rotateY: 90 }} whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)', rotateY: 0 }} transition={{ duration: 0.8, delay: (words.length - i) * 0.15, ease: "easeOut" }} viewport={{ once: false }} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-500 animate-gradient-text drop-shadow-[0_5px_10px_rgba(236,72,153,0.5)] md:drop-shadow-[0_5px_15px_rgba(236,72,153,0.6)] hover:scale-110 md:hover:scale-125 transition-all duration-300">
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }} viewport={{ once: false }} className="text-slate-300 text-xs md:text-xl font-medium italic leading-relaxed max-w-4xl mx-auto border-t border-white/10 pt-6 md:pt-8 px-4">
          "The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills."
        </motion.p>
        <motion.p initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 1.5, type: "spring" }} viewport={{ once: false }} className="text-purple-400 font-black text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.4em] mt-6">
          — Surah Al-Baqarah (2:261)
        </motion.p>
      </motion.div>
    </div>
  );
};


export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  
  const [language, setLanguage] = useState('ENGLISH');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const t = translations[language];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu & scroll to top on route change
  useEffect(() => { 
    window.scrollTo(0, 0); 
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Load User Data
  useEffect(() => {
    const savedUser = localStorage.getItem('zakatUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // RTL Handling
  useEffect(() => {
    if (language === 'اردو' || language === 'العربية') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = language === 'اردو' ? 'ur' : 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, [language]);

  const handleLogout = () => { localStorage.removeItem('zakatUser'); setUser(null); };

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-pink-500 selection:text-white flex flex-col overflow-x-hidden">
      
      <PremiumAnimations />

      {/* === 1. TOP UTILITY BAR (Desktop Only) === */}
      <div className="bg-black border-b border-white/10 text-slate-300 py-3 hidden xl:block relative z-[60] nav-animate">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-end items-center gap-6 text-sm font-medium tracking-wide">
          <a href="mailto:info@zakatpay.pk" className="flex items-center gap-2 hover:text-pink-400 transition-colors"><Mail size={16} className="text-slate-400"/> info@zakatpay.pk</a>
          <a href="https://wa.me/923111112222" className="flex items-center gap-2 hover:text-green-400 transition-colors"><MessageCircle size={16} className="text-green-500"/> 0311 111 2222</a>
          <a href="tel:+9221111925288" className="flex items-center gap-2 hover:text-purple-400 transition-colors"><Phone size={16} className="text-purple-500"/> +92 21 111 925 288</a>
          
          <div ref={langDropdownRef} className="relative border-l border-white/10 pl-6 cursor-pointer" onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}>
            <div className="flex items-center gap-1 hover:text-white transition-colors text-slate-400">
              <Globe size={16} /> {language} <ChevronDown size={14} />
            </div>
            {isLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-3 w-32 bg-[#0a0a0c] border border-white/10 shadow-2xl rounded-xl overflow-hidden z-[100]">
                {['ENGLISH', 'اردو', 'العربية'].map((lang) => (
                  <button key={lang} onClick={() => { setLanguage(lang); setIsLangDropdownOpen(false); }} className={`w-full text-left px-4 py-3 text-xs font-bold transition-colors ${language === lang ? 'bg-pink-600 text-white' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`} dir="ltr">
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10 ml-2">
            <Link to="/partner-ngo" className="heavy-btn bg-purple-900/40 border border-purple-500/50 hover:bg-purple-800 text-white px-5 py-2 rounded-full font-bold transition-colors text-[13px]">
              {t.partner}
            </Link>
            <Link to="/foundations" className="heavy-btn bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-5 py-2 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.4)] font-bold transition-all flex items-center gap-2 text-[13px]">
              {t.payZakat} <Heart size={14} className="fill-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* === 2. RESPONSIVE MEGA NAVBAR === */}
      <nav className="bg-black/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 nav-animate">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <CustomLogo />
            </Link>

            {/* Desktop Links */}
            <div className="hidden xl:flex items-center gap-6 2xl:gap-8">
              <Link to="/" className="text-slate-300 hover:text-pink-400 font-bold text-base transition-colors">{t.home}</Link>
              
              <div className="relative group py-10">
                <button className="flex items-center gap-1 text-slate-300 hover:text-pink-400 font-bold text-base transition-colors">{t.about} <ChevronDown size={16} /></button>
                <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[600px] bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 grid grid-cols-2 gap-x-10 gap-y-6 text-left z-[100]">
                  <Link to="/about" className="group/item block"><h5 className="text-white font-bold text-sm group-hover/item:text-pink-400 transition-colors">Introduction</h5><p className="text-slate-500 text-xs mt-1">Learn about ZakatPay</p></Link>
                  <Link to="/chairmans-message" className="group/item block"><h5 className="text-white font-bold text-sm group-hover/item:text-pink-400 transition-colors">Chairman's Message</h5><p className="text-slate-500 text-xs mt-1">Message from the leadership</p></Link>
                  <Link to="/audit-reports" className="group/item block"><h5 className="text-white font-bold text-sm group-hover/item:text-pink-400 transition-colors">Audit Reports</h5><p className="text-slate-500 text-xs mt-1">Financial transparency</p></Link>
                  <Link to="/tax-exemption" className="group/item block"><h5 className="text-white font-bold text-sm group-hover/item:text-pink-400 transition-colors">Tax Exemption</h5><p className="text-slate-500 text-xs mt-1">Tax deduction benefits</p></Link>
                  <Link to="/e-book" className="group/item block"><h5 className="text-white font-bold text-sm group-hover/item:text-pink-400 transition-colors">E-Book</h5><p className="text-slate-500 text-xs mt-1">Digital publications</p></Link>
                  <Link to="/newsletter-archive" className="group/item block"><h5 className="text-white font-bold text-sm group-hover/item:text-pink-400 transition-colors">Newsletter</h5><p className="text-slate-500 text-xs mt-1">Subscribe & past editions</p></Link>
                  <Link to="/privacy-policy" className="group/item block"><h5 className="text-white font-bold text-sm group-hover/item:text-pink-400 transition-colors">Privacy Policy</h5><p className="text-slate-500 text-xs mt-1">Privacy information</p></Link>
                  <Link to="/terms" className="group/item block"><h5 className="text-white font-bold text-sm group-hover/item:text-pink-400 transition-colors">Terms & Conditions</h5><p className="text-slate-500 text-xs mt-1">Terms of service</p></Link>
                </div>
              </div>

              <Link to="/islamic-rulings" className="text-slate-300 hover:text-pink-400 font-bold text-base transition-colors">{t.rulings}</Link>

              <div className="relative group py-10">
                <button className="flex items-center gap-1 text-slate-300 hover:text-pink-400 font-bold text-base transition-colors">{t.media} <ChevronDown size={16} /></button>
                <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[320px] bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col gap-4 text-left z-[100]">
                  <Link to="/blogs" className="group/item flex items-start gap-4 hover:bg-white/5 p-2 rounded-xl transition-colors">
                    <BookOpen size={20} className="text-pink-500 mt-1" /><div><h5 className="text-white font-bold text-sm group-hover/item:text-pink-400 transition-colors">Blogs</h5><p className="text-slate-500 text-xs mt-1">Read our latest articles</p></div>
                  </Link>
                  <Link to="/news" className="group/item flex items-start gap-4 hover:bg-white/5 p-2 rounded-xl transition-colors">
                    <Newspaper size={20} className="text-purple-500 mt-1" /><div><h5 className="text-white font-bold text-sm group-hover/item:text-purple-400 transition-colors">News</h5><p className="text-slate-500 text-xs mt-1">Platform updates & announcements</p></div>
                  </Link>
                  <Link to="/videos" className="group/item flex items-start gap-4 hover:bg-white/5 p-2 rounded-xl transition-colors">
                    <PlaySquare size={20} className="text-pink-500 mt-1" /><div><h5 className="text-white font-bold text-sm group-hover/item:text-pink-400 transition-colors">Videos</h5><p className="text-slate-500 text-xs mt-1">Watch our impact stories</p></div>
                  </Link>
                </div>
              </div>

              <Link to="/calculator" className="text-slate-300 hover:text-purple-400 font-bold text-base transition-colors">{t.calc}</Link>
              <Link to="/foundations" className="text-slate-300 hover:text-pink-400 font-bold text-base transition-colors">{t.foundations}</Link>
              <Link to="/dashboard" className="text-slate-300 hover:text-purple-400 font-bold text-base transition-colors">{t.dashboard}</Link>
            </div>

            {/* Desktop Auth */}
            <div className="hidden xl:block">
              {user ? (
                <div className="flex items-center gap-4 border pl-4 border-white/10 rounded-full bg-white/5 py-1 pr-1">
                  {((user.name && user.name.toLowerCase().includes('ahmad nadeem')) || (user.email && user.email.toLowerCase().includes('admin'))) && (
                    <Link to="/admin" className="heavy-btn text-pink-400 hover:text-white flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest px-4 py-1.5 bg-pink-500/10 hover:bg-pink-500/30 rounded-full border border-pink-500/20 mr-2 transition-colors">
                      <Shield size={14} /> Admin
                    </Link>
                  )}
                  <span className="text-white font-bold text-sm">{user.name}</span>
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 px-2 transition-colors"><LogOut size={20}/></button>
                </div>
              ) : (
                <button onClick={() => setIsAuthModalOpen(true)} className="heavy-btn bg-white/5 px-5 py-2 border border-white/10 rounded-full flex items-center gap-2 text-slate-300 hover:text-white font-bold transition-colors">
                  <User size={20} className="text-purple-400" /> {t.login}
                </button>
              )}
            </div>

            {/* Mobile Hamburger Icon (Visible on small screens) */}
            <div className="xl:hidden flex items-center gap-4">
              <Link to="/foundations" className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-widest shadow-lg">Donate</Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2 bg-white/5 rounded-xl border border-white/10 active:scale-95 transition-transform">
                {isMobileMenuOpen ? <X size={24} className="text-pink-500"/> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* === MOBILE MENU DRAWER (Google Ads Mobile Optimized) === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[45] bg-[#050505]/95 backdrop-blur-xl pt-24 pb-6 px-6 overflow-y-auto xl:hidden border-b border-white/10"
          >
            <div className="flex flex-col gap-2">
              {/* Mobile Auth Section */}
              {user ? (
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-bold">{user.name}</span>
                  </div>
                  <button onClick={() => {handleLogout(); setIsMobileMenuOpen(false);}} className="text-red-400 p-2"><LogOut size={20}/></button>
                </div>
              ) : (
                <button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl flex items-center justify-center gap-2 text-white font-bold mb-4">
                  <User size={20} className="text-purple-400" /> Login to ZakatPay
                </button>
              )}

              {/* Mobile Links */}
              <Link to="/" className="text-lg font-bold text-white py-4 border-b border-white/5 flex justify-between items-center">Home <ArrowRight size={16} className="text-slate-500"/></Link>
              <Link to="/about" className="text-lg font-bold text-white py-4 border-b border-white/5 flex justify-between items-center">About ZakatPay <ArrowRight size={16} className="text-slate-500"/></Link>
              <Link to="/calculator" className="text-lg font-bold text-white py-4 border-b border-white/5 flex justify-between items-center">Zakat Calculator <ArrowRight size={16} className="text-slate-500"/></Link>
              <Link to="/foundations" className="text-lg font-bold text-white py-4 border-b border-white/5 flex justify-between items-center">Verified Foundations <ArrowRight size={16} className="text-slate-500"/></Link>
              <Link to="/dashboard" className="text-lg font-bold text-white py-4 border-b border-white/5 flex justify-between items-center">Donor Dashboard <ArrowRight size={16} className="text-slate-500"/></Link>
              <Link to="/islamic-rulings" className="text-lg font-bold text-white py-4 border-b border-white/5 flex justify-between items-center">Islamic Rulings <ArrowRight size={16} className="text-slate-500"/></Link>
              <Link to="/blogs" className="text-lg font-bold text-white py-4 border-b border-white/5 flex justify-between items-center">Blogs & Articles <ArrowRight size={16} className="text-slate-500"/></Link>
              
              {/* 🌟 NEW: Mobile FAQ Link */}
              <Link to="/faqs" className="text-lg font-bold text-white py-4 border-b border-white/5 flex justify-between items-center">FAQs & Help Center <ArrowRight size={16} className="text-slate-500"/></Link>

              {/* Admin Link for Mobile */}
              {user && ((user.name && user.name.toLowerCase().includes('ahmad nadeem')) || (user.email && user.email.toLowerCase().includes('admin'))) && (
                <Link to="/admin" className="text-lg font-bold text-pink-400 py-4 border-b border-white/5 flex justify-between items-center">
                  <span className="flex items-center gap-2"><Shield size={18}/> Admin Panel</span> <ArrowRight size={16} className="text-pink-500"/>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === 3. MAIN CONTENT ROUTES === */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper title="Home"><HomePage /></PageWrapper>} />
            
            <Route path="/about" element={<PageWrapper title="About Us"><AboutPage /></PageWrapper>} />
            <Route path="/audit-reports" element={<PageWrapper title="Audit Reports"><AuditReportsPage /></PageWrapper>} />
            <Route path="/chairmans-message" element={<PageWrapper title="Chairman's Message"><ChairmansMessagePage /></PageWrapper>} />
            <Route path="/tax-exemption" element={<PageWrapper title="Tax Exemption"><TaxExemptionPage /></PageWrapper>} />
            <Route path="/e-book" element={<PageWrapper title="E-Book"><EBookPage /></PageWrapper>} />
            <Route path="/newsletter-archive" element={<PageWrapper title="Newsletter"><NewsletterArchivePage /></PageWrapper>} />
            <Route path="/privacy-policy" element={<PageWrapper title="Privacy Policy"><PrivacyPolicyPage /></PageWrapper>} />
            <Route path="/terms" element={<PageWrapper title="Terms & Conditions"><TermsConditionsPage /></PageWrapper>} />
            
            {/* 🌟 NEW: FAQ ROUTE ADDED HERE */}
            <Route path="/faqs" element={<PageWrapper title="FAQs"><FAQPage /></PageWrapper>} />

            <Route path="/islamic-rulings" element={<PageWrapper title="Islamic Rulings"><IslamicRulings /></PageWrapper>} />
            
            <Route path="/blogs" element={<PageWrapper title="Blogs"><Blogs /></PageWrapper>} />
            <Route path="/blog/:id" element={<PageWrapper title="Read Article"><BlogDetail /></PageWrapper>} />
            <Route path="/news" element={<PageWrapper title="News"><News /></PageWrapper>} />
            <Route path="/videos" element={<PageWrapper title="Videos"><Videos /></PageWrapper>} />

            <Route path="/calculator" element={<PageWrapper title="Calculator"><div className="py-8"><ZakatCalculator /></div></PageWrapper>} />
            <Route path="/foundations" element={<PageWrapper title="Foundations"><Foundations /></PageWrapper>} />
            <Route path="/donate/:id" element={<PageWrapper title="Donate Now"><Donate /></PageWrapper>} />
            <Route path="/checkout/:id" element={<PageWrapper title="Secure Checkout"><Checkout /></PageWrapper>} />
            <Route path="/foundation/:id" element={<PageWrapper title="Organization Info"><FoundationDetail /></PageWrapper>} />
            <Route path="/partner-ngo" element={<PageWrapper title="Partner NGO"><PartnerNGO /></PageWrapper>} />
            <Route path="/receipts" element={<PageWrapper title="Ledger"><div className="py-8"><DonationHistory user={user} /></div></PageWrapper>} />
            <Route path="/dashboard" element={<PageWrapper title="Dashboard"><div className="py-8 max-w-[1400px] mx-auto px-4 md:px-6"><Dashboard user={user} /></div></PageWrapper>} />
            
            {/* Admin Route */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* 3D ANIMATED AYAT SECTION */}
      <AnimatedAyat />

      {/* === GLOBAL NEWSLETTER CTA === */}
      <div dir="ltr"><NewsletterCTA /></div>

      {/* === 4. COMPLETE MEGA FOOTER === */}
      <footer className="bg-black text-white pt-16 pb-8 relative overflow-hidden px-4 md:px-6" dir="ltr">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50"></div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <CustomLogo />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">ZakatPay is your dedicated digital portal for calculating Zakat and distributing Sadaqah. 100% transparent, Shariah-compliant, and FBR-approved.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-pink-500">Explore</h4>
              <ul className="space-y-3">
                <li><Link to="/calculator" className="text-slate-400 hover:text-pink-400 transition-colors text-sm">Zakat Calculator</Link></li>
                <li><Link to="/about" className="text-slate-400 hover:text-pink-400 transition-colors text-sm">Who We Are</Link></li>
                <li><Link to="/audit-reports" className="text-slate-400 hover:text-pink-400 transition-colors text-sm">Audit Reports</Link></li>
                <li><Link to="/foundations" className="text-slate-400 hover:text-pink-400 transition-colors text-sm">Foundations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-purple-500">Quick Links</h4>
              <ul className="space-y-4">
                <li><Link to="/privacy-policy" className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer">Terms & Conditions</Link></li>
                <li><Link to="/tax-exemption" className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer">Tax Exemption Guide</Link></li>
                {/* 🌟 NEW: Footer FAQ Link */}
                <li><Link to="/faqs" className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer">FAQs & Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-pink-500">Contact Us</h4>
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">Helpline: <span className="text-white">+92 21 111-925-288</span></p>
                <p className="text-slate-400 text-sm">Email: <span className="text-white">info@zakatpay.pk</span></p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-slate-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <p>Copyright © 2026 ZakatPay Digital Portal. All rights reserved.</p>
            <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
             
            </div>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} setUser={setUser} />
      
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] drop-shadow-[0_10px_20px_rgba(236,72,153,0.5)]">
        <Chatbot />
      </div>

      <CustomCursor />
      
    </div>
  );
}