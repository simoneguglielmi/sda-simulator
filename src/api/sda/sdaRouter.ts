import express, { type Router } from 'express';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import {
  CreateSDASchema,
  GetSDASchema,
  PatchSDASchema,
  SDASchema,
} from '@/api/sda/models';
import { validateRequest } from '@/common/utils/httpHandlers';
import { SDAController } from './sdaController';
import container from './module';
import { DI } from './types';
import { env } from '@/common/utils/envConfig';

const sdaController = container.get<SDAController>(DI.SDAController);

export const sdaRegistry = new OpenAPIRegistry();
export const sdaRouter: Router = express.Router();

sdaRegistry.register('SDA', SDASchema);

const path = `${env.BASE_ENDPOINT}/sda`;

sdaRegistry.registerPath({
  method: 'get',
  path: `${path}`,
  tags: ['SDA'],
  responses: createApiResponse(z.array(SDASchema), 'Success'),
});

sdaRouter.get('/', sdaController.findAll.bind(sdaController));

sdaRegistry.registerPath({
  method: 'get',
  path: `${path}/{id}`,
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
  path: `${path}/{id}`,
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

sdaRegistry.registerPath({
  method: 'post',
  path: `${path}`,
  tags: ['SDA'],
  request: {
    body: {
      content: {
        'application/json': { schema: CreateSDASchema },
      },
    },
  },
  responses: createApiResponse(SDASchema, 'Success'),
});

sdaRouter.post(
  '/',
  //validateRequest(CreateSDASchema),
  sdaController.create.bind(sdaController)
);
