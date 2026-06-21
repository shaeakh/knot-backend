import { z } from 'zod';

const PermissionModuleSchema = z.object({
  view: z.boolean(),
  create: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
});

export const AccessControllSchema = z.object({
  roleId: z.string(),
  roleName: z.string().min(1, 'Role name is required'),
  userModule: PermissionModuleSchema,
  tshirtModule: PermissionModuleSchema,
  accessControllModule: PermissionModuleSchema,
  authModule: PermissionModuleSchema,
});

export const CreateAccessControllSchema = AccessControllSchema.omit({
  roleId: true,
});

export const UpdateAccessControllSchema = CreateAccessControllSchema.partial();

export type AccessControllType = z.infer<typeof AccessControllSchema>;
export type CreateAccessControllType = z.infer<
  typeof CreateAccessControllSchema
>;
export type PermissionModuleType = z.infer<typeof PermissionModuleSchema>;
