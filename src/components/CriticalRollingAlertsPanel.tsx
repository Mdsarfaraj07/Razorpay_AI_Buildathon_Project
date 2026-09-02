import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  ShieldAlert, 
  TrendingUp, 
  Activity, 
  Zap, 
  BellRing, 
  CheckCircle2, 
  Sliders, 
  RefreshCw, 
  ArrowUpRight, 
  Radio, 
  ShieldCheck,
  Cpu,
  Lock,
  X
} from 'lucide-react';

interface RollingAnomalyAlertPanelProps {
  // Configurable baseline score (e.g., 0.28 or 28%)
  baselineScore?: number;
  // Current rolling 10-minute average fraud score
  currentRollingScore?: number;
  onEnforceAutonomousDefense?: () => void;
}

export const CriticalRollingAlertsPanel: React.FC<RollingAnomalyAlertPanelProps> = ({
  baselineScore = 0.28,
  currentRollingScore: initialScore = 0.42,
  onEnforceAutonomousDefense
}) => {
  // Interactive test controls for demonstration & live monitoring
  const [rollingAvg, setRollingAvg] = useState<number>(initialScore);
  const [baseline, setBaseline] = useState<number>(baselineScore);
  const [isAutonomousDefenseActive, setIsAutonomousDefenseActive] = useState<boolean>(false);
  const [isFlashingMuted, setIsFlashingMuted] = useState<boolean>(false);
  const [lastIncidentTimestamp, setLastIncidentTimestamp] = useState<string>('Just now');
  const [activeRemediation, setActiveRemediation] = useState<'IDLE' | 'QUARANTINE_SUBNET' | 'ENFORCE_3DS_CHALLENGE' | 'RATE_LIMIT_VPA'>('IDLE');

  // Calculate percentage elevation above baseline
  // Elevation % = ((rollingAvg - baseline) / baseline) * 100
  const percentageElevation = ((rollingAvg - baseline) / baseline) * 100;
  const isTriggered = percentageElevation >= 25.0;

  // Auto-update timestamp when triggered
  useEffect(() => {
    if (isTriggered) {
      const now = new Date();
      setLastIncidentTimestamp(
        `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      );
    }
  }, [isTriggered]);

  const handleApplyRemediation = (action: 'QUARANTINE_SUBNET' | 'ENFORCE_3DS_CHALLENGE' | 'RATE_LIMIT_VPA') => {
    setActiveRemediation(action);
    setIsAutonomousDefenseActive(true);
    if (onEnforceAutonomousDefense) {
      onEnforceAutonomousDefense();
    }
  };

  return (
    <div className={`rounded-xl border transition-all duration-500 overflow-hidden shadow-sm ${
      isTriggered
        ? isFlashingMuted
          ? 'bg-rose-950/95 border-rose-600 ring-2 ring-rose-500/50'
          : 'bg-rose-950/95 border-rose-500 ring-4 ring-rose-500/80 animate-pulse'
        : 'bg-slate-900 border-slate-800'
    }`}>
      {/* Top Warning Banner if Triggered */}
      {isTriggered && (
        <div className="bg-rose-600 text-white px-4 py-1.5 flex items-center justify-between text-xs font-mono font-bold tracking-wider">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300"></span>
            </span>
            <span className="uppercase">CRITICAL THRESHOLD BREACH: ROLLING 10-MIN RISK ELEVATION &gt; 25%</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span>+{percentageElevation.toFixed(1)}% ABOVE BASELINE</span>
            <button
              onClick={() => setIsFlashingMuted(!isFlashingMuted)}
              className="px-2 py-0.5 rounded bg-rose-700 hover:bg-rose-800 text-[10px] uppercase transition border border-rose-500"
            >
              {isFlashingMuted ? 'Resume Flash' : 'Mute Pulse'}
            </button>
          </div>
        </div>
      )}

      {/* Main Panel Content */}
      <div className="p-5 sm:p-6 text-white space-y-5">
        
        {/* Header with KPI and State Indicator */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
              {isTriggered ? (
                <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
              ) : (
                <Activity className="w-4 h-4 text-emerald-400" />
              )}
              <span>Rolling Anomaly & Velocity Radar</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Rolling 10-Min Fraud Elevation Monitor</span>
              {isTriggered ? (
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-rose-500/30 text-rose-300 border border-rose-500/60 font-bold">
                  SURGE ACTIVE
                </span>
              ) : (
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  NOMINAL
                </span>
              )}
            </h3>
            
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
              Continuously computes the rolling 10-minute exponential moving average (EMA) against the 30-day baseline model score. Triggers instantaneous security orchestration when elevation exceeds +25.0%.
            </p>
          </div>

          {/* Quick Stats Block */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-right min-w-[130px]">
              <div className="text-[10px] font-mono text-slate-400 uppercase">30-Day Baseline</div>
              <div className="text-lg font-mono font-bold text-slate-200">
                {(baseline * 100).toFixed(1)}%
              </div>
              <div className="text-[9px] text-slate-500 font-mono">0.{Math.round(baseline * 1000)} P(Fraud)</div>
            </div>

            <div className={`p-3 rounded-lg border text-right min-w-[140px] ${
              isTriggered 
                ? 'bg-rose-950/80 border-rose-500/80 text-rose-100' 
                : 'bg-slate-950/80 border-slate-800 text-slate-200'
            }`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">Rolling 10m EMA</div>
              <div className={`text-xl font-mono font-bold flex items-center justify-end gap-1 ${
                isTriggered ? 'text-rose-400' : 'text-emerald-400'
              }`}>
                {isTriggered && <ArrowUpRight className="w-4 h-4 text-rose-400 animate-pulse" />}
                {(rollingAvg * 100).toFixed(1)}%
              </div>
              <div className={`text-[10px] font-mono font-bold ${
                isTriggered ? 'text-rose-300' : 'text-emerald-400'
              }`}>
                {percentageElevation >= 0 ? `+${percentageElevation.toFixed(1)}%` : `${percentageElevation.toFixed(1)}%`} shift
              </div>
            </div>
          </div>
        </div>

        {/* Visual Threshold Bar & Elevation Delta */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Anomaly Delta Spectrum</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Alert Trigger Limit:</span>
              <span className="text-amber-400 font-bold">Baseline + 25.0% ({(baseline * 1.25 * 100).toFixed(1)}%)</span>
            </div>
          </div>

          {/* Progress / Gauge Line */}
          <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden">
            {/* Safe baseline area */}
            <div 
              style={{ width: `${Math.min(100, baseline * 100 * 1.5)}%` }} 
              className="absolute left-0 top-0 bottom-0 bg-emerald-600/50"
            />
            
            {/* Warning band (between baseline and +25%) */}
            <div 
              style={{ 
                left: `${baseline * 100 * 1.5}%`,
                width: `${(baseline * 0.25) * 100 * 1.5}%` 
              }} 
              className="absolute top-0 bottom-0 bg-amber-500/50"
            />

            {/* Critical band */}
            <div 
              style={{ 
                left: `${(baseline * 1.25) * 100 * 1.5}%`,
                right: 0
              }} 
              className="absolute top-0 bottom-0 bg-rose-600/40"
            />

            {/* Live Indicator Needle */}
            <div 
              style={{ left: `${Math.min(98, Math.max(2, rollingAvg * 100 * 1.5))}%` }}
              className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_12px_#fff] -translate-x-1/2 transition-all duration-300"
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-0.5">
            <span>0% Nominal</span>
            <span className="text-emerald-400">Baseline ({(baseline * 100).toFixed(1)}%)</span>
            <span className="text-amber-400">Trigger Threshold ({(baseline * 1.25 * 100).toFixed(1)}%)</span>
            <span className="text-rose-400">Severe Bot Surge (50%+)</span>
          </div>
        </div>

        {/* Live Attack Diagnostic & Auto-Mitigation Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          
          {/* Box 1: Attack Telemetry Analysis */}
          <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-[11px] font-mono font-bold uppercase text-indigo-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Attack Telemetry Diagnostic</span>
            </div>
            
            <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Status:</span>
                <span className={`font-bold ${isTriggered ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {isTriggered ? 'CRITICAL_SPIKE' : 'STABLE_INGESTION'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Detected Vector:</span>
                <span className="font-bold text-amber-300">
                  {isTriggered ? 'Distributed Botnet / BIN Exhaustion' : 'Organic Consumer Traffic'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Last Incident:</span>
                <span className="font-bold text-slate-200">{lastIncidentTimestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Rails:</span>
                <span className="font-bold text-indigo-300">UPI Collect &amp; Tokenized Cards</span>
              </div>
            </div>
          </div>

          {/* Box 2: Automated Sentinel Responses */}
          <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="text-[11px] font-mono font-bold uppercase text-indigo-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>Autonomous Defense Actions</span>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleApplyRemediation('ENFORCE_3DS_CHALLENGE')}
                className={`w-full p-2 rounded-lg text-left font-mono text-[11px] transition flex items-center justify-between border ${
                  activeRemediation === 'ENFORCE_3DS_CHALLENGE'
                    ? 'bg-rose-900/60 border-rose-500 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Enforce Global 3DS 2.2</span>
                </div>
                {activeRemediation === 'ENFORCE_3DS_CHALLENGE' && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>

              <button
                onClick={() => handleApplyRemediation('QUARANTINE_SUBNET')}
                className={`w-full p-2 rounded-lg text-left font-mono text-[11px] transition flex items-center justify-between border ${
                  activeRemediation === 'QUARANTINE_SUBNET'
                    ? 'bg-rose-900/60 border-rose-500 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <ShieldAlert className="w-3 h-3 text-rose-400" />
                  <span>Quarantine Host ASN / Subnet</span>
                </div>
                {activeRemediation === 'QUARANTINE_SUBNET' && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>
            </div>
          </div>

          {/* Box 3: Live Simulator Slider (for testing threshold breach) */}
          <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="text-[11px] font-mono font-bold uppercase text-indigo-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                <span>Simulate 10m Average</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {(rollingAvg * 100).toFixed(0)}% Score
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <input
                type="range"
                min="0.15"
                max="0.85"
                step="0.01"
                value={rollingAvg}
                onChange={(e) => setRollingAvg(parseFloat(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setRollingAvg(0.24)}
                  className="flex-1 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-mono text-emerald-400"
                >
                  Set Normal (24%)
                </button>
                <button
                  onClick={() => setRollingAvg(0.48)}
                  className="flex-1 py-1 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-[10px] font-mono text-rose-300 font-bold"
                >
                  Trigger Breach (48%)
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
