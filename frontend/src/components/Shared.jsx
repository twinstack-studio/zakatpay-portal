import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader2, Mail, Send, ShieldCheck, Activity } from 'lucide-react';

import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -15, scale: 1.02 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

export function PageWrapper({ children, title }) {
  const location = useLocation();
  
  // We no longer need the custom loading timeout since AnimatePresence handles mounting
  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-r from-pink-600 to-purple-700 py-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 framer-animate">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Subscribe Our Newsletter</h2>
        <p className="text-pink-100 text-sm md:text-base mb-8 max-w-2xl mx-auto">
          Our platform has a long tradition of serving humanity and empowering the underprivileged. Stay updated with our latest campaigns, tax exemption rules, and transparent impact reports.
        </p>

        <form onSubmit={handleSubscribe} className="max-w-xl mx-auto relative flex items-center border-b border-white/50 pb-2 transition-all focus-within:border-white">
          <Mail className="text-white/80 mr-3" size={20} />
          <input 
            type="email" required placeholder="Type your email" 
            value={email} onChange={(e) => setEmail(e.target.value)} 
            className="bg-transparent flex-grow text-white placeholder-white/60 outline-none text-lg" 
          />
          <button 
            type="submit" disabled={status === 'loading' || status === 'success'} 
            className="bg-white text-purple-700 hover:text-pink-600 hover:scale-105 px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-lg disabled:opacity-80 disabled:hover:scale-100"
          >
            {status === 'loading' ? <Loader2 className="animate-spin" size={16}/> : 'Subscribe'}
            {status !== 'loading' && <Send size={14} />}
          </button>
        </form>

        {status === 'success' && (
          <div className="mt-6 inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm animate-fade-in-up shadow-lg">
            <ShieldCheck size={18} /> Successfully Subscribed!
          </div>
        )}
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
      <div className="mt-8">
        <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-purple-500/30">Coming Soon</span>
      </div>
    </div>
  );
}