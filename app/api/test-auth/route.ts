import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Check if admin exists
    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!admin) {
      return NextResponse.json({
        status: "error",
        message: "Admin user not found",
        action: "Run: node scripts/init-production-db.js",
      }, { status: 404 });
    }

    // Test password verification
    const testPassword = "admin123";
    const isValid = await bcrypt.compare(testPassword, admin.passcode);

    return NextResponse.json({
      status: "ok",
      database: "connected",
      adminExists: true,
      adminId: admin.employeeId,
      passwordValid: isValid,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        database: "error",
      },
      { status: 500 }
    );
  }
}

