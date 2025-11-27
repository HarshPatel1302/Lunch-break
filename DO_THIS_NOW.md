# 🎯 DO THIS NOW - Fix Your Vercel Deployment

## ⚡ Quick Steps (5 minutes)

### Step 1: Set Environment Variables in Vercel Dashboard

1. **Go to:** https://vercel.com/dashboard
2. **Click:** Your project "lunch-break"
3. **Click:** Settings → Environment Variables
4. **Add these 3 variables:**

#### Variable 1: DATABASE_URL
- **Key:** `DATABASE_URL`
- **Value:** Get from Vercel Storage:
  1. Click **Storage** tab in Vercel
  2. Click your Postgres database (or create one)
  3. Click **.env.local** tab
  4. Copy `POSTGRES_PRISMA_URL` value
  5. Paste as `DATABASE_URL`

#### Variable 2: NEXTAUTH_URL  
- **Key:** `NEXTAUTH_URL`
- **Value:** `https://lunch-break-mocha.vercel.app`

#### Variable 3: NEXTAUTH_SECRET
- **Key:** `NEXTAUTH_SECRET`
- **Value:** Run this in terminal and copy output:
  ```bash
  openssl rand -base64 32
  ```

5. **Click Save** after each variable
6. **Redeploy:** Go to Deployments → Click ⋯ → Redeploy

---

### Step 2: Initialize Database (Choose ONE method)

#### Method A: Using Terminal (Recommended)

Open Terminal and run:

```bash
cd "/Users/harshui/Documents/FutureScape/untitled folder"

# Install Vercel CLI locally
npm install vercel --save-dev

# Login to Vercel (will open browser)
npx vercel login

# Link to your project
npx vercel link
# Select: lunch-break
# Override settings? No

# Pull environment variables
npx vercel env pull .env.local

# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push --accept-data-loss

# Create admin user
node scripts/setup-db.js
```

#### Method B: Manual Database Setup

If you can't use terminal, you can set up the database manually:

1. **Go to Vercel Storage:**
   - Vercel Dashboard → Storage → Your Postgres DB
   - Click **Connect** or **Data** tab

2. **Run SQL commands:**
   - Copy the SQL from `prisma/schema.prisma`
   - Or use Prisma Studio: `npx prisma studio` (if you have DATABASE_URL set locally)

3. **Create Admin User:**
   - Use the database interface to insert:
     - `id`: (auto-generated)
     - `employeeId`: `ADMIN001`
     - `name`: `Admin`
     - `passcode`: (hashed - use bcrypt)
     - `role`: `ADMIN`
     - `createdAt`: (now)
     - `updatedAt`: (now)

---

### Step 3: Verify It Works

1. **Check Health Endpoint:**
   ```
   https://lunch-break-mocha.vercel.app/api/health
   ```
   Should show: `{"status":"ok","database":"connected"}`

2. **Test Login:**
   ```
   https://lunch-break-mocha.vercel.app/login
   ```
   - Employee ID: `ADMIN001`
   - Passcode: `admin123`

---

## 🆘 If Something Goes Wrong

### Check Vercel Logs:
1. Vercel Dashboard → Your Project → **Deployments**
2. Click latest deployment → **Build Logs**
3. Look for errors (especially Prisma-related)

### Common Issues:

**"Database connection failed"**
- ✅ Check DATABASE_URL is correct
- ✅ Verify database is active (not paused)
- ✅ Check connection string format

**"Prisma Client not found"**
- ✅ Check build logs show "Generated Prisma Client"
- ✅ Verify `postinstall` script runs

**"Unauthorized"**
- ✅ Check NEXTAUTH_URL matches your domain exactly
- ✅ Verify NEXTAUTH_SECRET is set
- ✅ No trailing slashes in URLs

---

## ✅ Success Checklist

- [ ] Environment variables set in Vercel (all 3)
- [ ] Project redeployed after setting variables
- [ ] Database schema pushed (`prisma db push`)
- [ ] Admin user created
- [ ] Health endpoint returns OK
- [ ] Can login successfully
- [ ] Dashboard loads correctly

---

**Need help?** Check:
- Build logs: Vercel Dashboard → Deployments → Build Logs  
- Function logs: Vercel Dashboard → Functions → Logs
- Health endpoint: `/api/health`

