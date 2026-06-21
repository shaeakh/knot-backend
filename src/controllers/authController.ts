/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export class AuthController {
  async handleGoogleSignIn(req: Request, res: Response): Promise<any> {
    const { token } = req.body;

    try {
      const result = await authService.googleSignIn(token);
      return res.status(200).json({
        message: 'Authentication successful',
        ...result,
      });
    } catch (error: any) {
      console.error('Google Auth Error:', error);

      if (error.message === 'INVALID_GOOGLE_TOKEN') {
        return res.status(400).json({ error: 'Invalid Google token payload' });
      }

      return res.status(401).json({ error: 'Authentication failed' });
    }
  }
}
