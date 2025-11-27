# Vercel Deployment Setup Guide

## Quick Fix for Server Error

If you're seeing a "Server error" on Vercel, follow these steps:

### Step 1: Check Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Required Variables:**
```
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key-min-32-characters
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 2: Initialize Database

After setting environment variables, you need to initialize the database schema:

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Push database schema
npx prisma db push

# Create admin user
node scripts/setup-db.js
```

**Option B: Using Prisma Studio (Local)**
1. Pull environment variables: `vercel env pull .env.local`
2. Open Prisma Studio: `npx prisma studio`
3. Manually create admin user or run: `node scripts/setup-db.js`

### Step 3: Redeploy

After initializing the database:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to trigger automatic deployment

### Step 4: Verify Deployment

1. Check health endpoint: `https://your-app.vercel.app/api/health`
   - Should return: `{"status":"ok","database":"connected"}`

2. Test login:
   - Go to: `https://your-app.vercel.app/login`
   - Employee ID: `ADMIN001`
   - Passcode: `admin123`

### Common Issues

**Issue: "Server error" or "Configuration error"**
- ✅ Check DATABASE_URL is set correctly
- ✅ Verify database is active in Vercel Storage
- ✅ Ensure NEXTAUTH_SECRET is set
- ✅ Check build logs for Prisma generation errors

**Issue: "Database connection failed"**
- ✅ Verify DATABASE_URL format is correct
- ✅ Check database is not paused
- ✅ Ensure IP allowlist allows Vercel IPs (if applicable)

**Issue: "Prisma Client not generated"**
- ✅ Check build logs show "Generated Prisma Client"
- ✅ Verify `postinstall` script runs: `prisma generate`
- ✅ Check `package.json` has correct scripts

**Issue: "Unauthorized" errors**
- ✅ Verify NEXTAUTH_URL matches your Vercel domain
- ✅ Check NEXTAUTH_SECRET is set
- ✅ Ensure cookies are enabled in browser

### Testing Checklist

- [ ] Health endpoint returns OK
- [ ] Login page loads
- [ ] Admin login works
- [ ] Can create employees
- [ ] Employee IDs auto-generate (01, 02, 03...)
- [ ] Can submit lunch updates
- [ ] Feed page shows updates
- [ ] Data persists after refresh

### Support

If issues persist:
1. Check Vercel Function Logs: Dashboard → Your Project → Functions → View Logs
2. Check Build Logs: Dashboard → Your Project → Deployments → View Build Logs
3. Test health endpoint: `/api/health`
4. Verify all environment variables are set

