import { Router } from 'express';
import { ItemController } from '../controllers/itemController';
// import { authorize } from '../middlewares/authorize';

const router = Router();
const itemController = new ItemController();

// পাবলিক রাউটস
router.get('/', itemController.getAll);
router.get('/:id', itemController.getById);

// প্রটেক্টেড রাউটস (অ্যাডমিন বা নির্দিষ্ট পারমিশন লাগবে)
router.post('/', itemController.create);
router.patch('/:id', itemController.update);
router.delete('/:id', itemController.delete);

export default router;
