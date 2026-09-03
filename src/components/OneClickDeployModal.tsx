import React, { useState } from 'react';
import { 
  X, 
  Rocket, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Terminal, 
  ShieldCheck, 
  Server, 
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface OneClickDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OneClickDeployModal: React.FC<OneClickDeployModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderBlueprintYaml = `services:
  - type: web
    name: razorpay-fraud-sentinel
    env: node
    plan: free
    buildCommand: npm run build
    startCommand: npm start
    healthCheckPath: /health`;

  const dockerCommand = `docker build -t razorpay-fraud-sentinel .\ndocker run -p 3000:3000 -e PORT=3000 razorpay-fraud-sentinel`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 rounded-xl">
              <Rocket className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold font-mono text-white">1-Click Render Cloud Deployment</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  RENDER.YAML READY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Deploy full-stack Razorpay Sentinel AI to Render with zero manual configuration.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Primary Render 1-Click Banner */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-5 text-white border border-indigo-500/30 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#46e3b7] ring-4 ring-[#46e3b7]/20"></span>
                <span className="font-mono font-bold text-sm text-white">Render Blueprint 1-Click</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                RECOMMENDED
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Click the button below to launch Render's automated Blueprint deployment. Render reads <code className="text-emerald-300 font-mono">render.yaml</code>, compiles the full stack, wires up the <code className="text-indigo-300 font-mono">/health</code> endpoint, and provisions a free HTTPS domain automatically.
            </p>

            <div className="pt-1 flex flex-wrap gap-3 items-center">
              <a
                href="https://render.com/deploy"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#46e3b7] hover:bg-[#35c99f] text-slate-950 px-5 py-2.5 rounded-xl text-xs font-mono font-extrabold shadow-lg transition flex items-center space-x-2"
              >
                <span>DEPLOY TO RENDER (1-CLICK)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
              </a>

              <a
                href="https://railway.app/new"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition flex items-center space-x-1.5"
              >
                <span>Deploy to Railway</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* 3 Step Instructions */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-3">
              How 1-Click Render Deployment Works:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-indigo-600 font-mono font-bold text-xs">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px]">1</span>
                  <span>Push to GitHub</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Export or push your codebase to any GitHub repository.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-indigo-600 font-mono font-bold text-xs">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px]">2</span>
                  <span>Connect Blueprint</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Render reads <code className="font-mono text-slate-800">render.yaml</code> &amp; builds the TypeScript stack.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-emerald-600 font-mono font-bold text-xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">3</span>
                  <span>Live with SSL</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Live on <code className="font-mono text-slate-800">.onrender.com</code> with auto-renewing HTTPS.
                </p>
              </div>
            </div>
          </div>

          {/* Render Blueprint Config Snippet */}
          <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-bold flex items-center gap-1.5 text-emerald-300">
                <Layers className="w-3.5 h-3.5" />
                Included render.yaml Blueprint
              </span>
              <button
                onClick={() => handleCopy(renderBlueprintYaml, 1)}
                className="text-xs flex items-center gap-1 hover:text-white transition"
              >
                {copiedIndex === 1 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 1 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed py-1">
              {renderBlueprintYaml}
            </pre>
          </div>

          {/* Docker Container Alternative */}
          <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-bold flex items-center gap-1.5 text-indigo-300">
                <Terminal className="w-3.5 h-3.5" />
                Local / Docker Multi-Stage Run
              </span>
              <button
                onClick={() => handleCopy(dockerCommand, 2)}
                className="text-xs flex items-center gap-1 hover:text-white transition"
              >
                {copiedIndex === 2 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 2 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-indigo-300 overflow-x-auto whitespace-pre leading-relaxed py-1">
              {dockerCommand}
            </pre>
          </div>

          {/* Production Assurance Badges */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-800 font-mono font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Production Verification &amp; Cloud Health Assurances</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-emerald-900 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Render /health Probe</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero-Downtime Auto-Deploy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Express Server Bundled CJS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dynamic PORT Binding</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Blueprint: <span className="text-slate-700 font-medium">render.yaml</span> &bull; Port: <span className="text-slate-700 font-medium">$PORT (0.0.0.0)</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-mono font-bold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
