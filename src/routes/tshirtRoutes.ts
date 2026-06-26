import { Router } from 'express';
import { TshirtController } from '../controllers/tshirtController';
// import { authorize } from '../middlewares/authorize'; // RBAC middleware

const router = Router();
const tshirtController = new TshirtController();

// public routes
router.get('/', tshirtController.getAll);
router.get('/:id', tshirtController.getById);

// protected routes (only admins or users with permission can access)
// router.use(authorize('tshirtModule', 'create')); // example
router.post('/', tshirtController.create);
router.patch('/:id', tshirtController.update);
router.delete('/:id', tshirtController.delete);

export default router;
