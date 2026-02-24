// server/routes/productRoutes.js
import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @route GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// @route POST /api/products
router.post('/', async (req, res) => {
  const { name, image, description, price, countInStock } = req.body;

  if (!name || !image || !description || price == null || countInStock == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const product = new Product({ name, image, description, price, countInStock });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
});

// @route DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});

// @route PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
