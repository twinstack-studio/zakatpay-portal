import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "As-salamu alaykum! 🙏 I am your ZakatPay Assistant. How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when a new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [messages, isOpen]);

  // Simple Bot Logic (Keywords matching)
  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("salam") || lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return "Walaikum Assalam! Welcome to ZakatPay. How can I assist you with your Zakat or Sadaqah today?";
    } else if (lowerInput.includes("nisab")) {
      return "The current Nisab for Gold is 87.48 grams (7.5 tola) and for Silver is 612.36 grams (52.5 tola).";
    } else if (lowerInput.includes("gold") || lowerInput.includes("silver")) {
      return "Zakat is obligatory on gold/silver if it reaches the Nisab limit and a lunar year has passed. The Zakat rate is 2.5% of its current market value.";
    } else if (lowerInput.includes("calculate") || lowerInput.includes("calculator")) {
      return "You can calculate your Zakat exactly using our Smart Zakat Calculator from the top menu!";
    } else if (lowerInput.includes("who") || lowerInput.includes("deserve") || lowerInput.includes("eligible")) {
      return "Zakat can be given to 8 categories mentioned in the Quran (Surah At-Tawbah), including the poor, the needy, and those in debt.";
    } else if (lowerInput.includes("tax") || lowerInput.includes("fbr")) {
      return "Yes! All donations made through ZakatPay to our partner NGOs are fully tax-exempted under FBR Section 61.";
    } else {
      return "JazakAllah for your question. For detailed Shariah fatwas, please check our 'Islamic Rulings' page or contact our helpline at 0311-111-2222.";
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Bot typing delay effect
    setTimeout(() => {
      const botResponse = { text: getBotResponse(userMessage.text), sender: "bot" };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickAction = (text) => {
    setInputValue(text);
  };

  return (
    <>
      {/* ========================================== */}
      {/* 1. FLOATING CHAT BUTTON */}
      {/* ========================================== */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center text-white shadow-[0_10px_40px_rgba(236,72,153,0.5)] hover:scale-110 transition-transform duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={28} />
      </button>

      {/* ========================================== */}
      {/* 2. CHAT WINDOW MODAL */}
      {/* ========================================== */}
      <div 
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[350px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-4rem)] bg-[#0a0a0c] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 flex items-center justify-between shadow-md relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-white font-black text-sm">ZakatPay Assistant</h3>
              <p className="text-white/70 text-[10px] flex items-center gap-1"><Sparkles size={10} /> Always online</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors bg-white/10 w-8 h-8 rounded-full flex items-center justify-center">
            <X size={18} />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#050505] to-[#0a0a0c]">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-br-none' 
                : 'bg-white/10 text-slate-200 border border-white/5 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions Chips */}
        {messages.length === 1 && (
          <div className="p-3 bg-black border-t border-white/5 flex flex-wrap gap-2">
            <button onClick={() => handleQuickAction("What is the Nisab today?")} className="bg-white/5 hover:bg-white/10 text-pink-400 border border-pink-500/30 text-[10px] px-3 py-1.5 rounded-full transition-colors">
              What is Nisab?
            </button>
            <button onClick={() => handleQuickAction("Tax exemption on Zakat")} className="bg-white/5 hover:bg-white/10 text-purple-400 border border-purple-500/30 text-[10px] px-3 py-1.5 rounded-full transition-colors">
              Tax Benefits
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 bg-[#0a0a0c] border-t border-white/10">
          <form onSubmit={handleSend} className="flex items-center gap-2 relative">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Zakat..." 
              className="flex-grow bg-[#13141a] border border-white/10 rounded-full py-3 px-4 text-white text-sm outline-none focus:border-pink-500 transition-colors placeholder:text-slate-500"
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim()}
              className="w-11 h-11 bg-pink-600 hover:bg-pink-500 disabled:bg-white/10 disabled:text-slate-500 text-white rounded-full flex items-center justify-center flex-shrink-0 transition-colors shadow-lg"
            >
              <Send size={18} className="mr-0.5 mt-0.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}