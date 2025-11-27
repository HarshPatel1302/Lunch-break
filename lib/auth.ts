import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        employeeId: { label: "Employee ID", type: "text" },
        passcode: { label: "Passcode", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.employeeId || !credentials?.passcode) {
            console.log("Missing credentials");
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { employeeId: credentials.employeeId },
          });

          if (!user) {
            console.log(`User not found: ${credentials.employeeId}`);
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.passcode,
            user.passcode
          );

          if (!isValid) {
            console.log(`Invalid passcode for user: ${credentials.employeeId}`);
            return null;
          }

          return {
            id: user.id,
            employeeId: user.employeeId,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.employeeId = (user as any).employeeId;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.employeeId = token.employeeId as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

