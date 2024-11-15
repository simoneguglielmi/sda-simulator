import prisma from '@/common/utils/prisma';
import { Container } from 'inversify';
import { SDAController } from './sdaController';
import { ISDAController, ISDAService } from './interfaces';
import { SDAService } from './sdaService';
import { DI } from './types';
import { PrismaClient } from '@prisma/client';

const container = new Container();

container.bind<PrismaClient>(DI.PrismaClient).toConstantValue(prisma);

container.bind<ISDAService>(DI.SDAService).to(SDAService);

container.bind<ISDAController>(DI.SDAController).to(SDAController);

export default container;
