# 🚀 Razorpay Fraud Sentinel AI - Render 1-Click Deployment Guide

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

This repository includes a pre-configured `render.yaml` Blueprint for **instant 1-click deployment** on Render.

---

## ⚡ Method 1: 1-Click Blueprint Deploy (Fastest)

1. Click the **Deploy to Render** button above or open [https://render.com/deploy](https://render.com/deploy).
2. Connect your GitHub account and select your repository containing this project.
3. Render automatically reads `render.yaml` and provisions:
   - **Service Name:** `razorpay-fraud-sentinel`
   - **Environment:** `Node`
   - **Build Command:** `npm run build` *(compiles Vite SPA + builds backend server to `dist/server.cjs`)*
   - **Start Command:** `npm start` *(runs `node dist/server.cjs`)*
   - **Health Check Path:** `/health`
4. *(Optional)* In the **Environment Variables** prompt, paste your `GEMINI_API_KEY` for live AI generation (otherwise, high-fidelity deterministic fallbacks operate seamlessly).
5. Click **Apply**! Render will build and deploy your application with a free SSL domain (e.g. `https://razorpay-fraud-sentinel.onrender.com`).

---

## 🛠️ Method 2: Manual Web Service Setup on Render

If creating manually via the Render Dashboard:

1. In your **[Render Dashboard](https://dashboard.render.com)**, click **"New +"** $\rightarrow$ **"Web Service"**.
2. Connect your GitHub repository.
3. Configure the following fields:
   - **Name:** `razorpay-fraud-sentinel`
   - **Language:** `Node`
   - **Region:** Any (e.g., `Oregon (US West)` or `Frankfurt (EU Central)`)
   - **Branch:** `main`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Plan:** `Free`
4. Under **Advanced Settings**:
   - **Health Check Path:** `/health`
5. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: *(Optional) Your Google Gemini API Key*
6. Click **Create Web Service**.

---

## 🔍 Verification & Health Check

Once deployed, Render checks the health status automatically:

```bash
curl https://<your-app-name>.onrender.com/health
```

**Response:**
```json
{
  "status": "ok",
  "service": "RazorPay-AI-Sentinel",
  "environment": "production",
  "uptime": 45.2,
  "timestamp": 1725321600000
}
```
