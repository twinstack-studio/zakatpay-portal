import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Calculator, Globe, FileText, Lock } from 'lucide-react';
import ThreeDHero from '../components/ThreeDHero';
import AnimatedSection from '../components/AnimatedSection';

export default function HomePage() {
  return (
    // overflow-x-hidden ensures no horizontal scroll without breaking mobile height
    <div className="w-full framer-animate overflow-x-hidden">
      
      {/* ========================================== */}
      {/* 1. NEW PREMIUM HERO SECTION */}
      {/* ========================================== */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32 px-4 sm:px-6 max-w-[1400px] mx-auto">
        <div className="absolute top-1/4 left-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-pink-600/10 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-purple-600/10 rounded-full blur-[100px] lg:blur-[150px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
          
          {/* Left Side: Text Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left pt-6 lg:pt-0">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">ZakatPay</span><br/>
              Digital Portal
            </h1>
            
            <p className="text-slate-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Purify your wealth through Zakat and Sadaqah. A 100% secure, transparent, and Shariah-compliant platform to calculate and distribute your charitable obligations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 lg:pt-4 z-10 relative">
              <Link to="/about" className="heavy-btn bg-white/5 border border-white/20 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 group w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Learn More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 pt-8 lg:pt-10 border-t border-white/10 text-center lg:text-left">
              <div>
                <p className="text-2xl lg:text-3xl font-black text-white">12+</p>
                <p className="text-[10px] text-pink-400 uppercase tracking-widest font-bold mt-1">Partner NGOs</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-black text-white">100%</p>
                <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold mt-1">Secure Transfers</p>
              </div>
              <div className="col-span-2 sm:col-span-1 mt-4 sm:mt-0">
                <p className="text-2xl lg:text-3xl font-black text-white text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">FBR</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Tax Exempted</p>
              </div>
            </div>
          </div>

          {/* Right Side: Responsive Height Adjustments for Mobile vs Desktop */}
          <div className="relative mt-8 lg:mt-0 h-[280px] sm:h-[400px] lg:h-[600px] w-full flex items-center justify-center">
            <ThreeDHero />
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* 2. CORE FEATURES SECTION */}
      {/* ========================================== */}
      <section className="bg-[#0a0a0c] border-y border-white/5 py-16 lg:py-24 relative px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">ZakatPay?</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">We provide a seamless, secure, and fully compliant digital ecosystem for your religious obligations.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <AnimatedSection direction="up" delay={0.1} className="bg-white/5 border border-white/10 p-6 lg:p-8 rounded-3xl hover:border-pink-500/50 transition-colors group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calculator size={24} className="lg:w-7 lg:h-7" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Smart Calculator</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Calculate Zakat accurately with real-time Gold/Silver rates and Shariah-approved asset tracking.</p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2} className="bg-white/5 border border-white/10 p-6 lg:p-8 rounded-3xl hover:border-purple-500/50 transition-colors group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe size={24} className="lg:w-7 lg:h-7" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Direct NGO Transfers</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Your funds are transferred directly into the official bank accounts of verified partner foundations.</p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3} className="bg-white/5 border border-white/10 p-6 lg:p-8 rounded-3xl hover:border-blue-500/50 transition-colors group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText size={24} className="lg:w-7 lg:h-7" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">FBR Tax Receipts</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Instantly download FBR tax-exempted digital receipts under Section 61 of the Income Tax Ordinance.</p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.4} className="bg-white/5 border border-white/10 p-6 lg:p-8 rounded-3xl hover:border-green-500/50 transition-colors group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-green-500/10 text-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock size={24} className="lg:w-7 lg:h-7" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">100% Secure</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Bank-level 256-bit encryption ensures your personal data and transaction details are completely safe.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. HOW IT WORKS SECTION */}
      {/* ========================================== */}
      <section className="py-16 lg:py-24 max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#13141a] to-black border border-white/10 rounded-3xl lg:rounded-[3rem] p-6 sm:p-10 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1 lg:h-2 bg-gradient-to-r from-pink-500 to-purple-600"></div>
          
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">How It Works</h2>
            <p className="text-slate-400 text-sm sm:text-base">Three simple steps to fulfill your obligations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12 relative">
            <div className="hidden sm:block absolute top-10 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="relative text-center z-10">
              <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-black border-4 border-pink-500/30 rounded-full flex items-center justify-center text-pink-500 font-black text-xl lg:text-2xl mb-4 lg:mb-6 shadow-[0_0_20px_rgba(236,72,153,0.2)]">1</div>
              <h3 className="text-white font-bold text-base lg:text-lg mb-2">Calculate</h3>
              <p className="text-slate-400 text-xs sm:text-sm">Use our smart calculator to determine your exact Zakat amount.</p>
            </div>

            <div className="relative text-center z-10">
              <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-black border-4 border-purple-500/30 rounded-full flex items-center justify-center text-purple-500 font-black text-xl lg:text-2xl mb-4 lg:mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">2</div>
              <h3 className="text-white font-bold text-base lg:text-lg mb-2">Select NGO</h3>
              <p className="text-slate-400 text-xs sm:text-sm">Choose from 12+ verified and FBR approved foundations.</p>
            </div>

            <div className="relative text-center z-10">
              <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-black border-4 border-green-500/30 rounded-full flex items-center justify-center text-green-500 font-black text-xl lg:text-2xl mb-4 lg:mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)]">3</div>
              <h3 className="text-white font-bold text-base lg:text-lg mb-2">Donate & Get Receipt</h3>
              <p className="text-slate-400 text-xs sm:text-sm">Transfer funds securely and download your tax receipt instantly.</p>
            </div>
          </div>

          <div className="mt-12 lg:mt-16 text-center">
            <Link to="/calculator" className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-pink-50 px-6 lg:px-8 py-3 lg:py-4 rounded-full font-bold transition-all shadow-xl hover:scale-105 text-sm lg:text-base w-full sm:w-auto">
              Start Calculating Now <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}