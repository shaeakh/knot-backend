import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  googleId: z.string().min(1, 'Google ID is required'),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .refine((val) => val.includes('@'), {
      message: "Email must contain an '@' symbol",
    }),
  name: z.string().min(1, 'Name is required'),
  avatar: z.string().nullable().optional(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
  roleId: z.string(),
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateUserSchema = UserSchema.omit({
  id: true,
  googleId: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export type UserType = z.infer<typeof UserSchema>;
export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
