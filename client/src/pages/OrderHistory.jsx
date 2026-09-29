// src/pages/OrderHistory.jsx
import { useEffect, useState } from "react";
import api from "../api"; // 👈 api.js import kar liya jo Render URL use karta hai
import "../assets/style.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId"); // 👈 Dynamic userId from localStorage

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await api.get(`/orders/user/${userId}`); // 👈 Using api.js instance
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="cart-page">
      <h2>Your Orders</h2>
      {!userId ? (
        <p>Please log in to view your order history.</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h4>Order ID: {order._id}</h4>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalPrice}</p>
            <p>Items:</p>
            <ul>
              {order.orderItems.map((item) => (
                <li key={item._id}>
                  {item.product?.name || "Product"} × {item.quantity}
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;