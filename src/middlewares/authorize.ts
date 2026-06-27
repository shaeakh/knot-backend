// src/middlewares/authorize.ts
import { Request, Response, NextFunction } from 'express';
import Prisma from '@/config/db';
import { ModuleName, ActionType } from '@/types/authorizeTypes';
import type { PermissionModuleType } from '@/dtos/accessControllDto';
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from '@/errors/concreteErrors';

export const authorize = (moduleName: ModuleName, action: ActionType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.id) {
        throw new AuthenticationError('Unauthorized. Please login first.');
      }

      const user = await Prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
          role: true,
        },
      });

      if (!user || !user.role) {
        throw new NotFoundError('User or Role not found.');
      }

      // 🛠️ ফিক্স: টাইপস্ক্রিপ্টকে বোঝানো হচ্ছে যে এটি একটি ডাইনামিক অবজেক্ট
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const roleData = user.role as Record<string, any>;
      const modulePermissions = roleData[moduleName] as PermissionModuleType;

      if (modulePermissions && modulePermissions[action] === true) {
        return next();
      }

      throw new AuthorizationError(
        `Access Denied! You do not have permission to ${action} in ${moduleName}.`,
      );
    } catch (error) {
      next(error);
    }
  };
};
