import { PrismaClient } from "@prisma/client";

// Prevents multiple Prisma Client instances in dev (hot reload) per Prisma's
// own recommendation for Next.js App Router.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
