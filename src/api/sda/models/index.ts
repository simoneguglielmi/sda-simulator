import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type SDA = z.infer<typeof SDASchema>;
export const SDASchema = z.object({
  id: z.string(),
  businessName: z.string(),
  progressiveId: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PatchSDASchema = z.object({
  status: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetSDASchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
