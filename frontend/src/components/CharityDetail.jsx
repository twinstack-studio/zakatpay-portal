import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';

const charityDatabase = {
  "edhi": {
    name: "Edhi Foundation", tagline: "Live and help live.",
    image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=1200&q=80",
    about: "The Edhi Foundation is a non-profit social welfare program in Pakistan, founded by Abdul Sattar Edhi in 1951.",
    impact: ["World's Largest Ambulance Fleet", "50,000+ Orphans Supported", "Free Hospitals & Clinics"],
    contact: { phone: "+92 (21) 111-111-823", email: "info@edhi.org", web: "www.edhi.org", address: "Sarafa Bazar, Karachi" }
  },
  "saylani": {
    name: "Saylani Welfare Trust", tagline: "Serving the unserved.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    about: "Saylani Welfare Trust provides free meals to hundreds of thousands daily.",
    impact: ["300,000+ Meals Daily", "Free IT Education (SMIT)", "Clean Water RO Plants"],
    contact: { phone: "+92 (21) 111-729-526", email: "info@saylani.com", web: "www.saylani.com", address: "Bahadurabad, Karachi" }
  }
};

export default function CharityDetail() {
  const { id } = useParams();
  const charity = charityDatabase[id] || charityDatabase['edhi']; // Fallback for testing

  return (
    <div className="max-w-6xl mx-auto px-4 pb-12">
      <Link to="/charities" className="inline-flex items-center gap-2 text-slate-400 hover:text-pink-400 transition-colors mb-4 sm:mb-6 font-medium">
        <ArrowLeft size={18} /> Back to Organizations
      </Link>

      <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-8 sm:mb-10 md:mb-12 shadow-[0_0_40px_rgba(236,72,153,0.15)] group">
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors z-10"></div>
        <img src={charity.image} alt={charity.name} className="w-full h-full object-cover object-center" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20">
          <div className="bg-pink-500/20 backdrop-blur-md border border-pink-500/50 text-pink-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-flex mb-3">
            FBR Verified NGO
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2">{charity.name}</h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium">{charity.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Heart className="text-pink-500" size={24} /> About the Foundation
            </h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">{charity.about}</p>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 border-t-4 border-purple-500">
            <h3 className="text-xl font-bold text-white mb-4">Key Impact Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {charity.impact.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-black p-4 rounded-xl border border-white/5">
                  <CheckCircle2 className="text-purple-400 flex-shrink-0" size={20} />
                  <span className="text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 sm:mb-6 border-b border-white/10 pb-4">Reach Out Directly</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 flex-shrink-0"><Phone size={18} /></div>
                <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Helpline</p><p className="text-slate-200">{charity.contact.phone}</p></div>
              </div>
            </div>
          </div>
          <Link to="/charities" className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            Donate to {charity.name}
          </Link>
        </div>
      </div>
    </div>
  );
}