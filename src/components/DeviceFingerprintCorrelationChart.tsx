import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { 
  Fingerprint, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Bot, 
  Zap, 
  Sliders, 
  Layers, 
  Activity, 
  ArrowRight, 
  Info,
  Terminal,
  Cpu,
  Smartphone,
  Laptop,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Flame
} from 'lucide-react';
import { PaymentMethod } from '../types';

export interface DeviceFingerprintData {
  id: string;
  name: string;
  category: 'BOT_FARM' | 'SUSPICIOUS_PROXY' | 'EMULATOR_RING' | 'LEGITIMATE_HARDWARE';
  fingerprintHash: string;
  os: string;
  browser: string;
  fraudRate: number; // percentage, e.g. 98.4
  botFarmScore: number; // 0 - 100
  sampleCount: number;
  avgVelocity1m: number;
  avgWpm: number;
  isProxy: boolean;
  botPattern: string;
  keyHeuristics: string[];
  recommendedAction: 'HARD_BLOCK' | 'CHALLENGE_WEBAUTHN' | 'STEP_UP_3DS' | 'ALLOW_FAST_SETTLE';
  telemetryPreset: {
    amount: number;
    payment_method: PaymentMethod;
    ip_location: string;
    ip_country: string;
    is_proxy_or_vpn: boolean;
    checkout_fill_speed_wpm: number;
    velocity_1m: number;
    velocity_10m: number;
    session_duration_sec: number;
    user_account_age_days: number;
    previous_chargebacks: number;
  };
}

export const DEVICE_FINGERPRINT_DATASET: DeviceFingerprintData[] = [
  {
    id: 'fp-headless-puppeteer',
    name: 'Headless Chrome / Puppeteer Farm',
    category: 'BOT_FARM',
    fingerprintHash: 'fp_a9b1_puppeteer_v118',
    os: 'Linux x86_64 (Docker Container)',
    browser: 'HeadlessChrome / Selenium 4.16',
    fraudRate: 98.4,
    botFarmScore: 99.5,
    sampleCount: 42800,
    avgVelocity1m: 6.8,
    avgWpm: 540,
    isProxy: true,
    botPattern: 'Carding Botnet & BIN Exhaustion Probe',
    keyHeuristics: [
      'navigator.webdriver === true',
      'Canvas 2D Hash collision across 2,400+ distinct IPs',
      'Missing audio/video hardware codec descriptors',
      'Zero mouse movement trajectory / instantaneous element clicks'
    ],
    recommendedAction: 'HARD_BLOCK',
    telemetryPreset: {
      amount: 14,
      payment_method: 'CARD',
      ip_location: 'Datacenter ASN (OVH / Hetzner)',
      ip_country: 'Russia',
      is_proxy_or_vpn: true,
      checkout_fill_speed_wpm: 540,
      velocity_1m: 6,
      velocity_10m: 15,
      session_duration_sec: 1.4,
      user_account_age_days: 0,
      previous_chargebacks: 1
    }
  },
  {
    id: 'fp-tor-socks-cluster',
    name: 'Tor Exit Node / Datacenter SOCKS5',
    category: 'BOT_FARM',
    fingerprintHash: 'fp_c33e_tor_socks_v4',
    os: 'Unknown / Linux Headless',
    browser: 'Firefox ESR (Tor Browser Masked)',
    fraudRate: 94.2,
    botFarmScore: 96.0,
    sampleCount: 31200,
    avgVelocity1m: 5.2,
    avgWpm: 420,
    isProxy: true,
    botPattern: 'Distributed UPI Phishing & Collect Spoofing',
    keyHeuristics: [
      'Hosting ASN matching known Tor Exit Relay Directory',
      'WebGL renderer masked to "Mozilla Generic Driver"',
      'Mismatched timezone offset vs GeoIP latitude/longitude',
      'High-velocity collect-requests via spoofed @fakeupi VPAs'
    ],
    recommendedAction: 'HARD_BLOCK',
    telemetryPreset: {
      amount: 49999,
      payment_method: 'UPI',
      ip_location: 'Tor Exit Node Subnet',
      ip_country: 'Netherlands',
      is_proxy_or_vpn: true,
      checkout_fill_speed_wpm: 420,
      velocity_1m: 5,
      velocity_10m: 11,
      session_duration_sec: 2.1,
      user_account_age_days: 1,
      previous_chargebacks: 2
    }
  },
  {
    id: 'fp-android-emulator-farm',
    name: 'Android Emulator VM Farm (Multi-Instance)',
    category: 'EMULATOR_RING',
    fingerprintHash: 'fp_7f02_bluestacks_nox',
    os: 'Android 9.0 (Goldfish Kernel / QEMU)',
    browser: 'Embedded WebView (Cloned IMEI)',
    fraudRate: 89.6,
    botFarmScore: 92.4,
    sampleCount: 28400,
    avgVelocity1m: 4.5,
    avgWpm: 360,
    isProxy: true,
    botPattern: 'Synthetic UPI Account Creation & Voucher Abuse',
    keyHeuristics: [
      'Build.FINGERPRINT contains "generic_x86" / "vbox86p"',
      'Zero battery sensor / BatteryManager status fixed at 100% AC',
      'Synthetic simulated GPS coordinates with static jitter',
      'Identical GPU Vendor "Google (ATI Technologies Inc.)"'
    ],
    recommendedAction: 'HARD_BLOCK',
    telemetryPreset: {
      amount: 8500,
      payment_method: 'UPI',
      ip_location: 'Residential VPN Subnet',
      ip_country: 'India',
      is_proxy_or_vpn: true,
      checkout_fill_speed_wpm: 360,
      velocity_1m: 4,
      velocity_10m: 8,
      session_duration_sec: 3.8,
      user_account_age_days: 2,
      previous_chargebacks: 1
    }
  },
  {
    id: 'fp-canvas-noise-injector',
    name: 'Canvas Noise Injector / FP Randomizer',
    category: 'SUSPICIOUS_PROXY',
    fingerprintHash: 'fp_d88a_noise_randomizer',
    os: 'Windows 11 / Automated Extension',
    browser: 'Chrome 122 (Fingerprint Spoofer Ext)',
    fraudRate: 78.5,
    botFarmScore: 81.0,
    sampleCount: 19800,
    avgVelocity1m: 3.4,
    avgWpm: 290,
    isProxy: true,
    botPattern: 'Credential Stuffing & Return Wardrobing',
    keyHeuristics: [
      'Non-deterministic Canvas getImageData() per session call',
      'AudioContext oscillator output variance exceeds mathematical bounds',
      'Screen resolution properties flip dynamically within single session',
      'Scripted form autofill triggering synthetic keystrokes'
    ],
    recommendedAction: 'CHALLENGE_WEBAUTHN',
    telemetryPreset: {
      amount: 72000,
      payment_method: 'CARD',
      ip_location: 'Commercial Proxy Pool',
      ip_country: 'India',
      is_proxy_or_vpn: true,
      checkout_fill_speed_wpm: 290,
      velocity_1m: 3,
      velocity_10m: 5,
      session_duration_sec: 5.2,
      user_account_age_days: 12,
      previous_chargebacks: 3
    }
  },
  {
    id: 'fp-residential-proxy-rotator',
    name: 'Residential Proxy Pool (Luminati / BrightData)',
    category: 'SUSPICIOUS_PROXY',
    fingerprintHash: 'fp_e114_res_proxy_rotator',
    os: 'Windows 10 / Node Script',
    browser: 'Chrome 120 (Rotated User-Agents)',
    fraudRate: 64.2,
    botFarmScore: 68.5,
    sampleCount: 22100,
    avgVelocity1m: 2.8,
    avgWpm: 240,
    isProxy: true,
    botPattern: 'Promo Code Scalping & High-Value Micro Probing',
    keyHeuristics: [
      'TCP/IP OS Fingerprint (p0f) does not match User-Agent OS header',
      'Residential IP changes between cart view and checkout payment step',
      'Fast automated checkout speed (> 240 WPM)',
      'Brand new account with 0 prior transaction history'
    ],
    recommendedAction: 'STEP_UP_3DS',
    telemetryPreset: {
      amount: 3200,
      payment_method: 'UPI',
      ip_location: 'Rotated ISP Node',
      ip_country: 'India',
      is_proxy_or_vpn: true,
      checkout_fill_speed_wpm: 240,
      velocity_1m: 3,
      velocity_10m: 4,
      session_duration_sec: 6.5,
      user_account_age_days: 3,
      previous_chargebacks: 0
    }
  },
  {
    id: 'fp-mac-safari-touchid',
    name: 'macOS Safari + Touch ID (WebAuthn Verified)',
    category: 'LEGITIMATE_HARDWARE',
    fingerprintHash: 'fp_02bb_mac_safari_t2',
    os: 'macOS Sonoma 14.4 (Apple Silicon M3)',
    browser: 'Safari 17.4 (Secure Enclave Enrolled)',
    fraudRate: 2.1,
    botFarmScore: 1.2,
    sampleCount: 88500,
    avgVelocity1m: 1.0,
    avgWpm: 48,
    isProxy: false,
    botPattern: 'Legitimate Prime Buyer (Human Baseline)',
    keyHeuristics: [
      'WebAuthn PublicKeyCredential hardware attestation valid',
      'Smooth human micro-cursor curves & variable keystroke intervals',
      'Consistent WebGL Apple GPU shader compilation signature',
      'Established user account with clean payment record'
    ],
    recommendedAction: 'ALLOW_FAST_SETTLE',
    telemetryPreset: {
      amount: 18500,
      payment_method: 'CARD',
      ip_location: 'Bengaluru, KA (Airtel Broadband)',
      ip_country: 'India',
      is_proxy_or_vpn: false,
      checkout_fill_speed_wpm: 48,
      velocity_1m: 1,
      velocity_10m: 1,
      session_duration_sec: 54.0,
      user_account_age_days: 280,
      previous_chargebacks: 0
    }
  },
  {
    id: 'fp-android-play-integrity',
    name: 'Android Play Integrity Attested (UPI Native)',
    category: 'LEGITIMATE_HARDWARE',
    fingerprintHash: 'fp_19aa_pixel_play_integrity',
    os: 'Android 14.0 (Google Tensor G3)',
    browser: 'Razorpay UPI Native SDK (Google Pay / PhonePe)',
    fraudRate: 1.4,
    botFarmScore: 0.8,
    sampleCount: 142000,
    avgVelocity1m: 1.0,
    avgWpm: 42,
    isProxy: false,
    botPattern: 'Verified Domestic Mobile User (Human Baseline)',
    keyHeuristics: [
      'Google Play Integrity API: MEETS_STRONG_INTEGRITY',
      'Realistic accelerometer & gyroscope micro-tremor telemetry',
      'Domestic 5G Jio/Airtel cellular ASN matching billing PIN',
      'Multi-year verified UPI VPA binding'
    ],
    recommendedAction: 'ALLOW_FAST_SETTLE',
    telemetryPreset: {
      amount: 2450,
      payment_method: 'UPI',
      ip_location: 'Mumbai, MH (Jio 5G)',
      ip_country: 'India',
      is_proxy_or_vpn: false,
      checkout_fill_speed_wpm: 42,
      velocity_1m: 1,
      velocity_10m: 1,
      session_duration_sec: 72.0,
      user_account_age_days: 410,
      previous_chargebacks: 0
    }
  },
  {
    id: 'fp-ios-devicecheck-token',
    name: 'iOS 17 Native + DeviceCheck Token',
    category: 'LEGITIMATE_HARDWARE',
    fingerprintHash: 'fp_90e3_iphone15_devicecheck',
    os: 'iOS 17.4 (Apple A16 Bionic)',
    browser: 'Mobile Safari / In-App WebView',
    fraudRate: 0.8,
    botFarmScore: 0.4,
    sampleCount: 165000,
    avgVelocity1m: 1.0,
    avgWpm: 38,
    isProxy: false,
    botPattern: 'Verified Apple Pay & RuPay Cardholder',
    keyHeuristics: [
      'Apple DeviceCheck & App Attest valid cryptographic receipt',
      'Hardware secure element tokenization confirmed',
      'Organic human scroll deceleration physics',
      'Zero dispute history across Razorpay network'
    ],
    recommendedAction: 'ALLOW_FAST_SETTLE',
    telemetryPreset: {
      amount: 4500,
      payment_method: 'CARD',
      ip_location: 'Delhi NCR (Excitel FTTH)',
      ip_country: 'India',
      is_proxy_or_vpn: false,
      checkout_fill_speed_wpm: 38,
      velocity_1m: 1,
      velocity_10m: 1,
      session_duration_sec: 65.0,
      user_account_age_days: 520,
      previous_chargebacks: 0
    }
  }
];

interface DeviceFingerprintCorrelationChartProps {
  onApplyFingerprintPreset: (preset: DeviceFingerprintData['telemetryPreset'], name: string) => void;
}

export const DeviceFingerprintCorrelationChart: React.FC<DeviceFingerprintCorrelationChartProps> = ({
  onApplyFingerprintPreset
}) => {
  const [metricView, setMetricView] = useState<'fraudRate' | 'botFarmScore' | 'sampleCount'>('fraudRate');
  const [selectedFingerprint, setSelectedFingerprint] = useState<DeviceFingerprintData>(DEVICE_FINGERPRINT_DATASET[0]);
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'BOT_FARM' | 'SUSPICIOUS_PROXY' | 'LEGITIMATE_HARDWARE'>('ALL');

  const filteredData = DEVICE_FINGERPRINT_DATASET.filter((item) => {
    if (filterCategory === 'ALL') return true;
    if (filterCategory === 'BOT_FARM') return item.category === 'BOT_FARM' || item.category === 'EMULATOR_RING';
    if (filterCategory === 'SUSPICIOUS_PROXY') return item.category === 'SUSPICIOUS_PROXY';
    if (filterCategory === 'LEGITIMATE_HARDWARE') return item.category === 'LEGITIMATE_HARDWARE';
    return true;
  });

  const getBarColor = (item: DeviceFingerprintData) => {
    if (item.fraudRate >= 85) return '#f43f5e'; // Rose-500
    if (item.fraudRate >= 60) return '#f97316'; // Orange-500
    if (item.fraudRate >= 30) return '#eab308'; // Yellow-500
    return '#10b981'; // Emerald-500
  };

  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: DeviceFingerprintData = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 text-white p-3.5 rounded-xl shadow-xl text-xs max-w-xs space-y-2 z-50">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
            <span className="font-bold text-slate-100">{data.name}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
              data.fraudRate >= 75 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}>
              {data.fraudRate}% Fraud
            </span>
          </div>

          <div className="space-y-1 font-mono text-[11px] text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Bot Farm Score:</span>
              <span className="font-bold text-amber-400">{data.botFarmScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Sample Volume:</span>
              <span className="font-bold text-slate-200">{data.sampleCount.toLocaleString()} txs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Avg Fill Speed:</span>
              <span className="font-bold text-slate-200">{data.avgWpm} WPM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Proxy/VPN Flag:</span>
              <span className={`font-bold ${data.isProxy ? 'text-rose-400' : 'text-emerald-400'}`}>
                {data.isProxy ? 'DETECTED' : 'RESIDENTIAL'}
              </span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-800 text-[10px] text-indigo-300 font-sans leading-tight">
            🎯 <strong>Pattern:</strong> {data.botPattern}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Fingerprint className="w-4 h-4 text-indigo-600" />
            <span>Device Fingerprint Correlation & Bot Farm Telemetry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Device Fingerprint vs. Fraud Rate Correlation
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-3xl">
            Correlating canvas hashes, headless browser WebDriver flags, audio context variance, and emulator signatures against real-world BFSI chargeback & fraud incidence.
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-mono">
            <button
              onClick={() => setMetricView('fraudRate')}
              className={`px-3 py-1.5 rounded-md font-bold transition ${
                metricView === 'fraudRate'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fraud Rate (%)
            </button>
            <button
              onClick={() => setMetricView('botFarmScore')}
              className={`px-3 py-1.5 rounded-md font-bold transition ${
                metricView === 'botFarmScore'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bot Farm Score
            </button>
            <button
              onClick={() => setMetricView('sampleCount')}
              className={`px-3 py-1.5 rounded-md font-bold transition ${
                metricView === 'sampleCount'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sample Volume
            </button>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setFilterCategory('ALL')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition ${
                filterCategory === 'ALL' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
              }`}
            >
              All Fingerprints
            </button>
            <button
              onClick={() => setFilterCategory('BOT_FARM')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition ${
                filterCategory === 'BOT_FARM' ? 'bg-rose-50 text-rose-700 shadow-sm font-bold' : 'text-slate-600'
              }`}
            >
              Bot Farms
            </button>
            <button
              onClick={() => setFilterCategory('LEGITIMATE_HARDWARE')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition ${
                filterCategory === 'LEGITIMATE_HARDWARE' ? 'bg-emerald-50 text-emerald-700 shadow-sm font-bold' : 'text-slate-600'
              }`}
            >
              Genuine Hardware
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-rose-50/60 border border-rose-200/80 rounded-lg">
          <div className="text-[10px] font-mono uppercase text-rose-700 font-bold flex items-center gap-1">
            <Bot className="w-3 h-3" />
            <span>Headless Bot Farm Fraud</span>
          </div>
          <div className="text-xl font-bold font-mono text-rose-900 mt-1">98.4%</div>
          <div className="text-[11px] text-rose-600 mt-0.5">Puppeteer / Selenium clusters</div>
        </div>

        <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-lg">
          <div className="text-[10px] font-mono uppercase text-amber-700 font-bold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>Emulator Farm Fraud</span>
          </div>
          <div className="text-xl font-bold font-mono text-amber-900 mt-1">89.6%</div>
          <div className="text-[11px] text-amber-600 mt-0.5">Cloned IMEI / Android VMs</div>
        </div>

        <div className="p-3 bg-indigo-50/60 border border-indigo-200/80 rounded-lg">
          <div className="text-[10px] font-mono uppercase text-indigo-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Proxy Rotator Fraud</span>
          </div>
          <div className="text-xl font-bold font-mono text-indigo-900 mt-1">64.2%</div>
          <div className="text-[11px] text-indigo-600 mt-0.5">Residential IP rotation pools</div>
        </div>

        <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-lg">
          <div className="text-[10px] font-mono uppercase text-emerald-700 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Hardware Enclave Baseline</span>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-900 mt-1">&lt; 1.5%</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">Touch ID / Play Integrity</div>
        </div>
      </div>

      {/* Main Bar Chart Section */}
      <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {metricView === 'fraudRate'
                ? 'Empirical Fraud & Chargeback Rate (%) across Device Fingerprints'
                : metricView === 'botFarmScore'
                ? 'Bot Farm Likelihood Confidence Index (0 - 100)'
                : 'Observed Transaction Sample Volume'}
            </span>
            <span className="text-[11px] text-slate-400 block sm:inline sm:ml-2">
              (Click on any bar to inspect deep telemetry & test in live ML workbench)
            </span>
          </div>
          <div className="text-xs font-mono text-indigo-600 font-bold flex items-center gap-1">
            <span>Active Target: </span>
            <span className="bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">{selectedFingerprint.name}</span>
          </div>
        </div>

        {/* Recharts Bar Container */}
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: -15, bottom: 25 }}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload[0]) {
                  setSelectedFingerprint(e.activePayload[0].payload);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                tick={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis
                domain={metricView === 'sampleCount' ? [0, 'auto'] : [0, 100]}
                tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'monospace' }}
                axisLine={{ stroke: '#cbd5e1' }}
                unit={metricView === 'sampleCount' ? '' : '%'}
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Bar
                dataKey={metricView}
                radius={[6, 6, 0, 0]}
                cursor="pointer"
                animationDuration={600}
              >
                {filteredData.map((entry) => (
                  <Cell
                    key={entry.id}
                    fill={getBarColor(entry)}
                    stroke={selectedFingerprint.id === entry.id ? '#1e1b4b' : 'transparent'}
                    strokeWidth={selectedFingerprint.id === entry.id ? 2.5 : 0}
                    opacity={selectedFingerprint.id === entry.id ? 1 : 0.85}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* X-Axis Legend Labels */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2 border-t border-slate-200 mt-2">
          {filteredData.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedFingerprint(item)}
              className={`p-1.5 rounded text-left transition ${
                selectedFingerprint.id === item.id
                  ? 'bg-indigo-100/80 border border-indigo-300 ring-1 ring-indigo-400'
                  : 'hover:bg-slate-200/60 border border-transparent'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-800 line-clamp-1">
                {item.name.split(' ')[0]} {item.name.split(' ')[1] || ''}
              </div>
              <div className="text-[10px] font-mono font-bold mt-0.5 flex items-center justify-between">
                <span className={item.fraudRate >= 60 ? 'text-rose-600' : 'text-emerald-600'}>
                  {item.fraudRate}%
                </span>
                <span className="text-slate-400 text-[9px]">{item.os.split(' ')[0]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Deep-Dive Inspector for Selected Device Fingerprint */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              selectedFingerprint.fraudRate >= 70 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">{selectedFingerprint.name}</h3>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  selectedFingerprint.category === 'BOT_FARM' || selectedFingerprint.category === 'EMULATOR_RING'
                    ? 'bg-rose-950 text-rose-300 border-rose-800'
                    : selectedFingerprint.category === 'SUSPICIOUS_PROXY'
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}>
                  {selectedFingerprint.category.replace('_', ' ')}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                Hash: <code>{selectedFingerprint.fingerprintHash}</code> • {selectedFingerprint.os}
              </div>
            </div>
          </div>

          <button
            onClick={() => onApplyFingerprintPreset(selectedFingerprint.telemetryPreset, selectedFingerprint.name)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm whitespace-nowrap self-start sm:self-auto"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Load Telemetry into ML Workbench</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          
          {/* Col 1: Bot Farm Signatures */}
          <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800 space-y-2">
            <div className="text-[11px] font-mono font-bold uppercase text-indigo-400 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Key Fingerprint Anomalies</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              {selectedFingerprint.keyHeuristics.map((h, i) => (
                <li key={i} className="flex items-start gap-1.5 font-mono">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Telemetry Metrics */}
          <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800 space-y-2">
            <div className="text-[11px] font-mono font-bold uppercase text-indigo-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Observed Behavioral Telemetry</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Target Attack Pattern:</span>
                <span className="font-bold text-amber-300">{selectedFingerprint.botPattern}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Average Fill Speed:</span>
                <span className="font-bold text-white">{selectedFingerprint.avgWpm} WPM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">1-Min Velocity Spike:</span>
                <span className="font-bold text-white">{selectedFingerprint.avgVelocity1m} req/min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Network Anonymity:</span>
                <span className={`font-bold ${selectedFingerprint.isProxy ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {selectedFingerprint.isProxy ? 'VPN / Tor / Datacenter ASN' : 'Verified Domestic ISP'}
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Gateway Mitigation Directive */}
          <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800 space-y-2">
            <div className="text-[11px] font-mono font-bold uppercase text-indigo-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Razorpay Sentinel Directive</span>
            </div>
            <div className="space-y-2 text-slate-300">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px]">
                <div className="text-slate-400 text-[10px]">Recommended Gateway Action:</div>
                <div className={`font-bold mt-0.5 ${
                  selectedFingerprint.recommendedAction === 'HARD_BLOCK'
                    ? 'text-rose-400'
                    : selectedFingerprint.recommendedAction === 'CHALLENGE_WEBAUTHN' || selectedFingerprint.recommendedAction === 'STEP_UP_3DS'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}>
                  {selectedFingerprint.recommendedAction}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                {selectedFingerprint.fraudRate >= 80
                  ? 'Autonomous rule automatically issues immediate TCP reset, blacklists device hash across merchant network, and holds settlement.'
                  : selectedFingerprint.fraudRate >= 50
                  ? 'Invokes EMV 3DS 2.2 biometric authentication challenge or WebAuthn hardware token requirement.'
                  : 'Frictionless checkout path with zero liability friction and sub-second instant settlement.'}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
