import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Info, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'As-salamu alaykum! 🙏 I am your ZakatPay Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // Yeh rahay aapke Quick Replies
  const quickReplies = ["What is Nisab?", "Tax Benefits", "Is it secure?", "How to pay?"];

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "I'm still learning! Please contact our human support at info@zakatpay.pk for detailed assistance.";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('nisab') || lowerText.includes('rate')) {
        botResponse = "The current Nisab threshold is based on the value of 87.48 grams of gold or 612.36 grams of silver. Our calculator updates these rates automatically in real-time.";
      } else if (lowerText.includes('tax') || lowerText.includes('exemption') || lowerText.includes('fbr')) {
        botResponse = "Yes! All donations made through ZakatPay are eligible for tax rebates under Section 61 of the FBR Income Tax Ordinance. You can download the receipt from your dashboard.";
      } else if (lowerText.includes('secure') || lowerText.includes('safe') || lowerText.includes('scam')) {
        botResponse = "ZakatPay uses 256-bit bank-grade encryption. We do not store your credit card details. 100% of your funds are routed directly to FBR-verified foundations.";
      } else if (lowerText.includes('fee') || lowerText.includes('charge')) {
        botResponse = "ZakatPay charges 0% platform fees. We are independently funded, ensuring 100% of your donation reaches the chosen charity.";
      } else if (lowerText.includes('hello') || lowerText.includes('salam')) {
        botResponse = "Wa Alaikum As-salam! How can I assist you with your Zakat calculations or donations today?";
      }

      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999999] w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white items-center justify-center shadow-[0_10px_20px_rgba(236,72,153,0.5)] transition-transform ${isOpen ? 'hidden' : 'flex'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            // Floating card on every screen - sits just above the FAB, never full screen.
            // Width tracks the viewport on small phones but is capped at 380px.
            className="fixed z-[999999] bottom-24 right-4 sm:right-6 md:bottom-28 md:right-10 w-[calc(100vw-2rem)] max-w-[380px] h-[70dvh] max-h-[520px] rounded-2xl bg-[#0a0a0c] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-3 sm:px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <Bot size={20} className="text-white shrink-0" />
                <h3 className="text-white font-bold text-xs sm:text-sm truncate">ZakatPay Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="text-white shrink-0 p-1 bg-transparent shadow-none">
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto overscroll-contain space-y-3 sm:space-y-4">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 flex items-start gap-3 mb-4 sm:mb-6">
                <Info size={16} className="text-purple-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">This is an automated assistant. For complex Shariah rulings, please consult your local religious scholar.</p>
              </div>

              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.type === 'user' ? 'bg-pink-600 text-white rounded-tr-sm' : 'bg-white/10 text-slate-200 border border-white/5 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/5 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <Loader2 size={16} className="text-pink-400 animate-spin" />
                    <span className="text-xs text-slate-400">Assistant is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Quick Replies Area */}
            <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0a0a0c] shrink-0">
              
              {/* Quick Replies Restored Here */}
              <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-3 pb-1">
                {quickReplies.map((reply, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(reply)}
                    className="whitespace-nowrap bg-white/5 hover:bg-pink-500/20 border border-white/10 hover:border-pink-500/50 text-slate-300 hover:text-pink-400 text-xs px-3 py-1.5 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex gap-2">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder="Ask about Zakat..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-pink-500" 
                />
                <button 
                  type="submit" 
                  disabled={!input.trim()}
                  className="w-10 h-10 shrink-0 bg-pink-600 text-white rounded-full flex items-center justify-center disabled:opacity-50"
                >
                  <Send size={16} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}