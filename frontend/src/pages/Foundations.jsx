import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Tilt from 'react-parallax-tilt';
import { foundationsData, AVATAR_FOCUS } from '../data/foundations';

export default function Foundations() {
  return (
    <div className="w-full pb-24 framer-animate relative">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
          Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Foundations</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          Distribute your Zakat safely to FBR-approved charities making real impacts.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
        {foundationsData.map((ngo, index) => (
          <AnimatedSection key={ngo.id} delay={index * 0.1} direction="up" className="bg-[#0a0a0c] border border-white/10 p-5 sm:p-8 md:p-10 rounded-3xl hover:border-pink-500/40 transition-all group flex flex-col items-center text-center shadow-lg h-full">
            
            <Tilt glareEnable={true} glareMaxOpacity={0.4} scale={1.05} transitionSpeed={400} tiltMaxAngleX={15} tiltMaxAngleY={15}>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-pink-500 transition-colors mb-4 sm:mb-6 shadow-2xl flex-shrink-0 relative bg-white/5 cursor-pointer">
                <img 
                  src={ngo.image} 
                  alt={ngo.founder} 
                  className="w-full h-full object-cover heavy-img-hover"
                  style={{ objectPosition: AVATAR_FOCUS[ngo.id] || '50% 10%' }}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${ngo.color} hidden items-center justify-center text-white font-black text-3xl`}>
                  {ngo.initials}
                </div>
              </div>
            </Tilt>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2">{ngo.name}</h3>
            <p className={`text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed mb-1 ${ngo.textClass}`}>
              {ngo.founder}
            </p>
            <span className="bg-white/10 text-slate-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-6 inline-block border border-white/5">
              {ngo.category}
            </span>

            <p className="text-slate-400 text-sm leading-relaxed mb-5 sm:mb-8 flex-grow">
              {ngo.shortDesc}
            </p>
            
            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
              <Link to={`/foundation/${ngo.id}`} className="heavy-btn bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center">
                Learn More
              </Link>
              
              <Link to={`/donate/${ngo.id}`} className={`heavy-btn bg-gradient-to-r ${ngo.color} text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1 shadow-lg`}>
                Donate <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}