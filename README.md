# 🛡️ Razorpay Fraud Sentinel AI

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

> **Enterprise-Grade Real-Time Risk Intelligence, Autonomous Dispute Defense & Cryptographic Regulatory Ledger for High-Velocity Payment Rails (UPI 2.0, CoFT/Tokenized Cards, NetBanking, AEPS).**

---

## ⚡ 1-Click Production Deployment

### Option 1: Deploy to Render (Recommended)
Click the badge below to deploy in under 60 seconds with automated build pipelines, free SSL, and zero configuration:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

1. Connect your GitHub repository.
2. Render reads `render.yaml` automatically.
3. Click **Apply**! Your app will be live at `https://<your-app>.onrender.com`.

---

### Option 2: Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

1. Connect your GitHub repository.
2. Railway builds via the included Dockerfile.
3. Assign a public domain under service settings.

---

### Option 3: Local / Container Run

```bash
# 1. Install dependencies
npm install

# 2. Run in development mode
npm run dev

# 3. Build & Run production server
npm run build
npm start
```

---

## 🛠️ Architecture & Specifications

| Component | Specification |
|---|---|
| **Runtime** | Node.js (v20+) / Express ESM & CJS Bundled |
| **Frontend** | React 19, Tailwind CSS v4, Motion, Lucide, Recharts |
| **Inference Engine** | XGBoost 120-Tree Ensemble + Dynamic SHAP Explainer |
| **SLA Guarantee** | $<15\text{ms}$ Execution (Strict $<50\text{ms}$ Banking SLA) |
| **Health Check** | `/health` and `/api/health` |
| **Port Binding** | `process.env.PORT` on `0.0.0.0` |
