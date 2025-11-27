# 🔧 Fix Production Deployment - Complete Guide

## The Issue
Your website is deployed but showing "Invalid Employee ID or Passcode" because:
1. Database schema might not be pushed to production
2. Admin user doesn't exist in production database

## ✅ Solution: Initialize Production Database

### Step 1: Connect to Production Database Locally

Run these commands in your terminal:

```bash
cd "/Users/harshui/Documents/FutureScape/untitled folder"

# Set production DATABASE_URL
export DATABASE_URL="postgresql://neondb_owner:npg_5QtBYUAy3nqb@ep-fancy-wildflower-ahvike7t-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Generate Prisma Client
npx prisma generate

# Push database schema to production
npx prisma db push --accept-data-loss

# Create admin user in production
node scripts/init-production-db.js
```

### Step 2: Verify It Works

After running the commands, test:

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

### Step 3: If Still Not Working

**Check Vercel Logs:**
1. Go to Vercel Dashboard → Your Project → **Functions**
2. Click on any function → **Logs** tab
3. Look for database connection errors

**Verify Environment Variables:**
1. Vercel Dashboard → Settings → Environment Variables
2. Make sure all 3 variables are set:
   - ✅ DATABASE_URL
   - ✅ NEXTAUTH_URL
   - ✅ NEXTAUTH_SECRET

**Redeploy:**
1. Go to Deployments
2. Click **Redeploy** on latest deployment

---

## 🚀 Quick Fix Script

I've created a script that does everything automatically. Run:

```bash
cd "/Users/harshui/Documents/FutureScape/untitled folder"
./init-production.sh
```

---

## ✅ Success Checklist

- [ ] Database schema pushed to production
- [ ] Admin user created in production database
- [ ] Health endpoint returns OK
- [ ] Can login with ADMIN001 / admin123
- [ ] Dashboard loads correctly
- [ ] Can create employees
- [ ] Employee IDs auto-generate (01, 02, 03...)

---

## 🆘 Still Having Issues?

**Check Database Connection:**
```bash
export DATABASE_URL="postgresql://neondb_owner:npg_5QtBYUAy3nqb@ep-fancy-wildflower-ahvike7t-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
npx prisma studio
```

This will open Prisma Studio where you can:
- See all users
- Verify admin exists
- Check database tables

