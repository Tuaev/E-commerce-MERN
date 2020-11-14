import express from 'express';
import {
  getProduct,
  getProductById,
  deleteProductById,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProduct);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProductById);

export default router;
