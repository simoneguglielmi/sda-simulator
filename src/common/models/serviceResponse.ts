import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string | undefined;
  readonly response: T;
  readonly statusCode: number;

  private constructor(success: boolean, responseObject: T, statusCode: number, message?: string) {
    this.success = success;
    this.message = message;
    this.response = responseObject;
    this.statusCode = statusCode;
  }

  static success<T>(response: T, statusCode: number = StatusCodes.OK) {
    return new ServiceResponse(true, response, statusCode);
  }

  static failure<T>(message: string, response: T, statusCode: number = StatusCodes.BAD_REQUEST) {
    return new ServiceResponse(false, response, statusCode, message);
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    response: dataSchema.optional(),
    // statusCode: z.number(),
    message: z.optional(z.string()),
  });
