import React, { useState } from 'react';
import { ChargebackDispute } from '../types';
import { 
  FileCheck, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  FileText, 
  ExternalLink, 
  Truck, 
  Lock, 
  Smartphone,
  Download,
  Copy,
  ChevronRight
} from 'lucide-react';

interface ChargebackAutoResponderProps {
  disputes: ChargebackDispute[];
  onGenerateEvidence: (dispute: ChargebackDispute) => Promise<void>;
  isGenerating: boolean;
}

export const ChargebackAutoResponder: React.FC<ChargebackAutoResponderProps> = ({
  disputes,
  onGenerateEvidence,
  isGenerating
}) => {
  const [selectedDispute, setSelectedDispute] = useState<ChargebackDispute>(disputes[0]);
  const [copied, setCopied] = useState(false);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCopyRebuttal = () => {
    if (selectedDispute?.formal_rebuttal) {
      navigator.clipboard.writeText(selectedDispute.formal_rebuttal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Auto-Responder Overview */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <FileCheck className="w-4 h-4" />
              <span>Chargeback Representment Auto-Defender</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Stop Friendly Fraud & Recover Merchant Revenue
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl">
              Automated compilation of 3DS authentication cryptograms, courier AWB tracking, and digital device audit logs to contest fraudulent chargeback claims with Visa, Mastercard, and NPCI.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Dispute Escrow</div>
              <div className="text-xl font-light text-slate-900 font-mono">
                {formatINR(disputes.reduce((acc, d) => acc + d.amount, 0))}
              </div>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <div className="text-[10px] uppercase font-bold text-slate-400">Avg AI Win Rate</div>
              <div className="text-xl font-light text-emerald-700 font-mono">85.3%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Interface: Dispute Queue (Left) & Evidence Pack (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Dispute Cases Queue */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Active Chargeback Notice Queue</h2>
            <span className="text-xs font-mono text-slate-400 font-bold">{disputes.length} Cases</span>
          </div>

          <div className="space-y-3">
            {disputes.map((d) => {
              const isSelected = selectedDispute.id === d.id;
              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDispute(d)}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-slate-50 border-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-slate-900">{d.id}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-bold">
                          {d.reason_code.split(' - ')[0]}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-900 mt-1">{d.merchant_name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{d.reason_title}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900 font-mono">{formatINR(d.amount)}</div>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                        d.status === 'READY_TO_SUBMIT' ? 'bg-emerald-100 text-emerald-800' :
                        d.status === 'SUBMITTED' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {d.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>Due: {new Date(d.response_deadline).toLocaleDateString()}</span>
                    </span>

                    {d.win_probability && (
                      <span className="text-emerald-700 font-bold">
                        Win Chance: {d.win_probability}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Automated Evidence Pack & Rebuttal Generator */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            
            {/* Header: Selected Dispute Details */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono font-bold text-slate-900">{selectedDispute.id}</span>
                  <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded font-mono font-bold">
                    {selectedDispute.reason_code}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Cardholder: <span className="text-slate-900 font-medium">{selectedDispute.customer_name}</span> ({selectedDispute.customer_email})
                </p>
              </div>

              <button
                onClick={() => onGenerateEvidence(selectedDispute)}
                disabled={isGenerating}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded text-xs font-bold font-mono uppercase tracking-wider transition shadow-sm flex items-center space-x-2 whitespace-nowrap"
              >
                {isGenerating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Compiling Telemetry...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-indigo-300" />
                    <span>Auto-Generate Rebuttal</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Win Probability Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Dispute Value</span>
                <div className="text-lg font-light text-slate-900 font-mono mt-0.5">
                  {formatINR(selectedDispute.amount)}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">3DS Liability Shift</span>
                <div className="text-lg font-bold text-emerald-700 font-mono mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-sans">{selectedDispute.liability_shift_valid ? 'Shifted to Issuer' : 'Merchant Retained'}</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Predicted Win Likelihood</span>
                <div className="text-lg font-light text-indigo-600 font-mono mt-0.5">
                  {selectedDispute.win_probability || 88}%
                </div>
              </div>
            </div>

            {/* Executive Defense Summary */}
            {selectedDispute.executive_summary && (
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-lg p-3.5 mb-4">
                <div className="text-xs font-bold text-indigo-900 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>AI Defense Synopsis</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedDispute.executive_summary}
                </p>
              </div>
            )}

            {/* Evidence Pillars Grid */}
            <div className="mb-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Cryptographic & Telemetry Proof Pillars</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedDispute.evidence_pillars?.map((pillar, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900 truncate">{pillar.title}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold">
                        {pillar.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">{pillar.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery / Physical Proof */}
            {selectedDispute.delivery_proof && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 mb-2">
                  <Truck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Logistics Proof of Delivery (AWB #{selectedDispute.delivery_proof.awb})</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-400 block">Courier:</span>
                    <span className="text-slate-800 font-bold">{selectedDispute.delivery_proof.courier}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Timestamp:</span>
                    <span className="text-slate-800 font-bold">{selectedDispute.delivery_proof.delivery_date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Signee:</span>
                    <span className="text-slate-800 font-bold">{selectedDispute.delivery_proof.signee}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">City:</span>
                    <span className="text-slate-800 font-bold">{selectedDispute.delivery_proof.city}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Rebuttal Letter Text Box */}
            {selectedDispute.formal_rebuttal && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">Formal Legal Rebuttal Submission</span>
                  <button
                    onClick={handleCopyRebuttal}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 font-mono font-bold transition"
                  >
                    {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Rebuttal'}</span>
                  </button>
                </div>
                <pre className="text-[11px] text-slate-700 font-mono whitespace-pre-wrap max-h-36 overflow-y-auto bg-white p-2.5 rounded border border-slate-200">
                  {selectedDispute.formal_rebuttal}
                </pre>
              </div>
            )}

          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              Ready for Visa Resolve Online (VROL) & NPCI Dispute Portal
            </span>
            <button
              onClick={() => {
                alert(`Representment Dossier for ${selectedDispute.id} submitted successfully to Card Scheme Network!`);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded transition flex items-center space-x-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Representment to Network</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
