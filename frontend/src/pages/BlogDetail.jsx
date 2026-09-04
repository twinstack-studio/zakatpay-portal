import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogsData } from './Blogs';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

export default function BlogDetail() {
  const { id } = useParams();
  
  // URL wale ID se specific blog dhoondh rahe hain
  const blog = blogsData.find((b) => b.id === id);

  // Jab page load ho tou top par scroll kar do
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="py-16 sm:py-24 md:py-32 text-center text-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Article Not Found</h2>
        <Link to="/blogs" className="text-pink-400 hover:underline">Return to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="w-full pb-24 framer-animate">
      {/* Back Button */}
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-6">
        <Link to="/blogs" className="text-pink-400 font-bold text-sm flex items-center gap-2 hover:text-pink-300 transition-colors w-fit bg-white/5 px-4 py-2 rounded-full border border-pink-500/20">
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
      </div>

      <article className="max-w-[800px] mx-auto px-4 sm:px-6">
        {/* Blog Header */}
        <div className="mb-5 sm:mb-8">
          <div className="flex items-center gap-2 text-pink-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Tag size={12} /> {blog.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 sm:mb-6">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-medium border-y border-white/10 py-4">
            <span className="flex items-center gap-2"><Calendar size={16}/> Published on {blog.date}</span>
            <span className="flex items-center gap-2"><User size={16}/> By {blog.author}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-6 sm:mb-8 md:mb-10 border border-white/10 shadow-2xl">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Blog Content */}
        <div className="bg-[#0a0a0c] border border-white/10 p-6 md:p-10 rounded-3xl shadow-lg">
          <p className="text-lg md:text-xl text-slate-300 font-medium italic mb-5 sm:mb-8 border-l-4 border-pink-500 pl-4">
            {blog.excerpt}
          </p>
          
          {/* HTML Render Area: Yahan hum HTML tags ko CSS de rahay hain taake headings aur paragraphs wazeh lagain */}
          <div 
            className="text-slate-400 leading-loose text-base md:text-lg 
                       [&>p]:mb-6 [&>p]:leading-[1.8]
                       [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-10 [&>h3]:mb-4
                       [&>strong]:text-pink-400"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </div>
      </article>
    </div>
  );
}