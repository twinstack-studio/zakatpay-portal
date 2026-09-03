import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, Heart, Calculator, History, 
  Download, Activity, CheckCircle2 
} from 'lucide-react';

export default function Dashboard({ user }) {
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

  return (
    <div className="w-full framer-animate space-y-8">
      
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-[#0a0a0c] border border-white/10 p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-[0_0_20px_rgba(236,72,153,0.4)]">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-pink-400 font-bold text-sm uppercase tracking-widest mb-1">Welcome Back</p>
            <h1 className="text-3xl md:text-4xl font-black text-white">{user?.name || 'User'}</h1>
            <p className="text-slate-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Wallet Connected securely
            </p>
          </div>
        </div>

        <div className="relative z-10 flex gap-3">
          <Link to="/calculator" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
            <Calculator size={16} /> Re-Calculate
          </Link>
          <Link to="/foundations" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-5 py-3 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.3)] font-bold text-sm transition-all flex items-center gap-2">
            <Heart size={16} /> Donate
          </Link>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 p-8 rounded-3xl relative overflow-hidden group hover:border-purple-500/60 transition-colors">
          <Wallet size={80} className="absolute -bottom-4 -right-4 text-purple-500/10 group-hover:scale-110 transition-transform duration-500" />
          <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6"><Wallet size={24} /></div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Wallet Balance</p>
          <h2 className="text-4xl font-black text-white font-mono">Rs. 0</h2>
        </div>

        <div className="bg-gradient-to-br from-pink-900/30 to-black border border-pink-500/30 p-8 rounded-3xl relative overflow-hidden group hover:border-pink-500/60 transition-colors">
          <Heart size={80} className="absolute -bottom-4 -right-4 text-pink-500/10 group-hover:scale-110 transition-transform duration-500" />
          <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center mb-6"><Heart size={24} /></div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Total Donated (2026)</p>
          <h2 className="text-4xl font-black text-white font-mono">Rs. {totalDonated.toLocaleString()}</h2>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-colors">
          <Activity size={80} className="absolute -bottom-4 -right-4 text-white/5 group-hover:scale-110 transition-transform duration-500" />
          <div className="w-12 h-12 bg-white/10 text-slate-300 rounded-xl flex items-center justify-center mb-6"><Activity size={24} /></div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Pending Zakat</p>
          <h2 className="text-4xl font-black text-slate-500 font-mono">Rs. 0</h2>
          <p className="mt-6 text-slate-500 text-sm flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" /> All dues cleared
          </p>
        </div>
      </div>

      {/* 3. RECENT TRANSACTIONS TABLE */}
      <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="text-pink-500" size={20} /> Recent Transactions
          </h3>
        </div>
        
        <div className="overflow-x-auto">
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