import React from 'react';
import { motion } from 'framer-motion';

export default function ThreeDHero() {
  const FloatingCoin = ({ size, top, left, right, bottom, duration, rotateDir, delay, type = 'gold', blur = 0 }) => {
    const isGold = type === 'gold';
    const bgGradient = isGold 
      ? "from-yellow-200 via-yellow-500 to-yellow-700" 
      : "from-slate-100 via-slate-300 to-slate-500"; 
    const borderColor = isGold ? "border-yellow-300/60" : "border-slate-400/50";
    const shadow = isGold ? "shadow-[0_0_30px_rgba(234,179,8,0.3)]" : "shadow-[0_0_30px_rgba(148,163,184,0.3)]";
    const innerBorder = isGold ? "border-yellow-200/50" : "border-slate-200/50";

    return (
      <motion.div
        animate={{ 
          y: [-20, 20, -20], 
          rotate: rotateDir === 'left' ? [0, -180, -360] : [0, 180, 360] 
        }}
        transition={{ duration: duration, repeat: Infinity, ease: "linear", delay: delay }}
        className={`absolute flex items-center justify-center rounded-full bg-gradient-to-br ${bgGradient} border-[1.5px] ${borderColor} ${shadow}`}
        style={{ 
          width: size, 
          height: size,
          top: top,
          left: left,
          right: right,
          bottom: bottom,
          filter: blur > 0 ? `blur(${blur}px)` : 'none',
          zIndex: blur > 0 ? 0 : 10
        }}
      >
        <div className={`w-[65%] h-[65%] rounded-full border ${innerBorder}`} />
      </motion.div>
    );
  };

  return (
    // "overflow-hidden" hata diya gaya hai taake koi hard line ya dabba na banay
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
      
      {/* Background Soft Glows - ab daba nahi banega */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-pink-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-[10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="relative w-full h-full hidden sm:block">
        
        {/* === BARE COINS (Front - Clear) === */}
        <FloatingCoin type="gold" size={120} top="15%" right="8%" duration={8} rotateDir="right" delay={0} />
        <FloatingCoin type="silver" size={100} bottom="15%" right="18%" duration={9} rotateDir="left" delay={1} />
        <FloatingCoin type="gold" size={90} top="50%" right="35%" duration={7} rotateDir="left" delay={2} />
        <FloatingCoin type="silver" size={80} top="25%" right="28%" duration={8.5} rotateDir="right" delay={0.5} />

        {/* === DARMIYANAY COINS (Middle - Clear) === */}
        <FloatingCoin type="gold" size={60} bottom="35%" right="10%" duration={6} rotateDir="left" delay={1.5} />
        <FloatingCoin type="silver" size={55} top="10%" right="40%" duration={7} rotateDir="right" delay={0.8} />
        <FloatingCoin type="gold" size={65} bottom="25%" right="42%" duration={6.5} rotateDir="left" delay={2.5} />
        <FloatingCoin type="silver" size={50} top="40%" right="12%" duration={5.5} rotateDir="right" delay={1.2} />
        <FloatingCoin type="gold" size={75} top="70%" right="30%" duration={7.8} rotateDir="right" delay={0.3} />
        
        {/* === BACKGROUND COINS (Blurred - For 3D Depth effect) === */}
        <FloatingCoin type="gold" size={45} top="8%" right="20%" duration={5.5} rotateDir="left" delay={0.7} blur={1} />
        <FloatingCoin type="gold" size={40} top="20%" right="48%" duration={5} rotateDir="left" delay={0} blur={2} />
        <FloatingCoin type="silver" size={35} bottom="45%" right="45%" duration={6} rotateDir="right" delay={1.8} blur={1.5} />
        <FloatingCoin type="silver" size={30} bottom="10%" right="35%" duration={4.5} rotateDir="right" delay={2.2} blur={2} />
        <FloatingCoin type="gold" size={25} top="35%" right="8%" duration={4} rotateDir="left" delay={1.1} blur={1} />
        <FloatingCoin type="silver" size={38} top="60%" right="45%" duration={6.2} rotateDir="right" delay={0.4} blur={3} />
        <FloatingCoin type="gold" size={42} bottom="20%" right="5%" duration={5.8} rotateDir="left" delay={1.6} blur={1.5} />
        <FloatingCoin type="silver" size={28} top="80%" right="15%" duration={4.8} rotateDir="right" delay={0.9} blur={2} />
        
        {/* === TINY SPARKS / DUST COINS === */}
        <FloatingCoin type="gold" size={15} top="25%" right="15%" duration={3} rotateDir="left" delay={0.2} blur={1} />
        <FloatingCoin type="silver" size={18} top="55%" right="25%" duration={3.5} rotateDir="right" delay={1.3} blur={1} />
        <FloatingCoin type="gold" size={12} bottom="30%" right="28%" duration={2.8} rotateDir="left" delay={2.1} blur={0.5} />
        <FloatingCoin type="silver" size={20} top="45%" right="5%" duration={4} rotateDir="right" delay={0.6} blur={1} />

      </div>
    </div>
  );
}