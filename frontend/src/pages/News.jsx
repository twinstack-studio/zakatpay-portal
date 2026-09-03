import React from 'react';
import { Newspaper, Megaphone, Clock } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: "ZakatPay Partners with JDC Foundation for Flood Relief 2026",
    content: "We are proud to announce our official digital partnership with JDC Foundation to facilitate transparent, zero-commission donations for the recent flood victims across Sindh and Balochistan.",
    date: "August 20, 2026",
    tag: "Partnership"
  },
  {
    id: 2,
    title: "FBR Announces New Section 61 Guidelines for Digital Donations",
    content: "The Federal Board of Revenue (FBR) has recognized ZakatPay's auto-generated digital receipts as valid proof for tax rebates in the 2026-2027 fiscal year.",
    date: "July 05, 2026",
    tag: "Regulatory"
  },
  {
    id: 3,
    title: "ZakatPay Hits 1 Million Registered Donors Milestone",
    content: "Alhamdulillah! Our community has grown to over 1 million registered users globally, making us the largest independent digital charity portal in Pakistan.",
    date: "May 12, 2026",
    tag: "Milestone"
  }
];

export default function News() {
  return (
    <div className="w-full pb-24 framer-animate">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <Newspaper className="text-purple-500 mx-auto mb-4" size={40} />
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Announcements</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto px-4">Stay updated with platform milestones, new NGO partnerships, and regulatory updates.</p>
      </div>

      <div className="max-w-[900px] mx-auto px-6 mt-16 space-y-6">
        {newsItems.map((news) => (
          <div key={news.id} className="bg-[#0a0a0c] border border-white/10 p-8 rounded-3xl hover:bg-white/5 transition-colors relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-500 to-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <Megaphone size={12} /> {news.tag}
                </span>
              </div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <Clock size={14} /> {news.date}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">{news.title}</h3>
            <p className="text-slate-400 leading-relaxed">{news.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}