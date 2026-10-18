import React, { useState } from 'react';
import { BookOpen, Clock, Heart, Search, X, Share2, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';
import { Language, translations } from '../translations';

interface BlogSectionProps {
  blogs: BlogPost[];
  onLikeBlog: (id: string) => void;
  language: Language;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ blogs, onLikeBlog, language }) => {
  const t = translations[language];
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const filteredBlogs = blogs.filter((b) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      b.title.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q) ||
      b.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!hasLiked[id]) {
      onLikeBlog(id);
      setHasLiked((prev) => ({ ...prev, [id]: true }));
      if (selectedBlog && selectedBlog.id === id) {
        setSelectedBlog((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
      }
    }
  };

  return (
    <section id="blog" className="py-20 lg:py-28 bg-slate-900/30 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
              {t.blog.title}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {language === 'en'
                ? 'Engineering Perspectives & Case Insights'
                : 'প্রযুক্তিগত গবেষণা ও অভিজ্ঞতা'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              {t.blog.subtitle}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.blog.search}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              onClick={() => setSelectedBlog(blog)}
              className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Clean unboxed metadata with separators (Section 1.A DO rule) */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="text-blue-400">{blog.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{blog.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px] text-slate-500">
                  {blog.publishedAt}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleLike(blog.id, e)}
                    className="flex items-center gap-1 hover:text-rose-400 transition-colors"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        hasLiked[blog.id] ? 'fill-rose-500 text-rose-500' : 'text-slate-500'
                      }`}
                    />
                    <span className="font-mono text-[11px]">{blog.likes}</span>
                  </button>

                  <span className="text-blue-400 font-semibold flex items-center gap-1 group-hover:text-blue-300">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                <span>{selectedBlog.category}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{selectedBlog.readTime}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{selectedBlog.publishedAt}</span>
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                {selectedBlog.title}
              </h2>

              <div className="flex items-center justify-between text-xs text-slate-400 font-mono py-2 border-y border-slate-800/80">
                <span>Written by {selectedBlog.author}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(selectedBlog.id)}
                    className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-sans"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span>{selectedBlog.likes} Likes</span>
                  </button>
                </div>
              </div>

              {/* Prose Content */}
              <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {selectedBlog.content}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                {selectedBlog.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-400 rounded-lg text-xs font-mono"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }
                }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Article</span>
              </button>
              <button
                onClick={() => setSelectedBlog(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
