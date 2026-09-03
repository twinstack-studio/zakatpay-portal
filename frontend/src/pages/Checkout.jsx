import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, CheckCircle2, Loader2, Landmark, Lock, CreditCard, Smartphone, Calendar, Hash, User } from 'lucide-react';
import { foundationsData } from './Foundations';

// === OFFICIAL LOGOS CREATED WITH PURE CODE ===
const PaymentLogos = {
  visa: <div className="text-[#1434CB] font-black italic text-2xl tracking-tighter bg-white px-2 py-1 rounded">VISA</div>,
  mastercard: (
    <div className="relative w-12 h-8 flex items-center justify-center">
      <div className="absolute left-1 w-7 h-7 rounded-full bg-[#EB001B] opacity-90"></div>
      <div className="absolute right-1 w-7 h-7 rounded-full bg-[#F79E1B] opacity-90"></div>
    </div>
  ),
  easypaisa: (
    <div className="bg-[#00B85C] px-3 py-1.5 rounded-md text-white font-bold tracking-tight text-sm">
      easypaisa
    </div>
  ),
  jazzcash: (
    <div className="text-[#ED1C24] font-black tracking-tighter text-xl flex items-center bg-white px-2 py-1 rounded-md">
      Jazz<span className="text-black">Cash</span>
    </div>
  ),
  onelink: (
    <div className="font-black italic text-xl flex items-center bg-white px-2 py-1 rounded-md">
      <span className="text-[#00529C]">1</span><span className="text-[#F26522]">LINK</span>
    </div>
  )
};

const gateways = [
  { id: 'mastercard', name: 'Mastercard', logo: PaymentLogos.mastercard },
  { id: 'visa', name: 'VISA Card', logo: PaymentLogos.visa },
  { id: 'easypaisa', name: 'Easypaisa', logo: PaymentLogos.easypaisa },
  { id: 'jazzcash', name: 'JazzCash', logo: PaymentLogos.jazzcash },
  { id: 'onelink', name: '1LINK Transfer', logo: PaymentLogos.onelink },
];

export default function Checkout() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const ngo = foundationsData.find((f) => f.id === id);

  const donationAmount = location.state?.amount || '0';
  const donorDetails = location.state?.donor || {};

  const [selectedMethod, setSelectedMethod] = useState('mastercard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [paymentData, setPaymentData] = useState({
    cardNumber: '', expiry: '', cvv: '', cardName: '', mobileNo: '', iban: ''
  });

  useEffect(() => {
    if (!location.state?.amount) {
      navigate(`/donate/${id}`);
    }
    window.scrollTo(0, 0);
  }, [location.state, navigate, id]);

  if (!ngo) return null;

  const handleInputChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      const loggedInUser = JSON.parse(localStorage.getItem('zakatUser')) || {};
      const newTrx = {
        id: 'TRX-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        org: ngo.name,
        category: 'Donation', 
        amount: 'Rs. ' + parseInt(donationAmount).toLocaleString(),
        status: 'Completed',
        userEmail: donorDetails.email || loggedInUser.email 
      };
      const savedTrx = JSON.parse(localStorage.getItem('zakatTransactions') || '[]');
      localStorage.setItem('zakatTransactions', JSON.stringify([newTrx, ...savedTrx]));

      setIsProcessing(false);
      setIsSuccess(true);
    }, 3000);
  };

  // === DYNAMIC FORM RENDERER ===
  const renderPaymentForm = () => {
    const focusClass = `focus:border-${ngo.color.split(' ')[0].split('-')[1]}-500`;

    if (selectedMethod === 'visa' || selectedMethod === 'mastercard') {
      return (
        <div className="space-y-5 animate-fade-in-up">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><CreditCard size={12}/> Card Number</label>
            <input type="text" name="cardNumber" required value={paymentData.cardNumber} onChange={handleInputChange} maxLength="19" placeholder="0000 0000 0000 0000" className={`w-full bg-[#13141a] border border-white/10 rounded-xl py-3.5 px-4 text-white font-mono text-sm outline-none transition-colors ${focusClass}`} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Calendar size={12}/> Expiry Date</label>
              <input type="text" name="expiry" required value={paymentData.expiry} onChange={handleInputChange} maxLength="5" placeholder="MM/YY" className={`w-full bg-[#13141a] border border-white/10 rounded-xl py-3.5 px-4 text-white font-mono text-sm outline-none transition-colors ${focusClass}`} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Hash size={12}/> CVV</label>
              <input type="password" name="cvv" required value={paymentData.cvv} onChange={handleInputChange} maxLength="3" placeholder="***" className={`w-full bg-[#13141a] border border-white/10 rounded-xl py-3.5 px-4 text-white font-mono text-sm outline-none transition-colors ${focusClass}`} />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><User size={12}/> Name on Card</label>
            <input type="text" name="cardName" required value={paymentData.cardName} onChange={handleInputChange} placeholder="Ahmad Nadeem" className={`w-full bg-[#13141a] border border-white/10 rounded-xl py-3.5 px-4 text-white text-sm outline-none transition-colors ${focusClass}`} />
          </div>
        </div>
      );
    } 
    
    if (selectedMethod === 'easypaisa' || selectedMethod === 'jazzcash') {
      return (
        <div className="space-y-5 animate-fade-in-up">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Smartphone size={12}/> {selectedMethod === 'easypaisa' ? 'Easypaisa' : 'JazzCash'} Mobile Number
            </label>
            <div className="relative">
              <input type="tel" name="mobileNo" required value={paymentData.mobileNo} onChange={handleInputChange} maxLength="11" placeholder="03XX XXXXXXX" className={`w-full bg-[#13141a] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-mono text-sm outline-none transition-colors ${focusClass}`} />
              <div className="absolute left-4 top-3.5 text-slate-500"><Smartphone size={18}/></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">Please keep your mobile phone nearby to approve the payment prompt.</p>
          </div>
        </div>
      );
    }

    if (selectedMethod === 'onelink') {
      return (
        <div className="space-y-5 animate-fade-in-up">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Landmark size={12}/> Bank Account / IBAN</label>
            <input type="text" name="iban" required value={paymentData.iban} onChange={handleInputChange} placeholder="PK00 ABCD 1234 5678 9101 1121" className={`w-full bg-[#13141a] border border-white/10 rounded-xl py-3.5 px-4 text-white font-mono text-sm outline-none transition-colors ${focusClass}`} />
            <p className="text-[10px] text-slate-500 mt-2">Enter your 24-character IBAN to process 1LINK direct debit.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] py-12 md:py-24 px-6 flex justify-center framer-animate">
      <div className="w-full max-w-4xl">
        
        {!isSuccess ? (
          <form onSubmit={handlePayment}>
            {/* 1. CHECKOUT HEADER & AMOUNT */}
            <div className="text-center mb-10">
              <Link to={`/donate/${id}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm mb-6 transition-colors">
                <ArrowLeft size={16} /> Edit Details
              </Link>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Secure Checkout</h2>
              <p className="text-slate-400 mb-6">Complete your donation to <span className={`font-bold ${ngo.textClass}`}>{ngo.name}</span></p>
              
              <div className={`inline-block bg-gradient-to-r ${ngo.color} p-1 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}>
                <div className="bg-[#0a0a0c] rounded-[1.35rem] px-8 py-6 flex flex-col items-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Donation Amount</p>
                  <h1 className="text-5xl md:text-6xl font-black text-white font-mono tracking-tighter">
                    <span className={ngo.textClass}>Rs. </span>{parseInt(donationAmount).toLocaleString()}
                  </h1>
                </div>
              </div>
            </div>

            {/* 2. PAYMENT METHODS & DYNAMIC FORM */}
            <div className="bg-[#0a0a0c] border border-white/10 p-8 rounded-[2rem] shadow-2xl mb-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Lock size={20} className={ngo.textClass} /> Select Payment Gateway
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {gateways.map((gateway) => (
                  <button 
                    type="button"
                    key={gateway.id}
                    onClick={() => setSelectedMethod(gateway.id)}
                    className={`relative p-5 rounded-2xl border transition-all flex flex-col items-center justify-center gap-4 min-h-[120px] ${selectedMethod === gateway.id ? `bg-white/10 ${ngo.borderClass} shadow-lg` : 'bg-[#13141a] border-white/5 hover:border-white/20 text-slate-400 grayscale hover:grayscale-0'}`}
                  >
                    {selectedMethod === gateway.id && (
                      <div className={`absolute top-3 right-3 ${ngo.textClass}`}>
                        <CheckCircle2 size={18} className="fill-current text-[#0a0a0c]" />
                      </div>
                    )}
                    <div className={selectedMethod === gateway.id ? 'grayscale-0 scale-110 transition-transform' : 'transition-transform'}>
                      {gateway.logo}
                    </div>
                    <span className={`text-xs font-bold ${selectedMethod === gateway.id ? 'text-white' : 'text-slate-500'}`}>{gateway.name}</span>
                  </button>
                ))}
              </div>

              {/* === DYNAMIC PAYMENT FORM APPEARS HERE === */}
              <div className="bg-[#13141a] border border-white/5 rounded-2xl p-6 mb-8">
                {renderPaymentForm()}
              </div>

              {/* 3. OFFICIAL BANK ACCOUNT BOX */}
              <div className="bg-[#13141a] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${ngo.bgClass} flex items-center justify-center flex-shrink-0`}>
                    <Landmark size={24} className={ngo.textClass} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Official Account (Reference)</p>
                    <p className="text-white font-mono font-bold tracking-wider">{ngo.bank}</p>
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Foundation</p>
                  <p className={`font-bold ${ngo.textClass}`}>{ngo.name}</p>
                </div>
              </div>
            </div>

            {/* 4. PROCEED BUTTON */}
            <button 
              type="submit"
              disabled={isProcessing} 
              className={`w-full bg-gradient-to-r ${ngo.color} hover:opacity-90 text-white font-black py-5 rounded-2xl transition-all flex justify-center items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:scale-[1.02] uppercase tracking-widest text-lg`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={24} /> Processing Payment...
                </>
              ) : (
                <>
                  <ShieldCheck size={24} /> Confirm & Pay Rs. {parseInt(donationAmount).toLocaleString()}
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
              <Lock size={12}/> Secure 256-bit SSL Encrypted Transaction
            </p>
          </form>
        ) : (
          /* ========================================== */
          /* SUCCESS MESSAGE SCREEN */
          /* ========================================== */
          <div className="bg-[#0a0a0c] border border-white/10 p-12 rounded-[3rem] shadow-2xl text-center animate-fade-in-up">
            <div className={`w-28 h-28 mx-auto rounded-full ${ngo.bgClass} flex items-center justify-center mb-8 shadow-2xl relative`}>
              <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current"></div>
              <CheckCircle2 size={60} className={ngo.textClass} />
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">JazakAllah!</h3>
            <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              Your generous donation of <span className={`font-bold ${ngo.textClass}`}>Rs. {parseInt(donationAmount).toLocaleString()}</span> has been successfully transferred to <span className="text-white">{ngo.name}</span>.
            </p>
            
            <div className="bg-[#13141a] border border-white/5 rounded-2xl p-6 max-w-md mx-auto mb-10 text-left">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Receipt Details</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Donor Name:</span><span className="text-white font-bold">{donorDetails.name || 'Anonymous'}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Payment Gateway:</span><span className="text-white font-bold capitalize">{selectedMethod}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Amount:</span><span className={`font-bold ${ngo.textClass}`}>Rs. {parseInt(donationAmount).toLocaleString()}</span></div>
              </div>
            </div>

            <Link to="/foundations" className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-4 px-10 rounded-xl transition-colors inline-block">
              Return to Foundations
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}