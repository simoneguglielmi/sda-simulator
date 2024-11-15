import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ISDAController, ISDAService } from './interfaces';
import { DI } from './types';

@injectable()
export class SDAController implements ISDAController {
  constructor(
    @inject(DI.SDAService) private readonly sdaService: ISDAService
  ) {}

  async findAll(_req: Request, res: Response) {
    const sdaResponse = await this.sdaService.findAll();
    return handleServiceResponse(sdaResponse, res);
  }

  async find(req: Request, res: Response) {
    const id = req.params.id;
    const sdaResponse = await this.sdaService.find(id);
    return handleServiceResponse(sdaResponse, res);
  }

  async updateStatus(req: Request, res: Response) {
    const id = req.params.id;
    const status = req.body.status;
    const sdaResponse = await this.sdaService.updateStatus(id, status);
    return handleServiceResponse(sdaResponse, res);
  }

  async create(req: Request, res: Response) {
    const sdaResponse = await this.sdaService.create(req.body);
    return handleServiceResponse(sdaResponse, res);
  }
}
