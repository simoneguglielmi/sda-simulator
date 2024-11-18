import type { ServiceResponse } from "@/common/models/serviceResponse";
import type { ItemTracking } from "@prisma/client";
import type { Request, Response } from "express";

export interface ISDAService {
  findAll(): Promise<ServiceResponse<ItemTracking[]>>;
  find(id: string): Promise<ServiceResponse<ItemTracking | null>>;
  updateStatus(id: string, status: string): Promise<ServiceResponse<ItemTracking | null>>;
  create(data: any): Promise<ServiceResponse<ItemTracking | null>>;
}

export interface ISDAController {
  findAll(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
  updateStatus(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
}
