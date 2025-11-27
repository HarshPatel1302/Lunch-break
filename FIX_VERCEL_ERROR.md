# 🔧 Fix Vercel Server Error - Step by Step

## The Problem
You're seeing "Server error" because the database isn't initialized or environment variables aren't set.

## ✅ Solution (Follow These Steps)

### Step 1: Set Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project: **lunch-break**
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables:

#### Variable 1: DATABASE_URL
- **Key:** `DATABASE_URL`
- **Value:** Your PostgreSQL connection string from Vercel Storage
- **How to get it:**
  1. In Vercel Dashboard → **Storage** tab
  2. Click on your Postgres database (or create one if you don't have it)
  3. Go to **.env.local** tab
  4. Copy the `POSTGRES_PRISMA_URL` or `POSTGRES_URL_NON_POOLING`
  5. Use that as your `DATABASE_URL`

#### Variable 2: NEXTAUTH_URL
- **Key:** `NEXTAUTH_URL`
- **Value:** `https://lunch-break-mocha.vercel.app` (or your actual Vercel URL)
- **How to find it:** Check your Vercel deployment URL

#### Variable 3: NEXTAUTH_SECRET
- **Key:** `NEXTAUTH_SECRET`
- **Value:** Generate a random secret (run this command):
  ```bash
  openssl rand -base64 32
  ```
- Copy the output and paste it as the value

**Important:** After adding variables, click **Save** and **Redeploy** your project!

### Step 2: Create Vercel Postgres Database (If Not Done)

1. In Vercel Dashboard → **Storage** tab
2. Click **Create Database**
3. Select **Postgres**
4. Choose a name (e.g., "lunch-break-db")
5. Select a region (closest to you)
6. Click **Create**
7. Wait for database to be ready
8. Copy the connection string from the **.env.local** tab

### Step 3: Initialize Database Schema

After setting environment variables, initialize the database:

**Option A: Using Terminal (Easiest)**

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Navigate to your project folder
cd "/Users/harshui/Documents/FutureScape/untitled folder"

# Link to your Vercel project
vercel link

# Pull environment variables
vercel env pull .env.local

# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push

# Create admin user
node scripts/setup-db.js
```

**Option B: Using Vercel Dashboard**

1. Go to your project → **Storage** → Your Postgres database
2. Click **Connect** or **.env.local** tab
3. Copy the connection string
4. Use it locally:
   ```bash
   # Create .env.local file
   echo 'DATABASE_URL="your-connection-string-here"' > .env.local
   echo 'NEXTAUTH_URL="https://lunch-break-mocha.vercel.app"' >> .env.local
   echo 'NEXTAUTH_SECRET="your-secret-here"' >> .env.local
   
   # Push schema
   npx prisma db push
   
   # Create admin
   node scripts/setup-db.js
   ```

### Step 4: Redeploy on Vercel

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** tab
3. Click the **⋯** (three dots) on the latest deployment
4. Click **Redeploy**
5. Wait for deployment to complete

### Step 5: Verify It's Working

1. **Check Health Endpoint:**
   - Visit: `https://lunch-break-mocha.vercel.app/api/health`
   - Should show: `{"status":"ok","database":"connected"}`

2. **Test Login:**
   - Visit: `https://lunch-break-mocha.vercel.app/login`
   - Employee ID: `ADMIN001`
   - Passcode: `admin123`
   - Should redirect to admin dashboard

3. **Test Employee Creation:**
   - After login, click "+ Add Employee"
   - Add a test employee
   - Verify employee ID is auto-generated (01, 02, 03...)

## 🚨 Still Having Issues?

### Check Build Logs
1. Vercel Dashboard → Your Project → **Deployments**
2. Click on the latest deployment
3. Check **Build Logs** for errors
4. Look for Prisma-related errors

### Check Function Logs
1. Vercel Dashboard → Your Project → **Functions**
2. Click on any function
3. Check **Logs** tab for runtime errors

### Common Errors & Fixes

**Error: "Prisma Client not generated"**
- Fix: The `postinstall` script should run automatically
- Verify: Check build logs show "Generated Prisma Client"

**Error: "Database connection failed"**
- Fix: Verify DATABASE_URL is correct
- Check: Database is active (not paused)
- Verify: Connection string format is correct

**Error: "Unauthorized"**
- Fix: Check NEXTAUTH_URL matches your domain exactly
- Verify: NEXTAUTH_SECRET is set
- Check: No trailing slashes in URLs

**Error: "Module not found: @prisma/client"**
- Fix: Ensure Prisma is in dependencies (not devDependencies)
- Verify: `postinstall` script runs: `prisma generate`

## ✅ Success Checklist

- [ ] Environment variables set in Vercel
- [ ] Database created in Vercel Storage
- [ ] Database schema pushed (`prisma db push`)
- [ ] Admin user created (`node scripts/setup-db.js`)
- [ ] Project redeployed
- [ ] Health endpoint returns OK
- [ ] Login page loads
- [ ] Can login as admin
- [ ] Can create employees
- [ ] Dashboard shows correctly

## 📞 Need Help?

If you're still stuck:
1. Check Vercel build logs
2. Check Vercel function logs
3. Test health endpoint: `/api/health`
4. Verify all environment variables are set correctly

---

**Quick Command Reference:**
```bash
# Pull env vars
vercel env pull .env.local

# Generate Prisma Client
npx prisma generate

# Push schema
npx prisma db push

# Create admin
node scripts/setup-db.js

# Check health
curl https://lunch-break-mocha.vercel.app/api/health
```

