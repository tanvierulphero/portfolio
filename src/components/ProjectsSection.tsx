import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Monitor, Smartphone, Palette, ExternalLink, Github, Filter, Plus } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { Language, translations } from '../translations';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  projects: Project[];
  language: Language;
  onOpenAddProject?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, language, onOpenAddProject }) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' ? true : project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="works" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
            Selected Engineering Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {language === 'en' ? 'Crafted for Scale, Speed & Precision' : 'স্কেল, গতি ও নিখুঁততার সমন্বয়ে তৈরি প্রজেক্টস'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            {language === 'en'
              ? 'Explore our production-grade web platforms, cross-platform mobile apps, and enterprise design systems.'
              : 'আমাদের তৈরি আধুনিক ওয়েব প্ল্যাটফর্ম, মোবাইল অ্যাপ এবং ইউআই/ইউএক্স ডিজাইন সিস্টেমের বাস্তব নমুনা দেখুন।'}
          </p>
        </div>

        {/* Search Bar & Quick Add Project */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.filters.searchPlaceholder}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          {onOpenAddProject && (
            <button
              onClick={onOpenAddProject}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shadow-sm shrink-0 transition-colors"
              title="নতুন ডেলিভারি করা কাজ যোগ করুন"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Add Work' : 'কাজ যোগ করুন'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Category Filter Tabs (Section 1.A DO rule) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl mb-10 w-fit">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <span>{t.filters.all}</span>
          <span className="font-mono text-[10px] opacity-75">({projects.length})</span>
        </button>

        <button
          onClick={() => setSelectedCategory('web')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
            selectedCategory === 'web'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>{t.filters.web}</span>
          <span className="font-mono text-[10px] opacity-75">
            ({projects.filter((p) => p.category === 'web').length})
          </span>
        </button>

        <button
          onClick={() => setSelectedCategory('mobile')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
            selectedCategory === 'mobile'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{t.filters.mobile}</span>
          <span className="font-mono text-[10px] opacity-75">
            ({projects.filter((p) => p.category === 'mobile').length})
          </span>
        </button>

        <button
          onClick={() => setSelectedCategory('uiux')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
            selectedCategory === 'uiux'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>{t.filters.uiux}</span>
          <span className="font-mono text-[10px] opacity-75">
            ({projects.filter((p) => p.category === 'uiux').length})
          </span>
        </button>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
          <p className="text-slate-400 text-sm">No projects found matching your search criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-xs text-blue-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Visual Preview Container */}
                <div className="relative w-full h-48 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden p-3 mb-5 flex flex-col justify-between group-hover:border-slate-700 transition-colors">
                  {/* Subtle category badge & Year (clean unboxed text, Section 1.A) */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono uppercase text-[11px] text-blue-400">
                      {project.category === 'web'
                        ? 'Web Platform'
                        : project.category === 'mobile'
                        ? 'Mobile App'
                        : 'UI/UX Design'}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">{project.year}</span>
                  </div>

                  {/* Abstract stylized device silhouette representation */}
                  <div className="flex items-center justify-center py-2">
                    {project.category === 'web' && (
                      <div className="w-full max-w-[200px] h-20 bg-slate-900 rounded-lg border border-slate-800 p-2 flex flex-col justify-between">
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <div className="space-y-1">
                          <div className="w-3/4 h-1.5 bg-blue-500/40 rounded" />
                          <div className="w-1/2 h-1.5 bg-slate-700 rounded" />
                        </div>
                        <div className="h-4 flex items-end gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-xs" />
                          <div className="w-2 h-3 bg-blue-400 rounded-xs" />
                          <div className="w-2 h-4 bg-cyan-400 rounded-xs" />
                        </div>
                      </div>
                    )}
                    {project.category === 'mobile' && (
                      <div className="w-24 h-24 bg-slate-900 rounded-2xl border-2 border-slate-700 p-1.5 flex flex-col justify-between">
                        <div className="w-8 h-1 bg-black rounded-full mx-auto" />
                        <div className="p-1 bg-emerald-950/40 rounded border border-emerald-800/40 text-[9px] font-mono text-emerald-400 text-center">
                          $24.8k
                        </div>
                        <div className="w-6 h-0.5 bg-slate-700 rounded mx-auto" />
                      </div>
                    )}
                    {project.category === 'uiux' && (
                      <div className="grid grid-cols-2 gap-1.5 w-32">
                        <div className="h-9 bg-purple-900/40 rounded-lg border border-purple-700/50 flex items-center justify-center text-[9px] text-purple-300 font-mono">
                          Token
                        </div>
                        <div className="h-9 bg-blue-900/40 rounded-lg border border-blue-700/50 flex items-center justify-center text-[9px] text-blue-300 font-mono">
                          Atom
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Client name kicker */}
                  <div className="text-[11px] text-slate-500 truncate">
                    Client: {project.client}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Card Footer: Metrics & Action */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {/* Clean unboxed metadata (Section 1.A) */}
                <div className="text-slate-400 font-mono text-[11px] truncate max-w-[200px]">
                  {project.tags.slice(0, 3).join(' · ')}
                </div>

                <div className="flex items-center gap-1 font-semibold text-blue-400 group-hover:text-blue-300 transition-colors shrink-0">
                  <span>{t.filters.viewProject}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Case Study Viewer */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        language={language}
      />
    </section>
  );
};
