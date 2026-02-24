import express from 'express';
import {
  createOrder,
  getOrdersByUser,
  getAllOrders,
} from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get orders by user ID
router.get('/user/:id', getOrdersByUser);

// Get all orders (admin access or later authentication)
router.get('/', getAllOrders);

export default router;
