const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Use production DATABASE_URL from environment
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function initProductionDatabase() {
  try {
    console.log('🍽️  Initializing Production Database for Futurescape Lunch Tracker\n');
    console.log('Connecting to database...\n');

    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected!\n');

    // Check if admin exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📋 ADMIN CREDENTIALS:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`   Employee ID: ${existingAdmin.employeeId}`);
      console.log(`   Passcode: admin123`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } else {
      console.log('👤 Creating admin user...');
      const hashedPasscode = await bcrypt.hash('admin123', 10);
      
      const admin = await prisma.user.create({
        data: {
          name: 'Admin',
          employeeId: 'ADMIN001',
          passcode: hashedPasscode,
          role: 'ADMIN',
        },
      });

      console.log('✅ Admin user created successfully!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📋 ADMIN CREDENTIALS:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`   Employee ID: ${admin.employeeId}`);
      console.log(`   Passcode: admin123`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }

    // Check database tables
    const userCount = await prisma.user.count();
    const updateCount = await prisma.lunchUpdate.count();
    
    console.log('📊 Database Status:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Lunch Updates: ${updateCount}`);
    console.log('');

    console.log('✅ Production database initialized successfully!');
  } catch (error) {
    console.error('\n❌ Error initializing database:', error.message);
    if (error.message.includes('P1001')) {
      console.log('\n💡 Database connection failed. Check:');
      console.log('   1. DATABASE_URL is correct');
      console.log('   2. Database is active');
      console.log('   3. Network allows connections');
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

initProductionDatabase();

