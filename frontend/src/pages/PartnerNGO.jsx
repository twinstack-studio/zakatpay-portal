import React, { useState } from 'react';
import { Building2, ShieldCheck, TrendingUp, FileText, CheckCircle2, ArrowRight, Mail, Phone, HeartHandshake } from 'lucide-react';

export default function PartnerNGO() {
  const [formData, setFormData] = useState({ name: '', regNo: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan API call lagay gi future mein
    setIsSubmitted(true);
  };

  return (
    <div className="w-full pb-24 framer-animate">
      {/* HERO SECTION */}
      <div className="bg-white/5 border-b border-white/10 py-12 sm:py-16 md:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(600px,120vw)] h-[min(600px,120vw)] bg-purple-600/10 rounded-full blur-[70px] sm:blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="w-20 h-20 mx-auto bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-purple-500/30">
            <HeartHandshake size={40} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
            Partner With <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">ZakatPay</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
            Join Pakistan's most trusted digital charity network. Let us help you reach millions of global donors while maintaining 100% Shariah and FBR compliance.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-12 sm:mt-20">
        {/* BENEFITS SECTION */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-4">Why Join Our Network?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 sm:mb-20 md:mb-24">
          <div className="bg-[#0a0a0c] border border-white/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl hover:border-purple-500/50 transition-colors text-center group">
            <TrendingUp size={36} className="text-purple-400 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Global Digital Reach</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Expand your donor base beyond physical boundaries. Connect with overseas Pakistanis effortlessly.</p>
          </div>
          <div className="bg-[#0a0a0c] border border-white/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl hover:border-pink-500/50 transition-colors text-center group">
            <ShieldCheck size={36} className="text-pink-400 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Zero Commission</h3>
            <p className="text-slate-400 text-sm leading-relaxed">We believe in 100% donation delivery. ZakatPay charges zero commission on funds transferred to your NGO.</p>
          </div>
          <div className="bg-[#0a0a0c] border border-white/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl hover:border-blue-500/50 transition-colors text-center group">
            <FileText size={36} className="text-blue-400 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Automated Tax Receipts</h3>
            <p className="text-slate-400 text-sm leading-relaxed">We automatically generate FBR-compliant tax exemption certificates for your donors under Section 61.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 md:gap-12 lg:gap-16 items-start">
          {/* ELIGIBILITY CRITERIA */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-4 sm:mb-6">Eligibility Criteria</h2>
              <p className="text-slate-400 mb-5 sm:mb-8">To ensure complete transparency and trust for our donors, we have strict vetting criteria for onboarding new charities.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="text-white font-bold mb-1">FBR Registration</h4>
                  <p className="text-slate-400 text-sm">Must be an active taxpayer and hold a valid NPO/NGO status approved by the FBR.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="text-white font-bold mb-1">Annual Audit Reports</h4>
                  <p className="text-slate-400 text-sm">Must provide transparent financial audit reports from a recognized third-party firm for the last 3 years.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="text-white font-bold mb-1">Shariah Board Approval</h4>
                  <p className="text-slate-400 text-sm">Clear separation of Zakat and Sadaqah accounts, verified by an internal or external Shariah board.</p>
                </div>
              </div>
            </div>
          </div>

          {/* APPLICATION FORM */}
          <div className="bg-gradient-to-br from-[#13141a] to-black border border-white/10 rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            
            {!isSubmitted ? (
              <>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2">Apply for Partnership</h3>
                <p className="text-slate-400 text-sm mb-5 sm:mb-8">Fill out the initial application. Our vetting team will contact you within 3-5 business days.</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">NGO / Trust Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-3.5 text-slate-500" size={18} />
                      <input type="text" required className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-purple-500 transition-colors text-sm" placeholder="E.g., Edhi Foundation" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Registration No (FBR)</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-3.5 text-slate-500" size={18} />
                      <input type="text" required className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-purple-500 transition-colors text-sm" placeholder="NTN or Reg No" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Official Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-slate-500" size={18} />
                        <input type="email" required className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-purple-500 transition-colors text-sm" placeholder="contact@ngo.org" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 text-slate-500" size={18} />
                        <input type="tel" required className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-purple-500 transition-colors text-sm" placeholder="03XX-XXXXXXX" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Brief Mission Statement</label>
                    <textarea required rows="3" className="w-full bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-purple-500 transition-colors text-sm resize-none" placeholder="Briefly describe your NGO's core working areas..."></textarea>
                  </div>

                  <button type="submit" className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">
                    Submit Application <ArrowRight size={18} />
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 text-center animate-fade-in-up">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2">Application Received!</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 sm:mb-8">
                  JazakAllah for your interest in partnering with ZakatPay. Our onboarding team will review your details and contact you via email shortly.
                </p>
                <button onClick={() => setIsSubmitted(false)} className="text-purple-400 hover:text-white text-sm font-bold transition-colors">
                  Submit another application
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}