import React, { useState } from 'react';
import { Heart, ShieldCheck, ArrowRight, X, Loader2, CheckCircle2, CreditCard, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const charitiesList = [
  { id: "edhi", name: "Edhi Foundation", category: "General Welfare", description: "Pakistan's largest social welfare and ambulance network.", ownerName: "Abdul Sattar Edhi", ownerPic: "https://upload.wikimedia.org/wikipedia/commons/2/25/Abdul_Sattar_Edhi_close-up_%28cropped%29.jpg" },
  { id: "saylani", name: "Saylani Welfare Trust", category: "Food & Education", description: "Providing free meals and technical education to thousands.", ownerName: "Maulana Bashir Farooqi", ownerPic: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&w=150&q=80" },
  { id: "indus", name: "Indus Hospital", category: "Healthcare", description: "Free state-of-the-art medical and cancer treatment.", ownerName: "Dr. Abdul Bari Khan", ownerPic: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&q=80" },
  { id: "shaukat", name: "Shaukat Khanum", category: "Healthcare", description: "Free world-class cancer treatment for the underprivileged.", ownerName: "Imran Khan", ownerPic: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Imran_khan_2023.jpg/800px-Imran_khan_2023.jpg" }
];

export default function Charities({ user }) {
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [accountDetails, setAccountDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDonateClick = (charity) => {
    if (!user) { alert("Please Create a Wallet or Login from the top right to start donating!"); return; }
    setSelectedCharity(charity); setStep(1); setAmount(''); setPaymentMethod(''); setAccountDetails(''); setError('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Verified Organizations</h2>
        <p className="text-slate-400">Distribute your Zakat safely to FBR-approved charities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {charitiesList.map((charity) => (
          <div key={charity.id} className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-pink-500/50 transition-all group relative">
            <div>
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 shadow-inner">
                  <Heart size={28} className="group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full p-1 bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-colors shadow-xl">
                    <img 
                      src={charity.ownerPic} alt={charity.ownerName} className="w-full h-full rounded-full object-cover object-top"
                      onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(charity.ownerName)}&background=ec4899&color=fff&size=200&bold=true`; }}
                    />
                  </div>
                  <span className="mt-2 bg-black border border-white/10 text-slate-300 text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {charity.ownerName}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">{charity.category}</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-2 leading-tight">{charity.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4 sm:mb-6">{charity.description}</p>
            </div>
            
            <div className="flex gap-2">
              <Link to={`/charity/${charity.id}`} className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-colors flex items-center justify-center text-xs">
                Details
              </Link>
              <button onClick={() => handleDonateClick(charity)} className="flex-[2] py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg">
                Donate <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}