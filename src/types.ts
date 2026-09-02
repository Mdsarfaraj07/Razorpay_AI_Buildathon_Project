export type PaymentMethod = 'UPI' | 'CARD' | 'NETBANKING' | 'WALLET';
export type DecisionType = 'ALLOW' | 'STEP_UP_3DS' | 'BLOCK';
export type FraudCategory = 
  | 'NONE'
  | 'UPI_SPOOFING' 
  | 'CARDING_BOT_RING' 
  | 'RETURN_ARBITRAGE' 
  | 'ACCOUNT_TAKEOVER' 
  | 'FRIENDLY_FRAUD';

export interface Transaction {
  id: string;
  timestamp: string;
  merchant_id: string;
  merchant_name: string;
  merchant_mcc: string; // Merchant category code
  amount: number;
  currency: string;
  payment_method: PaymentMethod;
  upi_vpa?: string;
  card_bin?: string;
  card_last4?: string;
  card_network?: string;
  customer_email: string;
  customer_phone: string;
  ip_address: string;
  ip_location: string;
  ip_country: string;
  is_proxy_or_vpn: boolean;
  device_fingerprint: string;
  device_os: string;
  device_browser: string;
  session_duration_sec: number;
  checkout_fill_speed_wpm: number;
  user_account_age_days: number;
  previous_chargebacks: number;
  velocity_1m: number;
  velocity_10m: number;
  velocity_1h: number;
  is_ground_truth_fraud: boolean;
  fraud_category: FraudCategory;
  predicted_risk_score?: number;
  predicted_decision?: DecisionType;
  decision_reason?: string;
  execution_latency_ms?: number;
  shap_features?: Record<string, number>;
  rules_triggered?: string[];
}

export interface ModelMetrics {
  precision: number;
  recall: number;
  f1: number;
  accuracy: number;
  roc_auc: number;
  pr_auc: number;
  total_samples: number;
  true_positives: number;
  false_positives: number;
  true_negatives: number;
  false_negatives: number;
  fraud_loss_saved_inr: number;
  false_positive_friction_cost_inr: number;
  net_merchant_benefit_inr: number;
  threshold: number;
  per_class_breakdown: Record<string, { precision: number; recall: number; count: number }>;
}

export interface ThresholdPoint {
  threshold: number;
  precision: number;
  recall: number;
  f1: number;
  tp: number;
  fp: number;
  tn: number;
  fn: number;
  false_positive_cost: number;
  fraud_loss_prevented: number;
  total_cost_penalty: number;
}

export interface ChargebackEvidencePillar {
  title: string;
  status: 'VERIFIED' | 'PARTIAL' | 'MISSING';
  detail: string;
}

export interface ChargebackDispute {
  id: string;
  transaction_id: string;
  merchant_name: string;
  amount: number;
  customer_name: string;
  customer_email: string;
  filing_date: string;
  response_deadline: string;
  reason_code: string;
  reason_title: string;
  status: 'PENDING_EVIDENCE' | 'EVIDENCE_GENERATING' | 'READY_TO_SUBMIT' | 'SUBMITTED' | 'WON' | 'LOST';
  win_probability?: number;
  liability_shift_valid?: boolean;
  executive_summary?: string;
  evidence_pillars?: ChargebackEvidencePillar[];
  formal_rebuttal?: string;
  compelling_points?: string[];
  delivery_proof?: {
    courier: string;
    awb: string;
    delivery_date: string;
    delivery_status: string;
    signee: string;
    city: string;
  };
}

export interface AbuseRingNode {
  id: string;
  type: 'IP' | 'DEVICE' | 'CARD_BIN' | 'VPA_HANDLE' | 'EMAIL' | 'MERCHANT';
  label: string;
  risk_score: number;
  cluster_id: string;
  transaction_count: number;
  is_compromised: boolean;
}

export interface AbuseRingLink {
  source: string;
  target: string;
  transaction_volume: number;
  shared_attribute: string;
}

export interface AbuseRingCluster {
  id: string;
  name: string;
  pattern_type: string;
  risk_score: number;
  total_nodes: number;
  total_volume_inr: number;
  velocity_spikes: string;
  status: 'ACTIVE_THREAT' | 'QUARANTINED' | 'RESOLVED';
  nodes: AbuseRingNode[];
  links: AbuseRingLink[];
  target_merchants: string[];
}

export interface AuditBlock {
  block_index: number;
  timestamp: string;
  previous_hash: string;
  block_hash: string;
  event_type: 'TRANSACTION_SCORED' | 'RULE_TRIGGERED' | 'DISPUTE_RESPONDED' | 'RING_QUARANTINED' | 'MANUAL_OVERRIDE';
  transaction_id?: string;
  risk_score?: number;
  decision?: string;
  actor: string;
  summary: string;
  evidence_digest: string;
  verified: boolean;
}

export interface RegulatoryComplianceReport {
  reportId: string;
  generatedAt: string;
  framework: string;
  summary: string;
  classification: string;
  totalRiskValueINR: number;
  blockedLossINR: number;
  regulatoryFindings: string[];
  complianceChecklist: Array<{
    rule: string;
    status: 'COMPLIANT' | 'UNDER_REVIEW' | 'ACTION_REQUIRED';
    notes?: string;
  }>;
  actionMandate: string;
  fiuIndFilingRecommended?: boolean;
}

export interface RazorpayRiskPredictionResponse {
  razorpay_risk_eval_id: string;
  transaction_id: string;
  timestamp: string;
  risk_score: number; // 0.000 to 1.000
  risk_tier: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recommendation: DecisionType;
  primary_reason: string;
  rules_triggered: string[];
  execution_latency_ms: number;
  model_version: string;
  shap_feature_importance: Record<string, number>;
  merchant_guidance: {
    action: string;
    settlement_escrow_hold: boolean;
    step_up_method?: string;
    rbi_mandate_applied?: string;
  };
  telemetry_digest: string;
}

export interface ModelMetadata {
  model_name: string;
  model_version: string;
  algorithm: string;
  trained_on: string;
  sample_size: number;
  features_count: number;
  top_features: Array<{ name: string; weight: number; description: string }>;
  hyperparameters: Record<string, string | number>;
  calibrated_threshold: number;
  rbi_compliance_certified: boolean;
}
