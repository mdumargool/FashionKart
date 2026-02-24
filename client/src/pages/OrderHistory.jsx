import { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const userId = "guest"; // later replace with logged-in user's ID

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="cart-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
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
