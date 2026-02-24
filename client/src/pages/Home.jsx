import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/style.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/"); // 👈 redirect to home after logout
  };

  return (
    <>
      <header>
        <div className="logo">FashionKart</div>
        <nav>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div id="profile-area" className="auth-buttons">
          {user ? (
            <>
              <span style={{ marginRight: "10px" }}>👤 {user.name}</span>
              <a href="/cart" className="btn">🛒 Cart</a>
              <a href="/orders" className="btn">📦 Orders</a>
              <button className="btn" onClick={handleLogout}>🚪 Logout</button>
            </>
          ) : (
            <>
              <a href="/register" className="btn">Sign Up</a>
              <a href="/login" className="btn">Sign In</a>
            </>
          )}
        </div>
      </header>

      <section className="hero">
        <h1>Welcome to FashionKart</h1>
        <p>Trendy Clothes. Affordable Prices. Fast Delivery.</p>
      </section>

      <section id="products">
        <h2>Products</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </section>

      <section id="about">
        <h2>About Us</h2>
        <p>
          FashionKart is the place where you want all the latest and quality fashion at cheap rate.
          We carry the most up-to-date fashion in clothing and accessories, all hand-selected to fit
          different tastes and price points. Our aim is to bring fashion to everyone and deliver it
          quickly across India. Whether it's casual, office, or festive wear, you’ll find it here.
          Our focus is customer satisfaction, product quality, and staying in trend. Shop in style,
          only on FashionKart!
        </p>
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          window.validateContactForm?.();
        }}>
          <input type="text" id="name" placeholder="Your Name" required />
          <input type="email" id="email" placeholder="Your Email" required />
          <textarea id="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>

      <footer>
        <p>&copy; 2025 FashionKart. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;
