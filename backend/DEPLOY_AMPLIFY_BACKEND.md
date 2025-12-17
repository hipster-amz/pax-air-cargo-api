# PAX Air Cargo API - Amplify Backend + RDS Deployment Guide

This guide deploys the backend using AWS Amplify Backend integrated with your existing frontend. No Docker required. Total setup time: ~15 minutes.

## Prerequisites
- AWS Account with Amplify permissions
- Amplify CLI installed (`npm install -g @aws-amplify/cli`)
- AWS CLI configured (`aws configure`)
- Node.js 18+ installed
- Git repository with both frontend and backend connected to GitHub

---

## Step 1: Create RDS PostgreSQL Database

1. **Open AWS Console** → RDS → Create Database
2. **Configuration:**
   - Engine: PostgreSQL (latest version)
   - DB Instance Identifier: `pax-air-cargo-db`
   - Master Username: `postgres`
   - Master Password: (generate and save securely)
   - DB Name: `pax_cargo`
   - Instance class: `db.t3.micro` (free tier eligible)
   - Storage: 20 GB, gp2
   - Public accessibility: YES (for testing; restrict later)
   - VPC: Default VPC
   - Security Group: Allow inbound PostgreSQL (5432) from anywhere (0.0.0.0/0)

3. **Note the endpoint** (e.g., `pax-air-cargo-db.c12345.us-east-1.rds.amazonaws.com`)
4. **Note your password** (you'll need it for environment variables)

---

## Step 2: Prepare Backend for Amplify Deployment

### 2a. Create `.env.production` file
In `pax-air-cargo-api/` directory, create file `.env.production`:
```
NODE_ENV=production
DB_HOST={YOUR_RDS_ENDPOINT}
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD={YOUR_RDS_PASSWORD}
DB_NAME=pax_cargo
CORS_ORIGIN=https://{YOUR_AMPLIFY_FRONTEND_DOMAIN}
PORT=3000
```

### 2b. Update package.json for production
Ensure your `pax-air-cargo-api/package.json` has:
```json
{
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "dev": "ts-node src/index.ts"
  }
}
```

### 2c. Build backend locally (verify it works)
```powershell
cd pax-air-cargo-api
npm install
npm run build
```

Verify `dist/index.js` exists (compiled code).

---

## Step 3: Deploy Backend to Amplify

### 3a. Initialize Amplify in backend directory
```powershell
cd pax-air-cargo-api
amplify init
```

Follow prompts:
- Project name: `pax-air-cargo-api`
- Environment: `prod`
- Editor: Visual Studio Code
- App type: Node.js
- Framework: Node.js
- Source directory: `./src`
- Distribution directory: `./dist`
- Build command: `npm run build`
- Start command: `npm start`
- AWS profile: (select your configured profile)

### 3b. Add Hosting to Backend
```powershell
amplify add hosting
```

Prompts:
- Select hosting with Amplify Console: **NO** (we want serverless backend only)
- Wait, go back. Actually we need Function/API deployment.

**Better approach: Use Amplify API (REST API with Node)**

```powershell
amplify add api
```

Prompts:
- Select from one of the below specified frameworks: **Node.js**
- Provide a friendly name for your API: `paxCargoApi`
- Provide the path (e.g., `/api`): `/api`
- Choose a Lambda runtime: **Node.js 18.x**
- Do you want to configure advanced settings for the API?: **Yes**
- Do you want to add an authorization rule?: **No** (for now)
- Do you want to add another path?: **No**

### 3c. Configure Environment Variables
```powershell
amplify env add prod
```

Set environment variables for your Lambda function. Edit `amplify/backend/function/paxCargoApi/paxCargoApi-cloudformation-template.json` and add environment variables.

**Easier: Add env vars via Amplify Console after deployment**

### 3d. Deploy Backend
```powershell
amplify push
```

Prompts:
- Are you sure you want to continue?: **Yes**
- Do you want to generate code for your newly created GraphQL API?: **No**

Wait 5-10 minutes for AWS to provision the backend.

---

## Step 4: Get Your Backend API Endpoint

After deployment completes:
```powershell
amplify status
```

Look for API endpoint URL (format: `https://xxxxxxx.execute-api.{region}.amazonaws.com/prod/api`)

Note this URL.

---

## Step 5: Configure Environment Variables in Lambda

1. **AWS Console** → Lambda → Functions → Search for `paxCargoApi`
2. **Click the function** → Configuration → Environment Variables
3. **Edit** and add:
   ```
   NODE_ENV = production
   DB_HOST = {YOUR_RDS_ENDPOINT}
   DB_PORT = 5432
   DB_USER = postgres
   DB_PASSWORD = {YOUR_RDS_PASSWORD}
   DB_NAME = pax_cargo
   CORS_ORIGIN = https://{YOUR_AMPLIFY_FRONTEND_DOMAIN}
   ```
4. **Save**

---

## Step 6: Test Backend Deployment

```powershell
# Get your API endpoint from Amplify Console or:
$API_URL = "https://xxxxxxx.execute-api.us-east-1.amazonaws.com/prod/api"

# Test health check
curl "$API_URL/health"

# Expected response:
# {"status":"ok","database":"connected","timestamp":"2025-12-15T..."}

# Test calculation endpoint
curl -X POST "$API_URL/calculation" `
  -H "Content-Type: application/json" `
  -d @'{
    "origin": "JFK",
    "destination": "PEK",
    "aircraftType": "B747",
    "distance": 6800,
    "fuelPrice": 3.50
  }'
```

---

## Step 7: Update Frontend to Use New Backend

1. **Edit frontend API configuration:**
   - File: `pax-air-cargo-calculator/src/services/api.ts`
   - Update `API_BASE_URL`:
     ```typescript
     const API_BASE_URL = 'https://xxxxxxx.execute-api.us-east-1.amazonaws.com/prod/api';
     ```

2. **Rebuild and deploy frontend:**
   ```powershell
   cd pax-air-cargo-calculator
   git add -A
   git commit -m "Update backend URL to Amplify API deployment"
   git push origin main
   ```

3. **Frontend auto-deploys on Amplify** (triggered by git push)

---

## Step 8: Verify End-to-End Integration

1. **Open your Amplify frontend URL** (e.g., `https://main.d3k5rru5tez6dk.amplifyapp.com`)
2. **Navigate to Calculator**
3. **Enter a route:** Origin: JFK, Destination: PEK
4. **Click "Calculate Should-Cost"**
5. **Verify results appear** with demand analysis, seasonality gauge, etc.

---

## Step 9: Monitor Logs

View Lambda function logs:
```powershell
# View recent logs
amplify logs function paxCargoApi

# Or in AWS Console: CloudWatch → Log Groups → /aws/lambda/paxCargoApi-{hash}
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 504 Gateway Timeout | Lambda timeout too short. Increase in AWS Lambda console → Configuration → General settings → Timeout (set to 30 sec) |
| Connection refused to RDS | RDS security group not allowing Lambda. Add inbound rule: PostgreSQL 5432 from 0.0.0.0/0 |
| 403 Forbidden | CORS issue. Update `CORS_ORIGIN` env var to match frontend URL exactly |
| Environment variables not loading | Restart Lambda function: Deploy another push via `amplify push` |
| `amplify init` fails | Run `amplify init --yes` to use defaults |
| `amplify add api` not working | Update Amplify CLI: `npm install -g @aws-amplify/cli@latest` |

---

## Cost Estimate (Monthly)

- **AWS Lambda:** ~$0.20 per million requests + $0.0000166667 per GB-second
  - Typical: 10,000 requests/day = ~$0.06/month
- **RDS db.t3.micro:** ~$0.017/hour = ~$12/month (first year free)
- **NAT Gateway (if needed):** $32/month (optional, for private RDS)
- **Total (first year):** ~$1-15/month (Lambda only) or ~$40-60/month (with private RDS)

---

## Next Steps

1. ✅ Create RDS database (Step 1)
2. ⬜ Prepare backend for Amplify (Step 2)
3. ⬜ Deploy backend via Amplify CLI (Step 3)
4. ⬜ Get API endpoint (Step 4)
5. ⬜ Configure environment variables (Step 5)
6. ⬜ Test backend API (Step 6)
7. ⬜ Update frontend with new backend URL (Step 7)
8. ⬜ Verify end-to-end integration (Step 8)

---

## Alternative: Use AWS Elastic Beanstalk Instead

If you prefer traditional server-based deployment instead of Lambda:
- See `DEPLOY_ELASTICBEANSTALK.md` in this directory
- More predictable performance, higher baseline cost
- Better for long-running processes

---

## Support

For Amplify-specific issues:
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Amplify CLI Reference](https://docs.amplify.aws/cli/)
