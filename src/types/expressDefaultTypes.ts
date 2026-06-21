/* eslint-disable @typescript-eslint/no-explicit-any */
import 'express';
import type { UserPayloadType } from '@/dtos/authDto';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayloadType;
    validatedBody?: any;
    validatedParams?: any;
    validatedQuery?: any;
  }
}
