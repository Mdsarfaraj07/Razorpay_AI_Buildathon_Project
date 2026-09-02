import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  BrainCircuit, 
  FileText, 
  Network, 
  Lock, 
  Zap, 
  Download,
  Cpu
} from 'lucide-react';

export type AppTabType = 'metrics' | 'live-feed' | 'ml-workbench' | 'chargeback' | 'abuse-ring' | 'audit-compliance';

interface NavbarProps {
  activeTab: AppTabType;
  setActiveTab: (tab: AppTabType) => void;
  threshold: number;
  setThreshold: (val: number) => void;
  precision: number;
  recall: number;
  liveCount: number;
  onExportAudit?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  threshold,
  precision,
  recall,
  liveCount,
  onExportAudit
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Track Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center shadow-sm">
              <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-slate-900">
                SENTINEL <span className="text-indigo-600">AI</span>
              </span>
              <span className="ml-2 px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-500 rounded border border-slate-200 uppercase tracking-wider font-mono">
                RAZORPAY TRACK 02
              </span>
            </div>
          </div>

          {/* Model Real-time Stats & Engine Status */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                XGB-BFSI-v4.2 Active
              </span>
            </div>

            <div className="h-6 w-px bg-slate-200"></div>

            <div className="flex items-center space-x-4 text-xs font-mono text-slate-600">
              <div>
                <span className="text-slate-400">PRECISION: </span>
                <span className="font-bold text-slate-900">{precision}%</span>
              </div>
              <div>
                <span className="text-slate-400">RECALL: </span>
                <span className="font-bold text-slate-900">{recall}%</span>
              </div>
              <div>
                <span className="text-slate-400">CUTOFF (τ): </span>
                <span className="font-bold text-indigo-600">{(threshold * 100).toFixed(0)}%</span>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-200"></div>

            <button
              onClick={() => {
                setActiveTab('audit-compliance');
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 text-xs font-bold rounded shadow-sm transition flex items-center space-x-1.5 font-mono"
            >
              <Lock className="w-3 h-3 text-indigo-300" />
              <span>EXPORT AUDIT TRAIL</span>
            </button>
          </div>

        </div>

        {/* Clean Navigation Bar */}
        <div className="flex space-x-1 border-t border-slate-100 overflow-x-auto py-1.5 scrollbar-none">
          
          <button
            onClick={() => setActiveTab('ml-workbench')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'ml-workbench'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>ML Prediction Workbench</span>
            <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
              activeTab === 'ml-workbench' ? 'bg-indigo-700 text-white' : 'bg-indigo-100 text-indigo-800'
            }`}>
              API
            </span>
          </button>

          <button
            onClick={() => setActiveTab('live-feed')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'live-feed'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Live Risk Monitor</span>
            {liveCount > 0 && (
              <span className={`ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                activeTab === 'live-feed' ? 'bg-slate-800 text-indigo-300' : 'bg-slate-200 text-slate-700'
              }`}>
                {liveCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Model Benchmark & Costs</span>
          </button>

          <button
            onClick={() => setActiveTab('chargeback')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'chargeback'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Chargeback Auto-Defender</span>
            <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded text-[10px] font-mono font-bold">
              3 Pending
            </span>
          </button>

          <button
            onClick={() => setActiveTab('abuse-ring')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'abuse-ring'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Abuse-Ring Sentinel</span>
            <span className="px-1.5 py-0.2 bg-rose-100 text-rose-800 rounded text-[10px] font-mono font-bold">
              2 Syndicates
            </span>
          </button>

          <button
            onClick={() => setActiveTab('audit-compliance')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'audit-compliance'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Immutable Audit & RBI Compliance</span>
          </button>
        </div>

      </div>
    </header>
  );
};
