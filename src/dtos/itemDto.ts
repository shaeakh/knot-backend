import { z } from 'zod';

const SizeStockSchema = z.object({
  size: z.string().min(1, 'Size is required'),
  stock: z.number().int().nonnegative().default(0),
});

const ColorVariantSchema = z.object({
  color: z.string().min(1, 'Color is required'),
  images: z.string().min(1, 'Image URL is required'),
  sizes: z.array(SizeStockSchema).min(1, 'At least one size is required'),
});

export const CreateItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  type: z.string().min(1, 'Item type is required'), // <-- নতুন ফিল্ড
  description: z.string().optional(),
  price: z.number().positive('Price must be a positive number'),
  colors: z.array(ColorVariantSchema).optional(),
});

export const UpdateItemSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(), // <-- নতুন ফিল্ড
  description: z.string().optional(),
  price: z.number().positive().optional(),
});

export type CreateItemType = z.infer<typeof CreateItemSchema>;
export type UpdateItemType = z.infer<typeof UpdateItemSchema>;
