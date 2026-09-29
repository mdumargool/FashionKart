// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import api from "../api"; // 👈 api.js import kar liya jo Render URL use karta hai
import { useEffect, useState } from "react";
import "../assets/style.css";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setUserId(storedId || null);
    console.log("👤 Loaded userId:", storedId);
  }, []);

  useEffect(() => {
    console.log("🛒 Loaded cartItems:", cartItems);
  }, [cartItems]);

  const getSubtotal = () =>
    cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  const handleCheckout = async () => {
    if (!userId) {
      alert("⚠️ Please log in to place an order.");
      return;
    }

    if (cartItems.length === 0) {
      alert("🛒 Cart is empty!");
      return;
    }

    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const totalPrice = getSubtotal();

      // ✅ Using api.js instead of localhost axios
      const res = await api.post("/orders", {
        userId,
        orderItems,
        totalPrice,
      });

      alert("✅ Order placed successfully!");
      clearCart();
      console.log("📦 Order saved:", res.data);
    } catch (err) {
      console.error("❌ Order error:", err);
      alert("❌ Failed to place order. Try again.");
    }
  };

  return (
    <section className="cart-section">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.productId)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.productId)}>+</button>
                  </div>
                  <p>Total: ₹{item.price * item.quantity}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Subtotal: ₹{getSubtotal().toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              🚀 Proceed to Checkout
            </button>
            <button className="danger-btn" onClick={clearCart}>
              🗑️ Clear Cart
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;