import React from 'react';
import { Monitor, Smartphone, Palette, Database, CheckCircle, ArrowRight } from 'lucide-react';
import { Language, translations } from '../translations';

interface ServicesSectionProps {
  language: Language;
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  onSelectService,
}) => {
  const t = translations[language];

  const services = [
    {
      num: '01',
      title: t.services.webTitle,
      desc: t.services.webDesc,
      icon: Monitor,
      tags: ['Next.js', 'React 19', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vercel Edge'],
      deliverables: ['Custom Web Portals', 'SaaS Dashboards', 'Headless E-Commerce', 'PWA Support'],
    },
    {
      num: '02',
      title: t.services.mobileTitle,
      desc: t.services.mobileDesc,
      icon: Smartphone,
      tags: ['Flutter', 'React Native', 'iOS & Android', 'Biometrics', 'Offline Sync', 'Push Alerts'],
      deliverables: ['FinTech Wallets', 'Health & Tele-consult', 'Delivery Platforms', 'Real-time Chat'],
    },
    {
      num: '03',
      title: t.services.uiuxTitle,
      desc: t.services.uiuxDesc,
      icon: Palette,
      tags: ['Figma Tokens', 'Atomic Design', 'WCAG AAA', 'User Journey', 'Interactive Prototypes'],
      deliverables: ['Design Systems', 'Micro-interactions', 'Clickable Figma Prototypes', 'UX Audits'],
    },
    {
      num: '04',
      title: t.services.cloudTitle,
      desc: t.services.cloudDesc,
      icon: Database,
      tags: ['MongoDB Atlas', 'Firebase Firestore', 'PostgreSQL', 'Serverless API', 'OAuth Security'],
      deliverables: ['Database Schema Design', 'Firebase Auth Setup', 'REST & GraphQL APIs', 'Backup Sync'],
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-900/40 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-3 mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
            {t.services.title}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {language === 'en'
              ? 'Engineering Standards Without Compromise'
              : 'উন্নত প্রযুক্তির সমন্বয়ে তৈরি প্রতিটি সল্যুশন'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            {t.services.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.num}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 transition-all hover:border-slate-700 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Natural editorial numbering (Section 1.B allowed) */}
                    <span className="font-mono text-xl font-bold text-slate-600">
                      {svc.num}.
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {svc.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {svc.desc}
                  </p>

                  {/* Deliverables List */}
                  <div className="pt-2 space-y-2">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Key Deliverables
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                      {svc.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer tags and action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-500 truncate max-w-[220px]">
                    {svc.tags.slice(0, 3).join(' · ')}
                  </div>
                  <button
                    onClick={() => onSelectService(svc.title)}
                    className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Inquire Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
