import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, Target, BookOpen, Stethoscope, HeartHandshake, Calculator, ShieldCheck, 
  Droplets, Activity, Heart, Quote, FileWarning, PieChart, FileText, Download, 
  BookText, Mail, HelpCircle, ChevronDown 
} from 'lucide-react';

export function AboutPage() {
  return (
    <div className="w-full pb-24 framer-animate">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">ZakatPay</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Bridging the gap between faithful donors and verified charitable causes through modern technology.</p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mt-16 space-y-24">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-white mb-6 border-l-4 border-pink-500 pl-4">Who We Are</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">ZakatPay is Pakistan's premier digital philanthropy gateway. Founded with the intention to digitize and secure Islamic charitable giving, we provide a unified platform where Muslims can calculate their exact religious dues and transfer them directly to FBR-certified organizations.</p>
            <p className="text-slate-400 text-lg leading-relaxed">We do not charge any platform fees. 100% of your donated amount reaches the beneficiary, ensuring complete transparency and spiritual peace of mind.</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(236,72,153,0.2)] border border-white/10">
            <img src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80" alt="Islamic Architecture" className="w-full h-[400px] object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-pink-900/20 to-black border border-pink-500/30 p-10 rounded-3xl relative overflow-hidden">
            <Eye size={64} className="text-pink-500/20 absolute -bottom-4 -right-4" />
            <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-400 mb-6"><Eye size={28} /></div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-slate-400 leading-relaxed">To eradicate extreme poverty across the nation by making the calculation, collection, and distribution of Zakat seamless, transparent, and universally accessible for every Muslim.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 p-10 rounded-3xl relative overflow-hidden">
            <Target size={64} className="text-purple-500/20 absolute -bottom-4 -right-4" />
            <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6"><Target size={28} /></div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-slate-400 leading-relaxed">To build a technologically advanced, Shariah-compliant ecosystem that connects donors directly with verified welfare organizations, ensuring aid reaches the most deserving individuals promptly.</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-black text-center text-white mb-12">Our Core Impact Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-[300px] rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10"></div>
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80" alt="Education" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="relative z-20 h-full flex flex-col justify-end p-8">
                <BookOpen size={32} className="text-pink-400 mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">Education</h3>
                <p className="text-slate-300 text-sm">Funding schools and orphan sponsorships.</p>
              </div>
            </div>
            <div className="relative h-[300px] rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10"></div>
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80" alt="Healthcare" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="relative z-20 h-full flex flex-col justify-end p-8">
                <Stethoscope size={32} className="text-purple-400 mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">Healthcare</h3>
                <p className="text-slate-300 text-sm">Free treatments, surgeries, and medicines.</p>
              </div>
            </div>
            <div className="relative h-[300px] rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10"></div>
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80" alt="Disaster Relief" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="relative z-20 h-full flex flex-col justify-end p-8">
                <HeartHandshake size={32} className="text-pink-400 mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">Welfare & Relief</h3>
                <p className="text-slate-300 text-sm">Dastarkhwans, clean water, and disaster aid.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-black text-center text-white mb-12">Platform Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-colors">
              <Calculator size={28} className="text-pink-400 mb-4" />
              <h4 className="text-white font-bold mb-2">Smart Calculation</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Advanced Zakat calculator integrating live Gold and Silver Nisab rates.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors">
              <ShieldCheck size={28} className="text-purple-400 mb-4" />
              <h4 className="text-white font-bold mb-2">Verified Charities</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Direct routing to SECP and FBR certified non-profit organizations.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-colors">
              <Droplets size={28} className="text-pink-400 mb-4" />
              <h4 className="text-white font-bold mb-2">Specific Causes</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Target your donations toward water pumps, orphanages, or hospitals.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors">
              <Activity size={28} className="text-purple-400 mb-4" />
              <h4 className="text-white font-bold mb-2">Tax Exemption</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Download consolidated yearly receipts for FBR income tax rebates.</p>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden mt-16 group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/90 to-purple-900/90 z-10 mix-blend-multiply"></div>
          <img src="https://images.unsplash.com/photo-1593113555288-1a5c68b376d9?auto=format&fit=crop&w=1200&q=80" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Join Mission" />
          <div className="relative z-20 text-center py-20 px-6">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Join Our Mission</h2>
            <p className="text-pink-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">Every contribution, no matter how small, creates ripples of positive change. Together, we can build a nation where compassion knows no bounds and poverty is eradicated through the power of Zakat.</p>
            <Link to="/foundations" className="inline-flex items-center gap-2 bg-white text-purple-700 hover:text-pink-600 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-xl mb-12 hover:scale-105"><Heart size={20} className="fill-current" /> Donate Now</Link>
            <div className="pt-8 border-t border-white/20 max-w-md mx-auto">
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-6">Follow Our Journey of Compassion</p>
              <div className="flex justify-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-pink-600 transition-colors font-bold text-xs">FB</a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-pink-600 transition-colors font-bold text-xs">X</a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-pink-600 transition-colors font-bold text-xs">IG</a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-pink-600 transition-colors font-bold text-xs">YT</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function ChairmansMessagePage() {
  return (
    <div className="w-full pb-24 framer-animate">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Chairman's <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Message</span></h1>
      </div>
      <div className="max-w-[1000px] mx-auto px-6 mt-16">
        <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <Quote className="absolute top-8 right-8 text-pink-500/10" size={100} />
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
            <img src="/IMG_20200804_172259_630.jpg" alt="Chairman Wasil Nadeem" className="w-48 h-48 rounded-3xl object-cover border-4 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)]" />
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">A Journey of Trust</h2>
              <p className="text-pink-400 font-bold text-sm uppercase tracking-widest mb-6">Wasil Nadeem - Founder & Chairman, ZakatPay</p>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>"Bismillah ir-Rahman ir-Rahim. Welcome to ZakatPay! When we laid the foundation of this platform, our mission was simple yet profound: to bridge the gap between the affluent and the deserving through absolute transparency."</p>
                <p>"Technology has given us the tools to track every single penny. Today, I proudly assure you that when you use our platform, your religious obligations are fulfilled efficiently, securely, and in strict accordance with Shariah."</p>
                <p>"As we look towards the future, our commitment remains unshakable. Together, we are not just distributing wealth; we are restoring dignity and building a stronger, self-sufficient nation. Thank you for your unwavering trust and support on this blessed journey."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <div className="w-full pb-24 framer-animate">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Policy</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto mt-4">We are fully committed to protecting your personal information and ensuring your data privacy.</p>
      </div>
      <div className="max-w-[900px] mx-auto px-6 mt-16 bg-[#0a0a0c] border border-white/10 p-10 rounded-3xl text-slate-300 space-y-8 leading-relaxed shadow-xl">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">1. Data Collection</h3>
          <p>We collect personal information such as your name, email address, contact number, and transaction history strictly for the purpose of generating verifiable FBR tax receipts and maintaining an accurate donor ledger for your personal dashboard.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">2. Data Security</h3>
          <p>Your financial transactions are processed through highly secure, bank-grade encrypted (256-bit SSL) payment gateways. ZakatPay does not store your credit card details, CVV codes, or mobile wallet PINs on our servers at any time.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">3. Information Sharing</h3>
          <p>We strictly adhere to a no-sell policy. We never sell, rent, or trade your personal information to third-party marketers. Data is only shared securely with the specific charity you donate to (for their mandatory SECP record-keeping) and relevant tax authorities only if requested by you.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">4. Cookies and Tracking</h3>
          <p>We use essential cookies to maintain your login session securely and enhance your browsing experience. We do not use intrusive tracking mechanisms to monitor your activity across other websites.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">5. Your User Rights</h3>
          <p>You retain full control over your personal data. You have the right to request a complete export of your data, or ask for your account and personal information to be permanently deleted from our active databases by contacting our support team.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">6. Updates to Policy</h3>
          <p>ZakatPay reserves the right to update this privacy policy to reflect changes in legal or regulatory requirements. Donors will be notified via email of any significant changes to how we handle personal data.</p>
        </div>
      </div>
    </div>
  );
}

export function TermsConditionsPage() {
  return (
    <div className="w-full pb-24 framer-animate">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Conditions</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto mt-4">Please read these terms carefully before utilizing our donation services.</p>
      </div>
      <div className="max-w-[900px] mx-auto px-6 mt-16 bg-[#0a0a0c] border border-white/10 p-10 rounded-3xl text-slate-300 space-y-8 leading-relaxed shadow-xl">
        <div className="flex items-center gap-3 mb-2 pb-6 border-b border-white/10">
          <FileWarning className="text-pink-500" size={32} />
          <p className="text-sm font-bold text-pink-400 uppercase tracking-widest">Last Updated: August 2026</p>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-2">1. Platform Usage & Scope</h3>
          <p>By registering and using ZakatPay, you agree to utilize the platform exclusively for lawful, charitable purposes. The built-in calculation tool is provided based on standard Hanafi Fiqh guidelines. However, users are encouraged to consult their personal scholars for complex or highly specific business asset calculations.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">2. Donation Finality</h3>
          <p>Because funds are processed and routed in real-time to the selected Non-Governmental Organizations (NGOs) to provide immediate aid to the underprivileged, all donations successfully processed through the platform are strictly non-refundable.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">3. Tax Receipts & Exemption</h3>
          <p>While ZakatPay provides valid, system-generated documentation intended for FBR Section 61 tax rebates, the final acceptance, assessment, and approval of tax returns rests entirely with the Federal Board of Revenue (FBR), Pakistan. ZakatPay does not act as a tax advisory entity.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">4. User Account Responsibilities</h3>
          <p>You are solely responsible for maintaining the confidentiality of your account credentials, passwords, and OTP codes. ZakatPay will not be held liable for unauthorized transactions resulting from user negligence in securing their account details.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">5. Limitation of Liability</h3>
          <p>ZakatPay acts as a secure digital bridge between donors and registered charities. While we enforce strict audits on our partner organizations, ZakatPay is not legally liable for the day-to-day operational execution or individual administrative actions of the partner NGOs.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">6. Governing Law</h3>
          <p>These terms and conditions, and any disputes arising from your use of the platform, shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan.</p>
        </div>
      </div>
    </div>
  );
}

export function TaxExemptionPage() {
  return (
    <div className="w-full pb-24 framer-animate">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Tax <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Exemption</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Learn how your donations on ZakatPay can reduce your annual income tax liability.</p>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 mt-16 space-y-12">
        <div className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 p-10 rounded-3xl text-center">
          <ShieldCheck size={48} className="text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">FBR Approved under Section 61</h2>
          <p className="text-slate-400 max-w-3xl mx-auto">All partner organizations listed on ZakatPay possess valid NPO status and are approved under Section 61 of the Income Tax Ordinance, 2001. This means your donations are eligible for direct tax rebates.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center">
            <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 font-black">1</div>
            <h3 className="text-white font-bold mb-2">Donate Securely</h3>
            <p className="text-slate-400 text-sm">Make your Zakat or Sadaqah payment through our digital portal.</p>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 font-black">2</div>
            <h3 className="text-white font-bold mb-2">Download Receipt</h3>
            <p className="text-slate-400 text-sm">Get an instant, FBR-formatted PDF receipt from your donor dashboard.</p>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center">
            <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 font-black">3</div>
            <h3 className="text-white font-bold mb-2">Claim Rebate</h3>
            <p className="text-slate-400 text-sm">Attach the receipt while filing your returns on the FBR IRIS portal.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EBookPage() {
  const books = [
    { title: "The Ultimate Guide to Zakat", desc: "A comprehensive guide on calculation and rules.", color: "from-pink-600 to-red-600" },
    { title: "Fiqh of Sadaqah", desc: "Understanding the virtues of voluntary charity.", color: "from-purple-600 to-indigo-600" },
    { title: "Ramadan Philanthropy", desc: "Maximizing your spiritual rewards during the holy month.", color: "from-emerald-600 to-teal-600" }
  ];

  return (
    <div className="w-full pb-24 framer-animate">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">E-Books</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Enhance your Islamic knowledge with our free downloadable resources.</p>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {books.map((book, i) => (
          <div key={i} className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-6 group hover:border-pink-500/50 transition-all">
            <div className={`w-full h-64 bg-gradient-to-br ${book.color} rounded-2xl mb-6 flex flex-col items-center justify-center text-center p-6 shadow-lg group-hover:scale-105 transition-transform`}>
              <BookText size={48} className="text-white/50 mb-4" />
              <h3 className="text-2xl font-black text-white leading-tight">{book.title}</h3>
            </div>
            <p className="text-slate-400 mb-6">{book.desc}</p>
            <button className="w-full bg-white/5 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
              <Download size={18} /> Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewsletterArchivePage() {
  const archives = [
    { title: "Ramadan Impact Report 2026", date: "April 2026", status: "Published" },
    { title: "New Charities Onboarded", date: "February 2026", status: "Published" },
    { title: "Winter Relief Campaign Success", date: "January 2026", status: "Published" },
  ];

  return (
    <div className="w-full pb-24 framer-animate">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Newsletter <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Archive</span></h1>
      </div>
      <div className="max-w-[800px] mx-auto px-6 mt-16">
        <div className="space-y-4">
          {archives.map((item, i) => (
            <div key={i} className="bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:border-purple-500/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <Mail className="text-purple-400" size={24} />
                <div>
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  <p className="text-slate-500 text-sm">{item.date}</p>
                </div>
              </div>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AuditReportsPage() {
  const reports = [
    { year: "2025 - 2026", title: "Annual Zakat & Sadaqah Audit", size: "4.2 MB", date: "August 2026", allocs: { h: "45%", e: "30%", f: "15%", em: "10%" } },
    { year: "2024 - 2025", title: "Consolidated Financial Report", size: "3.8 MB", date: "July 2025", allocs: { h: "40%", e: "35%", f: "15%", em: "10%" } },
    { year: "2023 - 2024", title: "Third-Party Impact & Audit", size: "3.5 MB", date: "July 2024", allocs: { h: "35%", e: "30%", f: "20%", em: "15%" } },
    { year: "2022 - 2023", title: "Initial Transparency Report", size: "2.1 MB", date: "June 2023", allocs: { h: "50%", e: "25%", f: "15%", em: "10%" } },
  ];

  const handleDownload = (e, report) => {
    e.preventDefault();
    const stream = `BT\n/F1 16 Tf\n50 750 Td\n(ZakatPay Audit Report: ${report.year}) Tj\n/F1 12 Tf\n0 -30 Td\n(Report Title: ${report.title}) Tj\n0 -40 Td\n(100% of user donations routed to FBR-approved NGOs.) Tj\n0 -30 Td\n(Fund Allocations:) Tj\n0 -20 Td\n(- Healthcare & Medical Relief: ${report.allocs.h}) Tj\n0 -20 Td\n(- Education & Orphan Support: ${report.allocs.e}) Tj\n0 -20 Td\n(- Food & Clean Water Projects: ${report.allocs.f}) Tj\n0 -20 Td\n(- Emergency Disaster Relief: ${report.allocs.em}) Tj\n0 -40 Td\n(ZakatPay Platform Fees: 0% [Self-Funded]) Tj\n0 -40 Td\n(Certified by ZakatPay Independent Shariah Board & Auditors) Tj\nET`;
    const obj1 = "<< /Type /Catalog /Pages 2 0 R >>";
    const obj2 = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>";
    const obj3 = "<< /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 595 842] /Contents 5 0 R >>";
    const obj4 = "<< /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >>";
    const obj5 = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
    
    let pdf = "%PDF-1.1\n";
    const offsets = [];
    const addObj = (id, content) => { offsets.push(pdf.length); pdf += `${id} 0 obj\n${content}\nendobj\n`; };
    
    addObj(1, obj1); addObj(2, obj2); addObj(3, obj3); addObj(4, obj4); addObj(5, obj5);
    const startxref = pdf.length;
    pdf += "xref\n0 6\n0000000000 65535 f \n";
    for(let i=0; i<5; i++) { pdf += offsets[i].toString().padStart(10, '0') + " 00000 n \n"; }
    pdf += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF`;
    
    const base64Pdf = btoa(pdf);
    const linkSource = `data:application/pdf;base64,${base64Pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = `ZakatPay_Audit_Report_${report.year.replace(/\s+/g, '')}.pdf`;
    
    downloadLink.href = linkSource; downloadLink.download = fileName;
    document.body.appendChild(downloadLink); downloadLink.click(); document.body.removeChild(downloadLink);
  };

  return (
    <div className="w-full pb-24 framer-animate">
      <div className="bg-white/5 border-b border-white/10 py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10">
          Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Transparency</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto relative z-10">
          We believe in absolute accountability. Every single rupee donated is tracked, audited, and utilized strictly according to Shariah principles.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mt-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-white/5 to-transparent p-8 rounded-3xl border border-white/10 hover:border-pink-500/50 transition-colors">
            <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-400 mb-6"><PieChart size={28} /></div>
            <h3 className="text-xl font-bold text-white mb-3">100% Donation Policy</h3>
            <p className="text-slate-400 text-sm leading-relaxed">We cover our operational costs through private sponsors. 100% of your Zakat and Sadaqah directly reaches the verified causes.</p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-transparent p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-colors">
            <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6"><ShieldCheck size={28} /></div>
            <h3 className="text-xl font-bold text-white mb-3">Third-Party Audits</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Our accounts are rigorously audited annually by top-tier global auditing firms to ensure compliance.</p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-transparent p-8 rounded-3xl border border-white/10 hover:border-pink-500/50 transition-colors">
            <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-400 mb-6"><BookOpen size={28} /></div>
            <h3 className="text-xl font-bold text-white mb-3">Shariah Board Review</h3>
            <p className="text-slate-400 text-sm leading-relaxed">A dedicated panel of esteemed Islamic scholars regularly reviews our fund distribution.</p>
          </div>
        </div>

        <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-10 shadow-2xl">
          <h2 className="text-2xl font-black text-white mb-8 text-center">Where Your Zakat Goes</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2"><span className="text-white">Healthcare & Medical Relief</span><span className="text-pink-400">45%</span></div>
              <div className="w-full bg-white/5 rounded-full h-3"><div className="bg-gradient-to-r from-pink-600 to-pink-400 h-3 rounded-full w-[45%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2"><span className="text-white">Education & Orphan Support</span><span className="text-purple-400">30%</span></div>
              <div className="w-full bg-white/5 rounded-full h-3"><div className="bg-gradient-to-r from-purple-600 to-purple-400 h-3 rounded-full w-[30%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2"><span className="text-white">Food & Clean Water Projects</span><span className="text-blue-400">15%</span></div>
              <div className="w-full bg-white/5 rounded-full h-3"><div className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full w-[15%]"></div></div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-black text-white mb-8">Download Annual Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center"><FileText size={24} /></div>
                  <div>
                    <h4 className="text-white font-bold">{report.year}</h4>
                    <p className="text-slate-400 text-xs">{report.title}</p>
                    <div className="flex gap-3 mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest"><span>{report.date}</span><span>•</span><span>PDF ({report.size})</span></div>
                  </div>
                </div>
                <button onClick={(e) => handleDownload(e, report)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-pink-500 group-hover:border-pink-500 group-hover:text-white transition-all cursor-pointer">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Is ZakatPay completely free to use?",
      a: "Yes, absolutely! ZakatPay charges 0% platform or administrative fees. 100% of your Zakat and Sadaqah goes directly to the verified foundation of your choice. Our servers and operational costs are independently funded by private sponsors."
    },
    {
      q: "Are the charitable organizations verified?",
      a: "Without a doubt. We enforce strict compliance. Every foundation listed on our portal holds a valid NPO (Non-Profit Organization) status, is registered with the SECP, and is officially approved by the Federal Board of Revenue (FBR)."
    },
    {
      q: "Will I receive a tax exemption receipt?",
      a: "Yes. Immediately after a successful donation, an FBR-formatted PDF receipt is generated in your Donor Dashboard. You can download and attach this receipt when filing your annual income tax returns to claim your legal tax rebate under Section 61."
    },
    {
      q: "How do I calculate Zakat on my freelance or irregular income?",
      a: "The most practical approach is to set a specific 'Zakat Anniversary' date (e.g., 1st of Ramadan). On that single date, calculate your total liquid assets (cash, bank balance, gold, silver, investments). If the total exceeds the current Nisab threshold, you simply pay 2.5% on that total amount. This eliminates the need to track irregular daily invoices."
    },
    {
      q: "Is my credit card or banking information secure?",
      a: "100% secure. ZakatPay integrates with bank-grade 256-bit SSL encrypted payment gateways (VISA, Mastercard, 1LINK, Easypaisa). We never store your card numbers, CVV, or banking PINs on our servers."
    }
  ];

  return (
    <div className="w-full pb-24 framer-animate">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <div className="w-16 h-16 bg-pink-500/20 text-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6"><HelpCircle size={32} /></div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Questions</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto px-4">Everything you need to know about ZakatPay, secure payments, and Islamic rulings.</p>
      </div>

      <div className="max-w-[800px] mx-auto px-6 mt-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none"
              >
                <h3 className="text-lg font-bold text-white pr-4">{faq.q}</h3>
                <ChevronDown 
                  size={20} 
                  className={`text-pink-500 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PlaceholderPage({ title, desc }) {
  return (
    <div className="w-full py-32 text-center framer-animate">
      <div className="inline-block p-6 rounded-full bg-white/5 border border-white/10 mb-6">
        <Activity size={48} className="text-pink-500 animate-pulse" />
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-white mb-4">{title}</h1>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto">{desc}</p>
    </div>
  );
}