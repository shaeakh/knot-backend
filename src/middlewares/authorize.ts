import { Request, Response, NextFunction } from 'express';
import Prisma from '@/config/db';
import { ModuleName, ActionType } from '@/types/authorizeTypes';
import type { PermissionModuleType } from '@/dtos/accessControllDto';

export const authorize = (moduleName: ModuleName, action: ActionType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.id) {
        return res
          .status(401)
          .json({ message: 'Unauthorized. Please login first.' });
      }

      const user = await Prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
          role: true,
        },
      });

      if (!user || !user.role) {
        return res.status(403).json({ message: 'User or Role not found.' });
      }

      const modulePermissions = user.role[moduleName] as PermissionModuleType;

      if (modulePermissions && modulePermissions[action] === true) {
        return next();
      }
      return res.status(403).json({
        message: `Access Denied! You do not have permission to ${action} in ${moduleName}.`,
      });
    } catch (error) {
      console.error('Authorization Error:', error);
      return res
        .status(500)
        .json({ message: 'Internal server error during authorization.' });
    }
  };
};
