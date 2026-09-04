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
        className={`fixed bottom-6 right-6 z-[99999] w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(236,72,153,0.5)] transition-transform ${isOpen ? 'hidden' : 'flex'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare size={24} className="md:w-7 md:h-7" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            // Main fix yahan hai: alignment bottom-right par fix kar di hai aur screen height ke mutabiq max-height de di hai
            className="fixed z-[100000] bottom-0 right-0 w-full h-[100dvh] md:bottom-24 md:right-8 md:w-[380px] md:h-[500px] md:max-h-[80vh] md:rounded-2xl bg-[#0a0a0c] border-0 md:border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm md:text-base">ZakatPay Assistant</h3>
                  <p className="text-pink-200 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Always online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto scrollbar-hide space-y-4 bg-gradient-to-b from-[#0a0a0c] to-[#121214]">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 flex items-start gap-3 mb-6">
                <Info size={16} className="text-purple-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">This is an automated assistant. For complex Shariah rulings, please consult your local religious scholar.</p>
              </div>

              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.type === 'user' 
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-tr-sm' 
                      : 'bg-white/10 text-slate-200 border border-white/5 rounded-tl-sm'
                  }`}>
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

            <div className="p-4 bg-[#0a0a0c] border-t border-white/10 shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom))]">
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

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Zakat..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="w-11 h-11 shrink-0 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send size={18} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}