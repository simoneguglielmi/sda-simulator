import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Request, type Response, type Router } from 'express';
import { z } from 'zod';
import prisma from '@/common/utils/prisma';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { logger } from '@/server';
import { ItemTracking, Prisma } from '@prisma/client';

export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter: Router = express.Router();

healthCheckRegistry.registerPath({
  method: 'get',
  path: '/health-check',
  tags: ['Health Check'],
  responses: createApiResponse(z.null(), 'Success'),
});

healthCheckRouter.get('/', async (_req: Request, res: Response) => {
  let dbStatus: string | null = null;
  try {
    const resDb = await prisma.$queryRaw<{ result: bigint }[]>(
      Prisma.sql`SELECT 1+1 as result`
    );

    if (resDb[0].result !== 2n) {
      dbStatus = 'down';
    }
    dbStatus = 'up';
  } catch (error) {
    logger.error('Error connecting to database: ', error);
    dbStatus = 'down';
  }

  const serviceResponse = ServiceResponse.success({
    dbStatus,
  });
  return handleServiceResponse(serviceResponse, res);
});
