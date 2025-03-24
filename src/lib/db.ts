import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// Initialize Prisma Client
const prismaClientSingleton = () => {
  return new PrismaClient()
}

// Create a single instance of PrismaClient
export const db = globalThis.prisma ?? prismaClientSingleton()

// In development, attach the client to the global object to prevent multiple instances
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db