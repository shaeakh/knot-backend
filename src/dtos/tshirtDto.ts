import { z } from 'zod';

const VariantSchema = z.object({
  color: z.string().min(1, 'Color is required'),
  size: z.string().min(1, 'Size is required'),
  stock: z.number().int().nonnegative().default(0),
  images: z.string(),
  isAvailable: z.boolean().optional(),
});

export const CreateTshirtSchema = z.object({
  name: z.string().min(1, 'T-shirt name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be a positive number'),
  variants: z.array(VariantSchema).min(1, 'At least one variant is required'),
});

export const UpdateTshirtSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
});

export type CreateTshirtType = z.infer<typeof CreateTshirtSchema>;
export type UpdateTshirtType = z.infer<typeof UpdateTshirtSchema>;
