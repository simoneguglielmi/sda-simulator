import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type Prisma = typeof prisma;

export default prisma;
