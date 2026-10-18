import React, { useState } from 'react';
import { Star, MessageSquarePlus, ShieldCheck, Quote } from 'lucide-react';
import { CustomerFeedback } from '../types';
import { Language, translations } from '../translations';
import { FeedbackSubmissionModal } from './FeedbackSubmissionModal';

interface CustomerFeedbackSectionProps {
  feedbacks: CustomerFeedback[];
  onAddFeedback: (feedback: CustomerFeedback) => void;
  language: Language;
}

export const CustomerFeedbackSection: React.FC<CustomerFeedbackSectionProps> = ({
  feedbacks,
  onAddFeedback,
  language,
}) => {
  const t = translations[language];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const approvedFeedbacks = feedbacks.filter((f) => f.status === 'approved');

  // Compute average rating
  const avgRating =
    approvedFeedbacks.length > 0
      ? (
          approvedFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) /
          approvedFeedbacks.length
        ).toFixed(2)
      : '5.00';

  return (
    <section id="feedback" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
            {t.feedback.title}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {language === 'en'
              ? 'Proven Trust from Industry Leaders'
              : 'ক্লায়েন্টদের সন্তুষ্টি ও নির্ভরযোগ্যতার প্রমাণ'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            {t.feedback.subtitle}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-blue-400 hover:text-blue-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors self-start md:self-auto shrink-0"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>{t.feedback.submitReviewBtn}</span>
        </button>
      </div>

      {/* Aggregate Score Bar */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl mb-10 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="text-3xl sm:text-4xl font-bold font-mono text-white tabular-nums">
            {avgRating}
          </div>
          <div>
            <div className="flex items-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-mono">
              Based on {approvedFeedbacks.length} verified reviews
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Verified Production Deliveries</span>
          </div>
          <div className="hidden sm:block text-slate-600">·</div>
          <div className="hidden sm:block">
            On-Time Delivery Rate: <span className="text-white font-mono font-medium">98.8%</span>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {approvedFeedbacks.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-colors"
          >
            <div className="space-y-4">
              {/* Star Rating & Project Kicker */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {/* Clean unboxed metadata (Section 1.A) */}
                <span className="text-[11px] font-mono text-slate-500">
                  {item.date}
                </span>
              </div>

              {/* Quote Text */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic">
                "{item.feedback}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${item.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow-sm`}
                >
                  {item.clientName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{item.clientName}</span>
                    <span title="Verified Client" className="inline-flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {item.role} · <span className="text-slate-300">{item.company}</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Project
                </span>
                <span className="text-xs text-slate-300 font-medium truncate max-w-[150px] block">
                  {item.projectTitle}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      <FeedbackSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddFeedback}
        language={language}
      />
    </section>
  );
};
