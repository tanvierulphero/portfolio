import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Monitor, Smartphone, Palette, Terminal, Sparkles } from 'lucide-react';
import { Language, translations } from '../translations';
import { InteractiveDevicePreview } from './InteractiveDevicePreview';

interface HeroProps {
  language: Language;
  onExplore: () => void;
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onExplore, onRequestQuote }) => {
  const t = translations[language];
  const [previewPlatform, setPreviewPlatform] = useState<'web' | 'mobile' | 'uiux'>('web');

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-900">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet Kicker (Zero pill, clean text with typographic separator) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase font-mono">
              <span>{t.hero.kicker}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400 font-normal normal-case flex items-center gap-1 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.hero.availability}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]" style={{ textWrap: 'balance' }}>
              {t.hero.title}
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplore}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2 group whitespace-nowrap"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onRequestQuote}
                className="px-6 py-3.5 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors whitespace-nowrap"
              >
                {t.hero.contactBtn}
              </button>
            </div>

            {/* Verified Tech Stack Ribbon */}
            <div className="pt-4 border-t border-slate-900 space-y-2">
              <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                Production-Proven Engineering Stack
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                <span className="hover:text-blue-400 transition-colors">React 19 & Next.js</span>
                <span className="text-slate-700">/</span>
                <span className="hover:text-cyan-400 transition-colors">Flutter & Dart</span>
                <span className="text-slate-700">/</span>
                <span className="hover:text-blue-400 transition-colors">TypeScript</span>
                <span className="text-slate-700">/</span>
                <span className="hover:text-purple-400 transition-colors">Figma Tokens</span>
                <span className="text-slate-700">/</span>
                <span className="hover:text-emerald-400 transition-colors">MongoDB & Firebase</span>
                <span className="text-slate-700">/</span>
                <span className="hover:text-amber-400 transition-colors">Node.js Express</span>
              </div>
            </div>
          </div>

          {/* Right Visual Container: Interactive Multi-Platform Sandbox */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Platform Selector Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl mb-4 shadow-sm">
              <button
                onClick={() => setPreviewPlatform('web')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  previewPlatform === 'web'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Web App</span>
              </button>
              <button
                onClick={() => setPreviewPlatform('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  previewPlatform === 'mobile'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile App</span>
              </button>
              <button
                onClick={() => setPreviewPlatform('uiux')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  previewPlatform === 'uiux'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>UI/UX System</span>
              </button>
            </div>

            {/* Interactive Sandbox Container */}
            <div className="w-full">
              <InteractiveDevicePreview
                type={previewPlatform}
                title={
                  previewPlatform === 'web'
                    ? 'CloudPulse SaaS Engine'
                    : previewPlatform === 'mobile'
                    ? 'ZenPay Mobile FinTech'
                    : 'Aura Design System'
                }
              />
            </div>
          </div>
        </div>

        {/* Full-Width Metrics Row Below the Hero Split (Section 2.B rule) */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">48+</div>
            <div className="text-xs text-slate-400">{t.hero.metrics.projects}</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-emerald-400 tabular-nums">99.4%</div>
            <div className="text-xs text-slate-400">{t.hero.metrics.satisfaction}</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-blue-400 tabular-nums">5+ Yrs</div>
            <div className="text-xs text-slate-400">{t.hero.metrics.experience}</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-purple-400 tabular-nums">150k+</div>
            <div className="text-xs text-slate-400">{t.hero.metrics.users}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
