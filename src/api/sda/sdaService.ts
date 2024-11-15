import { ServiceResponse } from '@/common/models/serviceResponse';
import { StatusCodes } from 'http-status-codes';
import { ISDAService } from './interfaces';
import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { DI } from './types';

@injectable()
export class SDAService implements ISDAService {
  constructor(@inject(DI.PrismaClient) private readonly prisma: PrismaClient) {}

  async findAll() {
    try {
      const trackings = await this.prisma.itemTracking.findMany();

      if (!trackings || trackings.length === 0) {
        return ServiceResponse.failure(
          'No Users found',
          [],
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success(trackings);
    } catch (e) {
      return ServiceResponse.failure(
        'An error occurred while retrieving users.',
        [],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async find(id: string) {
    try {
      const tracking = await this.prisma.itemTracking.findUnique({
        where: {
          id,
        },
      });

      if (!tracking) {
        return ServiceResponse.failure(
          'Tracking not found',
          null,
          StatusCodes.NOT_FOUND
        );
      }

      return ServiceResponse.success(tracking);
    } catch (e) {
      return ServiceResponse.failure(
        'An error occurred while retrieving tracking.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateStatus(id: string, status: string) {
    try {
      const trackingUpdated = await this.prisma.itemTracking.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });

      return ServiceResponse.success(trackingUpdated);
    } catch (e) {
      return ServiceResponse.failure(
        'An error occurred while updating tracking.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
