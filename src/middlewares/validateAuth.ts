/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@/errors/concreteErrors';

export const validateGoogleTokenInput = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  try {
    const { token } = req.body;
    if (!token) {
      throw new BadRequestError('Token is required');
    }
    next();
  } catch (error) {
    next(error);
  }
};
