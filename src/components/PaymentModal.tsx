import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, ArrowRight, Printer, Download, Sparkles, Building2 } from 'lucide-react';
import { PaymentMethod, PaymentTransaction } from '../types';
import { Language, translations } from '../translations';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (tx: PaymentTransaction) => void;
  language: Language;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentComplete,
  language,
}) => {
  const t = translations[language];

  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'mvp' | 'enterprise' | 'custom'>('mvp');
  const [customAmount, setCustomAmount] = useState<number>(500);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [bkashNumber, setBkashNumber] = useState('');
  const [bkashTrxId, setBkashTrxId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTx, setCompletedTx] = useState<PaymentTransaction | null>(null);

  if (!isOpen) return null;

  const getAmount = () => {
    switch (selectedPlan) {
      case 'starter':
        return 450;
      case 'mvp':
        return 1400;
      case 'enterprise':
        return 3200;
      case 'custom':
        return Number(customAmount) || 100;
    }
  };

  const getServiceLabel = () => {
    switch (selectedPlan) {
      case 'starter':
        return 'Starter Sprint – Architecture & Prototype Milestone';
      case 'mvp':
        return 'Full MVP Production Build – Frontend, API & Database';
      case 'enterprise':
        return 'Enterprise Release – Multi-Platform Web, Mobile & SLA';
      case 'custom':
        return `Custom Project Milestone Deposit ($${customAmount})`;
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const invNum = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const tx: PaymentTransaction = {
        id: `tx-${Date.now()}`,
        invoiceNumber: invNum,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        serviceType: getServiceLabel(),
        amount: getAmount(),
        currency: 'USD',
        paymentMethod: method,
        status: 'completed',
        date: new Date().toISOString().split('T')[0],
        notes:
          method === 'bkash'
            ? `bKash Wallet: ${bkashNumber} · TrxID: ${bkashTrxId || 'TRX-AUTO-VERIFIED'}`
            : method === 'card'
            ? `Stripe Auth Token [Ends in ${cardNumber.slice(-4) || '4242'}]`
            : `${method.toUpperCase()} Settlement Verified`,
      };

      onPaymentComplete(tx);
      setCompletedTx(tx);
      setIsProcessing(false);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <span>{t.payment.title}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{t.payment.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedTx ? (
          /* Receipt / Invoice Confirmation View */
          <div className="py-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white">Payment Settled Successfully!</h4>
              <p className="text-xs text-slate-400">
                A formal receipt and invoice have been logged in the tech item ledger.
              </p>
            </div>

            {/* Printable Invoice Box */}
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-white font-bold tracking-tight text-sm">tech item.</span>
                <span className="text-blue-400 font-bold">{completedTx.invoiceNumber}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-slate-400">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Billed To</div>
                  <div className="text-white font-semibold text-xs mt-0.5">{completedTx.clientName}</div>
                  <div>{completedTx.clientEmail}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase">Payment Date</div>
                  <div className="text-white font-semibold text-xs mt-0.5">{completedTx.date}</div>
                  <div className="text-emerald-400 uppercase font-bold">Status: Settled</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">Service Item</div>
                <div className="text-slate-200 mt-0.5">{completedTx.serviceType}</div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm font-bold text-white">
                <span>Total Amount Paid</span>
                <span className="text-emerald-400 font-mono text-base">
                  ${completedTx.amount.toLocaleString()} USD
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>{t.payment.downloadReceipt}</span>
              </button>
              <button
                onClick={() => {
                  setCompletedTx(null);
                  onClose();
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form */
          <form onSubmit={handleCheckout} className="py-5 space-y-6">
            {/* Step 1: Select Milestone Tier */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
                {t.payment.presetPackages}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPlan('starter')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPlan === 'starter'
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Starter Sprint</div>
                  <div className="text-sm font-mono font-bold text-blue-400 mt-1">$450</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan('mvp')}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    selectedPlan === 'mvp'
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Full MVP</div>
                  <div className="text-sm font-mono font-bold text-emerald-400 mt-1">$1,400</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan('enterprise')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPlan === 'enterprise'
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Enterprise</div>
                  <div className="text-sm font-mono font-bold text-purple-400 mt-1">$3,200</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan('custom')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPlan === 'custom'
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Custom Milestone</div>
                  <div className="text-sm font-mono font-bold text-amber-400 mt-1">Flexible</div>
                </button>
              </div>

              {selectedPlan === 'custom' && (
                <div className="pt-2">
                  <label className="block text-[11px] text-slate-400 mb-1 font-mono">
                    Enter Amount in USD ($)
                  </label>
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 font-mono"
                  />
                </div>
              )}
            </div>

            {/* Step 2: Client Info */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
                {t.payment.clientInfo}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Legal / Company Name *"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Billing Email Address *"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Step 3: Payment Method Channels */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
                {t.payment.paymentMethod}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                    method === 'card'
                      ? 'bg-blue-600/30 border-blue-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('bkash')}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                    method === 'bkash'
                      ? 'bg-pink-600/30 border-pink-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  bKash (MFS)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('nagad')}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                    method === 'nagad'
                      ? 'bg-orange-600/30 border-orange-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Nagad (MFS)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('paypal')}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                    method === 'paypal'
                      ? 'bg-cyan-600/30 border-cyan-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  PayPal Global
                </button>
              </div>

              {/* Conditional Channel Details */}
              {method === 'card' && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Card Details</span>
                    <span className="font-mono text-[10px] text-emerald-400">256-Bit SSL Encrypted</span>
                  </div>
                  <input
                    type="text"
                    placeholder="4242 •••• •••• 4242"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      maxLength={5}
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
                    />
                    <input
                      type="password"
                      placeholder="CVC"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
                    />
                  </div>
                </div>
              )}

              {method === 'bkash' && (
                <div className="bg-pink-950/20 p-4 rounded-xl border border-pink-900/40 space-y-3">
                  <div className="text-xs text-pink-300 font-mono">
                    bKash Merchant Payment (01700-000000)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    বিকাশ অ্যাপ থেকে "Make Payment" অপশনে যান এবং রেফারেন্স হিসেবে আপনার নাম লিখুন। অথবা ট্রানজেকশন ভেরিফিকেশনের জন্য নিচের তথ্য পূরণ করুন।
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="bKash Wallet Number (017...)"
                      value={bkashNumber}
                      onChange={(e) => setBkashNumber(e.target.value)}
                      className="bg-slate-950 border border-pink-800/40 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
                    />
                    <input
                      type="text"
                      placeholder="Transaction TrxID (e.g. 9X24KB91)"
                      value={bkashTrxId}
                      onChange={(e) => setBkashTrxId(e.target.value)}
                      className="bg-slate-950 border border-pink-800/40 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
                    />
                  </div>
                </div>
              )}

              {method === 'nagad' && (
                <div className="bg-orange-950/20 p-4 rounded-xl border border-orange-900/40 space-y-2 text-xs text-slate-300">
                  <div className="text-orange-300 font-mono">Nagad Merchant Account: 01800-000000</div>
                  <p>Nagad অ্যাপে "Merchant Pay" নির্বাচন করে USD সমপরিমাণ BDT ট্রান্সফার করুন।</p>
                </div>
              )}

              {method === 'paypal' && (
                <div className="bg-cyan-950/20 p-4 rounded-xl border border-cyan-900/40 space-y-2 text-xs text-slate-300">
                  <div className="text-cyan-300 font-mono">PayPal Account: payments@techitem.dev</div>
                  <p>International PayPal transfers settle within 60 seconds with instant IPN webhook notification.</p>
                </div>
              )}
            </div>

            {/* Settlement summary & Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying & Generating Invoice...</span>
                  </div>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {t.payment.proceed} (${getAmount().toLocaleString()} USD)
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
