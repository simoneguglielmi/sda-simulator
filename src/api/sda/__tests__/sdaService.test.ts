import 'reflect-metadata';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { ISDAService } from '../interfaces';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { StatusCodes } from 'http-status-codes';
import { EItemTrackingStatus } from '@/common/types/sdaTypes';
import { v4 as uuidv4 } from 'uuid';
import { DI } from '../types';
import container from '../module';

vi.mock('@prisma/client');

describe('SDAService', () => {
  let prisma: PrismaClient;
  let sdaService: ISDAService;

  beforeEach(() => {
    prisma = container.get<PrismaClient>(DI.PrismaClient);
    sdaService = container.get<ISDAService>(DI.SDAService);
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const mockTrackings = [
    { id: uuidv4(), status: EItemTrackingStatus.DELIVERED },
  ];
  const mockError = new Error('Error');

  describe('findAll', () => {
    it('should return success response with trackings', async () => {
      prisma.itemTracking.findMany = vi.fn().mockResolvedValue(mockTrackings);

      const response = await sdaService.findAll();

      expect(response).toEqual(ServiceResponse.success(mockTrackings));
    });

    it('should return failure response if no trackings found', async () => {
      prisma.itemTracking.findMany = vi.fn().mockResolvedValue([]);

      const response = await sdaService.findAll();

      expect(response).toEqual(
        ServiceResponse.failure('No Users found', [], StatusCodes.NOT_FOUND)
      );
    });

    it('should return failure response on error', async () => {
      prisma.itemTracking.findMany = vi.fn().mockRejectedValue(mockError);

      const response = await sdaService.findAll();

      expect(response).toEqual(
        ServiceResponse.failure(
          'An error occurred while retrieving users.',
          [],
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
    });
  });

  describe('find', () => {
    it('should return success response with tracking', async () => {
      const mockTracking = {
        id: uuidv4(),
        status: EItemTrackingStatus.DELIVERED,
      };
      prisma.itemTracking.findUnique = vi.fn().mockResolvedValue(mockTracking);

      const response = await sdaService.find(mockTracking.id);

      expect(response).toEqual(ServiceResponse.success(mockTracking));
    });

    it('should return failure response if tracking not found', async () => {
      prisma.itemTracking.findUnique = vi.fn().mockResolvedValue(null);

      const response = await sdaService.find(uuidv4());

      expect(response).toEqual(
        ServiceResponse.failure(
          'Tracking not found',
          null,
          StatusCodes.NOT_FOUND
        )
      );
    });

    it('should return failure response on error', async () => {
      prisma.itemTracking.findUnique = vi.fn().mockRejectedValue(mockError);

      const response = await sdaService.find(uuidv4());

      expect(response).toEqual(
        ServiceResponse.failure(
          'An error occurred while retrieving tracking.',
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
    });
  });

  describe('updateStatus', () => {
    it('should return success response with updated tracking', async () => {
      const mockTrackingUpdated = {
        id: uuidv4(),
        status: EItemTrackingStatus.IN_TRANSIT,
      };
      prisma.itemTracking.update = vi
        .fn()
        .mockResolvedValue(mockTrackingUpdated);

      const response = await sdaService.updateStatus(
        mockTrackingUpdated.id,
        EItemTrackingStatus.IN_TRANSIT
      );

      expect(response).toEqual(ServiceResponse.success(mockTrackingUpdated));
    });

    it('should return failure response on error', async () => {
      prisma.itemTracking.update = vi.fn().mockRejectedValue(mockError);

      const response = await sdaService.updateStatus(
        uuidv4(),
        EItemTrackingStatus.IN_TRANSIT
      );

      expect(response).toEqual(
        ServiceResponse.failure(
          'An error occurred while updating tracking.',
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
    });
  });
});
