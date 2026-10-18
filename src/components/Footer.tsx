import React from 'react';
import { Github, Linkedin, Twitter, Dribbble, Youtube, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { Language, translations } from '../translations';

interface FooterProps {
  language: Language;
  onOpenAdmin: () => void;
  onOpenPayment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenAdmin, onOpenPayment }) => {
  const t = translations[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Footer Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 justify-between">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="text-2xl font-bold tracking-tight text-white inline-block">
              tech item<span className="text-blue-500">.</span>
            </a>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              {t.hero.subtitle}
            </p>
            {/* Social Media Links (as requested by user) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/techitem"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/techitem"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-slate-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/techitem"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter / X"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://dribbble.com/techitem"
                target="_blank"
                rel="noopener noreferrer"
                title="Dribbble"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-slate-700 transition-colors"
              >
                <Dribbble className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@techitem"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-rose-400 hover:border-slate-700 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Direct"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-slate-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono text-xs uppercase text-slate-300 tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#works" className="hover:text-white transition-colors">
                  {t.nav.works}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#feedback" className="hover:text-white transition-colors">
                  {t.nav.feedback}
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors">
                  {t.nav.blog}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Engineering Domains */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono text-xs uppercase text-slate-300 tracking-wider">
              Specialties
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>Web Applications</li>
              <li>Cross-Platform Mobile</li>
              <li>UI/UX Design Systems</li>
              <li>Firebase & MongoDB</li>
              <li>Vercel Edge Deployments</li>
            </ul>
          </div>

          {/* System & Admin Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase text-slate-300 tracking-wider">
              Portals & Billing
            </div>
            <div className="space-y-2">
              <button
                onClick={onOpenPayment}
                className="block text-emerald-400 hover:underline text-left"
              >
                Client Payment & Billing Portal
              </button>
              <button
                onClick={onOpenAdmin}
                className="block text-blue-400 hover:underline text-left"
              >
                Admin Control Panel
              </button>
              <div className="text-[11px] text-slate-500 font-mono pt-1">
                Environment: vercel.app ready
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} tech item. Crafted with precision for high-scale digital products.
          </div>

          <div className="flex items-center gap-6">
            <span>Fast Load Optimized</span>
            <span>·</span>
            <span>WCAG AA Accessible</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
