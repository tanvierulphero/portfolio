import React, { useState } from 'react';
import { X, Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { CustomerFeedback } from '../types';
import { Language, translations } from '../translations';

interface FeedbackSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: CustomerFeedback) => void;
  language: Language;
}

export const FeedbackSubmissionModal: React.FC<FeedbackSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  language,
}) => {
  const t = translations[language];
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !feedbackText.trim()) return;

    const colors = ['bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 'bg-amber-600', 'bg-cyan-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newFeedback: CustomerFeedback = {
      id: `fb-${Date.now()}`,
      clientName: clientName.trim(),
      company: company.trim() || 'Independent Partner',
      role: role.trim() || 'Product Partner',
      rating,
      projectTitle: projectTitle.trim() || 'Custom Software Build',
      feedback: feedbackText.trim(),
      date: new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
        month: 'long',
        year: 'numeric',
      }),
      status: 'approved', // instantly viewable
      avatarColor: randomColor,
    };

    onSubmit(newFeedback);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white">{t.feedback.submitReviewBtn}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Your evaluation helps tech item maintain world-class standards.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">{t.feedback.successMessage}</h4>
            <p className="text-xs text-slate-400">Your feedback has been verified and added to the community showcase.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Rating Stars Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                {t.feedback.rating}
              </label>
              <div className="flex items-center gap-1.5 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating || rating) >= star
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 font-mono text-xs text-amber-400 font-bold">
                  {rating}.0 / 5.0
                </span>
              </div>
            </div>

            {/* Client Name */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                {t.feedback.clientName} *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Tanvir Al-Hasan"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Company & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                  {t.feedback.company}
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Veloce Global"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                  {t.feedback.role}
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Founder & CTO"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Project Title */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                {t.feedback.projectTitle}
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="e.g. ZenPay FinTech Mobile App"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Feedback Content */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                {t.feedback.reviewText} *
              </label>
              <textarea
                required
                rows={4}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your detailed feedback on code quality, speed, communication, and business outcome..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t.feedback.submitBtn}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
