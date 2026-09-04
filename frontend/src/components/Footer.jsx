import React from 'react';
import { Phone, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Gap aur margins ko chota kiya gaya hai (gap-5 sm:gap-8, mb-5 sm:mb-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 mb-5 sm:mb-8">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
                <span className="text-black font-black text-sm">Z</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">ZakatPay</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Pakistan's premier digital Zakat calculator & donation portal.
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-[10px] font-bold">
              <ShieldCheck size={14} /> 100% Tax Credit (FBR)
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest text-[10px] uppercase mb-4">Featured Charities</h4>
            <ul className="space-y-2">
              <li><Link to="/charity/edhi" className="text-slate-400 hover:text-emerald-400 transition-colors text-xs">Edhi Foundation</Link></li>
              <li><Link to="/charity/saylani" className="text-slate-400 hover:text-emerald-400 transition-colors text-xs">Saylani Welfare</Link></li>
              <li><Link to="/charity/indus" className="text-slate-400 hover:text-emerald-400 transition-colors text-xs">Indus Hospital</Link></li>
              <li><Link to="/charity/shaukat" className="text-slate-400 hover:text-emerald-400 transition-colors text-xs">Shaukat Khanum</Link></li>
              <li><Link to="/faqs" className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer">FAQs & Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest text-[10px] uppercase mb-4">Payments</h4>
            <ul className="space-y-2">
              <li className="text-slate-400 text-xs">EasyPaisa / JazzCash</li>
              <li className="text-slate-400 text-xs">Raast ID (IBFT)</li>
              <li className="text-slate-400 text-xs">SadaPay / NayaPay</li>
              <li className="text-slate-400 text-xs">Visa / Mastercard</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest text-[10px] uppercase mb-4">Support</h4>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-slate-500" />
                <span className="text-slate-300 text-xs">+92 21 111-925-288</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-slate-500" />
                <span className="text-slate-300 text-xs">support@zakatpay.pk</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[10px]">
            © 2026 ZakatPay PK - Built with <span className="text-emerald-500">♥</span> for Pakistan
          </p>
          <div className="flex items-center gap-4">
            <Link to="/calculator" className="text-slate-500 hover:text-white text-[10px] transition-colors">Calculator</Link>
            <Link to="/charities" className="text-slate-500 hover:text-white text-[10px] transition-colors">Charities</Link>
            <Link to="/process" className="text-slate-500 hover:text-white text-[10px] transition-colors">Process</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}