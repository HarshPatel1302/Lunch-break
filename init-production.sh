#!/bin/bash

echo "🍽️  Initializing Production Database for Futurescape Lunch Tracker"
echo "===================================================================="
echo ""

# Set production DATABASE_URL
export DATABASE_URL="postgresql://neondb_owner:npg_5QtBYUAy3nqb@ep-fancy-wildflower-ahvike7t-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

echo "📊 Step 1: Generating Prisma Client..."
npx prisma generate

echo ""
echo "📊 Step 2: Pushing database schema to production..."
npx prisma db push --accept-data-loss

echo ""
echo "👤 Step 3: Creating admin user in production database..."
node scripts/init-production-db.js

echo ""
echo "✅ Production database initialized!"
echo ""
echo "📋 Next steps:"
echo "   1. Test health endpoint: https://lunch-break-mocha.vercel.app/api/health"
echo "   2. Test login: https://lunch-break-mocha.vercel.app/login"
echo "      - Employee ID: ADMIN001"
echo "      - Passcode: admin123"
echo ""

