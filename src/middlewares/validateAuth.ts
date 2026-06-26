/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@/errors/concreteErrors';

export const validateGoogleTokenInput = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  try {
    const { credential } = req.body;
    if (!credential) {
      throw new BadRequestError('Google credential is required');
    }
    next();
  } catch (error) {
    next(error);
  }
};
