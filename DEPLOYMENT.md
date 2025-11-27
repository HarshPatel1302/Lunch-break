# Deployment Guide for Vercel

## Pre-Deployment Checklist ✅

- [x] All tests passing (31/31 tests)
- [x] Database schema configured for PostgreSQL
- [x] Environment variables documented
- [x] Build scripts configured
- [x] Prisma client generation in build process
- [x] Git repository initialized
- [x] Code pushed to GitHub

## Step-by-Step Deployment

### 1. GitHub Repository
✅ Repository created: `lunch-break`
✅ Code pushed to: `https://github.com/HarshPatel1302/lunch-break`

### 2. Vercel Setup

#### A. Create Vercel Postgres Database
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** → **Create Database** → **Postgres**
3. Create a new Postgres database
4. Copy the **Connection String** (DATABASE_URL)

#### B. Deploy Application
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Import repository: `HarshPatel1302/lunch-break`
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (default)
   - **Build Command:** `prisma generate && npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

#### C. Add Environment Variables
In Vercel project settings → Environment Variables, add:

```
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key-min-32-characters
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

#### D. Deploy
1. Click **Deploy**
2. Wait for build to complete
3. Note your deployment URL

### 3. Initialize Database

After first deployment, initialize the database:

**Option 1: Using Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local
npx prisma db push
node scripts/setup-db.js
```

**Option 2: Using Vercel Dashboard**
1. Go to your project → Storage → Your Postgres database
2. Open the database console
3. Run Prisma migrations manually or use the connection string locally

**Option 3: Using Prisma Studio (Local)**
```bash
# Pull environment variables
vercel env pull .env.local

# Push schema
npx prisma db push

# Create admin user
node scripts/setup-db.js
```

### 4. Verify Deployment

1. **Check Application:**
   - Visit your Vercel URL
   - Should redirect to `/login`

2. **Test Admin Login:**
   - Employee ID: `ADMIN001`
   - Passcode: `admin123`

3. **Test Employee Creation:**
   - Login as admin
   - Add a test employee
   - Verify employee ID is auto-generated (01, 02, 03...)

4. **Test Data Persistence:**
   - Create lunch updates
   - Refresh page
   - Data should persist

5. **Test Real-time Updates:**
   - Open feed page
   - Updates refresh every 5 seconds automatically

## Post-Deployment

### Security Recommendations
1. ✅ Change admin passcode after first login
2. ✅ Use strong NEXTAUTH_SECRET (32+ characters)
3. ✅ Enable Vercel authentication if needed
4. ✅ Monitor database usage (free tier limits)

### Monitoring
- Check Vercel logs for errors
- Monitor database connections
- Check build logs for Prisma generation

### Troubleshooting

**Issue: Database connection error**
- Verify DATABASE_URL is correct
- Check database is active in Vercel
- Ensure schema is pushed: `npx prisma db push`

**Issue: Prisma client not generated**
- Check build logs
- Verify `postinstall` script in package.json
- Manually run: `npx prisma generate`

**Issue: Admin user not created**
- Run: `node scripts/setup-db.js`
- Or create manually via Prisma Studio

**Issue: Employee IDs not incrementing**
- Check database has existing employees
- Verify employeeId field is unique
- Check Prisma schema is correct

## Data Persistence Guarantees ✅

- ✅ All employee data (ID, name, passcode) saved in PostgreSQL
- ✅ All lunch updates saved with timestamps
- ✅ Data persists across deployments
- ✅ Real-time updates work (5-second refresh)
- ✅ Employee IDs auto-increment correctly (01, 02, 03...)

## Support

For issues:
1. Check Vercel build logs
2. Check Vercel function logs
3. Verify environment variables
4. Test database connection

