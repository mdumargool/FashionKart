// models/Cart.js
import mongoose from 'mongoose';

// Schema for individual items in the cart
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required'],
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  image: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1, 'Quantity must be at least 1'],
  },
});

// Main cart schema
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // keep as string since you're using localStorage userId
      required: [true, 'User ID is required'],
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
