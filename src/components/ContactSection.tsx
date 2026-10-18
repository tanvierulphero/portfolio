import React, { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle2, MapPin, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CustomerLead } from '../types';
import { Language, translations } from '../translations';

interface ContactSectionProps {
  onAddLead: (lead: CustomerLead) => void;
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onAddLead, language }) => {
  const t = translations[language];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Web Application');
  const [budget, setBudget] = useState('$1,000 - $3,000');
  const [timeline, setTimeline] = useState('4 - 6 Weeks');
  const [message, setMessage] = useState('');
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const leadId = `LEAD-${Date.now().toString().slice(-6)}`;
    const newLead: CustomerLead = {
      id: leadId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      projectType,
      budget,
      timeline,
      message: message.trim(),
      status: 'new',
      createdAt: new Date().toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    onAddLead(newLead);
    setSubmittedLeadId(leadId);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubmittedLeadId(null);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Context & Direct Contact Links */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
              Inbound Project Consultation
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {t.contact.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Quick Direct Channels */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              {t.contact.directContact}
            </div>

            <a
              href="https://wa.me/8801700000000?text=Hello%20tech%20item,%20I%20would%20like%20to%20discuss%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    WhatsApp Chat
                  </div>
                  <div className="text-xs text-slate-400">Direct message to engineering lead</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </a>

            <a
              href="mailto:contact@techitem.dev"
              className="p-4 bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    Official Email
                  </div>
                  <div className="text-xs text-slate-400 font-mono">contact@techitem.dev</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Location & Timezone notes */}
          <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>{t.contact.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Operating Hours: UTC+6 (Available across US/EU business timezones)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Collection Form */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          {submittedLeadId ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {t.contact.success}
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Your inquiry has been stored securely in the database. Our lead engineer will inspect your requirements and get in touch shortly.
              </p>
              <div className="inline-block p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-blue-400">
                {t.contact.ticketId}: <span className="font-bold text-white">#{submittedLeadId}</span>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    {t.contact.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvierul Islam"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    {t.contact.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tanvierul@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    {t.contact.phone}
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 17... or +1 ..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    {t.contact.projectType}
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile Application">Mobile Application</option>
                    <option value="UI/UX Design System">UI/UX Design System</option>
                    <option value="Full-Stack Web + Mobile">Full-Stack Web + Mobile</option>
                    <option value="Cloud & Database Architecture">Cloud & Database Setup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    {t.contact.budget}
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="< $1,000">&lt; $1,000 USD</option>
                    <option value="$1,000 - $3,000">$1,000 - $3,000 USD</option>
                    <option value="$3,000 - $7,000">$3,000 - $7,000 USD</option>
                    <option value="$7,000+">$7,000+ USD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  {t.contact.message} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>{t.contact.submit}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-mono pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted transmission · Response guaranteed within 4 hours</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
