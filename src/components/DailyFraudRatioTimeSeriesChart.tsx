import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import {
  TrendingUp,
  AlertTriangle,
  Activity,
  ShieldAlert,
  Calendar,
  Layers,
  Zap,
  Info,
  Flame,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export interface DailyAttackRatioPoint {
  date: string;
  displayDate: string;
  totalVolume: number; // e.g. 142000 txs
  flaggedFraudAttempts: number; // e.g. 4800 txs
  fraudRatioPercent: number; // e.g. 3.38%
  prevDayRatioPercent: number;
  attackVector: string;
  severity: 'NORMAL' | 'ELEVATED' | 'SPIKE' | 'CRITICAL';
  notes?: string;
}

export const DAILY_RATIO_DATA_30D: DailyAttackRatioPoint[] = [
  { date: '2026-08-04', displayDate: 'Aug 04', totalVolume: 124500, flaggedFraudAttempts: 1420, fraudRatioPercent: 1.14, prevDayRatioPercent: 1.10, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-08-05', displayDate: 'Aug 05', totalVolume: 128200, flaggedFraudAttempts: 1540, fraudRatioPercent: 1.20, prevDayRatioPercent: 1.14, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-08-06', displayDate: 'Aug 06', totalVolume: 131000, flaggedFraudAttempts: 1610, fraudRatioPercent: 1.23, prevDayRatioPercent: 1.20, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-08-07', displayDate: 'Aug 07', totalVolume: 145000, flaggedFraudAttempts: 2100, fraudRatioPercent: 1.45, prevDayRatioPercent: 1.23, attackVector: 'Weekend E-Com Surge', severity: 'NORMAL' },
  { date: '2026-08-08', displayDate: 'Aug 08', totalVolume: 158000, flaggedFraudAttempts: 2850, fraudRatioPercent: 1.80, prevDayRatioPercent: 1.45, attackVector: 'Micro-velocity Testing', severity: 'NORMAL' },
  { date: '2026-08-09', displayDate: 'Aug 09', totalVolume: 149000, flaggedFraudAttempts: 2320, fraudRatioPercent: 1.56, prevDayRatioPercent: 1.80, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-08-10', displayDate: 'Aug 10', totalVolume: 138000, flaggedFraudAttempts: 1680, fraudRatioPercent: 1.22, prevDayRatioPercent: 1.56, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-08-11', displayDate: 'Aug 11', totalVolume: 141500, flaggedFraudAttempts: 1840, fraudRatioPercent: 1.30, prevDayRatioPercent: 1.22, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-08-12', displayDate: 'Aug 12', totalVolume: 162000, flaggedFraudAttempts: 5900, fraudRatioPercent: 3.64, prevDayRatioPercent: 1.30, attackVector: 'Flash Sale Bot Farm Probe', severity: 'SPIKE', notes: 'Puppeteer cluster targeting electronics merchant' },
  { date: '2026-08-13', displayDate: 'Aug 13', totalVolume: 174000, flaggedFraudAttempts: 8850, fraudRatioPercent: 5.09, prevDayRatioPercent: 3.64, attackVector: 'Carding BIN Exhaustion Wave', severity: 'CRITICAL', notes: 'Attack intensity peaked at 5.09% of all checkout traffic' },
  { date: '2026-08-14', displayDate: 'Aug 14', totalVolume: 168000, flaggedFraudAttempts: 6100, fraudRatioPercent: 3.63, prevDayRatioPercent: 5.09, attackVector: 'Proxy Rotator Fallback', severity: 'ELEVATED', notes: 'Mitigated by dynamic WAF rate limiting & WebAuthn step-up' },
  { date: '2026-08-15', displayDate: 'Aug 15', totalVolume: 185000, flaggedFraudAttempts: 3200, fraudRatioPercent: 1.73, prevDayRatioPercent: 3.63, attackVector: 'Independence Day E-Com Surge', severity: 'NORMAL' },
  { date: '2026-08-16', displayDate: 'Aug 16', totalVolume: 172000, flaggedFraudAttempts: 2580, fraudRatioPercent: 1.50, prevDayRatioPercent: 1.73, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-08-17', displayDate: 'Aug 17', totalVolume: 144000, flaggedFraudAttempts: 1870, fraudRatioPercent: 1.30, prevDayRatioPercent: 1.50, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-08-18', displayDate: 'Aug 18', totalVolume: 148000, flaggedFraudAttempts: 1950, fraudRatioPercent: 1.32, prevDayRatioPercent: 1.30, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-08-19', displayDate: 'Aug 19', totalVolume: 152000, flaggedFraudAttempts: 2280, fraudRatioPercent: 1.50, prevDayRatioPercent: 1.32, attackVector: 'Low-profile UPI probing', severity: 'NORMAL' },
  { date: '2026-08-20', displayDate: 'Aug 20', totalVolume: 156000, flaggedFraudAttempts: 2800, fraudRatioPercent: 1.79, prevDayRatioPercent: 1.50, attackVector: 'Distributed Android Emulator Ring', severity: 'ELEVATED' },
  { date: '2026-08-21', displayDate: 'Aug 21', totalVolume: 169000, flaggedFraudAttempts: 6420, fraudRatioPercent: 3.80, prevDayRatioPercent: 1.79, attackVector: 'Spoofed UPI Phishing Surge', severity: 'SPIKE', notes: 'QR-code social engineering collect-requests' },
  { date: '2026-08-22', displayDate: 'Aug 22', totalVolume: 178000, flaggedFraudAttempts: 7950, fraudRatioPercent: 4.47, prevDayRatioPercent: 3.80, attackVector: 'UPI Collect Impersonation', severity: 'CRITICAL', notes: 'Halted by Razorpay VPA Entropy Engine' },
  { date: '2026-08-23', displayDate: 'Aug 23', totalVolume: 165000, flaggedFraudAttempts: 4120, fraudRatioPercent: 2.50, prevDayRatioPercent: 4.47, attackVector: 'Residual Phishing Tail', severity: 'ELEVATED' },
  { date: '2026-08-24', displayDate: 'Aug 24', totalVolume: 151000, flaggedFraudAttempts: 2110, fraudRatioPercent: 1.40, prevDayRatioPercent: 2.50, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-08-25', displayDate: 'Aug 25', totalVolume: 154000, flaggedFraudAttempts: 1980, fraudRatioPercent: 1.29, prevDayRatioPercent: 1.40, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-08-26', displayDate: 'Aug 26', totalVolume: 159000, flaggedFraudAttempts: 2200, fraudRatioPercent: 1.38, prevDayRatioPercent: 1.29, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-08-27', displayDate: 'Aug 27', totalVolume: 163000, flaggedFraudAttempts: 2450, fraudRatioPercent: 1.50, prevDayRatioPercent: 1.38, attackVector: 'Weekend Preparation', severity: 'NORMAL' },
  { date: '2026-08-28', displayDate: 'Aug 28', totalVolume: 181000, flaggedFraudAttempts: 4890, fraudRatioPercent: 2.70, prevDayRatioPercent: 1.50, attackVector: 'Festive Promo Voucher Abuse', severity: 'ELEVATED' },
  { date: '2026-08-29', displayDate: 'Aug 29', totalVolume: 196000, flaggedFraudAttempts: 8430, fraudRatioPercent: 4.30, prevDayRatioPercent: 2.70, attackVector: 'Scalper Bot Syndicate Attack', severity: 'CRITICAL', notes: 'Ticket booking & limited drop scalping assault' },
  { date: '2026-08-30', displayDate: 'Aug 30', totalVolume: 189000, flaggedFraudAttempts: 6200, fraudRatioPercent: 3.28, prevDayRatioPercent: 4.30, attackVector: 'Credential Stuffing Sweep', severity: 'SPIKE' },
  { date: '2026-08-31', displayDate: 'Aug 31', totalVolume: 172000, flaggedFraudAttempts: 2750, fraudRatioPercent: 1.60, prevDayRatioPercent: 3.28, attackVector: 'Baseline Organic', severity: 'NORMAL' },
  { date: '2026-09-01', displayDate: 'Sep 01', totalVolume: 164000, flaggedFraudAttempts: 2130, fraudRatioPercent: 1.30, prevDayRatioPercent: 1.60, attackVector: 'Month-End Payday Settle', severity: 'NORMAL' },
  { date: '2026-09-02', displayDate: 'Sep 02', totalVolume: 168500, flaggedFraudAttempts: 2240, fraudRatioPercent: 1.33, prevDayRatioPercent: 1.30, attackVector: 'Current Operational Window', severity: 'NORMAL' }
];

export const DailyFraudRatioTimeSeriesChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'14d' | '30d'>('30d');
  const [activeSeries, setActiveSeries] = useState<'both' | 'ratioOnly' | 'volumeOnly'>('both');
  const [highlightSpikes, setHighlightSpikes] = useState<boolean>(true);

  const displayData = timeRange === '14d' 
    ? DAILY_RATIO_DATA_30D.slice(-14) 
    : DAILY_RATIO_DATA_30D;

  // Calculated Aggregate Stats
  const totalPeriodVolume = displayData.reduce((acc, d) => acc + d.totalVolume, 0);
  const totalPeriodFlagged = displayData.reduce((acc, d) => acc + d.flaggedFraudAttempts, 0);
  const avgAttackRatio = ((totalPeriodFlagged / totalPeriodVolume) * 100).toFixed(2);
  const maxAttackPoint = displayData.reduce((max, d) => d.fraudRatioPercent > max.fraudRatioPercent ? d : max, displayData[0]);
  const criticalAttackDays = displayData.filter((d) => d.severity === 'CRITICAL' || d.severity === 'SPIKE').length;

  const CustomTimeSeriesTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data: DailyAttackRatioPoint = payload[0].payload;
      const ratioDiff = (data.fraudRatioPercent - data.prevDayRatioPercent).toFixed(2);
      const isRatioUp = parseFloat(ratioDiff) > 0;

      return (
        <div className="bg-slate-900 border border-slate-700 text-white p-4 rounded-xl shadow-2xl text-xs max-w-xs space-y-2.5 z-50">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>{data.displayDate} ({data.date})</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              data.severity === 'CRITICAL'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : data.severity === 'SPIKE'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}>
              {data.severity}
            </span>
          </div>

          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Daily Fraud Ratio:</span>
              <span className={`text-sm font-bold ${data.fraudRatioPercent >= 3.0 ? 'text-rose-400' : 'text-amber-400'}`}>
                {data.fraudRatioPercent}%
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span>Day-over-Day Shift:</span>
              <span className={`font-bold flex items-center gap-0.5 ${isRatioUp ? 'text-rose-400' : 'text-emerald-400'}`}>
                {isRatioUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {isRatioUp ? `+${ratioDiff}%` : `${ratioDiff}%`}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-slate-800 pt-1.5">
              <span className="text-slate-400">Flagged Attempts:</span>
              <span className="font-bold text-rose-300">{data.flaggedFraudAttempts.toLocaleString()} txs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Ingestion Volume:</span>
              <span className="font-bold text-slate-200">{data.totalVolume.toLocaleString()} txs</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 space-y-1 font-sans">
            <div className="flex items-center gap-1 text-indigo-300 font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Attack: {data.attackVector}</span>
            </div>
            {data.notes && (
              <p className="text-[10px] text-slate-400 leading-tight italic">
                {data.notes}
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm space-y-6">
      
      {/* Header with Title and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4 text-indigo-600" />
            <span>Time-Series Temporal Risk Analysis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Attack Intensity Ratio vs. Ingestion Volume
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-3xl">
            Tracking the daily proportion of blocked fraud attempts relative to gross checkout volume to isolate synchronized botnet campaigns and holiday attack spikes.
          </p>
        </div>

        {/* Action Bar / Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Time Range Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-mono">
            <button
              onClick={() => setTimeRange('14d')}
              className={`px-3 py-1.5 rounded-md font-bold transition ${
                timeRange === '14d'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 14 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-md font-bold transition ${
                timeRange === '30d'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 30 Days
            </button>
          </div>

          {/* Series Display Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setActiveSeries('both')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition ${
                activeSeries === 'both' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
              }`}
            >
              All Signals
            </button>
            <button
              onClick={() => setActiveSeries('ratioOnly')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition ${
                activeSeries === 'ratioOnly' ? 'bg-white text-rose-700 shadow-sm font-bold' : 'text-slate-600'
              }`}
            >
              Ratio Only (%)
            </button>
            <button
              onClick={() => setActiveSeries('volumeOnly')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition ${
                activeSeries === 'volumeOnly' ? 'bg-white text-indigo-700 shadow-sm font-bold' : 'text-slate-600'
              }`}
            >
              Volume Counts
            </button>
          </div>

          {/* Highlight Spikes Toggle */}
          <button
            onClick={() => setHighlightSpikes(!highlightSpikes)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition flex items-center gap-1.5 ${
              highlightSpikes
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>{highlightSpikes ? 'Attack Spikes ON' : 'Attack Spikes OFF'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold flex items-center gap-1">
            <Activity className="w-3 h-3 text-indigo-600" />
            <span>Avg Period Attack Ratio</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{avgAttackRatio}%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Baseline: ~1.25% of total txs</div>
        </div>

        <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl">
          <div className="text-[10px] font-mono uppercase text-rose-700 font-bold flex items-center gap-1">
            <Flame className="w-3 h-3 text-rose-600" />
            <span>Peak Attack Intensity</span>
          </div>
          <div className="text-2xl font-bold font-mono text-rose-900 mt-1">{maxAttackPoint.fraudRatioPercent}%</div>
          <div className="text-[11px] text-rose-600 mt-0.5 font-medium">
            {maxAttackPoint.displayDate} ({maxAttackPoint.attackVector.split(' ')[0]} {maxAttackPoint.attackVector.split(' ')[1] || ''})
          </div>
        </div>

        <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl">
          <div className="text-[10px] font-mono uppercase text-indigo-700 font-bold flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-indigo-600" />
            <span>Total Fraud Attempts Intercepted</span>
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-950 mt-1">{totalPeriodFlagged.toLocaleString()}</div>
          <div className="text-[11px] text-indigo-600 mt-0.5">Across {totalPeriodVolume.toLocaleString()} total txs</div>
        </div>

        <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl">
          <div className="text-[10px] font-mono uppercase text-amber-800 font-bold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            <span>Critical Attack Waves</span>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-950 mt-1">{criticalAttackDays} Days</div>
          <div className="text-[11px] text-amber-700 mt-0.5">Surpassing 3.0% threshold</div>
        </div>
      </div>

      {/* Main Dual-Axis Line Chart */}
      <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-bold text-rose-600">
              <span className="w-3 h-0.5 bg-rose-500 inline-block rounded"></span>
              <span>Fraud Ratio % (Right Axis)</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-indigo-600">
              <span className="w-3 h-0.5 bg-indigo-600 inline-block rounded"></span>
              <span>Total Volume (k) (Left Axis)</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-amber-600">
              <span className="w-3 h-0.5 bg-amber-500 inline-block rounded"></span>
              <span>Flagged Attempts (Left Axis)</span>
            </div>
          </div>
          <div className="text-slate-500 text-[11px] font-mono">
            Critical Threshold: <span className="text-rose-600 font-bold">&gt; 3.00% Ratio</span>
          </div>
        </div>

        {/* Recharts Line Container */}
        <div className="h-[340px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={displayData}
              margin={{ top: 15, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              
              <XAxis
                dataKey="displayDate"
                tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'monospace' }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickMargin={8}
              />
              
              {/* Left Y-Axis for Gross Volume */}
              {(activeSeries === 'both' || activeSeries === 'volumeOnly') && (
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11, fill: '#4f46e5', fontFamily: 'monospace' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                />
              )}

              {/* Right Y-Axis for Fraud Ratio % */}
              {(activeSeries === 'both' || activeSeries === 'ratioOnly') && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 6]}
                  tick={{ fontSize: 11, fill: '#e11d48', fontFamily: 'monospace' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  unit="%"
                />
              )}

              <Tooltip content={<CustomTimeSeriesTooltip />} />

              {/* Threshold Danger Line at 3.0% */}
              {(activeSeries === 'both' || activeSeries === 'ratioOnly') && (
                <ReferenceLine
                  yAxisId="right"
                  y={3.0}
                  stroke="#f43f5e"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: 'Elevated Attack Threshold (3.0%)',
                    fill: '#e11d48',
                    fontSize: 10,
                    fontFamily: 'monospace',
                    position: 'insideTopRight'
                  }}
                />
              )}

              {/* Line 1: Total Volume */}
              {(activeSeries === 'both' || activeSeries === 'volumeOnly') && (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="totalVolume"
                  name="Total Volume"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={{ r: 2.5, fill: '#4f46e5' }}
                  activeDot={{ r: 6, fill: '#312e81' }}
                />
              )}

              {/* Line 2: Flagged Fraud Volume */}
              {(activeSeries === 'both' || activeSeries === 'volumeOnly') && (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="flaggedFraudAttempts"
                  name="Flagged Fraud Volume"
                  stroke="#f59e0b"
                  strokeWidth={1.75}
                  strokeDasharray="4 2"
                  dot={{ r: 2, fill: '#f59e0b' }}
                />
              )}

              {/* Line 3: Fraud Ratio (%) */}
              {(activeSeries === 'both' || activeSeries === 'ratioOnly') && (
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="fraudRatioPercent"
                  name="Fraud Ratio %"
                  stroke="#e11d48"
                  strokeWidth={3}
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    const isHigh = payload.fraudRatioPercent >= 3.0;
                    return (
                      <circle
                        key={`dot-${payload.date}`}
                        cx={cx}
                        cy={cy}
                        r={isHigh ? 5 : 3}
                        fill={isHigh ? '#be123c' : '#fb7185'}
                        stroke="#ffffff"
                        strokeWidth={1.5}
                      />
                    );
                  }}
                  activeDot={{ r: 7, fill: '#881337', stroke: '#ffffff', strokeWidth: 2 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Attack Wave Markers Legend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs">
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-50/80 border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-600 mt-1 flex-shrink-0"></span>
            <div>
              <div className="font-bold text-rose-950 font-mono text-[11px]">Wave 1: Aug 12–14 (5.09% Peak)</div>
              <div className="text-slate-600 text-[10px] mt-0.5">Puppeteer BIN Exhaustion Botnet during Flash Sale</div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-600 mt-1 flex-shrink-0"></span>
            <div>
              <div className="font-bold text-amber-950 font-mono text-[11px]">Wave 2: Aug 21–23 (4.47% Peak)</div>
              <div className="text-slate-600 text-[10px] mt-0.5">Distributed QR/VPA Collect Phishing Surge</div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-50/80 border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-600 mt-1 flex-shrink-0"></span>
            <div>
              <div className="font-bold text-rose-950 font-mono text-[11px]">Wave 3: Aug 28–30 (4.30% Peak)</div>
              <div className="text-slate-600 text-[10px] mt-0.5">Festive Scalper Syndicate & Credential Stuffing</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
