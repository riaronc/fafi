// Adjusted import path assuming Prisma Client is generated relative to the schema location
import { PrismaClient } from "@/server/db/client"; // Assuming the client is generated here

// This ensures the Prisma client is cached in development and not created on every hot reload
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; 