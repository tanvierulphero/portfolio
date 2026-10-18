import React, { useState } from 'react';
import { Menu, X, Shield, CreditCard, Globe } from 'lucide-react';
import { Language, translations } from '../translations';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenAdmin: () => void;
  onOpenPayment: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenAdmin,
  onOpenPayment,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title (single text element wordmark, whitespace-nowrap shrink-0) */}
        <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            tech item<span className="text-blue-500">.</span>
          </span>
        </a>

        {/* Zone 2: 4-5 Navigation Links (single-line, whitespace-nowrap shrink-0) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#works" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {t.nav.works}
          </a>
          <a href="#services" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {t.nav.services}
          </a>
          <a href="#feedback" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {t.nav.feedback}
          </a>
          <a href="#blog" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {t.nav.blog}
          </a>
          <a href="#contact" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {t.nav.contact}
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Toggles */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            title="Toggle English / বাংলা"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
          </button>

          {/* Quick Payment Portal Trigger */}
          <button
            onClick={onOpenPayment}
            title={t.nav.payNow}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.nav.payNow}</span>
          </button>

          {/* Admin Control Trigger */}
          <button
            onClick={onOpenAdmin}
            title={t.nav.admin}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden lg:inline">{t.nav.admin}</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenContact}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm hover:shadow-blue-500/20 transition-all whitespace-nowrap shrink-0"
          >
            {t.nav.hire}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <a
              href="#works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors"
            >
              {t.nav.works}
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors"
            >
              {t.nav.services}
            </a>
            <a
              href="#feedback"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors"
            >
              {t.nav.feedback}
            </a>
            <a
              href="#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors"
            >
              {t.nav.blog}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors"
            >
              {t.nav.contact}
            </a>
          </nav>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPayment();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400"
            >
              <CreditCard className="w-4 h-4" />
              <span>{t.nav.payNow}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-blue-400"
            >
              <Shield className="w-4 h-4" />
              <span>{t.nav.admin}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
