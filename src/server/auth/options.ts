import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
// Update this import path after moving prisma
import { prisma } from "@/server/db"; 

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Find user by email
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });

        // Check if user exists
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Verify password
        const passwordMatch = await compare(credentials.password, user.password);
        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

        // Return user data (excluding password)
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
    error: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user ID to token when first signing in
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to session
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_key_change_in_production",
}; 