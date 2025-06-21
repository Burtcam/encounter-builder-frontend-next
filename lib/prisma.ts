// lib/prisma.ts
import { PrismaClient } from './generated/prisma';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Optional: helpful during development
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;