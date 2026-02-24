import express from 'express';
const router = express.Router();

// Dummy protected admin route
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard (Protected)' });
});
router.get('/dashboard', (req, res) => {
  res.json({
    products: 12,
    orders: 8,
    customers: 5,
    sales: 3500,
  });
});

export default router;
