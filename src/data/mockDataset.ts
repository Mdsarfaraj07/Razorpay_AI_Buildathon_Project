import { Transaction, ChargebackDispute, AbuseRingCluster, AuditBlock } from '../types';

export const INITIAL_CHARGEBACK_DISPUTES: ChargebackDispute[] = [
  {
    id: 'DISP-8921',
    transaction_id: 'pay_live_9941a87b',
    merchant_name: 'Apex Electronics Retail',
    amount: 34999,
    customer_name: 'Vikramaditya Sengupta',
    customer_email: 'vikram.sengupta@gmail.com',
    filing_date: '2026-08-28T10:14:00Z',
    response_deadline: '2026-09-05T18:00:00Z',
    reason_code: '10.4 - Other Fraud: Card-Absent Environment',
    reason_title: 'Cardholder claims transaction was unauthorized',
    status: 'READY_TO_SUBMIT',
    win_probability: 92,
    liability_shift_valid: true,
    executive_summary: 'Fully authenticated 3DS v2.2 transaction with matching delivery AWB signature, geo-IP match in Bangalore, and verified SMS OTP logs.',
    evidence_pillars: [
      { title: '3DS Server Authentication (CAVV / ECI 05)', status: 'VERIFIED', detail: '3DS Transaction ID: 3ds_cavv_88192a_shift_confirmed' },
      { title: 'Proof of Physical Delivery', status: 'VERIFIED', detail: 'Bluedart AWB #BLU-882910 delivered on 2026-08-26 to Bangalore 560034 with digital signee' },
      { title: 'IP & Device Telemetry Match', status: 'VERIFIED', detail: 'IP 122.172.84.19 (ACT Fibernet Bangalore) matches registered delivery address' },
      { title: 'Customer Merchant Loyalty', status: 'VERIFIED', detail: 'Customer has 5 previous successful completed orders on this merchant account' }
    ],
    delivery_proof: {
      courier: 'BlueDart Express',
      awb: 'BLU-882910',
      delivery_date: '2026-08-26 14:22 IST',
      delivery_status: 'DELIVERED',
      signee: 'V. Sengupta (Self)',
      city: 'Bengaluru, KA',
    },
    compelling_points: [
      'Cardholder underwent frictionless 3DS authentication without OTP failure.',
      'High-value Apple iPhone 15 was signed for at the card billing address.',
      'Customer contacted customer support 2 days later asking for invoice without reporting fraud.'
    ]
  },
  {
    id: 'DISP-8922',
    transaction_id: 'pay_live_7712c94d',
    merchant_name: 'Zomato Gold / FreshBites',
    amount: 4850,
    customer_name: 'Ananya Deshmukh',
    customer_email: 'ananya.d@yahoo.co.in',
    filing_date: '2026-08-29T14:30:00Z',
    response_deadline: '2026-09-06T18:00:00Z',
    reason_code: '4853 - Goods/Services Not Received',
    reason_title: 'Friendly fraud claim: Consumer claimed food was never delivered',
    status: 'PENDING_EVIDENCE',
    win_probability: 84,
    liability_shift_valid: false,
    executive_summary: 'Delivery partner GPS geofence audit confirms arrival at buyer tower within 15 meters, accompanied by customer chat confirmation.',
    evidence_pillars: [
      { title: 'GPS Geofence Delivery Telemetry', status: 'VERIFIED', detail: 'Delivery driver coordinate match within 12m of Tower 4, Godrej Woods' },
      { title: 'In-app Chat Confirmation', status: 'VERIFIED', detail: 'Customer messaged "Thanks, left at door" at 20:41 IST' },
      { title: 'Payment Method Authorization', status: 'VERIFIED', detail: 'UPI Autopay tokenized mandate successfully debited' }
    ],
    delivery_proof: {
      courier: 'Hyperlocal Fleet',
      awb: 'HYP-992144',
      delivery_date: '2026-08-28 20:42 IST',
      delivery_status: 'DELIVERED_AT_DOOR',
      signee: 'Customer In-App OTP Verified',
      city: 'Mumbai, MH',
    },
    compelling_points: [
      'Customer verified OTP upon arrival of delivery rider.',
      'Order timeline shows complete end-to-end fulfillment in 28 minutes.'
    ]
  },
  {
    id: 'DISP-8923',
    transaction_id: 'pay_live_3391b10a',
    merchant_name: 'UrbanStyle Apparel',
    amount: 12400,
    customer_name: 'Rohan Mehra',
    customer_email: 'rohan.m99@protonmail.com',
    filing_date: '2026-08-30T09:12:00Z',
    response_deadline: '2026-09-07T18:00:00Z',
    reason_code: '4837 - No Cardholder Authorization',
    reason_title: 'Return arbitrage / empty box wardrobing scam',
    status: 'SUBMITTED',
    win_probability: 76,
    liability_shift_valid: true,
    executive_summary: 'Warehouse intake weight check detected weight discrepancy on returned parcel. Initial delivery weight 1.84kg vs return parcel weight 0.12kg (empty box scam).',
    evidence_pillars: [
      { title: 'Warehouse Scale Weight Audit Log', status: 'VERIFIED', detail: 'Dispatch weight 1.84kg vs Return Intake scale weight 0.12kg (93% mass deficiency)' },
      { title: 'Unboxing Security CCTV Capture', status: 'VERIFIED', detail: 'Tamper tape broken with barcode sticker transferred' },
      { title: 'UPI Intent Authorization Proof', status: 'VERIFIED', detail: 'PhonePe MPIN biometric authorization timestamped' }
    ],
    delivery_proof: {
      courier: 'Delhivery Surface',
      awb: 'DEL-441920',
      delivery_date: '2026-08-24 16:10 IST',
      delivery_status: 'DELIVERED',
      signee: 'Rohan M.',
      city: 'Gurugram, HR',
    },
    compelling_points: [
      'Return packet contained newspaper cutouts instead of 3 designer jackets.',
      'Weight logs from automated sorting conveyor belt attached to representment dossier.'
    ]
  }
];

export const INITIAL_ABUSE_RINGS: AbuseRingCluster[] = [
  {
    id: 'RING-ALPHA-01',
    name: 'Ghost-Carding Botnet Syndicate',
    pattern_type: 'Distributed Card Testing & BIN Cycling',
    risk_score: 0.96,
    total_nodes: 14,
    total_volume_inr: 842000,
    velocity_spikes: '42 micro-attempts/min across 6 proxy subnets',
    status: 'ACTIVE_THREAT',
    target_merchants: ['BookMyShow', 'Swiggy Instamart', 'Nykaa Quick'],
    nodes: [
      { id: 'n-ip-1', type: 'IP', label: '185.220.101.5 (Tor Exit Node)', risk_score: 0.99, cluster_id: 'RING-ALPHA-01', transaction_count: 86, is_compromised: true },
      { id: 'n-ip-2', type: 'IP', label: '45.154.255.88 (Hosting Proxy)', risk_score: 0.94, cluster_id: 'RING-ALPHA-01', transaction_count: 54, is_compromised: true },
      { id: 'n-card-1', type: 'CARD_BIN', label: 'BIN 453275 (HDFC Platinum Visa)', risk_score: 0.88, cluster_id: 'RING-ALPHA-01', transaction_count: 38, is_compromised: true },
      { id: 'n-card-2', type: 'CARD_BIN', label: 'BIN 524188 (ICICI Rubyx MC)', risk_score: 0.85, cluster_id: 'RING-ALPHA-01', transaction_count: 29, is_compromised: true },
      { id: 'n-dev-1', type: 'DEVICE', label: 'fp_canvas_bot_linux_chrome118', risk_score: 0.97, cluster_id: 'RING-ALPHA-01', transaction_count: 112, is_compromised: true },
      { id: 'n-em-1', type: 'EMAIL', label: 'temp_burner_*@tempmail.ninja', risk_score: 0.92, cluster_id: 'RING-ALPHA-01', transaction_count: 45, is_compromised: true },
      { id: 'n-m-1', type: 'MERCHANT', label: 'Razorpay Target MID #8911', risk_score: 0.65, cluster_id: 'RING-ALPHA-01', transaction_count: 120, is_compromised: false }
    ],
    links: [
      { source: 'n-ip-1', target: 'n-dev-1', transaction_volume: 86, shared_attribute: 'Canvas Fingerprint' },
      { source: 'n-ip-2', target: 'n-dev-1', transaction_volume: 54, shared_attribute: 'Canvas Fingerprint' },
      { source: 'n-dev-1', target: 'n-card-1', transaction_volume: 38, shared_attribute: 'Automated Form Probe' },
      { source: 'n-dev-1', target: 'n-card-2', transaction_volume: 29, shared_attribute: 'Automated Form Probe' },
      { source: 'n-dev-1', target: 'n-em-1', transaction_volume: 45, shared_attribute: 'Sequential Burner Inbox' },
      { source: 'n-dev-1', target: 'n-m-1', transaction_volume: 120, shared_attribute: 'Payment Link Attack' }
    ]
  },
  {
    id: 'RING-BETA-02',
    name: 'UPI Collect-Request Phishing Ring',
    pattern_type: 'Social Engineering & Fake Refund VPAs',
    risk_score: 0.91,
    total_nodes: 9,
    total_volume_inr: 519000,
    velocity_spikes: 'High-value QR collect bursts targeting seniors',
    status: 'QUARANTINED',
    target_merchants: ['Razorpay Payment Links', 'OLX Classifieds Hub'],
    nodes: [
      { id: 'n-vpa-1', type: 'VPA_HANDLE', label: 'razorpay.refund.desk01@okhdfc', risk_score: 0.98, cluster_id: 'RING-BETA-02', transaction_count: 34, is_compromised: true },
      { id: 'n-vpa-2', type: 'VPA_HANDLE', label: 'customer.care.settle@paytm', risk_score: 0.95, cluster_id: 'RING-BETA-02', transaction_count: 22, is_compromised: true },
      { id: 'n-dev-2', type: 'DEVICE', label: 'fp_redmi_note9_imei_spoofed', risk_score: 0.92, cluster_id: 'RING-BETA-02', transaction_count: 56, is_compromised: true },
      { id: 'n-ip-3', type: 'IP', label: '103.88.22.14 (Mewat Cluster)', risk_score: 0.89, cluster_id: 'RING-BETA-02', transaction_count: 56, is_compromised: true }
    ],
    links: [
      { source: 'n-ip-3', target: 'n-dev-2', transaction_volume: 56, shared_attribute: 'Subnet & BTS Tower' },
      { source: 'n-dev-2', target: 'n-vpa-1', transaction_volume: 34, shared_attribute: 'SIM Switcher Device' },
      { source: 'n-dev-2', target: 'n-vpa-2', transaction_volume: 22, shared_attribute: 'SIM Switcher Device' }
    ]
  }
];

// Generate 50 realistic, cryptographically chained audit blocks for compliance & legal readiness
function generateInitial50AuditBlocks(): AuditBlock[] {
  const eventTemplates = [
    {
      event_type: 'RULE_TRIGGERED' as const,
      actor: 'ML_AUTO_ENGINE_v3',
      decision: 'BLOCK',
      summary: (id: string) => `Hard block enforced on carding bot storm probe. 18 consecutive failed CVVs in 45s on ${id}.`,
      baseRisk: 0.94
    },
    {
      event_type: 'DISPUTE_RESPONDED' as const,
      actor: 'AI_DISPUTE_DEFENDER',
      decision: 'EVIDENCE_DISPATCHED',
      summary: (id: string) => `Chargeback DISP-${Math.floor(1000 + Math.random() * 9000)} representment generated with 3DS CAVV + BlueDart delivery AWB for ${id}.`,
      baseRisk: 0.18
    },
    {
      event_type: 'RING_QUARANTINED' as const,
      actor: 'AI_RING_SENTINEL',
      decision: 'SYNDICATE_ISOLATED',
      summary: (id: string) => `Quarantined 9 UPI handles and 3 spoofed device UUIDs in Mewat phishing cluster associated with ${id}.`,
      baseRisk: 0.91
    },
    {
      event_type: 'TRANSACTION_SCORED' as const,
      actor: 'ML_ENSEMBLE_XGBOOST',
      decision: 'APPROVE',
      summary: (id: string) => `Transaction ${id} evaluated via 16-feature vector. Clean biometric telemetry and low velocity.`,
      baseRisk: 0.04
    },
    {
      event_type: 'TRANSACTION_SCORED' as const,
      actor: 'ML_ENSEMBLE_XGBOOST',
      decision: 'CHALLENGE_3DS',
      summary: (id: string) => `Dynamic 3DS 2.2 step-up challenge enforced for high-value transaction ${id} from new IP ASN.`,
      baseRisk: 0.62
    },
    {
      event_type: 'MANUAL_OVERRIDE' as const,
      actor: 'RISK_OPS_OFFICER_402',
      decision: 'WHITELISTED_OVERRIDE',
      summary: (id: string) => `Senior Risk Analyst verified corporate entity credentials and whitelisted high-ticket enterprise transfer ${id}.`,
      baseRisk: 0.12
    }
  ];

  const blocks: AuditBlock[] = [];
  let prevHash = '0000a94bf821e8d9047192ca74e628109bf14a8e23910fbc281e091176b9211c';
  const baseTime = Date.now() - (50 * 95 * 1000); // 50 blocks spaced out over recent hours

  for (let i = 1; i <= 50; i++) {
    const template = eventTemplates[(i - 1) % eventTemplates.length];
    const blockIndex = 10800 + i;
    const blockTime = new Date(baseTime + (i * 92 * 1000)).toISOString();
    const txId = `pay_live_${(10000000 + (i * 192837)).toString(16).slice(0, 8)}`;
    
    // Deterministic pseudo SHA-256 for consistent mock presentation
    const rawSeed = `${blockIndex}-${blockTime}-${prevHash}-${template.event_type}-${txId}`;
    let hashInt = 0;
    for (let c = 0; c < rawSeed.length; c++) {
      hashInt = ((hashInt << 5) - hashInt) + rawSeed.charCodeAt(c);
      hashInt |= 0;
    }
    const hexSegment1 = Math.abs(hashInt).toString(16).padStart(8, '0');
    const hexSegment2 = Math.abs(hashInt ^ 0x5a5a5a5a).toString(16).padStart(8, '0');
    const hexSegment3 = Math.abs(hashInt ^ 0x3c3c3c3c).toString(16).padStart(8, '0');
    const hexSegment4 = Math.abs(hashInt ^ 0xa5a5a5a5).toString(16).padStart(8, '0');
    const currentBlockHash = `0000${hexSegment1}${hexSegment2}${hexSegment3}${hexSegment4}e91f0842`;
    const evidenceDigest = `sha256:${hexSegment2}${hexSegment3}${hexSegment1}${hexSegment4}${hexSegment2}${hexSegment1}`;

    const riskScore = template.baseRisk + ((i % 5) * 0.01);

    blocks.push({
      block_index: blockIndex,
      timestamp: blockTime,
      previous_hash: prevHash,
      block_hash: currentBlockHash,
      event_type: template.event_type,
      transaction_id: txId,
      risk_score: Number(riskScore.toFixed(2)),
      decision: template.decision,
      actor: template.actor,
      summary: template.summary(txId),
      evidence_digest: evidenceDigest,
      verified: true
    });

    prevHash = currentBlockHash;
  }

  return blocks;
}

export const INITIAL_AUDIT_BLOCKS: AuditBlock[] = generateInitial50AuditBlocks();

/**
 * Generates a realistic held-out test set of 600 transactions with payment gateway characteristics.
 */
export function generateHeldOutTestSet(): Transaction[] {
  const dataset: Transaction[] = [];
  const cities = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'];
  const merchants = [
    { id: 'mid_01', name: 'Flipkart Supermart', mcc: '5411' },
    { id: 'mid_02', name: 'Myntra Fashion Hub', mcc: '5651' },
    { id: 'mid_03', name: 'Zomato Enterprise', mcc: '5812' },
    { id: 'mid_04', name: 'MakeMyTrip Flights', mcc: '4511' },
    { id: 'mid_05', name: 'Nykaa Beauty', mcc: '5977' },
    { id: 'mid_06', name: 'Croma Retail', mcc: '5732' },
    { id: 'mid_07', name: 'BookMyShow Live', mcc: '7832' }
  ];

  // 1. Normal Legitimate Transactions (~96%)
  for (let i = 1; i <= 560; i++) {
    const merchant = merchants[i % merchants.length];
    const city = cities[i % cities.length];
    const methods: ('UPI' | 'CARD' | 'NETBANKING' | 'WALLET')[] = ['UPI', 'UPI', 'UPI', 'CARD', 'CARD', 'NETBANKING', 'WALLET'];
    const method = methods[i % methods.length];
    const amount = method === 'UPI' ? Math.floor(Math.random() * 4500) + 120 : Math.floor(Math.random() * 18000) + 600;

    dataset.push({
      id: `tx_test_legit_${i.toString().padStart(4, '0')}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)).toISOString(),
      merchant_id: merchant.id,
      merchant_name: merchant.name,
      merchant_mcc: merchant.mcc,
      amount,
      currency: 'INR',
      payment_method: method,
      upi_vpa: method === 'UPI' ? `user${i}@okaxis` : undefined,
      card_bin: method === 'CARD' ? '453275' : undefined,
      card_last4: method === 'CARD' ? `${1000 + (i % 9000)}` : undefined,
      card_network: method === 'CARD' ? (i % 2 === 0 ? 'Visa' : 'Mastercard') : undefined,
      customer_email: `customer${i}@gmail.com`,
      customer_phone: `+91 98${Math.floor(10000000 + Math.random() * 89999999)}`,
      ip_address: `122.16${i % 10}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`,
      ip_location: city,
      ip_country: 'India',
      is_proxy_or_vpn: false,
      device_fingerprint: `fp_legit_usr_${i % 120}`,
      device_os: i % 2 === 0 ? 'Android 14' : 'iOS 17.4',
      device_browser: 'Chrome Mobile 122',
      session_duration_sec: Math.floor(Math.random() * 140) + 25,
      checkout_fill_speed_wpm: Math.floor(Math.random() * 45) + 30,
      user_account_age_days: Math.floor(Math.random() * 600) + 30,
      previous_chargebacks: 0,
      velocity_1m: 1,
      velocity_10m: 1,
      velocity_1h: 2,
      is_ground_truth_fraud: false,
      fraud_category: 'NONE'
    });
  }

  // 2. High-Risk Fraud Transactions (~4%)
  const fraudScenarios: Array<{
    category: 'UPI_SPOOFING' | 'CARDING_BOT_RING' | 'RETURN_ARBITRAGE' | 'ACCOUNT_TAKEOVER' | 'FRIENDLY_FRAUD';
    payment_method: 'UPI' | 'CARD' | 'NETBANKING' | 'WALLET';
    proxy: boolean;
    velocity1m: number;
    wpm: number;
    chargebacks: number;
    amount: number;
    country: string;
    vpa?: string;
  }> = [
    // UPI Spoofing
    { category: 'UPI_SPOOFING', payment_method: 'UPI', proxy: true, velocity1m: 4, wpm: 420, chargebacks: 1, amount: 24999, country: 'India', vpa: 'refund.pay.agent4@fakeupi' },
    { category: 'UPI_SPOOFING', payment_method: 'UPI', proxy: true, velocity1m: 3, wpm: 380, chargebacks: 2, amount: 49999, country: 'India', vpa: 'support.kyc.settle@quickrefund' },
    { category: 'UPI_SPOOFING', payment_method: 'UPI', proxy: false, velocity1m: 4, wpm: 350, chargebacks: 1, amount: 15000, country: 'India', vpa: 'claim.bonus.upi@fakeupi' },
    
    // Carding Bot Ring
    { category: 'CARDING_BOT_RING', payment_method: 'CARD', proxy: true, velocity1m: 5, wpm: 520, chargebacks: 0, amount: 12, country: 'Russia' },
    { category: 'CARDING_BOT_RING', payment_method: 'CARD', proxy: true, velocity1m: 6, wpm: 600, chargebacks: 0, amount: 15, country: 'Seychelles' },
    { category: 'CARDING_BOT_RING', payment_method: 'CARD', proxy: true, velocity1m: 4, wpm: 480, chargebacks: 0, amount: 9, country: 'Netherlands' },
    { category: 'CARDING_BOT_RING', payment_method: 'CARD', proxy: true, velocity1m: 5, wpm: 490, chargebacks: 1, amount: 22, country: 'Hong Kong' },

    // Return Arbitrage / Friendly Fraud
    { category: 'RETURN_ARBITRAGE', payment_method: 'CARD', proxy: false, velocity1m: 1, wpm: 45, chargebacks: 3, amount: 78999, country: 'India' },
    { category: 'RETURN_ARBITRAGE', payment_method: 'UPI', proxy: false, velocity1m: 1, wpm: 50, chargebacks: 2, amount: 62000, country: 'India', vpa: 'wardrobe.trader@okaxis' },
    { category: 'FRIENDLY_FRAUD', payment_method: 'CARD', proxy: false, velocity1m: 1, wpm: 35, chargebacks: 2, amount: 45000, country: 'India' },
    { category: 'FRIENDLY_FRAUD', payment_method: 'CARD', proxy: false, velocity1m: 1, wpm: 40, chargebacks: 3, amount: 89000, country: 'India' },

    // Account Takeover
    { category: 'ACCOUNT_TAKEOVER', payment_method: 'NETBANKING', proxy: true, velocity1m: 3, wpm: 340, chargebacks: 1, amount: 120000, country: 'Nigeria' },
    { category: 'ACCOUNT_TAKEOVER', payment_method: 'CARD', proxy: true, velocity1m: 4, wpm: 410, chargebacks: 2, amount: 95000, country: 'United Kingdom' },
  ];

  // Replicate to create 40 realistic fraud instances
  for (let j = 0; j < 40; j++) {
    const scenario = fraudScenarios[j % fraudScenarios.length];
    const merchant = merchants[j % merchants.length];
    dataset.push({
      id: `tx_test_fraud_${j.toString().padStart(4, '0')}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 5)).toISOString(),
      merchant_id: merchant.id,
      merchant_name: merchant.name,
      merchant_mcc: merchant.mcc,
      amount: scenario.amount + Math.floor(Math.random() * 200),
      currency: 'INR',
      payment_method: scenario.payment_method,
      upi_vpa: scenario.vpa,
      card_bin: scenario.payment_method === 'CARD' ? '411111' : undefined,
      card_last4: scenario.payment_method === 'CARD' ? `${4000 + j}` : undefined,
      card_network: 'Visa',
      customer_email: `burner_acc_${j}@tempinbox.xyz`,
      customer_phone: `+91 91${Math.floor(10000000 + Math.random() * 89999999)}`,
      ip_address: scenario.proxy ? `185.220.101.${10 + j}` : `103.88.22.${15 + j}`,
      ip_location: scenario.proxy ? 'Anonymous Proxy Node' : 'Mewat/Nuh Cluster',
      ip_country: scenario.country,
      is_proxy_or_vpn: scenario.proxy,
      device_fingerprint: `fp_spoofed_botnet_${j % 4}`,
      device_os: 'Linux x86_64 (Headless Puppeteer)',
      device_browser: 'Chromium Headless 119',
      session_duration_sec: Math.floor(Math.random() * 3) + 1,
      checkout_fill_speed_wpm: scenario.wpm,
      user_account_age_days: 0,
      previous_chargebacks: scenario.chargebacks,
      velocity_1m: scenario.velocity1m,
      velocity_10m: scenario.velocity1m * 2,
      velocity_1h: scenario.velocity1m * 4,
      is_ground_truth_fraud: true,
      fraud_category: scenario.category
    });
  }

  // Shuffle dataset deterministically
  return dataset.sort(() => Math.random() - 0.5);
}
