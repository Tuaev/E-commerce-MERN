import express from 'express';
import { getProduct, getProductById } from '../controllers/productController.js';
const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', getProduct);

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', getProductById);

export default router;
