import React, { useState, useEffect } from 'react';
import { Receipt, Loader2, Calendar, Building2, CheckCircle2 } from 'lucide-react';

export default function DonationHistory({ user }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('http://localhost:5001/api/user/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email })
        });
        const data = await res.json();
        if (data.success) {
          setHistory(data.history);
        }
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
      setLoading(false);
    };

    fetchHistory();
  }, [user]);

  // Agar user login nahi hai toh history section na dikhayein
  if (!user) return null;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="framer-animate max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Tax Receipts & History</h2>
        <p className="text-slate-400 text-sm sm:text-base">Track your spiritual portfolio and generate FBR-compliant receipts.</p>
      </div>

      <div className="glass-panel overflow-hidden border border-white/10 rounded-2xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-14 sm:py-20 px-4">
            <Loader2 className="animate-spin text-emerald-400 mb-4" size={40} />
            <p className="text-slate-400 font-medium">Fetching your records...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 sm:py-20 text-center px-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-500 mb-4">
              <Receipt size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Donations Yet</h3>
            <p className="text-slate-400 max-w-md">Your donation history will appear here once you make your first secure transfer.</p>
          </div>
        ) : (
          <>
            {/* Mobile: card list */}
            <div className="md:hidden divide-y divide-white/5">
              {history.map((record, index) => (
                <div key={index} className="p-4 sm:p-5">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Building2 size={15} className="text-slate-500 shrink-0" />
                      <span className="text-white font-bold text-sm truncate">{record.charity}</span>
                    </div>
                    <span className="text-emerald-400 font-black text-sm whitespace-nowrap">PKR {record.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 mt-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Calendar size={14} className="text-slate-500 shrink-0" />
                      <span className="text-slate-400 text-xs truncate">{formatDate(record.date)}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0">
                      <CheckCircle2 size={12} /> Confirmed
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tablet & desktop: table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Organization</th>
                    <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {history.map((record, index) => (
                    <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Calendar size={16} className="text-slate-500" />
                          <span className="text-slate-300 font-medium">{formatDate(record.date)}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Building2 size={16} className="text-slate-500" />
                          <span className="text-white font-bold">{record.charity}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap">
                        <span className="text-emerald-400 font-black">PKR {record.amount.toLocaleString()}</span>
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap text-right">
                        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                          <CheckCircle2 size={14} /> Confirmed
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}