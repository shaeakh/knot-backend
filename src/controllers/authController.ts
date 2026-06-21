import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export class AuthController {
  async handleGoogleSignIn(req: Request, res: Response) {
    try {
      const { credential } = req.body;
      if (!credential) {
        return res
          .status(400)
          .json({ message: 'Google credential is required' });
      }

      const { token, userPayload } = await authService.googleSignIn(credential);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json(userPayload);
    } catch (error) {
      console.error('Google Auth Error:', error);
      res.status(401).json({ message: 'Authentication failed' });
    }
  }
}
