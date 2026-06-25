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

      const modulePermissions = user.role[moduleName] as PermissionModuleType;

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
