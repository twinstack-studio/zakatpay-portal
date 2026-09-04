import React, { useState, useEffect } from 'react';
import { Coins, Landmark, RefreshCcw, HeartHandshake } from 'lucide-react';
// 1. React Router ka Link import kiya
import { Link } from 'react-router-dom';

// 12 Foundatins wala data ab dropdown mein use nahi ho raha, isliye yahan se hata diya gaya hai.
// ZakatPay is data ko ab main Foundations wale page par show karega.

// 1. AJJ KE RATES (Barkaraar)
const GOLD_RATE_PER_TOLA = 245000; 
const SILVER_RATE_PER_TOLA = 3150; 

export default function ZakatCalculator() {
  const [assets, setAssets] = useState({ cash: '', bank: '', gold: '', silver: '', investments: '', businessInventory: '' });
  const [liabilities, setLiabilities] = useState({ debts: '', bills: '' });
  const [totalZakat, setTotalZakat] = useState(0);
  const [totalNetWorth, setTotalNetWorth] = useState(0);
  
  // Zakat ka Nisab (Barkaraar)
  const nisabSilver = 52.5 * SILVER_RATE_PER_TOLA; 

  // Dropdown aur purane donation flow ke states ko hata diya gaya hai kyunke ab hum direct foundations page par bhej rahe hain.

  const handleAssetChange = (e) => setAssets({ ...assets, [e.target.name]: e.target.value });
  const handleLiabilityChange = (e) => setLiabilities({ ...liabilities, [e.target.name]: e.target.value });

  useEffect(() => {
    // 2. TOLA KO RUPEES MEIN CONVERT KARNE WALI LOGIC (Barkaraar)
    const sumAssets = Object.entries(assets).reduce((acc, [key, value]) => {
      let numericValue = Number(value) || 0;
      if (key === 'gold') numericValue *= GOLD_RATE_PER_TOLA;
      if (key === 'silver') numericValue *= SILVER_RATE_PER_TOLA;
      return acc + numericValue;
    }, 0);

    const sumLiabilities = Object.values(liabilities).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
    const netWorth = sumAssets - sumLiabilities;
    
    setTotalNetWorth(netWorth);
    if (netWorth >= nisabSilver) {
      const zakat = netWorth * 0.025;
      setTotalZakat(zakat);
      // setDonateAmount logic removed as we don't need it here anymore
    } else {
      setTotalZakat(0);
      // Purane flow control states reset logic removed
    }
  }, [assets, liabilities, nisabSilver]);

  const resetCalculator = () => {
    setAssets({ cash: '', bank: '', gold: '', silver: '', investments: '', businessInventory: '' });
    setLiabilities({ debts: '', bills: '' });
    // Purane flow control states reset logic removed
  };

  // handleCopy aur processPayment functions hata diye gaye hain kyunke ab ye component payment process nahi karega.

  return (
    <div className="max-w-5xl mx-auto framer-animate">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Smart Zakat Calculator</h2>
        <p className="text-slate-400">Enter your assets and liabilities accurately. We'll handle the rest based on Shariah principles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* ASSETS SECTION (Barkaraar) */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-pink-500/30 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2"><Coins className="text-pink-500" size={24} /> Your Assets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(assets).map((key) => {
                const isMetal = key === 'gold' || key === 'silver';
                const rate = key === 'gold' ? GOLD_RATE_PER_TOLA : SILVER_RATE_PER_TOLA;
                
                return (
                  <div key={key}>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      {key.replace(/([A-Z])/g, ' $1').trim()} {isMetal && <span className="text-pink-500">(in Tola)</span>}
                    </label>
                    <div className="relative">
                      {!isMetal && <span className="absolute left-4 top-3 text-slate-500 font-bold">Rs.</span>}
                      
                      <input 
                        type="number" 
                        name={key} 
                        value={assets[key]} 
                        onChange={handleAssetChange} 
                        placeholder="0" 
                        className={`w-full bg-black border border-white/10 rounded-xl py-3 ${isMetal ? 'pl-4 pr-16' : 'pl-12 pr-4'} text-white outline-none focus:border-pink-500 font-mono`} 
                      />
                      
                      {isMetal && <span className="absolute right-4 top-3.5 text-slate-500 font-bold text-xs uppercase tracking-widest">Tolas</span>}
                    </div>
                    {isMetal && (
                      <p className="text-[10px] text-slate-500 mt-1 pl-1 font-bold">
                        Rate: <span className="text-pink-400">Rs. {rate.toLocaleString()}</span> / tola
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* LIABILITIES SECTION (Barkaraar) */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2"><Landmark className="text-purple-500" size={24} /> Your Liabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(liabilities).map((key) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{key === 'debts' ? 'Debts You Owe' : 'Pending Bills'}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-500 font-bold">Rs.</span>
                    <input type="number" name={key} value={liabilities[key]} onChange={handleLiabilityChange} placeholder="0" className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-purple-500 font-mono" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SUMMARY SECTION */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0a0a0c] to-black border border-white/10 rounded-2xl p-6 md:p-8 relative shadow-2xl">
            {totalZakat > 0 && <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-600"></div>}
            
            <h3 className="text-xl font-bold text-white mb-5 sm:mb-8 border-b border-white/10 pb-4">Calculation Summary</h3>
            
            <div className="space-y-4 mb-5 sm:mb-8">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Total Assets</span>
                {/* 3. SHOW TOTAL CONVERTED AMOUNT IN RUPEES IN SUMMARY (Barkaraar) */}
                <span className="text-white font-mono">
                  Rs. {Object.entries(assets).reduce((acc, [key, value]) => {
                    let num = Number(value) || 0;
                    if (key === 'gold') num *= GOLD_RATE_PER_TOLA;
                    if (key === 'silver') num *= SILVER_RATE_PER_TOLA;
                    return acc + num;
                  }, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center"><span className="text-slate-400 text-sm">Total Liabilities</span><span className="text-red-400 font-mono">- Rs. {Object.values(liabilities).reduce((a, b) => a + (Number(b)||0), 0).toLocaleString()}</span></div>
              <div className="flex justify-between items-center pt-4 border-t border-white/5"><span className="text-slate-300 font-bold">Net Worth</span><span className="text-white font-bold font-mono">Rs. {totalNetWorth.toLocaleString()}</span></div>
            </div>

            <div className="bg-black/50 p-6 rounded-xl border border-white/5 text-center mb-4 sm:mb-6">
              <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Total Zakat Payable</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-mono tracking-tighter">Rs. {totalZakat.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
            </div>

            {totalZakat > 0 && (
              // Dropdown aur internal flow wale pure div block ko replace kar diya gaya hai.
              <Link 
                to="/foundations" 
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 text-white font-bold py-4 px-4 flex justify-center items-center gap-2 rounded-xl transition-all shadow-lg hover:scale-[1.02]"
              >
                <HeartHandshake size={18} /> Pay Zakat Now
              </Link>
            )}

            {!totalZakat && (<button onClick={resetCalculator} className="w-full mt-6 flex items-center justify-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold"><RefreshCcw size={16} /> Reset Calculator</button>)}
            {totalZakat > 0 && (<button onClick={resetCalculator} className="w-full mt-4 flex items-center justify-center gap-2 text-slate-500 hover:text-white text-xs font-bold">Clear Data</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}