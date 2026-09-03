import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Globe, Loader2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { foundationsData } from './Foundations';

const countriesList = [
  "Pakistan", "United Arab Emirates", "Saudi Arabia", "United Kingdom", "United States", "Australia", "Canada", "Other"
].sort();

export default function Donate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ngo = foundationsData.find((f) => f.id === id);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', country: 'Pakistan', city: '', amount: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('zakatUser'));
    if (savedUser) setFormData(prev => ({ ...prev, name: savedUser.name || '', email: savedUser.email || '' }));
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleProceed = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Thora sa loading effect de kar naye Checkout page par bhej do!
    setTimeout(() => {
      setIsProcessing(false);
      // Naye Checkout page par data pass kiya ja raha hai
      navigate(`/checkout/${ngo.id}`, { state: { amount: formData.amount, donor: formData } });
    }, 1000);
  };

  if (!ngo) return null;

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 py-12 md:py-24 framer-animate">
      <div className="w-full max-w-5xl bg-[#0a0a0c] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        
        {/* LEFT SIDE */}
        <div className={`md:w-5/12 bg-gradient-to-br ${ngo.color} p-10 md:p-12 text-white relative flex flex-col justify-between overflow-hidden`}>
          <HeartHandshake size={300} className="absolute -bottom-20 -left-20 opacity-10 rotate-12" />
          <div className="relative z-10">
            <Link to="/foundations" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold text-sm mb-12 transition-colors">
              <ArrowLeft size={16} /> Back
            </Link>
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-6 overflow-hidden p-1">
              <img src={ngo.image} alt={ngo.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-2">You are donating to</p>
            <h2 className="text-4xl font-black mb-4 leading-tight">{ngo.name}</h2>
            <p className="text-white/80 text-sm leading-relaxed border-l-4 border-white/30 pl-4 italic">
              {ngo.shortDesc}
            </p>
          </div>
          <div className="relative z-10 mt-12 bg-black/20 p-5 rounded-2xl border border-white/20 backdrop-blur-md">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2"><ShieldCheck size={18} /> Step 1 of 2</h4>
            <p className="text-xs text-white/70">Please verify your donor details before proceeding to the payment gateway selection.</p>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="md:w-7/12 p-10 md:p-12 relative bg-[#0a0a0c]">
          <div className="mb-8 border-b border-white/10 pb-6">
            <h3 className="text-3xl font-black text-white mb-2">Donor Details</h3>
            <p className="text-slate-400 text-sm">Please provide your details for the donation receipt.</p>
          </div>

          <form onSubmit={handleProceed} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><User size={12}/> Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className={`w-full bg-[#13141a] border border-white/10 rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-${ngo.color.split(' ')[0].split('-')[1]}-500 transition-colors`} placeholder="Ahmad Nadeem" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Mail size={12}/> Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className={`w-full bg-[#13141a] border border-white/10 rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-${ngo.color.split(' ')[0].split('-')[1]}-500 transition-colors`} placeholder="ahmad@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Phone size={12}/> Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className={`w-full bg-[#13141a] border border-white/10 rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-${ngo.color.split(' ')[0].split('-')[1]}-500 transition-colors`} placeholder="+92 300 0000000" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><HeartHandshake size={12} className={ngo.textClass}/> Donation Amount (Rs.)</label>
                <input type="number" name="amount" required min="10" value={formData.amount} onChange={handleInputChange} className={`w-full bg-[#13141a] border border-white/10 rounded-xl py-3.5 px-4 text-white text-sm font-bold font-mono outline-none focus:border-${ngo.color.split(' ')[0].split('-')[1]}-500 transition-colors`} placeholder="5000" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Globe size={12}/> Country</label>
                <div className="relative">
                  <select name="country" required value={formData.country} onChange={handleInputChange} className={`w-full bg-[#13141a] border border-white/10 rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-${ngo.color.split(' ')[0].split('-')[1]}-500 transition-colors appearance-none cursor-pointer custom-scrollbar`}>
                    {countriesList.map(country => (<option key={country} value={country}>{country}</option>))}
                  </select>
                  <Globe size={14} className="absolute right-4 top-4 text-slate-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><MapPin size={12}/> City</label>
                <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className={`w-full bg-[#13141a] border border-white/10 rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-${ngo.color.split(' ')[0].split('-')[1]}-500 transition-colors`} placeholder="Islamabad" />
              </div>
            </div>
            
            <hr className="border-white/10 my-6" />

            <button type="submit" disabled={isProcessing} className={`w-full bg-gradient-to-r ${ngo.color} hover:opacity-90 text-white font-black py-4 rounded-xl transition-all flex justify-center items-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:scale-[1.02] uppercase tracking-widest`}>
              {isProcessing ? <Loader2 className="animate-spin" size={20} /> : 'Continue to Payment Gateways'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}