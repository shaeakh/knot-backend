import { Router } from 'express';
import { AuthController } from '@/controllers/authController';
import { validateGoogleTokenInput } from '@/middlewares/validateAuth';

const router = Router();
const authController = new AuthController();

router.post('/google-signin', validateGoogleTokenInput, (req, res) =>
  authController.handleGoogleSignIn(req, res),
);

export default router;
