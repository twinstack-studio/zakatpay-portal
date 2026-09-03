import React, { useState } from 'react';
import { PlaySquare, PlayCircle, X } from 'lucide-react';

// === 100% WORKING ZAKAT YOUTUBE VIDEOS ===
const videos = [
  {
    id: 1,
    title: "Don't Forget to Calculate your Zakat | Mufti Menk",
    duration: "13:25",
    category: "Scholar Talk",
    videoId: "91eukRAZgk4" // Working ID
  },
  {
    id: 2,
    title: "Zakat Kis Par Farz Hai? | Dr. Israr Ahmed",
    duration: "16:40",
    category: "Detailed Guide",
    videoId: "6wH11G_HALE" 
  },
  {
    id: 3,
    title: "Zakat Se Mutaliq Badi Ghalat Fehmi! | Mufti Taqi Usmani",
    duration: "08:15",
    category: "Fatwa & Rulings",
    videoId: "vEv81xlWZDM"
  },
  {
    id: 4,
    title: "Zakat Kin Logon Ko Dena Chahiye? | Maulana Tariq Jameel",
    duration: "11:50",
    category: "Scholar Talk",
    videoId: "2sjXKCaq_Oo"
  },
  {
    id: 5,
    title: "How to Calculate Zakat the Right Way (Step-by-Step)",
    duration: "25:10",
    category: "Tutorial",
    videoId: "O3jRAHt7VZ8"
  },
  {
    id: 6,
    title: "How to calculate Zakat on Gold & Cash | Assim Al Hakeem",
    duration: "04:30",
    category: "Q & A",
    videoId: "-SYMGMrgYmA"
  }
];

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null);

  // Modal band karne ka function
  const closeModal = () => setActiveVideo(null);

  return (
    <div className="w-full pb-24 framer-animate relative">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <PlaySquare className="text-red-500 mx-auto mb-4" size={40} />
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Zakat <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">Video Gallery</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto px-4">Watch authentic Zakat calculation tutorials and detailed talks by renowned Islamic scholars.</p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div 
            key={video.id} 
            onClick={() => setActiveVideo(video)}
            className="bg-[#0a0a0c] border border-white/10 rounded-3xl overflow-hidden hover:border-red-500/50 transition-colors group cursor-pointer flex flex-col shadow-lg"
          >
            {/* Thumbnail Area - Automatically fetching High Quality image from YouTube */}
            <div className="h-56 relative overflow-hidden flex items-center justify-center flex-shrink-0 bg-[#13141a]">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} 
                alt={video.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              
              {/* Play Button Overlay */}
              <div className="relative z-20 w-16 h-16 bg-red-600/90 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform">
                <PlayCircle size={32} className="ml-1" />
              </div>

              {/* Badges */}
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded z-20">
                {video.duration}
              </div>
              <div className="absolute top-4 left-4 bg-red-500/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-20 shadow-lg">
                {video.category}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6 flex-grow flex items-center">
              <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors leading-snug">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================== */}
      {/* VIDEO PLAYER MODAL (Pop-up) */}
      {/* ========================================== */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeModal}></div>
          
          <div className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.2)] border border-white/10 animate-fade-in-up z-10">
            
            {/* Close Button */}
            <div className="absolute -top-4 -right-4 md:top-4 md:right-4 z-50">
              <button 
                onClick={closeModal} 
                className="w-10 h-10 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* YouTube Embed */}
            <div className="relative w-full aspect-video bg-black">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`} 
                title={activeVideo.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Title Bar */}
            <div className="bg-[#0a0a0c] p-4 md:p-6 border-t border-white/10">
              <h2 className="text-white font-bold text-lg md:text-2xl">{activeVideo.title}</h2>
              <p className="text-red-400 text-sm font-bold uppercase tracking-widest mt-2">{activeVideo.category}</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}