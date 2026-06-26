import { Router } from 'express';
import { AccessControllController } from '../controllers/accessControllController';

const router = Router();
const accessControllController = new AccessControllController();

router.get('/:userId', accessControllController.getAccessByUserId);

export default router;
