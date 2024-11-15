import express, { type Router } from 'express';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { GetSDASchema, PatchSDASchema, SDASchema } from '@/api/sda/models';
import { validateRequest } from '@/common/utils/httpHandlers';
import { SDAController } from './sdaController';
import container from './module';
import { DI } from './types';

const sdaController = container.get<SDAController>(DI.SDAController);

export const sdaRegistry = new OpenAPIRegistry();
export const sdaRouter: Router = express.Router();

sdaRegistry.register('SDA', SDASchema);

sdaRegistry.registerPath({
  method: 'get',
  path: '/sda',
  tags: ['SDA'],
  responses: createApiResponse(z.array(SDASchema), 'Success'),
});

sdaRouter.get('/', sdaController.findAll.bind(sdaController));

sdaRegistry.registerPath({
  method: 'get',
  path: '/sda/{id}',
  tags: ['SDA'],
  request: { params: GetSDASchema.shape.params },
  responses: createApiResponse(SDASchema, 'Success'),
});

sdaRouter.get(
  '/:id',
  validateRequest(GetSDASchema),
  sdaController.find.bind(sdaController)
);

sdaRegistry.registerPath({
  method: 'patch',
  path: '/sda/{id}',
  tags: ['SDA'],
  request: {
    params: GetSDASchema.shape.params,
    body: {
      content: {
        'application/json': { schema: PatchSDASchema },
      },
    },
  },
  responses: createApiResponse(SDASchema, 'Success'),
});

sdaRouter.patch(
  '/:id',
  validateRequest(PatchSDASchema),
  sdaController.updateStatus.bind(sdaController)
);
