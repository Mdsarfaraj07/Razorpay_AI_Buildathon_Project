import React, { useState } from 'react';
import { Transaction, DecisionType } from '../types';
import { 
  Play, 
  Pause, 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  Search, 
  Filter, 
  AlertTriangle, 
  Flame, 
  Sparkles, 
  Sliders, 
  CheckCircle, 
  XOctagon, 
  HelpCircle,
  Cpu,
  ArrowUpRight
} from 'lucide-react';

interface LiveTransactionMonitorProps {
  transactions: Transaction[];
  isStreaming: boolean;
  setIsStreaming: (streaming: boolean) => void;
  streamSpeed: number;
  setStreamSpeed: (speed: number) => void;
  onInjectAttack: (scenario: 'CARD_TESTING_STORM' | 'UPI_PHISHING_WAVE' | 'RETURN_ARBITRAGE' | 'ORGANIC_RUSH') => void;
  onSelectTransaction: (tx: Transaction) => void;
  onManualEvaluate: (txData: Partial<Transaction>) => void;
}

export const LiveTransactionMonitor: React.FC<LiveTransactionMonitorProps> = ({
  transactions,
  isStreaming,
  setIsStreaming,
  streamSpeed,
  setStreamSpeed,
  onInjectAttack,
  onSelectTransaction,
  onManualEvaluate
}) => {
  const [filterDecision, setFilterDecision] = useState<'ALL' | 'BLOCK' | 'STEP_UP_3DS' | 'ALLOW'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSandbox, setShowSandbox] = useState(false);

  // Manual Sandbox State
  const [manualAmount, setManualAmount] = useState<number>(14999);
  const [manualMethod, setManualMethod] = useState<'UPI' | 'CARD' | 'NETBANKING' | 'WALLET'>('UPI');
  const [manualVPA, setManualVPA] = useState('user.test@okhdfcbank');
  const [manualProxy, setManualProxy] = useState(false);
  const [manualVelocity, setManualVelocity] = useState(1);
  const [manualCountry, setManualCountry] = useState('India');
  const [manualWPM, setManualWPM] = useState(45);
  const [manualPriorDisputes, setManualPriorDisputes] = useState(0);

  const filteredTransactions = transactions.filter((tx) => {
    if (filterDecision !== 'ALL' && tx.predicted_decision !== filterDecision) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        tx.id.toLowerCase().includes(q) ||
        tx.merchant_name.toLowerCase().includes(q) ||
        tx.customer_email.toLowerCase().includes(q) ||
        (tx.upi_vpa && tx.upi_vpa.toLowerCase().includes(q)) ||
        (tx.card_last4 && tx.card_last4.includes(q))
      );
    }
    return true;
  });

  const handleRunSandbox = (e: React.FormEvent) => {
    e.preventDefault();
    onManualEvaluate({
      amount: manualAmount,
      payment_method: manualMethod,
      upi_vpa: manualMethod === 'UPI' ? manualVPA : undefined,
      card_bin: manualMethod === 'CARD' ? '411111' : undefined,
      card_last4: manualMethod === 'CARD' ? '4242' : undefined,
      card_network: 'Visa',
      is_proxy_or_vpn: manualProxy,
      velocity_1m: manualVelocity,
      velocity_10m: manualVelocity * 2,
      velocity_1h: manualVelocity * 3,
      ip_country: manualCountry,
      checkout_fill_speed_wpm: manualWPM,
      previous_chargebacks: manualPriorDisputes,
      merchant_name: 'Sandbox Merchant Test',
      merchant_mcc: '5411',
      customer_email: 'tester.sandbox@razorpay.demo',
      customer_phone: '+91 9999988888',
      ip_address: manualProxy ? '185.220.101.44' : '122.164.12.89',
      ip_location: manualProxy ? 'Anonymous Exit Node' : 'Bengaluru',
      device_fingerprint: 'fp_sandbox_user_device',
      device_os: 'Mac OS X 14.5',
      device_browser: 'Chrome 124',
      session_duration_sec: manualWPM > 300 ? 2 : 45,
      user_account_age_days: manualPriorDisputes > 0 ? 1 : 120,
    });
  };

  const getDecisionBadge = (decision?: DecisionType, score?: number) => {
    if (decision === 'BLOCK') {
      return (
        <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded text-xs font-mono font-bold inline-flex items-center gap-1">
          <XOctagon className="w-3 h-3 text-rose-600" />
          <span>BLOCK ({Math.round((score || 0) * 100)}%)</span>
        </span>
      );
    }
    if (decision === 'STEP_UP_3DS') {
      return (
        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-xs font-mono font-bold inline-flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          <span>STEP-UP 3DS ({Math.round((score || 0) * 100)}%)</span>
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-mono font-bold inline-flex items-center gap-1">
        <CheckCircle className="w-3 h-3 text-emerald-600" />
        <span>ALLOW ({Math.round((score || 0) * 100)}%)</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Control Bar: Stream Toggles & Threat Wave Injectors */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Left: Stream status & speed */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-3.5 py-1.5 rounded text-xs font-bold transition flex items-center space-x-1.5 shadow-sm ${
              isStreaming
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isStreaming ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Stream</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Resume Stream</span>
              </>
            )}
          </button>

          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-600">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-medium">Rate:</span>
            <select
              value={streamSpeed}
              onChange={(e) => setStreamSpeed(Number(e.target.value))}
              className="bg-transparent text-slate-900 font-mono font-bold focus:outline-none cursor-pointer"
            >
              <option value={800}>Fast (0.8s)</option>
              <option value={1800}>Normal (1.8s)</option>
              <option value={3500}>Slow (3.5s)</option>
            </select>
          </div>

          <button
            onClick={() => setShowSandbox(!showSandbox)}
            className={`px-3.5 py-1.5 rounded text-xs font-bold border transition flex items-center space-x-1.5 ${
              showSandbox
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Manual Probe</span>
          </button>
        </div>

        {/* Right: Attack Wave Simulation Quick-Triggers */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider hidden xl:inline">
            Trigger Attack Scenario:
          </span>
          
          <button
            onClick={() => onInjectAttack('CARD_TESTING_STORM')}
            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-xs font-bold transition flex items-center space-x-1.5"
          >
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            <span>Carding Bot Storm</span>
          </button>

          <button
            onClick={() => onInjectAttack('UPI_PHISHING_WAVE')}
            className="px-2.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded text-xs font-bold transition flex items-center space-x-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-purple-600" />
            <span>UPI Spoof Wave</span>
          </button>

          <button
            onClick={() => onInjectAttack('RETURN_ARBITRAGE')}
            className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded text-xs font-bold transition flex items-center space-x-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Return Arbitrage</span>
          </button>

          <button
            onClick={() => onInjectAttack('ORGANIC_RUSH')}
            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-xs font-bold transition flex items-center space-x-1.5"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Diwali Peak Rush</span>
          </button>
        </div>

      </div>

      {/* Manual Sandbox Drawer / Form */}
      {showSandbox && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Manual Transaction Evaluator & Risk Probe</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Real-time sub-15ms inference testbench</span>
          </div>

          <form onSubmit={handleRunSandbox} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 mb-1 font-semibold">Transaction Amount (INR ₹)</label>
              <input
                type="number"
                value={manualAmount}
                onChange={(e) => setManualAmount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 font-mono focus:bg-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-semibold">Payment Vector</label>
              <select
                value={manualMethod}
                onChange={(e: any) => setManualMethod(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 font-medium focus:bg-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="UPI">UPI (Instant VPA Intent)</option>
                <option value="CARD">Credit/Debit Card (3DS)</option>
                <option value="NETBANKING">Netbanking Direct Debit</option>
                <option value="WALLET">Prepaid Wallet</option>
              </select>
            </div>

            {manualMethod === 'UPI' ? (
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">UPI VPA Handle</label>
                <input
                  type="text"
                  value={manualVPA}
                  onChange={(e) => setManualVPA(e.target.value)}
                  placeholder="e.g. user@okhdfcbank or agent@fakeupi"
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 font-mono focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Card BIN & Type</label>
                <input
                  type="text"
                  disabled
                  value="4111-11XX-XXXX-4242 (Visa Platinum)"
                  className="w-full bg-slate-100 border border-slate-200 rounded px-3 py-2 text-slate-500 font-mono"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-600 mb-1 font-semibold">Velocity (1 min attempts)</label>
              <input
                type="number"
                min="1"
                max="20"
                value={manualVelocity}
                onChange={(e) => setManualVelocity(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 font-mono focus:bg-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-semibold">IP Geolocation Origin</label>
              <select
                value={manualCountry}
                onChange={(e) => setManualCountry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 font-medium focus:bg-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="India">India (Domestic INR)</option>
                <option value="Russia">Russia (Cross-Border Anomaly)</option>
                <option value="Netherlands">Netherlands (Hosting Datacenter)</option>
                <option value="Nigeria">Nigeria (High ATO Cluster)</option>
                <option value="United States">United States</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-semibold">Autofill Speed (WPM)</label>
              <input
                type="number"
                value={manualWPM}
                onChange={(e) => setManualWPM(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 font-mono focus:bg-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-semibold">Prior Customer Chargebacks</label>
              <input
                type="number"
                min="0"
                max="5"
                value={manualPriorDisputes}
                onChange={(e) => setManualPriorDisputes(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 font-mono focus:bg-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-3 pt-5">
              <label className="flex items-center space-x-2 text-slate-700 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={manualProxy}
                  onChange={(e) => setManualProxy(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span>Tor / Proxy / VPN Active</span>
              </label>
            </div>

            <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSandbox(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-bold transition"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded transition flex items-center space-x-2 font-mono uppercase text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                <span>Evaluate with ML Ensemble</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Payment ID, Merchant, VPA handle, or card last4..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none font-mono"
          />
        </div>

        {/* Decision Filter Tabs */}
        <div className="flex items-center space-x-1 bg-slate-100 border border-slate-200 rounded p-1 text-xs">
          <button
            onClick={() => setFilterDecision('ALL')}
            className={`px-3 py-1 rounded font-bold transition ${
              filterDecision === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Feed ({transactions.length})
          </button>
          <button
            onClick={() => setFilterDecision('BLOCK')}
            className={`px-3 py-1 rounded font-bold transition ${
              filterDecision === 'BLOCK' ? 'bg-rose-600 text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Blocked
          </button>
          <button
            onClick={() => setFilterDecision('STEP_UP_3DS')}
            className={`px-3 py-1 rounded font-bold transition ${
              filterDecision === 'STEP_UP_3DS' ? 'bg-amber-600 text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Step-Up 3DS
          </button>
          <button
            onClick={() => setFilterDecision('ALLOW')}
            className={`px-3 py-1 rounded font-bold transition ${
              filterDecision === 'ALLOW' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Allowed
          </button>
        </div>

      </div>

      {/* Live Transaction Stream Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase font-mono text-[10px] tracking-wider font-bold">
              <tr>
                <th className="px-4 py-3">Transaction ID & Timestamp</th>
                <th className="px-4 py-3">Merchant / MCC</th>
                <th className="px-4 py-3">Amount & Method</th>
                <th className="px-4 py-3">Entity / Telemetry</th>
                <th className="px-4 py-3">Risk Signals & SHAP</th>
                <th className="px-4 py-3">Decision</th>
                <th className="px-4 py-3 text-right">Forensic Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredTransactions.slice(0, 30).map((tx) => (
                <tr 
                  key={tx.id}
                  onClick={() => onSelectTransaction(tx)}
                  className="hover:bg-slate-50/80 transition cursor-pointer group"
                >
                  
                  {/* Transaction ID & Time */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                      {tx.id}
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                      {new Date(tx.timestamp).toLocaleTimeString()} ({tx.execution_latency_ms || 4.2}ms)
                    </div>
                  </td>

                  {/* Merchant / MCC */}
                  <td className="px-4 py-3 whitespace-nowrap font-sans">
                    <div className="text-slate-900 font-semibold">{tx.merchant_name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">MCC {tx.merchant_mcc}</div>
                  </td>

                  {/* Amount & Method */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-bold text-slate-900">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 font-sans">
                      <span className="px-1.5 py-0.2 bg-slate-100 rounded font-mono text-[10px] font-bold text-slate-700">
                        {tx.payment_method}
                      </span>
                      <span>{tx.upi_vpa ? tx.upi_vpa : tx.card_last4 ? `•• ${tx.card_last4}` : ''}</span>
                    </div>
                  </td>

                  {/* Entity & Telemetry */}
                  <td className="px-4 py-3 font-sans">
                    <div className="text-slate-700 flex items-center gap-1">
                      <span>{tx.ip_location}</span>
                      {tx.is_proxy_or_vpn && (
                        <span className="px-1 py-0.2 bg-rose-50 text-rose-700 border border-rose-200 rounded text-[9px] font-mono font-bold">
                          VPN/PROXY
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Vel: {tx.velocity_1m}req/m • WPM: {tx.checkout_fill_speed_wpm}
                    </div>
                  </td>

                  {/* Risk Signals */}
                  <td className="px-4 py-3 font-sans max-w-xs">
                    {tx.rules_triggered && tx.rules_triggered.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {tx.rules_triggered.slice(0, 2).map((rule, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded text-[10px] font-medium truncate max-w-[200px]">
                            {rule}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Normal baseline</span>
                    )}
                  </td>

                  {/* Decision */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getDecisionBadge(tx.predicted_decision, tx.predicted_risk_score)}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTransaction(tx);
                      }}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 rounded text-xs font-sans font-bold transition flex items-center space-x-1 ml-auto"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-600 group-hover:text-white" />
                      <span>Forensics</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
