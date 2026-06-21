/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

export const validateGoogleTokenInput = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  next();
};
