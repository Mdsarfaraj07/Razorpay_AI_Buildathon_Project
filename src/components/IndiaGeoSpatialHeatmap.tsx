import React, { useState } from 'react';
import { 
  MapPin, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  Layers, 
  Flame, 
  Info, 
  ChevronRight, 
  Zap, 
  Search,
  Filter,
  BarChart2
} from 'lucide-react';

export interface StateFraudMetric {
  stateCode: string;
  stateName: string;
  totalVolumeINR: number; // in Cr (₹ Crores)
  txCount: number;
  highRiskTxCount: number;
  fraudRatePercent: number; // e.g. 4.8%
  primaryAttackVector: string;
  hotspotCities: string[];
  riskTier: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  avgRiskScore: number; // 0 - 1.0
  proxyVpnPercentage: number;
  coordinates: { x: number; y: number }; // SVG proportional position % [0-100]
}

export const INDIAN_STATES_FRAUD_DATA: StateFraudMetric[] = [
  {
    stateCode: 'DL',
    stateName: 'Delhi NCR',
    totalVolumeINR: 980.5,
    txCount: 420000,
    highRiskTxCount: 20160,
    fraudRatePercent: 4.80,
    primaryAttackVector: 'Carding Botnets & Fast Delivery Scalping',
    hotspotCities: ['New Delhi', 'Noida', 'Gurugram', 'Faridabad'],
    riskTier: 'CRITICAL',
    avgRiskScore: 0.84,
    proxyVpnPercentage: 42.5,
    coordinates: { x: 38, y: 28 }
  },
  {
    stateCode: 'MH',
    stateName: 'Maharashtra',
    totalVolumeINR: 1450.0,
    txCount: 680000,
    highRiskTxCount: 28560,
    fraudRatePercent: 4.20,
    primaryAttackVector: 'UPI Collect Phishing & Corporate Refund Fraud',
    hotspotCities: ['Mumbai', 'Pune', 'Nagpur', 'Thane'],
    riskTier: 'CRITICAL',
    avgRiskScore: 0.79,
    proxyVpnPercentage: 38.0,
    coordinates: { x: 36, y: 55 }
  },
  {
    stateCode: 'KA',
    stateName: 'Karnataka',
    totalVolumeINR: 1120.0,
    txCount: 540000,
    highRiskTxCount: 18900,
    fraudRatePercent: 3.50,
    primaryAttackVector: 'Emulator Farms & Promo Code Scalping',
    hotspotCities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi'],
    riskTier: 'HIGH',
    avgRiskScore: 0.72,
    proxyVpnPercentage: 31.4,
    coordinates: { x: 40, y: 72 }
  },
  {
    stateCode: 'WB',
    stateName: 'West Bengal',
    totalVolumeINR: 520.0,
    txCount: 240000,
    highRiskTxCount: 11760,
    fraudRatePercent: 4.90,
    primaryAttackVector: 'Mule Accounts & Phishing Call Center Collects',
    hotspotCities: ['Kolkata', 'Siliguri', 'Howrah', 'Durgapur'],
    riskTier: 'CRITICAL',
    avgRiskScore: 0.86,
    proxyVpnPercentage: 46.2,
    coordinates: { x: 74, y: 46 }
  },
  {
    stateCode: 'UP',
    stateName: 'Uttar Pradesh',
    totalVolumeINR: 760.0,
    txCount: 390000,
    highRiskTxCount: 16770,
    fraudRatePercent: 4.30,
    primaryAttackVector: 'Fake Merchant QR Schemes & APK Hijacking',
    hotspotCities: ['Lucknow', 'Kanpur', 'Noida', 'Varanasi', 'Agra'],
    riskTier: 'CRITICAL',
    avgRiskScore: 0.81,
    proxyVpnPercentage: 39.8,
    coordinates: { x: 52, y: 34 }
  },
  {
    stateCode: 'TN',
    stateName: 'Tamil Nadu',
    totalVolumeINR: 890.0,
    txCount: 450000,
    highRiskTxCount: 9450,
    fraudRatePercent: 2.10,
    primaryAttackVector: 'Micro-velocity BIN Testing',
    hotspotCities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli'],
    riskTier: 'MODERATE',
    avgRiskScore: 0.54,
    proxyVpnPercentage: 18.2,
    coordinates: { x: 44, y: 84 }
  },
  {
    stateCode: 'TG',
    stateName: 'Telangana',
    totalVolumeINR: 710.0,
    txCount: 360000,
    highRiskTxCount: 10800,
    fraudRatePercent: 3.00,
    primaryAttackVector: 'Gaming Voucher & Wallet Draining',
    hotspotCities: ['Hyderabad', 'Warangal', 'Nizamabad'],
    riskTier: 'HIGH',
    avgRiskScore: 0.68,
    proxyVpnPercentage: 26.5,
    coordinates: { x: 46, y: 62 }
  },
  {
    stateCode: 'GJ',
    stateName: 'Gujarat',
    totalVolumeINR: 840.0,
    txCount: 410000,
    highRiskTxCount: 11480,
    fraudRatePercent: 2.80,
    primaryAttackVector: 'Return Wardrobing & Commercial Chargebacks',
    hotspotCities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    riskTier: 'MODERATE',
    avgRiskScore: 0.61,
    proxyVpnPercentage: 22.0,
    coordinates: { x: 26, y: 44 }
  },
  {
    stateCode: 'RJ',
    stateName: 'Rajasthan',
    totalVolumeINR: 480.0,
    txCount: 230000,
    highRiskTxCount: 8740,
    fraudRatePercent: 3.80,
    primaryAttackVector: 'OTP Interception & Social Engineering Collects',
    hotspotCities: ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Bharatpur'],
    riskTier: 'HIGH',
    avgRiskScore: 0.74,
    proxyVpnPercentage: 34.0,
    coordinates: { x: 30, y: 35 }
  },
  {
    stateCode: 'HR',
    stateName: 'Haryana',
    totalVolumeINR: 590.0,
    txCount: 280000,
    highRiskTxCount: 12880,
    fraudRatePercent: 4.60,
    primaryAttackVector: 'Mewat Cyber Syndicate & KYC Bypass',
    hotspotCities: ['Gurugram', 'Faridabad', 'Nuh', 'Panipat'],
    riskTier: 'CRITICAL',
    avgRiskScore: 0.85,
    proxyVpnPercentage: 44.1,
    coordinates: { x: 36, y: 29 }
  },
  {
    stateCode: 'KL',
    stateName: 'Kerala',
    totalVolumeINR: 410.0,
    txCount: 210000,
    highRiskTxCount: 2940,
    fraudRatePercent: 1.40,
    primaryAttackVector: 'International Carding Spillover',
    hotspotCities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
    riskTier: 'LOW',
    avgRiskScore: 0.38,
    proxyVpnPercentage: 11.5,
    coordinates: { x: 39, y: 89 }
  },
  {
    stateCode: 'AP',
    stateName: 'Andhra Pradesh',
    totalVolumeINR: 450.0,
    txCount: 220000,
    highRiskTxCount: 5280,
    fraudRatePercent: 2.40,
    primaryAttackVector: 'Loan App Recovery Spoofing',
    hotspotCities: ['Visakhapatnam', 'Vijayawada', 'Guntur'],
    riskTier: 'MODERATE',
    avgRiskScore: 0.58,
    proxyVpnPercentage: 19.8,
    coordinates: { x: 50, y: 68 }
  },
  {
    stateCode: 'PB',
    stateName: 'Punjab',
    totalVolumeINR: 380.0,
    txCount: 190000,
    highRiskTxCount: 5700,
    fraudRatePercent: 3.00,
    primaryAttackVector: 'Immigration Consultancy Wire Fraud',
    hotspotCities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Mohali'],
    riskTier: 'HIGH',
    avgRiskScore: 0.69,
    proxyVpnPercentage: 27.2,
    coordinates: { x: 34, y: 22 }
  },
  {
    stateCode: 'JH',
    stateName: 'Jharkhand',
    totalVolumeINR: 240.0,
    txCount: 130000,
    highRiskTxCount: 6630,
    fraudRatePercent: 5.10,
    primaryAttackVector: 'Jamtara Style Phishing Hubs & SIM Swap',
    hotspotCities: ['Ranchi', 'Jamshedpur', 'Jamtara', 'Dhanbad'],
    riskTier: 'CRITICAL',
    avgRiskScore: 0.89,
    proxyVpnPercentage: 48.5,
    coordinates: { x: 67, y: 45 }
  },
  {
    stateCode: 'BR',
    stateName: 'Bihar',
    totalVolumeINR: 390.0,
    txCount: 210000,
    highRiskTxCount: 8820,
    fraudRatePercent: 4.20,
    primaryAttackVector: 'AePS Biometric Spoofing & Fake Remittances',
    hotspotCities: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur'],
    riskTier: 'CRITICAL',
    avgRiskScore: 0.82,
    proxyVpnPercentage: 37.0,
    coordinates: { x: 65, y: 38 }
  },
  {
    stateCode: 'MP',
    stateName: 'Madhya Pradesh',
    totalVolumeINR: 420.0,
    txCount: 220000,
    highRiskTxCount: 6160,
    fraudRatePercent: 2.80,
    primaryAttackVector: 'Secondary Identity Laundering',
    hotspotCities: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior'],
    riskTier: 'MODERATE',
    avgRiskScore: 0.62,
    proxyVpnPercentage: 23.4,
    coordinates: { x: 45, y: 46 }
  },
  {
    stateCode: 'OD',
    stateName: 'Odisha',
    totalVolumeINR: 310.0,
    txCount: 160000,
    highRiskTxCount: 3680,
    fraudRatePercent: 2.30,
    primaryAttackVector: 'Utility Bill Phishing Schemes',
    hotspotCities: ['Bhubaneswar', 'Cuttack', 'Rourkela'],
    riskTier: 'MODERATE',
    avgRiskScore: 0.52,
    proxyVpnPercentage: 17.5,
    coordinates: { x: 63, y: 56 }
  },
  {
    stateCode: 'AS',
    stateName: 'Assam & North East',
    totalVolumeINR: 260.0,
    txCount: 140000,
    highRiskTxCount: 3500,
    fraudRatePercent: 2.50,
    primaryAttackVector: 'Cross-Border Mule Network Probing',
    hotspotCities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Shillong'],
    riskTier: 'MODERATE',
    avgRiskScore: 0.57,
    proxyVpnPercentage: 21.0,
    coordinates: { x: 86, y: 34 }
  }
];

export const IndiaGeoSpatialHeatmap: React.FC = () => {
  const [selectedState, setSelectedState] = useState<StateFraudMetric>(INDIAN_STATES_FRAUD_DATA[0]);
  const [metricMode, setMetricMode] = useState<'fraudRate' | 'highRiskCount' | 'vpnPercent'>('fraudRate');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW'>('ALL');

  const filteredStates = INDIAN_STATES_FRAUD_DATA.filter((s) => {
    const matchesSearch = s.stateName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.hotspotCities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTier = filterTier === 'ALL' || s.riskTier === filterTier;
    return matchesSearch && matchesTier;
  });

  // Calculate Aggregates
  const totalHighRiskNational = INDIAN_STATES_FRAUD_DATA.reduce((acc, s) => acc + s.highRiskTxCount, 0);
  const totalVolumeNational = INDIAN_STATES_FRAUD_DATA.reduce((acc, s) => acc + s.totalVolumeINR, 0);
  const nationalAvgFraudRate = (
    INDIAN_STATES_FRAUD_DATA.reduce((acc, s) => acc + (s.fraudRatePercent * s.txCount), 0) /
    INDIAN_STATES_FRAUD_DATA.reduce((acc, s) => acc + s.txCount, 0)
  ).toFixed(2);

  const getIntensityColor = (metric: StateFraudMetric) => {
    if (metricMode === 'fraudRate') {
      if (metric.fraudRatePercent >= 4.5) return '#be123c'; // Rose-700
      if (metric.fraudRatePercent >= 3.5) return '#e11d48'; // Rose-600
      if (metric.fraudRatePercent >= 2.5) return '#f59e0b'; // Amber-500
      return '#10b981'; // Emerald-500
    } else if (metricMode === 'highRiskCount') {
      if (metric.highRiskTxCount >= 20000) return '#be123c';
      if (metric.highRiskTxCount >= 10000) return '#e11d48';
      if (metric.highRiskTxCount >= 5000) return '#f59e0b';
      return '#10b981';
    } else {
      if (metric.proxyVpnPercentage >= 40) return '#be123c';
      if (metric.proxyVpnPercentage >= 30) return '#e11d48';
      if (metric.proxyVpnPercentage >= 20) return '#f59e0b';
      return '#10b981';
    }
  };

  const getHeatmapBubbleRadius = (metric: StateFraudMetric) => {
    if (metricMode === 'fraudRate') {
      return Math.max(14, Math.min(32, metric.fraudRatePercent * 6));
    } else if (metricMode === 'highRiskCount') {
      return Math.max(14, Math.min(34, (metric.highRiskTxCount / 28560) * 32));
    } else {
      return Math.max(14, Math.min(32, (metric.proxyVpnPercentage / 50) * 30));
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span>Geo-Spatial Risk Density Matrix (India BFSI Rails)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            National Payment Fraud & Attack Density Heatmap
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-3xl">
            Real-time regional telemetry tracking botnet syndicates, phishing call-centers (Jamtara/Mewat vectors), and proxy VPN concentrations across all 28 states & union territories.
          </p>
        </div>

        {/* Mode Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-mono">
            <button
              onClick={() => setMetricMode('fraudRate')}
              className={`px-3 py-1.5 rounded-md font-bold transition ${
                metricMode === 'fraudRate' ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fraud Rate %
            </button>
            <button
              onClick={() => setMetricMode('highRiskCount')}
              className={`px-3 py-1.5 rounded-md font-bold transition ${
                metricMode === 'highRiskCount' ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              High-Risk Count
            </button>
            <button
              onClick={() => setMetricMode('vpnPercent')}
              className={`px-3 py-1.5 rounded-md font-bold transition ${
                metricMode === 'vpnPercent' ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Proxy/VPN %
            </button>
          </div>
        </div>
      </div>

      {/* Top Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold flex items-center gap-1">
            <Activity className="w-3 h-3 text-indigo-600" />
            <span>National Avg Fraud Rate</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{nationalAvgFraudRate}%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Weighted across all state nodes</div>
        </div>

        <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl">
          <div className="text-[10px] font-mono uppercase text-rose-700 font-bold flex items-center gap-1">
            <Flame className="w-3 h-3 text-rose-600" />
            <span>Highest Risk Region</span>
          </div>
          <div className="text-2xl font-bold font-mono text-rose-900 mt-1">Jharkhand (5.10%)</div>
          <div className="text-[11px] text-rose-600 mt-0.5">Jamtara Phishing & SIM Swap Ring</div>
        </div>

        <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl">
          <div className="text-[10px] font-mono uppercase text-indigo-700 font-bold flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-indigo-600" />
            <span>Flagged High-Risk Volume</span>
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-950 mt-1">{totalHighRiskNational.toLocaleString()} txs</div>
          <div className="text-[11px] text-indigo-600 mt-0.5">₹{totalVolumeNational.toLocaleString()} Cr Total Ingested</div>
        </div>

        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
          <div className="text-[10px] font-mono uppercase text-emerald-800 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Safest Transaction Rail</span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-950 mt-1">Kerala (1.40%)</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">&lt; 12% Proxy usage • High 3DS compliance</div>
        </div>
      </div>

      {/* Main Grid: Interactive India Map Visualizer & State Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Geo-Spatial Interactive Vector Map */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl p-5 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
          
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                India Spatial Grid • Live Gateway Nodes
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              Selected: <strong className="text-white">{selectedState.stateName}</strong>
            </span>
          </div>

          {/* Interactive SVG / Canvas Map Container */}
          <div className="relative w-full h-[460px] my-2 flex items-center justify-center">
            
            {/* Subtle Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

            {/* Simulated India Geographic Outline Contour */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none select-none" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              {/* Generalized India Peninsula Contour */}
              <path
                d="M 32,15 L 42,10 L 46,16 L 54,18 L 68,26 L 86,28 L 92,34 L 84,42 L 72,44 L 68,58 L 52,78 L 44,92 L 36,80 L 32,62 L 20,50 L 22,34 Z"
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="0.75"
                strokeDasharray="2 2"
                opacity="0.8"
              />
              
              {/* Interconnecting Attack Vector Telemetry Lines */}
              <line x1="38" y1="28" x2="67" y2="45" stroke="#f43f5e" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.6" />
              <line x1="36" y1="55" x2="40" y2="72" stroke="#6366f1" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.6" />
              <line x1="52" y1="34" x2="74" y2="46" stroke="#f59e0b" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.6" />
              <line x1="38" y1="28" x2="36" y2="29" stroke="#f43f5e" strokeWidth="0.6" opacity="0.7" />
            </svg>

            {/* Interactive State Bubbles */}
            {INDIAN_STATES_FRAUD_DATA.map((state) => {
              const isSelected = selectedState.stateCode === state.stateCode;
              const color = getIntensityColor(state);
              const radius = getHeatmapBubbleRadius(state);

              return (
                <div
                  key={state.stateCode}
                  onClick={() => setSelectedState(state)}
                  style={{
                    left: `${state.coordinates.x}%`,
                    top: `${state.coordinates.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="absolute cursor-pointer group z-20"
                >
                  {/* Outer Ripple for Critical States */}
                  {state.riskTier === 'CRITICAL' && (
                    <div
                      style={{
                        width: `${radius * 2.2}px`,
                        height: `${radius * 2.2}px`,
                        borderColor: color
                      }}
                      className="absolute -inset-1 rounded-full border opacity-50 animate-ping pointer-events-none"
                    />
                  )}

                  {/* Main Bubble Node */}
                  <div
                    style={{
                      width: `${radius * 1.5}px`,
                      height: `${radius * 1.5}px`,
                      backgroundColor: `${color}33`,
                      borderColor: color
                    }}
                    className={`rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-lg ${
                      isSelected 
                        ? 'ring-4 ring-white scale-125 z-30 bg-opacity-90' 
                        : 'group-hover:scale-115 group-hover:bg-opacity-60'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold text-white tracking-tighter">
                      {state.stateCode}
                    </span>
                  </div>

                  {/* Tooltip Hover Overlay */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 border border-slate-700 text-white text-[11px] p-2.5 rounded-lg shadow-2xl whitespace-nowrap z-50 pointer-events-none font-sans">
                    <div className="font-bold text-slate-100 flex items-center gap-1.5">
                      <span>{state.stateName}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                        state.riskTier === 'CRITICAL' ? 'bg-rose-500/30 text-rose-300' : 'bg-emerald-500/30 text-emerald-300'
                      }`}>
                        {state.fraudRatePercent}%
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      High-Risk: {state.highRiskTxCount.toLocaleString()} txs • Proxy: {state.proxyVpnPercentage}%
                    </div>
                    <div className="text-[9px] text-indigo-300 mt-0.5">
                      Hotspot: {state.hotspotCities.slice(0, 2).join(', ')}
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          {/* Map Bottom Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs z-10">
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                <span>Critical (&gt;4.0%)</span>
              </span>
              <span className="flex items-center gap-1.5 text-rose-300">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>High (3.0–4.0%)</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Moderate (2.0–3.0%)</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Low (&lt;2.0%)</span>
              </span>
            </div>
            <div className="text-slate-400 text-[10px] font-mono">
              Click any bubble to view forensics
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Deep State Risk Profiler & Searchable Ranking */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active State Profile Card */}
          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-4 shadow-sm">
            
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">{selectedState.stateName}</h3>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    selectedState.riskTier === 'CRITICAL'
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : selectedState.riskTier === 'HIGH'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}>
                    {selectedState.riskTier} RISK
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  State Node: <strong>{selectedState.stateCode}</strong> • ₹{selectedState.totalVolumeINR} Cr Ingested Volume
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold font-mono text-rose-400">
                  {selectedState.fraudRatePercent}%
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Fraud Ratio</div>
              </div>
            </div>

            {/* Key Regional Telemetry Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">High-Risk Attempts</div>
                <div className="text-sm font-bold text-rose-400 mt-0.5">
                  {selectedState.highRiskTxCount.toLocaleString()} txs
                </div>
                <div className="text-[9px] text-slate-500">of {selectedState.txCount.toLocaleString()} total</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Proxy/VPN Traffic</div>
                <div className="text-sm font-bold text-amber-400 mt-0.5">
                  {selectedState.proxyVpnPercentage}%
                </div>
                <div className="text-[9px] text-slate-500">Masked IP addresses</div>
              </div>
            </div>

            {/* Regional Attack Vector & Hotspot Clusters */}
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>Primary Attack Vector</span>
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {selectedState.primaryAttackVector}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>High-Density Hotspot Municipalities</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {selectedState.hotspotCities.map((city, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Searchable State Directory Table */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                State Rankings & Filters
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {filteredStates.length} Regions
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search state or city (e.g. Mumbai, Jamtara)..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* State List View */}
            <div className="max-h-[190px] overflow-y-auto space-y-1.5 pr-1">
              {filteredStates.map((st) => (
                <button
                  key={st.stateCode}
                  onClick={() => setSelectedState(st)}
                  className={`w-full p-2 rounded-lg text-left transition flex items-center justify-between border ${
                    selectedState.stateCode === st.stateCode
                      ? 'bg-indigo-50 border-indigo-300 shadow-sm'
                      : 'bg-white hover:bg-slate-100/80 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-800">{st.stateCode}</span>
                    <span className="text-xs font-medium text-slate-700">{st.stateName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono font-bold">
                    <span className={st.fraudRatePercent >= 4.0 ? 'text-rose-600' : st.fraudRatePercent >= 2.5 ? 'text-amber-600' : 'text-emerald-600'}>
                      {st.fraudRatePercent}%
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
