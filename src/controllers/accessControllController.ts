import { Request, Response, NextFunction } from 'express';
import { AccessControllService } from '../services/accessControllService';
import ResponseHandler from '@/utils/responseHandler';

export class AccessControllController {
  private accessControllService: AccessControllService;

  constructor() {
    this.accessControllService = new AccessControllService();
  }

  getAccessByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const rawUserId = req.params.userId;
      const userId = Array.isArray(rawUserId) ? rawUserId[0] : rawUserId;

      if (!userId) {
        throw new Error('User ID is required');
      }

      const accessControl =
        await this.accessControllService.getAccessByUserId(userId);

      return ResponseHandler.send(res, 200, {
        data: accessControl,
        message: 'User access control retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
