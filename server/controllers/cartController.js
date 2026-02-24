// controllers/cartController.js
import Cart from "../models/Cart.js";

/**
 * @route   GET /api/cart/:userId
 * @desc    Fetch cart by userId
 * @access  Public (no auth yet)
 */
export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      console.log(`🛒 No cart found for userId: ${userId}`);
      return res.status(200).json({ userId, items: [] });
    }

    console.log(`🛒 Cart fetched for userId: ${userId}`);
    res.status(200).json(cart);
  } catch (err) {
    console.error("❌ Error fetching cart:", err.message);
    res.status(500).json({
      message: "Failed to fetch cart",
      error: err.message,
    });
  }
};

/**
 * @route   POST /api/cart/:userId
 * @desc    Create or update user's cart
 * @access  Public (no auth yet)
 */
export const saveOrUpdateCart = async (req, res) => {
  const { userId } = req.params;
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ message: "❌ Items must be a valid array" });
  }

  // Validate each item in the cart
  for (const item of items) {
    if (!item.productId || !item.name || !item.price) {
      return res.status(400).json({
        message: "❌ Each item must include productId, name, and price",
        invalidItem: item,
      });
    }
  }

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { userId, items },
      {
        new: true,          // return the updated doc
        upsert: true,       // create if not exists
        runValidators: true // enforce schema
      }
    );

    console.log(`✅ Cart saved for userId: ${userId}`);
    res.status(200).json({
      message: "✅ Cart saved successfully",
      cart: updatedCart,
    });
  } catch (err) {
    console.error("❌ Error saving cart:", err.message);
    res.status(500).json({
      message: "Failed to save cart",
      error: err.message,
    });
  }
};
