import React from 'react';
import { X, ExternalLink, Github, CheckCircle, Calendar, Building, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { InteractiveDevicePreview } from './InteractiveDevicePreview';
import { Language, translations } from '../translations';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  language: Language;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  language,
}) => {
  if (!project) return null;
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header Bar */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
              {project.category === 'web'
                ? 'Web Application'
                : project.category === 'mobile'
                ? 'Mobile Application'
                : 'UI/UX Design System'}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.year}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Title & Client */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Building className="w-4 h-4 text-slate-500" />
              <span>Client: {project.client}</span>
            </div>
          </div>

          {/* Device / Interactive Preview */}
          <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800/80 flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <InteractiveDevicePreview
                type={project.previewType}
                title={project.title}
                accentColor={project.accentColor}
              />
            </div>
          </div>

          {/* Impact Metrics Banner */}
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs sm:text-sm text-blue-300 font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Key Outcome: {project.metrics}</span>
          </div>

          {/* Detailed Engineering Case Study */}
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <h3 className="text-base font-semibold text-white">Project Scope & Technical Solution</h3>
            <p>{project.longDescription}</p>
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-lg text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition-all"
                >
                  <span>{t.filters.liveDemo}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>{t.filters.sourceCode}</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
