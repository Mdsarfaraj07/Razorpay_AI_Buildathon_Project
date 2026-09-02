import React, { useState } from 'react';
import { 
  Transaction, 
  PaymentMethod, 
  RazorpayRiskPredictionResponse, 
  ModelMetadata 
} from '../types';
import { 
  DeviceFingerprintCorrelationChart, 
  DeviceFingerprintData 
} from './DeviceFingerprintCorrelationChart';
import { 
  Cpu, 
  Sparkles, 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  XOctagon, 
  Sliders, 
  Code2, 
  Copy, 
  Check, 
  Play, 
  Layers, 
  Activity, 
  Server, 
  Clock, 
  Info,
  ArrowRight,
  Database,
  Lock,
  Flame,
  UserCheck,
  Globe,
  Radio,
  Fingerprint
} from 'lucide-react';

interface RazorpayMlPlaygroundProps {
  onAppendAudit: (eventType: 'TRANSACTION_SCORED' | 'RULE_TRIGGERED', summary: string, txId: string, score: number, decision: string) => void;
  onSelectTransaction?: (tx: Transaction) => void;
}

interface PresetScenario {
  id: string;
  name: string;
  category: 'CRITICAL_ATTACK' | 'ELEVATED_STEPUP' | 'LEGITIMATE_NORMAL';
  badge: string;
  description: string;
  data: Partial<Transaction>;
}

const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'carding-bot-probe',
    name: 'Carding Botnet Micro-Probe',
    category: 'CRITICAL_ATTACK',
    badge: 'CARDING BOTNET',
    description: 'High-frequency automated ₹12 micro-transactions from proxy subnet testing stolen BIN credentials.',
    data: {
      amount: 14,
      payment_method: 'CARD',
      card_bin: '453275',
      card_last4: '9921',
      card_network: 'Visa Platinum',
      merchant_name: 'BookMyShow Live',
      merchant_mcc: '7832',
      customer_email: 'bot_runner_99@tempmail.ninja',
      customer_phone: '+91 9123456780',
      ip_address: '185.220.101.5',
      ip_location: 'Tor Exit Node / Hosting ASN',
      ip_country: 'Russia',
      is_proxy_or_vpn: true,
      checkout_fill_speed_wpm: 540,
      session_duration_sec: 1.8,
      user_account_age_days: 0,
      previous_chargebacks: 0,
      velocity_1m: 5,
      velocity_10m: 12,
      velocity_1h: 24,
    }
  },
  {
    id: 'upi-phishing-vpa',
    name: 'Spoofed UPI Phishing Scam',
    category: 'CRITICAL_ATTACK',
    badge: 'UPI PHISHING',
    description: 'Deceptive collect-request targeting senior citizen using spoofed @fakeupi refund domain.',
    data: {
      amount: 49999,
      payment_method: 'UPI',
      upi_vpa: 'razorpay.refund.desk.agent@fakeupi',
      merchant_name: 'Razorpay Instant Settlement',
      merchant_mcc: '6051',
      customer_email: 'victim_senior@yahoo.co.in',
      customer_phone: '+91 9845129988',
      ip_address: '103.88.22.14',
      ip_location: 'Mewat/Nuh Cluster',
      ip_country: 'India',
      is_proxy_or_vpn: true,
      checkout_fill_speed_wpm: 380,
      session_duration_sec: 3.2,
      user_account_age_days: 1,
      previous_chargebacks: 2,
      velocity_1m: 4,
      velocity_10m: 8,
      velocity_1h: 15,
    }
  },
  {
    id: 'account-takeover-midnight',
    name: 'Midnight Account Takeover (ATO)',
    category: 'CRITICAL_ATTACK',
    badge: 'ATO ATTACK',
    description: 'Hijacked account purchasing ₹1,35,000 Apple MacBook from foreign IP at 3:15 AM IST.',
    data: {
      amount: 135000,
      payment_method: 'CARD',
      card_bin: '524188',
      card_last4: '4102',
      card_network: 'Mastercard World',
      merchant_name: 'Croma Electronics Mega',
      merchant_mcc: '5732',
      customer_email: 'rohit.gupta@enterprise.in',
      customer_phone: '+91 9920199201',
      ip_address: '102.164.22.91',
      ip_location: 'Lagos Datacenter',
      ip_country: 'Nigeria',
      is_proxy_or_vpn: true,
      checkout_fill_speed_wpm: 320,
      session_duration_sec: 4.1,
      user_account_age_days: 2,
      previous_chargebacks: 1,
      velocity_1m: 3,
      velocity_10m: 6,
      velocity_1h: 9,
    }
  },
  {
    id: 'return-arbitrage-wardrobing',
    name: 'Return Wardrobing Arbitrage',
    category: 'CRITICAL_ATTACK',
    badge: 'RETURN FRAUD',
    description: 'Serial disputer with 3 prior empty-box chargebacks purchasing ₹72,000 luxury apparel.',
    data: {
      amount: 72000,
      payment_method: 'CARD',
      card_bin: '411111',
      card_last4: '8814',
      card_network: 'Visa Signature',
      merchant_name: 'Luxury Brands India',
      merchant_mcc: '5651',
      customer_email: 'wardrobe.hustle@gmail.com',
      customer_phone: '+91 9811223344',
      ip_address: '122.160.44.12',
      ip_location: 'Gurugram, HR',
      ip_country: 'India',
      is_proxy_or_vpn: false,
      checkout_fill_speed_wpm: 48,
      session_duration_sec: 42,
      user_account_age_days: 45,
      previous_chargebacks: 3,
      velocity_1m: 1,
      velocity_10m: 2,
      velocity_1h: 3,
    }
  },
  {
    id: 'festive-high-ticket-stepup',
    name: 'High-Ticket Festive Shopper',
    category: 'ELEVATED_STEPUP',
    badge: '3DS STEP-UP',
    description: 'Legitimate domestic buyer purchasing ₹84,999 smartphone requiring biometric 2FA / 3DS challenge.',
    data: {
      amount: 84999,
      payment_method: 'CARD',
      card_bin: '453275',
      card_last4: '1092',
      card_network: 'Visa Platinum',
      merchant_name: 'Apex Electronics Retail',
      merchant_mcc: '5732',
      customer_email: 'kavita.nair@gmail.com',
      customer_phone: '+91 9845011223',
      ip_address: '122.172.84.19',
      ip_location: 'Bengaluru, KA',
      ip_country: 'India',
      is_proxy_or_vpn: false,
      checkout_fill_speed_wpm: 52,
      session_duration_sec: 68,
      user_account_age_days: 85,
      previous_chargebacks: 0,
      velocity_1m: 1,
      velocity_10m: 1,
      velocity_1h: 1,
    }
  },
  {
    id: 'genuine-prime-shopper',
    name: 'Verified Domestic Prime Shopper',
    category: 'LEGITIMATE_NORMAL',
    badge: 'TRUSTED LOW RISK',
    description: 'Trusted loyal account (340 days old, 0 disputes, normal WPM) purchasing daily groceries.',
    data: {
      amount: 2450,
      payment_method: 'UPI',
      upi_vpa: 'ananya.deshmukh@okhdfcbank',
      merchant_name: 'Blinkit Grocery Quick',
      merchant_mcc: '5411',
      customer_email: 'ananya.d@gmail.com',
      customer_phone: '+91 9820011223',
      ip_address: '106.51.78.22',
      ip_location: 'Mumbai, MH',
      ip_country: 'India',
      is_proxy_or_vpn: false,
      checkout_fill_speed_wpm: 38,
      session_duration_sec: 95,
      user_account_age_days: 340,
      previous_chargebacks: 0,
      velocity_1m: 1,
      velocity_10m: 1,
      velocity_1h: 2,
    }
  }
];

export const RazorpayMlPlayground: React.FC<RazorpayMlPlaygroundProps> = ({
  onAppendAudit
}) => {
  // Form State
  const [amount, setAmount] = useState<number>(49999);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [upiVpa, setUpiVpa] = useState('razorpay.refund.desk.agent@fakeupi');
  const [cardBin, setCardBin] = useState('453275');
  const [cardLast4, setCardLast4] = useState('9921');
  const [cardNetwork, setCardNetwork] = useState('Visa');
  const [merchantName, setMerchantName] = useState('Razorpay Instant Settlement');
  const [merchantMcc, setMerchantMcc] = useState('6051');
  const [customerEmail, setCustomerEmail] = useState('victim_senior@yahoo.co.in');
  const [customerPhone, setCustomerPhone] = useState('+91 9845129988');
  const [ipAddress, setIpAddress] = useState('103.88.22.14');
  const [ipLocation, setIpLocation] = useState('Mewat/Nuh Cluster');
  const [ipCountry, setIpCountry] = useState('India');
  const [isProxy, setIsProxy] = useState(true);
  const [velocity1m, setVelocity1m] = useState(4);
  const [velocity10m, setVelocity10m] = useState(8);
  const [velocity1h, setVelocity1h] = useState(15);
  const [wpm, setWpm] = useState(380);
  const [sessionSec, setSessionSec] = useState(3.2);
  const [accountAgeDays, setAccountAgeDays] = useState(1);
  const [priorChargebacks, setPriorChargebacks] = useState(2);
  const [threshold, setThreshold] = useState(0.70);

  // Prediction State
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<RazorpayRiskPredictionResponse | null>(null);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [activeTab, setActiveTab] = useState<'inference' | 'shap' | 'api-json' | 'curl'>('inference');

  // Load Preset
  const handleLoadScenario = (preset: PresetScenario) => {
    const d = preset.data;
    if (d.amount !== undefined) setAmount(d.amount);
    if (d.payment_method) setPaymentMethod(d.payment_method);
    if (d.upi_vpa) setUpiVpa(d.upi_vpa);
    if (d.card_bin) setCardBin(d.card_bin);
    if (d.card_last4) setCardLast4(d.card_last4);
    if (d.card_network) setCardNetwork(d.card_network);
    if (d.merchant_name) setMerchantName(d.merchant_name);
    if (d.merchant_mcc) setMerchantMcc(d.merchant_mcc);
    if (d.customer_email) setCustomerEmail(d.customer_email);
    if (d.customer_phone) setCustomerPhone(d.customer_phone);
    if (d.ip_address) setIpAddress(d.ip_address);
    if (d.ip_location) setIpLocation(d.ip_location);
    if (d.ip_country) setIpCountry(d.ip_country);
    if (d.is_proxy_or_vpn !== undefined) setIsProxy(d.is_proxy_or_vpn);
    if (d.velocity_1m !== undefined) setVelocity1m(d.velocity_1m);
    if (d.velocity_10m !== undefined) setVelocity10m(d.velocity_10m);
    if (d.velocity_1h !== undefined) setVelocity1h(d.velocity_1h);
    if (d.checkout_fill_speed_wpm !== undefined) setWpm(d.checkout_fill_speed_wpm);
    if (d.session_duration_sec !== undefined) setSessionSec(d.session_duration_sec);
    if (d.user_account_age_days !== undefined) setAccountAgeDays(d.user_account_age_days);
    if (d.previous_chargebacks !== undefined) setPriorChargebacks(d.previous_chargebacks);
  };

  // Run Real-Time ML Prediction via /api/ml/predict
  const handleRunPrediction = async () => {
    setIsPredicting(true);
    const txPayload = {
      id: `pay_sim_${Date.now().toString(36)}`,
      amount,
      currency: 'INR',
      payment_method: paymentMethod,
      upi_vpa: paymentMethod === 'UPI' ? upiVpa : undefined,
      card_bin: paymentMethod === 'CARD' ? cardBin : undefined,
      card_last4: paymentMethod === 'CARD' ? cardLast4 : undefined,
      card_network: paymentMethod === 'CARD' ? cardNetwork : undefined,
      merchant_name: merchantName,
      merchant_mcc: merchantMcc,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      ip_address: ipAddress,
      ip_location: ipLocation,
      ip_country: ipCountry,
      is_proxy_or_vpn: isProxy,
      velocity_1m: velocity1m,
      velocity_10m: velocity10m,
      velocity_1h: velocity1h,
      checkout_fill_speed_wpm: wpm,
      session_duration_sec: sessionSec,
      user_account_age_days: accountAgeDays,
      previous_chargebacks: priorChargebacks,
    };

    try {
      const response = await fetch(`/api/ml/predict?threshold=${threshold}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: RazorpayRiskPredictionResponse = await response.json();
      setPrediction(data);

      onAppendAudit(
        data.recommendation === 'BLOCK' ? 'RULE_TRIGGERED' : 'TRANSACTION_SCORED',
        `Live ML Model predicted ${data.risk_score} score (${data.recommendation}). ${data.primary_reason}`,
        data.transaction_id,
        data.risk_score,
        data.recommendation
      );
    } catch (err) {
      console.error('Error running ML prediction:', err);
    } finally {
      setIsPredicting(false);
    }
  };

  // Run on mount once
  React.useEffect(() => {
    handleRunPrediction();
  }, []);

  // Handler to apply device fingerprint preset from the correlation chart
  const handleApplyFingerprintPreset = (preset: DeviceFingerprintData['telemetryPreset'], name: string) => {
    setAmount(preset.amount);
    setPaymentMethod(preset.payment_method);
    setIpLocation(preset.ip_location);
    setIpCountry(preset.ip_country);
    setIsProxy(preset.is_proxy_or_vpn);
    setWpm(preset.checkout_fill_speed_wpm);
    setVelocity1m(preset.velocity_1m);
    setVelocity10m(preset.velocity_10m);
    setVelocity1h(preset.velocity_10m * 2);
    setSessionSec(preset.session_duration_sec);
    setAccountAgeDays(preset.user_account_age_days);
    setPriorChargebacks(preset.previous_chargebacks);

    // Scroll up smoothly to the Feature Builder
    const featureBuilderEl = document.getElementById('feature-builder-section');
    if (featureBuilderEl) {
      featureBuilderEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const copyToClipboard = (text: string, type: 'payload' | 'curl') => {
    navigator.clipboard.writeText(text);
    if (type === 'payload') {
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    } else {
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 2000);
    }
  };

  const curlSnippet = `curl -X POST "https://api.razorpay.com/v1/risk/evaluate" \\
  -H "Content-Type: application/json" \\
  -H "X-Razorpay-Key-Id: rzp_live_sentinel_risk" \\
  -d '{
    "amount": ${amount},
    "currency": "INR",
    "payment_method": "${paymentMethod}",
    "merchant_mcc": "${merchantMcc}",
    "customer": {
      "email": "${customerEmail}",
      "phone": "${customerPhone}"
    },
    "telemetry": {
      "ip_address": "${ipAddress}",
      "ip_country": "${ipCountry}",
      "is_proxy_or_vpn": ${isProxy},
      "checkout_wpm": ${wpm},
      "velocity_1m": ${velocity1m},
      "user_account_age_days": ${accountAgeDays},
      "previous_chargebacks": ${priorChargebacks}
    }
  }'`;

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Engine Status & Architecture Overview */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>Razorpay AI Sentinel • Machine Learning Inference Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Real-World Payment Risk Prediction & SHAP Explainability
            </h1>
            <p className="text-slate-500 text-sm mt-1 max-w-3xl">
              Production-grade XGBoost ensemble calibrated on 4.8M Indian BFSI payment vectors (UPI VPA entropy, 3DS liability shift, carding bot probes, and behavioral biometrics).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Active Model</div>
              <div className="text-slate-800 font-bold flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>XGB-BFSI-v4.2</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Inference Target</div>
              <div className="text-indigo-600 font-bold mt-0.5">/api/ml/predict</div>
            </div>
          </div>
        </div>

        {/* Quick Scenario Preset Injectors */}
        <div className="pt-5">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Load Real-World Indian Payment Vector Scenarios</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRESET_SCENARIOS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  handleLoadScenario(preset);
                }}
                className="text-left p-3.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition group flex flex-col justify-between bg-slate-50/50"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition">
                      {preset.name}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      preset.category === 'CRITICAL_ATTACK'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : preset.category === 'ELEVATED_STEPUP'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </div>
                <div className="mt-2 text-[10px] text-indigo-600 font-bold font-mono flex items-center gap-1 group-hover:translate-x-0.5 transition">
                  <span>Load payload</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Main Grid: Interactive Form vs Live Prediction Result */}
      <div id="feature-builder-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Interactive Transaction Configurator */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-900">Transaction Feature Builder</h2>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                18 Extracted Telemetry Vectors
              </div>
            </div>

            <div className="space-y-5">
              
              {/* Row 1: Amount & Payment Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Transaction Amount (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-xs">₹</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 text-sm font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                      placeholder="49999"
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    Formatted: <span className="font-bold text-slate-700">{formatINR(amount)}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-full px-3 py-2 text-sm font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  >
                    <option value="UPI">UPI (VPA / QR Intent)</option>
                    <option value="CARD">Credit / Debit Card (3DS)</option>
                    <option value="NETBANKING">NetBanking (Retail/Corp)</option>
                    <option value="WALLET">Prepaid Wallet</option>
                  </select>
                </div>
              </div>

              {/* Conditional Row: UPI VPA or Card Fields */}
              {paymentMethod === 'UPI' ? (
                <div className="bg-indigo-50/40 border border-indigo-100 rounded-lg p-3.5">
                  <label className="block text-xs font-bold text-indigo-950 uppercase tracking-wider mb-1.5">
                    Customer UPI VPA Handle
                  </label>
                  <input
                    type="text"
                    value={upiVpa}
                    onChange={(e) => setUpiVpa(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    placeholder="user@okhdfcbank or refund@fakeupi"
                  />
                  <div className="flex items-center justify-between text-[11px] text-indigo-700 mt-1.5 font-mono">
                    <span>Domain status: {upiVpa.includes('fakeupi') || upiVpa.includes('quickrefund') ? '🚨 Phishing Domain Flagged' : '✅ Verified PSP Handle'}</span>
                  </div>
                </div>
              ) : paymentMethod === 'CARD' ? (
                <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">BIN (6 Digits)</label>
                    <input
                      type="text"
                      value={cardBin}
                      onChange={(e) => setCardBin(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Card Last 4</label>
                    <input
                      type="text"
                      value={cardLast4}
                      onChange={(e) => setCardLast4(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Network</label>
                    <select
                      value={cardNetwork}
                      onChange={(e) => setCardNetwork(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs font-medium border border-slate-200 rounded bg-white"
                    >
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="RuPay">RuPay</option>
                      <option value="Amex">Amex</option>
                    </select>
                  </div>
                </div>
              ) : null}

              {/* Row 2: Merchant Info & MCC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Merchant Name
                  </label>
                  <input
                    type="text"
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Merchant MCC Category
                  </label>
                  <select
                    value={merchantMcc}
                    onChange={(e) => setMerchantMcc(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="5411">MCC 5411 - Grocery / Supermarket (Low Risk)</option>
                    <option value="5651">MCC 5651 - Apparel / Fashion (Return Risk)</option>
                    <option value="5732">MCC 5732 - Consumer Electronics (High Value)</option>
                    <option value="5944">MCC 5944 - Jewelry / Precious Metals (High Risk)</option>
                    <option value="6051">MCC 6051 - Quasi-Cash / Crypto / Wallet (High Risk)</option>
                    <option value="7995">MCC 7995 - Gaming / Betting (Prohibited/High)</option>
                    <option value="7832">MCC 7832 - Entertainment / Movies</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Velocity Sliders */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Velocity Burst Counters
                  </span>
                  <span className="text-xs font-mono text-indigo-600 font-bold">
                    {velocity1m} req/1m • {velocity10m} req/10m • {velocity1h} req/1h
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 font-medium mb-1">
                      1-Minute Velocity: <span className="font-mono font-bold text-slate-900">{velocity1m}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={velocity1m}
                      onChange={(e) => setVelocity1m(Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-600 font-medium mb-1">
                      10-Minute Velocity: <span className="font-mono font-bold text-slate-900">{velocity10m}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      value={velocity10m}
                      onChange={(e) => setVelocity10m(Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-600 font-medium mb-1">
                      1-Hour Velocity: <span className="font-mono font-bold text-slate-900">{velocity1h}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={velocity1h}
                      onChange={(e) => setVelocity1h(Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Network & Geolocation Telemetry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    IP Address
                  </label>
                  <input
                    type="text"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Origin Country
                  </label>
                  <select
                    value={ipCountry}
                    onChange={(e) => setIpCountry(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="India">India (Domestic INR)</option>
                    <option value="Russia">Russia (High Risk)</option>
                    <option value="Nigeria">Nigeria (High Risk)</option>
                    <option value="Netherlands">Netherlands (Hosting VPN)</option>
                    <option value="United States">United States (Foreign INR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Anonymity Proxy
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsProxy(!isProxy)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                      isProxy
                        ? 'bg-rose-50 text-rose-700 border-rose-300'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    }`}
                  >
                    {isProxy ? (
                      <>
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>VPN / Proxy Active</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Residential ISP</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Row 5: Behavioral Biometrics & Account Trust */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Fill Speed: <span className="font-mono text-indigo-600">{wpm} WPM</span>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="600"
                    step="10"
                    value={wpm}
                    onChange={(e) => setWpm(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 font-mono">
                    {wpm > 280 ? '🤖 Headless Automation' : '👤 Human Cadence'}
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Account Age: <span className="font-mono text-indigo-600">{accountAgeDays} days</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="5"
                    value={accountAgeDays}
                    onChange={(e) => setAccountAgeDays(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 font-mono">
                    {accountAgeDays < 3 ? '⚠️ Brand New Profile' : '🛡️ Established User'}
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Prior Disputes: <span className="font-mono text-indigo-600">{priorChargebacks}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={priorChargebacks}
                    onChange={(e) => setPriorChargebacks(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 font-mono">
                    {priorChargebacks > 0 ? '🚨 Repeat Chargebacker' : '✅ Zero Disputes'}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleRunPrediction}
                  disabled={isPredicting}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-sm font-bold tracking-wide uppercase font-mono transition shadow-sm flex items-center justify-center space-x-2"
                >
                  {isPredicting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Running Model Inference...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Execute Live ML Prediction (/api/ml/predict)</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Right Column (5 cols): Live ML Inference & SHAP Explainability Card */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            
            {/* Tab navigation */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('inference')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                    activeTab === 'inference'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Prediction
                </button>
                <button
                  onClick={() => setActiveTab('shap')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                    activeTab === 'shap'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tree-SHAP
                </button>
                <button
                  onClick={() => setActiveTab('api-json')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                    activeTab === 'api-json'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Razorpay JSON
                </button>
                <button
                  onClick={() => setActiveTab('curl')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                    activeTab === 'curl'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  cURL
                </button>
              </div>

              {prediction && (
                <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-indigo-600" />
                  <span>{prediction.execution_latency_ms} ms</span>
                </div>
              )}
            </div>

            {prediction ? (
              <div>
                
                {activeTab === 'inference' && (
                  <div className="space-y-5">
                    
                    {/* Decision Hero Banner */}
                    <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                      prediction.recommendation === 'BLOCK'
                        ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                        : prediction.recommendation === 'STEP_UP_3DS'
                        ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                        : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    }`}>
                      <div className="mt-0.5">
                        {prediction.recommendation === 'BLOCK' ? (
                          <XOctagon className="w-6 h-6 text-rose-600" />
                        ) : prediction.recommendation === 'STEP_UP_3DS' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-600" />
                        ) : (
                          <CheckCircle className="w-6 h-6 text-emerald-600" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono font-bold tracking-wider uppercase">
                            Recommendation: {prediction.recommendation}
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                            prediction.risk_tier === 'CRITICAL' || prediction.risk_tier === 'HIGH'
                              ? 'bg-rose-100 text-rose-800 border-rose-300'
                              : prediction.risk_tier === 'MEDIUM'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          }`}>
                            {prediction.risk_tier} RISK TIER
                          </span>
                        </div>

                        <div className="text-2xl font-light font-mono mt-1">
                          {(prediction.risk_score * 100).toFixed(1)}% <span className="text-xs font-sans font-medium text-slate-500">calibrated fraud probability</span>
                        </div>

                        <p className="text-xs mt-1.5 text-slate-700 leading-relaxed font-sans">
                          {prediction.primary_reason}
                        </p>
                      </div>
                    </div>

                    {/* Risk Bar Meter */}
                    <div>
                      <div className="flex justify-between text-xs font-mono font-bold text-slate-700 mb-1.5">
                        <span>Risk Spectrum Calibration</span>
                        <span>Threshold: {threshold}</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            prediction.risk_score >= 0.70
                              ? 'bg-rose-500'
                              : prediction.risk_score >= 0.40
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.max(4, Math.min(100, prediction.risk_score * 100))}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                        <span>0% (Allow)</span>
                        <span>40% (3DS Challenge)</span>
                        <span>70% (Block)</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* Rules Triggered list */}
                    {prediction.rules_triggered && prediction.rules_triggered.length > 0 && (
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                          Deterministic Hard Rules Fired
                        </div>
                        <div className="space-y-1.5">
                          {prediction.rules_triggered.map((rule, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs font-mono text-rose-700">
                              <span className="font-bold">•</span>
                              <span>{rule}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Merchant Action Directive */}
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-3.5 space-y-2">
                      <div className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                        Razorpay Gateway Directive
                      </div>
                      <div className="text-xs font-mono text-slate-800">
                        <span className="text-slate-500">Action: </span>
                        <span className="font-bold text-indigo-700">{prediction.merchant_guidance.action}</span>
                      </div>
                      <div className="text-xs font-mono text-slate-800">
                        <span className="text-slate-500">Escrow Hold: </span>
                        <span className={`font-bold ${prediction.merchant_guidance.settlement_escrow_hold ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {prediction.merchant_guidance.settlement_escrow_hold ? 'YES (Hold for 7 days)' : 'NO (Instant Settle)'}
                        </span>
                      </div>
                      {prediction.merchant_guidance.rbi_mandate_applied && (
                        <div className="text-[11px] font-mono text-amber-800 pt-1 border-t border-indigo-100">
                          🏛️ {prediction.merchant_guidance.rbi_mandate_applied}
                        </div>
                      )}
                    </div>

                    {/* Telemetry Digest */}
                    <div className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 rounded p-2 break-all">
                      <span className="font-bold text-slate-600">Audit Digest: </span>
                      {prediction.telemetry_digest}
                    </div>

                  </div>
                )}

                {/* Tab 2: Tree-SHAP Feature Attribution */}
                {activeTab === 'shap' && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-600 leading-relaxed font-sans">
                      Tree-SHAP calculates the exact marginal contribution of each feature vector toward the final prediction logit.
                    </div>

                    <div className="space-y-3 pt-2">
                      {Object.entries(prediction.shap_feature_importance).map(([feature, rawVal]) => {
                        const val = Number(rawVal) || 0;
                        const isRiskIncreasing = val > 0;
                        const barWidth = Math.min(100, Math.abs(val) * 200);
                        return (
                          <div key={feature} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-slate-800">{feature}</span>
                              <span className={`font-mono font-bold text-xs ${isRiskIncreasing ? 'text-rose-600' : 'text-emerald-600'}`}>
                                {val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                              <div
                                className={`h-full rounded-full transition-all ${isRiskIncreasing ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                style={{ width: `${barWidth}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tab 3: Razorpay JSON Payload */}
                {activeTab === 'api-json' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500">HTTP 200 OK • Application/JSON</span>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(prediction, null, 2), 'payload')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-mono flex items-center gap-1 transition"
                      >
                        {copiedPayload ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedPayload ? 'Copied' : 'Copy JSON'}</span>
                      </button>
                    </div>

                    <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-lg overflow-x-auto max-h-[380px] leading-relaxed">
                      {JSON.stringify(prediction, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Tab 4: cURL integration snippet */}
                {activeTab === 'curl' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500">Terminal cURL Request</span>
                      <button
                        onClick={() => copyToClipboard(curlSnippet, 'curl')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-mono flex items-center gap-1 transition"
                      >
                        {copiedCurl ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCurl ? 'Copied' : 'Copy cURL'}</span>
                      </button>
                    </div>

                    <pre className="p-3 bg-slate-900 text-indigo-300 font-mono text-[11px] rounded-lg overflow-x-auto max-h-[380px] leading-relaxed">
                      {curlSnippet}
                    </pre>
                  </div>
                )}

              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 font-mono text-xs">
                Executing real-time inference...
              </div>
            )}

          </div>

          {/* Model Architecture & RBI Spec Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-900 font-bold uppercase tracking-wider text-[11px]">
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Model Governance & RBI Certification</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans">
              All real-time inference runs with deterministic <span className="font-mono font-bold text-slate-800">&lt;15ms latency</span>, cryptographically chained in the SHA-256 ledger in accordance with <span className="font-semibold text-slate-900">RBI Master Directions on Cyber Security Framework</span>.
            </p>
          </div>

        </div>

      </div>

      {/* Device Fingerprint Correlation & Bot Farm Analysis Bar Chart */}
      <DeviceFingerprintCorrelationChart
        onApplyFingerprintPreset={handleApplyFingerprintPreset}
      />

    </div>
  );
};
