#!/bin/bash

echo "🍽️  Setting up Vercel Environment Variables"
echo "============================================"
echo ""

# Check if vercel CLI is available
if ! command -v npx vercel &> /dev/null; then
    echo "📦 Vercel CLI will be used via npx"
fi

echo "📝 Setting environment variables in Vercel..."
echo ""

# Set DATABASE_URL (use Prisma URL for better compatibility)
echo "Setting DATABASE_URL..."
npx vercel env add DATABASE_URL production <<EOF
postgresql://neondb_owner:npg_5QtBYUAy3nqb@ep-fancy-wildflower-ahvike7t-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
EOF

echo ""
echo "Setting DATABASE_URL for preview..."
npx vercel env add DATABASE_URL preview <<EOF
postgresql://neondb_owner:npg_5QtBYUAy3nqb@ep-fancy-wildflower-ahvike7t-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
EOF

echo ""
echo "Setting DATABASE_URL for development..."
npx vercel env add DATABASE_URL development <<EOF
postgresql://neondb_owner:npg_5QtBYUAy3nqb@ep-fancy-wildflower-ahvike7t-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
EOF

echo ""
echo "Setting NEXTAUTH_URL..."
npx vercel env add NEXTAUTH_URL production <<EOF
https://lunch-break-mocha.vercel.app
EOF

echo ""
echo "Setting NEXTAUTH_URL for preview..."
npx vercel env add NEXTAUTH_URL preview <<EOF
https://lunch-break-mocha.vercel.app
EOF

echo ""
echo "Setting NEXTAUTH_URL for development..."
npx vercel env add NEXTAUTH_URL development <<EOF
http://localhost:3000
EOF

echo ""
echo "Generating NEXTAUTH_SECRET..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)
echo "Generated secret: $NEXTAUTH_SECRET"
echo ""

echo "Setting NEXTAUTH_SECRET for production..."
npx vercel env add NEXTAUTH_SECRET production <<EOF
$NEXTAUTH_SECRET
EOF

echo ""
echo "Setting NEXTAUTH_SECRET for preview..."
npx vercel env add NEXTAUTH_SECRET preview <<EOF
$NEXTAUTH_SECRET
EOF

echo ""
echo "Setting NEXTAUTH_SECRET for development..."
npx vercel env add NEXTAUTH_SECRET development <<EOF
$NEXTAUTH_SECRET
EOF

echo ""
echo "✅ Environment variables set!"
echo ""
echo "📋 Next steps:"
echo "   1. Initialize database: npx prisma db push"
echo "   2. Create admin user: node scripts/setup-db.js"
echo "   3. Redeploy on Vercel"
echo ""

