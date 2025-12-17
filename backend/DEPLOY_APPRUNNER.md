# PAX Air Cargo API - AppRunner + RDS Deployment Guide

This guide deploys the backend to AWS AppRunner with PostgreSQL on RDS. Total setup time: ~20 minutes.

## Prerequisites
- AWS Account with permissions to create RDS, ECR, and AppRunner services
- Docker Desktop installed locally
- AWS CLI configured (`aws configure`)

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
   - Public accessibility: YES (for now; restrict later)
   - VPC: Default VPC
   - Publicly accessible: Yes

3. **Note the endpoint** (e.g., `pax-air-cargo-db.c12345.us-east-1.rds.amazonaws.com`)

4. **Security Group - Allow Inbound:**
   - PostgreSQL (5432) from AppRunner security group (or 0.0.0.0/0 for testing)

---

## Step 2: Push Docker Image to ECR

### 2a. Create ECR Repository
```powershell
# Set region (change if needed)
$AWS_REGION = "us-east-1"
$REPO_NAME = "pax-air-cargo-api"

# Create repository
aws ecr create-repository `
  --repository-name $REPO_NAME `
  --region $AWS_REGION
```

### 2b. Build and Push Docker Image
```powershell
# Get ECR login token and push image
$AWS_ACCOUNT_ID = (aws sts get-caller-identity --query Account --output text)
$ECR_URI = "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME"

# Login to ECR (PowerShell-compatible approach)
$LOGIN_PASSWORD = aws ecr get-login-password --region $AWS_REGION
$LOGIN_PASSWORD | docker login --username AWS --password-stdin $ECR_URI

# Build Docker image from pax-air-cargo-api directory
docker build -t $ECR_URI`:latest .

# Push to ECR
docker push $ECR_URI`:latest
```

**Note:** If Docker build fails, ensure you're in the `pax-air-cargo-api` directory and have run `npm install` first.

---

## Step 3: Create AppRunner Service

1. **AWS Console** → AppRunner → Create Service
2. **Source Configuration:**
   - Repository type: Container registry (ECR)
   - ECR URI: `{AWS_ACCOUNT_ID}.dkr.ecr.{REGION}.amazonaws.com/pax-air-cargo-api:latest`
   - Image repository type: Private
   - Deployment trigger: Manual (or Automatic if you want CI/CD)

3. **Service Configuration:**
   - Service name: `pax-air-cargo-api`
   - Port: `3000`
   - CPU: 0.25 vCPU
   - Memory: 512 MB
   - Concurrency: 100

4. **Environment Variables** (click "Add environment variable"):
   ```
   NODE_ENV = production
   DB_HOST = {RDS_ENDPOINT}
   DB_PORT = 5432
   DB_USER = postgres
   DB_PASSWORD = {YOUR_MASTER_PASSWORD}
   DB_NAME = pax_cargo
   CORS_ORIGIN = https://{FRONTEND_DOMAIN}
   PORT = 3000
   ```

5. **Health Check:**
   - Path: `/api/health`
   - Protocol: HTTP
   - Healthy threshold: 2
   - Unhealthy threshold: 5
   - Interval: 30 sec
   - Timeout: 5 sec

6. **Create Service** → Wait for deployment (3-5 minutes)

---

## Step 4: Test Backend Deployment

Once AppRunner service is running:

```powershell
# Get AppRunner service URL from AWS Console (e.g., https://xxxx.us-east-1.apprunner.amazonaws.com)
$APPRUNNER_URL = "https://YOUR_APPRUNNER_URL"

# Test health check
curl "$APPRUNNER_URL/api/health"

# Expected response:
# {"status":"ok","database":"connected","timestamp":"2025-12-15T..."}

# Test calculation endpoint
curl -X POST "$APPRUNNER_URL/api/calculation" `
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

## Step 5: Connect Frontend to Deployed Backend

1. **Edit frontend configuration:**
   - File: `pax-air-cargo-calculator/src/services/api.ts`
   - Update `API_BASE_URL` to AppRunner URL:
     ```typescript
     const API_BASE_URL = 'https://YOUR_APPRUNNER_URL/api';
     ```

2. **Rebuild and deploy frontend to Amplify:**
   ```powershell
   cd pax-air-cargo-calculator
   npm run build
   # Commit and push to GitHub
   git add -A
   git commit -m "Update backend URL to AppRunner deployment"
   git push origin main
   ```

3. **Frontend auto-deploys on Amplify** (or manually trigger through AWS Console)

---

## Step 6: Verify End-to-End Integration

1. Open your Amplify frontend URL
2. Navigate to Calculator
3. Enter a route (e.g., JFK → PEK)
4. Click "Calculate Should-Cost"
5. Verify calculation results appear with demand analysis

---

## Monitoring & Scaling

- **View Logs:** AppRunner → Service → Logs
- **Auto-Scaling:** AppRunner → Service → Configuration → Scaling settings (default: 1-25 instances)
- **Alarms:** CloudWatch → Create alarm for error rate or request count

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Health check failing | Check RDS security group allows 5432 from AppRunner. Verify DB credentials in env vars. |
| 404 calculation endpoint | Ensure backend deployed successfully. Check AppRunner logs for startup errors. |
| CORS errors in frontend | Verify `CORS_ORIGIN` env var matches frontend domain exactly. |
| Docker build fails locally | Run `npm install` first, ensure Node.js 18+ installed. Check `npm run build` succeeds. |
| Image push fails | Verify AWS credentials: `aws sts get-caller-identity`. Re-run ECR login command. |

---

## Cost Estimate (Monthly)

- **AppRunner:** ~$0.064/hour = ~$47/month (always running)
- **RDS db.t3.micro:** ~$0.017/hour = ~$12/month (free tier after first year)
- **ECR Storage:** <$1 (small image ~500MB)
- **Total (first year):** ~$50-60/month

---

## Next Steps
1. Create RDS database (Step 1)
2. Build and push Docker image (Step 2)
3. Create AppRunner service (Step 3)
4. Test endpoints (Step 4)
5. Connect frontend and verify (Steps 5-6)
