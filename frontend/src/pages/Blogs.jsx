import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, User } from 'lucide-react';
import { blogsData } from '../data/blogs';

export default function Blogs() {
  return (
    <div className="w-full pb-24 framer-animate">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <BookOpen className="text-pink-500 mx-auto mb-4" size={40} />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Islamic <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Blogs & Articles</span></h1>
        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">Deepen your knowledge about Islamic finance, Zakat rulings, and the impact of your charity.</p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {blogsData.map((blog) => (
          <div key={blog.id} className="bg-[#0a0a0c] border border-white/10 rounded-3xl overflow-hidden hover:border-pink-500/50 transition-colors group flex flex-col">
            <div className="h-48 overflow-hidden relative flex-shrink-0 bg-white/5">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-pink-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                {blog.category}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">
                <span className="flex items-center gap-1"><Calendar size={12}/> {blog.date}</span>
                <span className="flex items-center gap-1"><User size={12}/> {blog.author}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">{blog.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3">{blog.excerpt}</p>
              
              <Link to={`/blog/${blog.id}`} className="mt-auto text-pink-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-pink-300 transition-colors w-fit">
                Read Article <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}