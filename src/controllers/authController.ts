import { Request, Response } from 'express';
import { AuthService } from '@/services/authService';
import ResponseHandler from '@/utils/responseHandler';

const authService = new AuthService();

export class AuthController {
  async handleGoogleSignIn(req: Request, res: Response) {
    try {
      const { credential } = req.body;

      if (!credential) {
        return ResponseHandler.send(res, 400, {
          message: 'Google credential is required',
        });
      }

      const { token, userPayload } = await authService.googleSignIn(credential);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return ResponseHandler.send(res, 200, {
        data: userPayload,
        message: 'Sign in successful',
      });
    } catch (error) {
      console.error('Google Auth Error:', error);

      return ResponseHandler.send(res, 401, {
        message: 'Authentication failed',
        stack:
          process.env.NODE_ENV === 'development'
            ? (error as Error).stack
            : undefined,
      });
    }
  }
}
