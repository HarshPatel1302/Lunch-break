# 🚀 Vercel Environment Variables Setup

## Your Neon Database Connection

I've prepared everything for your Neon database. Here's what to do:

## Step 1: Set Environment Variables in Vercel Dashboard

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these **3 variables**:

### 1. DATABASE_URL
- **Key:** `DATABASE_URL`
- **Value:** 
  ```
  postgresql://neondb_owner:npg_5QtBYUAy3nqb@ep-fancy-wildflower-ahvike7t-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
  ```
- **Environments:** Production, Preview, Development (select all)

### 2. NEXTAUTH_URL
- **Key:** `NEXTAUTH_URL`
- **Value:** `https://lunch-break-mocha.vercel.app`
- **Environments:** Production, Preview
- **For Development:** `http://localhost:3000`

### 3. NEXTAUTH_SECRET
- **Key:** `NEXTAUTH_SECRET`
- **Value:** Generate with this command:
  ```bash
  openssl rand -base64 32
  ```
- Copy the output and paste as value
- **Environments:** Production, Preview, Development (select all)

**After adding each variable, click Save!**

---

## Step 2: Initialize Database Locally

Run these commands in your terminal:

```bash
cd "/Users/harshui/Documents/FutureScape/untitled folder"

# Set local environment variable
export DATABASE_URL="postgresql://neondb_owner:npg_5QtBYUAy3nqb@ep-fancy-wildflower-ahvike7t-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push --accept-data-loss

# Create admin user
node scripts/setup-db.js
```

---

## Step 3: Redeploy on Vercel

1. Go to **Vercel Dashboard → Your Project → Deployments**
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

---

## Step 4: Verify Everything Works

1. **Check Health Endpoint:**
   ```
   https://lunch-break-mocha.vercel.app/api/health
   ```
   Should return: `{"status":"ok","database":"connected"}`

2. **Test Login:**
   ```
   https://lunch-break-mocha.vercel.app/login
   ```
   - Employee ID: `ADMIN001`
   - Passcode: `admin123`

---

## Alternative: Use Automated Script

I've created a script to set environment variables automatically:

```bash
cd "/Users/harshui/Documents/FutureScape/untitled folder"

# Make sure you're logged in to Vercel first
npx vercel login

# Link to your project
npx vercel link

# Run the setup script
./setup-vercel-env.sh
```

Then initialize database:
```bash
npx prisma db push --accept-data-loss
node scripts/setup-db.js
```

---

## ✅ Checklist

- [ ] DATABASE_URL set in Vercel (all environments)
- [ ] NEXTAUTH_URL set in Vercel
- [ ] NEXTAUTH_SECRET set in Vercel (all environments)
- [ ] Database schema pushed locally
- [ ] Admin user created
- [ ] Project redeployed on Vercel
- [ ] Health endpoint returns OK
- [ ] Can login successfully

---

## 🆘 Troubleshooting

**If database connection fails:**
- Verify DATABASE_URL is correct (check for typos)
- Ensure SSL mode is set: `?sslmode=require`
- Check Neon database is active

**If Prisma errors:**
- Use non-pooled connection for migrations:
  ```
  DATABASE_URL=postgresql://neondb_owner:npg_5QtBYUAy3nqb@ep-fancy-wildflower-ahvike7t.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
  ```
- Then run: `npx prisma db push`

**If still having issues:**
- Check Vercel build logs
- Check Vercel function logs
- Verify all environment variables are set correctly

