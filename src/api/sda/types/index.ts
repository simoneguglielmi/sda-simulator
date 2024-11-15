import { Prisma } from '@prisma/client';

export const DI = {
  SDAService: Symbol.for('SDAService'),
  SDAController: Symbol.for('SDAController'),
  PrismaClient: Symbol.for('PrismaClient'),
};
