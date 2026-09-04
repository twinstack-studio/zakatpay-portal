import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, Heart, Calculator, History, 
  Download, Activity, CheckCircle2,
  Lock, LogIn, ArrowRight, ShieldCheck, FileText, TrendingUp
} from 'lucide-react';

export default function Dashboard({ user, onLogin }) {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [totalDonated, setTotalDonated] = useState(0);

  useEffect(() => {
    const savedTrx = localStorage.getItem('zakatTransactions');
    
    if (savedTrx && user?.email) {
      const parsedTrx = JSON.parse(savedTrx);
      
      // STRICT FILTER: Sirf current user ki transactions dikhayega
      const userTransactions = parsedTrx.filter(trx => trx.userEmail === user.email);
      
      setRecentTransactions(userTransactions);
      
      const total = userTransactions.reduce((sum, trx) => {
        const amountNum = parseInt(trx.amount.replace(/[^0-9]/g, ''));
        return sum + (amountNum || 0);
      }, 0);
      setTotalDonated(total);
    } else {
      setRecentTransactions([]);
      setTotalDonated(0);
    }
  }, [user]);

  const handleDownloadReceipt = (trx) => {
    const receiptContent = `
===================================================
             ZAKATPAY DIGITAL RECEIPT
===================================================
Donor Name     : ${user?.name || 'Wasil Nadeem'}
Transaction ID : ${trx.id}
Date           : ${trx.date}
Organization   : ${trx.org}
Category       : ${trx.category}
Amount         : ${trx.amount}
Status         : ${trx.status}
===================================================
Thank you for your generous contribution. 
May your ${trx.category} be accepted.
This is a system generated FBR-compliant receipt.
===================================================
`;
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ZakatPay_Receipt_${trx.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Signed out: the dashboard is personal data, so gate it behind login
  // rather than rendering an empty shell with placeholder zeros.
  if (!user) {
    const perks = [
      { icon: TrendingUp, title: 'Track every donation', desc: 'See what you have given this year, organisation by organisation.' },
      { icon: FileText, title: 'Download tax receipts', desc: 'FBR-compliant receipts for every transaction, ready to file.' },
      { icon: ShieldCheck, title: 'Your Zakat history', desc: 'A private record of your obligations, kept year on year.' },
    ];

    return (
      <div className="w-full framer-animate">
        <div className="relative overflow-hidden bg-[#0a0a0c] border border-white/10 rounded-2xl sm:rounded-3xl shadow-xl">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-600/20 rounded-full blur-[90px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-24 w-72 h-72 bg-purple-600/20 rounded-full blur-[90px] pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-transparent"></div>

          <div className="relative z-10 px-5 py-12 sm:px-10 sm:py-16 md:py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-white/10 text-pink-400 mb-6">
              <Lock size={30} />
            </div>

            <p className="text-pink-400 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-3">Donor Dashboard</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Please log in to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">continue</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8">
              Your dashboard holds your personal giving record, so it is only visible once you are signed in.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-12">
              <button
                onClick={onLogin}
                className="flex-1 h-12 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <LogIn size={18} /> Login to ZakatPay
              </button>
              <Link
                to="/foundations"
                className="flex-1 h-12 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Browse Foundations <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 text-left max-w-3xl mx-auto">
              {perks.map((perk) => (
                <div key={perk.title} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                  <perk.icon size={20} className="text-purple-400 mb-3" />
                  <h3 className="text-white font-bold text-sm mb-1.5">{perk.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full framer-animate space-y-6 sm:space-y-8">
      
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 sm:gap-6 bg-[#0a0a0c] border border-white/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center gap-4 sm:gap-6">
          <div className="w-14 h-14 sm:w-20 sm:h-20 shrink-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-xl sm:text-3xl shadow-[0_0_20px_rgba(236,72,153,0.4)]">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-pink-400 font-bold text-[11px] sm:text-sm uppercase tracking-widest mb-1">Welcome</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white break-words">{user?.name || 'User'}</h1>
            <p className="text-slate-400 text-xs sm:text-base mt-1 flex items-center gap-2 break-all">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Wallet Connected securely
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3 w-full md:w-auto">
          <Link to="/calculator" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 sm:px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors flex flex-1 md:flex-none justify-center items-center gap-2">
            <Calculator size={16} /> Re-Calculate
          </Link>
          <Link to="/foundations" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-5 py-3 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.3)] font-bold text-xs sm:text-sm transition-all flex flex-1 md:flex-none justify-center items-center gap-2">
            <Heart size={16} /> Donate
          </Link>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 p-5 sm:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden group hover:border-purple-500/60 transition-colors">
          <Wallet size={80} className="absolute -bottom-4 -right-4 text-purple-500/10 group-hover:scale-110 transition-transform duration-500" />
          <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-4 sm:mb-6"><Wallet size={24} /></div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Wallet Balance</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-mono break-all">Rs. 0</h2>
        </div>

        <div className="bg-gradient-to-br from-pink-900/30 to-black border border-pink-500/30 p-5 sm:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden group hover:border-pink-500/60 transition-colors">
          <Heart size={80} className="absolute -bottom-4 -right-4 text-pink-500/10 group-hover:scale-110 transition-transform duration-500" />
          <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center mb-4 sm:mb-6"><Heart size={24} /></div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Total Donated (2026)</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-mono break-all">Rs. {totalDonated.toLocaleString()}</h2>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden group hover:border-white/20 transition-colors">
          <Activity size={80} className="absolute -bottom-4 -right-4 text-white/5 group-hover:scale-110 transition-transform duration-500" />
          <div className="w-12 h-12 bg-white/10 text-slate-300 rounded-xl flex items-center justify-center mb-4 sm:mb-6"><Activity size={24} /></div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Pending Zakat</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-500 font-mono break-all">Rs. 0</h2>
          <p className="mt-6 text-slate-500 text-sm flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" /> All dues cleared
          </p>
        </div>
      </div>

      {/* 3. RECENT TRANSACTIONS */}
      <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
        <div className="p-5 sm:p-6 md:p-8 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
            <History className="text-pink-500 shrink-0" size={20} /> Recent Transactions
          </h3>
        </div>

        {/* Mobile / tablet: card list */}
        <div className="lg:hidden divide-y divide-white/5">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((trx, index) => (
              <div key={index} className="p-4 sm:p-5">
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <p className="font-bold text-white text-sm truncate">{trx.org}</p>
                    <p className="text-slate-500 text-[11px] font-mono mt-0.5 truncate">{trx.id}</p>
                  </div>
                  <p className="font-black text-white font-mono text-sm whitespace-nowrap">{trx.amount}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${trx.category === 'Zakat' ? 'bg-purple-500/20 text-purple-400' : 'bg-pink-500/20 text-pink-400'}`}>
                    {trx.category}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full text-[10px] font-bold">
                    <CheckCircle2 size={11} /> {trx.status}
                  </span>
                  <span className="text-slate-500 text-[11px]">{trx.date}</span>
                  <button onClick={() => handleDownloadReceipt(trx)} className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white/5 hover:bg-pink-600 hover:text-white text-slate-400 transition-all px-3 py-1.5 text-[10px] font-bold">
                    <Download size={12} /> Receipt
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-slate-500">
              <p className="mb-2 text-sm">No recent transactions found.</p>
              <Link to="/foundations" className="text-pink-400 hover:text-pink-300 font-bold text-xs underline underline-offset-4">Make your first donation</Link>
            </div>
          )}
        </div>

        {/* Desktop: full table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-widest">
                <th className="p-4 pl-8 font-bold">Transaction ID</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Organization</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Amount</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 pr-8 font-bold text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((trx, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 pl-8 text-slate-300 font-mono">{trx.id}</td>
                    <td className="p-4 text-slate-400">{trx.date}</td>
                    <td className="p-4 font-bold text-white">{trx.org}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${trx.category === 'Zakat' ? 'bg-purple-500/20 text-purple-400' : 'bg-pink-500/20 text-pink-400'}`}>
                        {trx.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-white font-mono">{trx.amount}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                        <CheckCircle2 size={12} /> {trx.status}
                      </span>
                    </td>
                    <td className="p-4 pr-8 text-right">
                      <button onClick={() => handleDownloadReceipt(trx)} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-pink-600 hover:text-white text-slate-400 transition-all shadow-md hover:scale-110 active:scale-95">
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-slate-500">
                    <p className="mb-2">No recent transactions found.</p>
                    <Link to="/foundations" className="text-pink-400 hover:text-pink-300 font-bold text-xs underline underline-offset-4">Make your first donation</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}