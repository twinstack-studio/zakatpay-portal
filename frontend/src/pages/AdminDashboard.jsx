import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Building2, FileText, Settings, 
  TrendingUp, DollarSign, Activity, Search, Bell, LogOut, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { title: "Total Zakat Collected", value: "Rs. 14.5M", increase: "+12.5%", icon: DollarSign, color: "text-green-400", bg: "bg-green-500/20" },
    { title: "Active Users", value: "2,450", increase: "+5.2%", icon: Users, color: "text-blue-400", bg: "bg-blue-500/20" },
    { title: "Partner NGOs", value: "12", increase: "Verified", icon: Building2, color: "text-purple-400", bg: "bg-purple-500/20" },
    { title: "Platform Traffic", value: "18.2K", increase: "+22%", icon: Activity, color: "text-pink-400", bg: "bg-pink-500/20" },
  ];

  const recentTransactions = [
    { id: "TRX-9823", user: "Ahmad Nadeem", ngo: "Edhi Foundation", amount: "Rs. 25,000", type: "Zakat", status: "Completed", date: "Sept 1, 2026" },
    { id: "TRX-9822", user: "Ali Khan", ngo: "Shaukat Khanum", amount: "Rs. 10,000", type: "Sadaqah", status: "Completed", date: "Sept 1, 2026" },
    { id: "TRX-9821", user: "Sara Ahmed", ngo: "Alkhidmat", amount: "Rs. 5,000", type: "Sadaqah", status: "Pending", date: "Aug 31, 2026" },
    { id: "TRX-9820", user: "Usman Raza", ngo: "Saylani Welfare", amount: "Rs. 50,000", type: "Zakat", status: "Completed", date: "Aug 30, 2026" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row font-sans text-slate-200">
      
      {/* ========================================== */}
      {/* 1. SIDEBAR */}
      {/* ========================================== */}
      <aside className="w-full md:w-64 bg-[#0a0a0c] border-b md:border-b-0 md:border-r border-white/10 flex flex-col flex-shrink-0 md:h-screen md:sticky md:top-0">
        <div className="p-4 sm:p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-black text-white text-lg shadow-lg">Z</div>
            <span className="font-black text-white text-xl tracking-tight">Admin<span className="text-pink-400 font-light">Panel</span></span>
          </Link>
        </div>
        
        <nav className="p-3 sm:p-4 flex md:flex-col gap-2 md:gap-0 md:space-y-2 flex-grow overflow-x-auto md:overflow-x-visible">
          <p className="hidden md:block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 ml-2">Main Menu</p>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'users', label: 'Manage Users', icon: Users },
            { id: 'ngos', label: 'NGO Partners', icon: Building2 },
            { id: 'content', label: 'Content & Blogs', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-auto md:w-full shrink-0 md:shrink flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${activeTab === item.id ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block p-4 border-t border-white/10">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut size={18} /> Back to Website
          </Link>
        </div>
      </aside>

      {/* ========================================== */}
      {/* 2. MAIN CONTENT AREA */}
      {/* ========================================== */}
      <main className="flex-grow flex flex-col min-w-0 md:h-screen md:overflow-hidden">
        
        {/* Header */}
        <header className="bg-[#0a0a0c] border-b border-white/10 md:h-20 px-4 sm:px-6 md:px-8 py-3 md:py-0 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 bg-white/5 border border-white/10 rounded-full px-3 sm:px-4 py-2 flex-1 min-w-0 sm:flex-none sm:w-64 md:w-96 focus-within:border-pink-500 transition-colors">
            <Search size={16} className="text-slate-400" />
            <input type="text" placeholder="Search transactions, users..." className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-600" />
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full animate-pulse"></span>
            </button>
            <div className="flex items-center gap-3 sm:pl-6 sm:border-l border-white/10">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-white">Super Admin</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">System Control</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 border-2 border-white/10 flex items-center justify-center text-white font-bold">SA</div>
            </div>
          </div>
        </header>

        {/* Dashboard Content (Scrollable) */}
        <div className="flex-grow md:overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="mb-5 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2">Platform Overview</h1>
            <p className="text-slate-400 text-sm">Welcome back! Here is what's happening on ZakatPay today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#0a0a0c] border border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl relative overflow-hidden group hover:border-white/20 transition-colors">
                <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-300 flex items-center gap-1">
                    <TrendingUp size={10} className="text-green-400"/> {stat.increase}
                  </span>
                </div>
                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1 relative z-10">{stat.title}</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-white relative z-10">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Transactions Table */}
          <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-white/10 flex flex-wrap gap-2 justify-between items-center">
              <h3 className="text-xl font-bold text-white">Live Transactions</h3>
              <button className="text-pink-400 hover:text-pink-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors">
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-500">
                    <th className="p-4 font-bold">Trx ID</th>
                    <th className="p-4 font-bold">Donor Name</th>
                    <th className="p-4 font-bold">Foundation</th>
                    <th className="p-4 font-bold">Category</th>
                    <th className="p-4 font-bold">Amount</th>
                    <th className="p-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentTransactions.map((trx, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-slate-400 font-mono text-xs">{trx.id}</td>
                      <td className="p-4 font-bold text-white">{trx.user}</td>
                      <td className="p-4 text-slate-300">{trx.ngo}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${trx.type === 'Zakat' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'}`}>
                          {trx.type}
                        </span>
                      </td>
                      <td className="p-4 font-black text-white">{trx.amount}</td>
                      <td className="p-4">
                        <span className={`flex items-center gap-2 text-xs font-bold ${trx.status === 'Completed' ? 'text-green-400' : 'text-amber-400'}`}>
                          <span className={`w-2 h-2 rounded-full ${trx.status === 'Completed' ? 'bg-green-400' : 'bg-amber-400'}`}></span>
                          {trx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}