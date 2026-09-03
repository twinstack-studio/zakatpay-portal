import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Target, Heart, Phone, Mail, Globe, CheckCircle2, TrendingUp, ExternalLink, ShieldCheck } from 'lucide-react';

import { foundationsData } from './Foundations';

import edhiBanner from '../assets/edhi-banner.jpg';
import saylaniBanner from '../assets/saylani-banner.jpg';
import indusBanner from '../assets/indus-banner.jpg';
import shaukatBanner from '../assets/shaukat-banner.jpg';
import chhipaBanner from '../assets/chhipa-banner.jpg';
import alkhidmatBanner from '../assets/alkhidmat-banner.jpg';
import jdcBanner from '../assets/jdc-banner.jpg';
import tcfBanner from '../assets/tcf-banner.jpg';
import akhuwatBanner from '../assets/akhuwat-banner.jpg';
import siutBanner from '../assets/siut-banner.jpg';
import lrbtBanner from '../assets/lrbt-banner.jpg';
import transparentBanner from '../assets/transparent-banner.jpg';

const bannerImages = {
  edhi: edhiBanner,
  saylani: saylaniBanner,
  indus: indusBanner,
  shaukat: shaukatBanner,
  chhipa: chhipaBanner,
  alkhidmat: alkhidmatBanner,
  jdc: jdcBanner,
  tcf: tcfBanner,
  akhuwat: akhuwatBanner,
  siut: siutBanner,
  lrbt: lrbtBanner,
  transparent: transparentBanner
};

export default function FoundationDetail() {
  const { id } = useParams();
  const ngo = foundationsData.find((f) => f.id === id);

  if (!ngo) {
    return (
      <div className="py-32 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Foundation Not Found</h2>
        <Link to="/foundations" className="text-pink-400 hover:underline">Return to Foundations</Link>
      </div>
    );
  }

  const bannerSrc = bannerImages[ngo.id];
  const websiteUrl = ngo.website.startsWith('http') ? ngo.website : `https://${ngo.website}`;
  const phoneLink = `tel:${ngo.phone.replace(/[^0-9+]/g, '')}`;

  return (
    <div className="w-full pb-24 framer-animate bg-[#050505]">
      
      {/* ========================================== */}
      {/* 1. HERO SECTION */}
      {/* ========================================== */}
      <div className="max-w-[1400px] mx-auto px-6 pt-12 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Text Content */}
        <div className="space-y-8 order-2 lg:order-1">
          <div>
            <Link to="/foundations" className={`inline-flex items-center gap-2 font-bold text-sm mb-8 transition-colors w-fit text-slate-400 hover:${ngo.textClass}`}>
              <ArrowLeft size={16} /> Back to Foundations
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className={`bg-gradient-to-r ${ngo.color} text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest`}>
                {ngo.category}
              </span>
              <span className="bg-green-500/10 text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 size={14} /> FBR Approved
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
              Welcome to <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${ngo.color}`}>
                {ngo.name}
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg mb-4">
              {ngo.shortDesc}
            </p>
            <p className="text-slate-500 font-medium">
              Founded by: <span className="text-white font-bold">{ngo.founder}</span>
            </p>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="relative w-full h-[400px] md:h-[550px] order-1 lg:order-2">
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-black/20 border border-white/5 shadow-2xl flex items-center justify-center relative p-2">
            <img 
              src={bannerSrc} 
              alt={`${ngo.name} Banner`} 
              className="w-full h-full object-contain drop-shadow-2xl rounded-3xl"
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
          </div>

          {/* Floating Stat Card */}
          {ngo.stats && ngo.stats.length > 0 && (
            <div className={`absolute -bottom-6 md:bottom-4 left-4 md:-left-8 w-[90%] md:w-80 bg-black/80 backdrop-blur-2xl ${ngo.borderClass} border p-5 rounded-3xl shadow-2xl flex justify-between items-center`}>
              <div>
                <h4 className="text-2xl font-black text-white mb-1">{ngo.stats[0].value}</h4>
                <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">
                  {ngo.stats[0].label}
                </p>
              </div>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ngo.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ========================================== */}
      {/* 2. MAIN CONTENT SECTION */}
      {/* ========================================== */}
      <div className="max-w-[1400px] mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Side: Heavy Detailed Content */}
        <div className="lg:col-span-2 space-y-12">
          
          <section>
            <h2 className="text-3xl font-black text-white mb-8">About the Organization</h2>
            
            <div className="space-y-6 text-slate-400 leading-loose text-lg">
              {ngo.longDesc.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className={`bg-white/5 border ${ngo.borderClass} p-8 md:p-10 rounded-[2rem]`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 ${ngo.bgClass} ${ngo.textClass} rounded-2xl flex items-center justify-center`}>
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">Core Mission</h3>
            </div>
            <p className={`text-slate-300 leading-relaxed text-lg italic border-l-4 ${ngo.borderClass} pl-6`}>
              "{ngo.mission}"
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Impact Statistics</h3>
            <div className="grid grid-cols-2 gap-6">
              {ngo.stats.map((stat, index) => (
                <div key={index} className={`bg-[#0a0a0c] border ${ngo.borderClass} p-8 rounded-3xl group hover:bg-white/5 transition-colors`}>
                  <Heart className={`${ngo.textClass} mb-4 group-hover:scale-110 transition-transform`} size={28} />
                  <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Side: Contact & Shariah Info Sidebar */}
        <div className="space-y-6">
          
          {/* Contact Information */}
          <div className="bg-[#0a0a0c] border border-white/10 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Contact Information</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className={`w-10 h-10 rounded-full ${ngo.bgClass} flex items-center justify-center flex-shrink-0 transition-colors`}>
                  <Phone className={ngo.textClass} size={18} />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Helpline</p>
                  <a href={phoneLink} className={`text-white font-medium hover:${ngo.textClass} transition-colors block`}>
                    {ngo.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className={`w-10 h-10 rounded-full ${ngo.bgClass} flex items-center justify-center flex-shrink-0 transition-colors`}>
                  <Mail className={ngo.textClass} size={18} />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Email</p>
                  <a href={`mailto:${ngo.email}`} className={`text-white font-medium hover:${ngo.textClass} transition-colors block break-all`}>
                    {ngo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className={`w-10 h-10 rounded-full ${ngo.bgClass} flex items-center justify-center flex-shrink-0 transition-colors`}>
                  <Globe className={ngo.textClass} size={18} />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Website</p>
                  <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={`text-white font-medium hover:${ngo.textClass} transition-colors flex items-center gap-1 group-hover:underline`}>
                    {ngo.website} <ExternalLink size={12} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* NEW SECTION: Shariah Compliant & Transparency */}
          <div className={`bg-gradient-to-br from-[#13141a] to-[#050505] border ${ngo.borderClass} p-8 rounded-3xl relative overflow-hidden group`}>
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${ngo.color}`}></div>
            
            {/* Background Watermark Icon */}
            <div className={`absolute -bottom-6 -right-6 opacity-[0.03] ${ngo.textClass} transition-transform group-hover:scale-110 duration-500`}>
              <ShieldCheck size={140} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl ${ngo.bgClass} flex items-center justify-center flex-shrink-0`}>
                  <ShieldCheck className={ngo.textClass} size={24} />
                </div>
                <h3 className="text-xl font-bold text-white leading-tight">100% Shariah Compliant</h3>
              </div>
              
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Your donations to <span className={`font-bold ${ngo.textClass}`}>{ngo.name}</span> are strictly routed through verified Zakat channels with zero platform commission.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 size={16} className={ngo.textClass} /> Fully FBR Tax Exempted
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 size={16} className={ngo.textClass} /> Verified by Shariah Scholars
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 size={16} className={ngo.textClass} /> Direct & Transparent Routing
                </li>
              </ul>

              <Link to="/calculator" className={`flex justify-center items-center gap-2 w-full bg-gradient-to-r ${ngo.color} hover:opacity-90 text-white text-center font-bold py-3.5 rounded-xl transition-all text-sm shadow-[0_10px_20px_rgba(0,0,0,0.3)]`}>
                Calculate Your Zakat
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}