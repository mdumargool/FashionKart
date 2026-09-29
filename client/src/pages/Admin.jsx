// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import "../assets/style.css";
import api from "../api"; // 👈 api.js import kar liya jo Render URL use karta hai

function Admin() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    countInStock: ""
  });
  const [editId, setEditId] = useState(null);

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Fetch products using api.js
  useEffect(() => {
    if (isAdmin) {
      api.get("/products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.error("Error fetching admin products:", err));
    }
  }, [isAdmin]);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Add or Update product using api.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await api.put(`/products/${editId}`, formData);
        setProducts(products.map(p => p._id === editId ? res.data : p));
        setEditId(null);
      } else {
        const res = await api.post("/products", formData);
        setProducts([...products, res.data]);
      }
      setFormData({ name: "", image: "", description: "", price: "", countInStock: "" });
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  // Delete product using api.js
  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Start editing
  const handleEdit = (product) => {
    setEditId(product._id);
    setFormData({
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      countInStock: product.countInStock
    });
  };

  return (
    <div>
      <header className="admin-header">
        <h2>Admin Panel</h2>
        <button onClick={() => {
          localStorage.removeItem("isAdmin");
          window.location.reload();
        }}>
          Logout
        </button>
      </header>

      {!isAdmin ? (
        <section className="form-section">
          <h2>Admin Login</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;
            if (username === "admin" && password === "admin123") {
              localStorage.setItem("isAdmin", "true");
              window.location.reload();
            } else {
              alert("Invalid credentials");
            }
          }}>
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </section>
      ) : (
        <section className="admin-panel">
          <div className="admin-stats">
            <div className="stat-box">Products: {products.length}</div>
            <div className="stat-box">Orders: 0</div>
            <div className="stat-box">Customers: 0</div>
            <div className="stat-box">Sales: ₹0</div>
          </div>

          <h3>{editId ? "Edit Product" : "Add Product"}</h3>
          <form className="form" onSubmit={handleSubmit}>
            <input id="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input id="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
            <input id="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <input id="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
            <input id="countInStock" type="number" value={formData.countInStock} onChange={handleChange} placeholder="Stock" required />
            <button type="submit">{editId ? "Update" : "Add"}</button>
          </form>

          <div className="admin-product-list">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div><strong>{product.name}</strong></div>
                <div>₹{product.price}</div>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Admin;