import React, { useState } from 'react';
import { Globe, Smartphone, Layers, CheckCircle2, ArrowUpRight, ShieldCheck, Zap, TrendingUp, Sparkles, Code2 } from 'lucide-react';

interface DevicePreviewProps {
  type: 'web' | 'mobile' | 'uiux';
  title?: string;
  accentColor?: string;
}

export const InteractiveDevicePreview: React.FC<DevicePreviewProps> = ({
  type,
  title = 'Application Preview',
  accentColor = '#2563eb',
}) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'logs' | 'users'>('metrics');
  const [mobileStep, setMobileStep] = useState<number>(1);

  if (type === 'mobile') {
    return (
      <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px] h-[480px] bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-700/60 overflow-hidden flex flex-col justify-between">
        {/* Dynamic Island / Notch */}
        <div className="relative z-10 mx-auto w-24 h-5 bg-black rounded-full flex items-center justify-between px-2">
          <div className="w-2 h-2 rounded-full bg-slate-800" />
          <div className="w-2 h-2 rounded-full bg-blue-500/80" />
        </div>

        {/* Mobile Screen Content */}
        <div className="relative flex-1 bg-slate-950 rounded-[28px] overflow-hidden flex flex-col mt-2 p-3 text-slate-100 border border-slate-800/80">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ZenPay Secure</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">v3.4.0</span>
          </div>

          {/* Balance Card */}
          <div className="mt-3 p-3 rounded-xl bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-900 border border-blue-500/20">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Available Balance</span>
            <div className="text-xl font-bold font-mono tracking-tight text-white mt-0.5">$24,850.40</div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% this month</span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <button
              onClick={() => setMobileStep(1)}
              className={`p-2 rounded-lg text-center text-[10px] transition-colors border ${
                mobileStep === 1 ? 'bg-blue-600/30 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Transfer
            </button>
            <button
              onClick={() => setMobileStep(2)}
              className={`p-2 rounded-lg text-center text-[10px] transition-colors border ${
                mobileStep === 2 ? 'bg-blue-600/30 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Receive
            </button>
            <button
              onClick={() => setMobileStep(3)}
              className={`p-2 rounded-lg text-center text-[10px] transition-colors border ${
                mobileStep === 3 ? 'bg-blue-600/30 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Biometrics
            </button>
          </div>

          {/* Dynamic Feed / Step View */}
          <div className="mt-3 flex-1 bg-slate-900/60 rounded-xl p-2.5 border border-slate-800/80 overflow-y-auto">
            {mobileStep === 1 && (
              <div className="space-y-2">
                <div className="text-[11px] font-medium text-slate-300">Recent Transferees</div>
                <div className="flex items-center justify-between p-1.5 bg-slate-900 rounded-lg text-[10px]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-[10px]">TA</div>
                    <div>
                      <div className="font-medium text-slate-200">Tanvir Al-Mamun</div>
                      <div className="text-slate-500 text-[9px]">bKash Verified</div>
                    </div>
                  </div>
                  <span className="font-mono text-emerald-400">+$420</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-slate-900 rounded-lg text-[10px]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-[10px]">JS</div>
                    <div>
                      <div className="font-medium text-slate-200">Sarah Jenkins</div>
                      <div className="text-slate-500 text-[9px]">Stripe Wire</div>
                    </div>
                  </div>
                  <span className="font-mono text-slate-400">-$150</span>
                </div>
              </div>
            )}
            {mobileStep === 2 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-2">
                <div className="w-20 h-20 bg-white p-1 rounded-lg flex items-center justify-center mb-1">
                  <div className="w-full h-full border-2 border-black border-dashed flex items-center justify-center font-mono text-[9px] text-slate-900">
                    QR:PAY#992
                  </div>
                </div>
                <span className="text-[10px] text-slate-300 font-mono">Scan to send funds</span>
              </div>
            )}
            {mobileStep === 3 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-2 space-y-1">
                <Zap className="w-8 h-8 text-blue-400" />
                <span className="text-[11px] font-medium text-slate-200">FaceID & Touch Guard</span>
                <span className="text-[9px] text-slate-400">Hardware enclave encrypted</span>
              </div>
            )}
          </div>

          {/* Bottom Bar Indicator */}
          <div className="w-16 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
        </div>
      </div>
    );
  }

  if (type === 'uiux') {
    return (
      <div className="w-full h-full min-h-[380px] bg-slate-900/95 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between shadow-xl">
        {/* Figma-like Artboard Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-slate-200">Design System Architecture</span>
          </div>
          <span className="text-[11px] text-purple-400 font-mono bg-purple-950/50 px-2 py-0.5 rounded border border-purple-800/40">Figma Tokens v2.4</span>
        </div>

        {/* Color Palette Tokens Preview */}
        <div className="mt-3">
          <div className="text-[11px] text-slate-400 mb-2 font-medium">Core Brand Tokens</div>
          <div className="grid grid-cols-4 gap-2">
            <div className="p-2 rounded-lg bg-blue-600 text-white text-[10px] font-mono">
              <div>Primary</div>
              <div className="opacity-80 text-[9px]">#2563EB</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-[10px] font-mono">
              <div>Obsidian</div>
              <div className="opacity-80 text-[9px]">#090D16</div>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500 text-slate-950 text-[10px] font-mono font-medium">
              <div>Accent</div>
              <div className="opacity-80 text-[9px]">#10B981</div>
            </div>
            <div className="p-2 rounded-lg bg-purple-600 text-white text-[10px] font-mono">
              <div>Purple</div>
              <div className="opacity-80 text-[9px]">#8B5CF6</div>
            </div>
          </div>
        </div>

        {/* Component Sandbox */}
        <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Atomic Component Sandbox</span>
            <span className="text-slate-500 font-mono text-[10px]">WCAG AAA</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg shadow-sm transition-all flex items-center gap-1.5">
              <span>Primary CTA</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 transition-colors">
              Secondary Button
            </button>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium px-2 py-1 bg-emerald-950/40 rounded border border-emerald-800/40">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Valid Input</span>
            </div>
          </div>
        </div>

        {/* Typographic Scale */}
        <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="font-mono text-slate-300">Display 36px / Body 16px</span>
          <span className="text-slate-500">Auto-synced with React repo</span>
        </div>
      </div>
    );
  }

  // Web Application preview (Default)
  return (
    <div className="w-full h-full min-h-[380px] bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
      {/* Browser Chrome Header */}
      <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="ml-3 px-3 py-0.5 bg-slate-950 rounded-md border border-slate-800 text-[11px] text-slate-400 font-mono flex items-center gap-1.5 max-w-[260px] truncate">
            <Globe className="w-3 h-3 text-blue-400" />
            <span>https://cloudpulse.techitem.dev</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="hidden sm:inline">P99: 42ms</span>
          <span className="text-emerald-400 font-medium">99.98% SLA</span>
        </div>
      </div>

      {/* Internal Web Dashboard Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <div className="text-sm font-bold text-white">{title}</div>
            <div className="text-xs text-slate-400">Live Production Telemetry & Cluster State</div>
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                activeTab === 'metrics' ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Metrics
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                activeTab === 'logs' ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Traffic
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                activeTab === 'users' ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Nodes
            </button>
          </div>
        </div>

        {/* Dashboard Widgets */}
        {activeTab === 'metrics' && (
          <div className="space-y-3 flex-1">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Throughput</span>
                <div className="text-base font-bold text-white font-mono mt-0.5">124,580/s</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">+14% vs prev hour</div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Avg Latency</span>
                <div className="text-base font-bold text-blue-400 font-mono mt-0.5">38.4 ms</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Sub-50ms target</div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Error Rate</span>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">0.002%</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Zero critical incidents</div>
              </div>
            </div>

            {/* Simulated Live Sparkline / Chart */}
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-medium text-slate-300">Cluster Request Distribution</span>
                <span className="font-mono text-[10px] text-blue-400">Live Stream 1000ms</span>
              </div>
              <div className="h-16 flex items-end gap-1.5 pt-2">
                {[35, 48, 62, 55, 78, 90, 82, 70, 85, 96, 88, 76, 92, 100, 84, 91].map((val, i) => (
                  <div
                    key={i}
                    style={{ height: `${val}%` }}
                    className="flex-1 bg-gradient-to-t from-blue-700 to-cyan-400 rounded-t-sm transition-all duration-300 hover:brightness-125"
                    title={`Bucket ${i + 1}: ${val}% capacity`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 font-mono text-[11px] space-y-1.5 text-slate-300 flex-1 overflow-y-auto">
            <div className="text-emerald-400">[200 OK] GET /api/v2/telemetry/stream - 18ms</div>
            <div className="text-blue-400">[101 SWITCH] WebSocket handshake established (client_id: #9901)</div>
            <div className="text-emerald-400">[200 OK] POST /api/v2/events/batch [500 records] - 42ms</div>
            <div className="text-slate-400">[INFO] Cluster scale equilibrium reached (6/6 edge workers active)</div>
            <div className="text-emerald-400">[200 OK] GET /healthz - 1ms</div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="grid grid-cols-2 gap-2 text-xs flex-1">
            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
              <div className="font-medium text-slate-200">Edge Region Asia-East</div>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">Status: Healthy (12ms)</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[45%]" />
              </div>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
              <div className="font-medium text-slate-200">Edge Region US-East</div>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">Status: Healthy (28ms)</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-500 h-full w-[65%]" />
              </div>
            </div>
          </div>
        )}

        {/* Footer info bar */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80 font-mono">
          <span>Engine: Next.js + React 19 + TypeScript</span>
          <span className="text-slate-400">Deployed on Vercel Edge</span>
        </div>
      </div>
    </div>
  );
};
