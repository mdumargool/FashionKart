// routes/cartRoute.js
import express from 'express';
import {
  getCartByUserId,
  saveOrUpdateCart
} from '../controllers/cartController.js';

const router = express.Router();

/**
 * @route   GET /api/cart/:userId
 * @desc    Get user's cart by userId
 * @access  Public (can add auth later)
 */
router.get('/:userId', getCartByUserId);

/**
 * @route   POST /api/cart/:userId
 * @desc    Create or update user's cart
 * @access  Public (can add auth later)
 */
router.post('/:userId', saveOrUpdateCart);

export default router;
