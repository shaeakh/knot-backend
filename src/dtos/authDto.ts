import z from 'zod';
import { UserSchema } from './userDto';

export const UserPayloadSchema = UserSchema.pick({
  id: true,
  email: true,
  name: true,
  avatar: true,
});

export type UserPayloadType = z.infer<typeof UserPayloadSchema>;
