import Order from '../models/Order.js';

// POST /api/orders
export const createOrder = async (req, res) => {
  const { userId, orderItems, totalPrice } = req.body;

  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items provided" });
  }

  if (!totalPrice || totalPrice <= 0) {
    return res.status(400).json({ message: "Invalid total price" });
  }

  try {
    const newOrder = new Order({
      user: userId || "guest",
      orderItems,
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "✅ Order placed successfully",
      orderId: savedOrder._id,
      createdAt: savedOrder.createdAt,
      total: savedOrder.totalPrice,
    });
  } catch (error) {
    console.error("❌ Order creation error:", error.message);
    res.status(500).json({ message: "Order creation failed", error: error.message });
  }
};

// GET /api/orders/user/:id
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Order fetch failed:", err.message);
    res.status(500).json({ message: "Fetching orders failed", error: err.message });
  }
};

// GET /api/orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Error fetching all orders:", err.message);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};
