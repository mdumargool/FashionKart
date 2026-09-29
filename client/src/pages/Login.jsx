import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // 👈 Render backend api import kiya
import "../assets/style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      // ✅ Call Render backend login route via api.js
      const res = await api.post("/users/login", { email, password });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", res.data._id); // Real MongoDB user ID store kar liya
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("✅ Login successful!");
      navigate("/");
    } catch (err) {
      console.error("❌ Login error:", err);
      alert(err.response?.data?.message || "❌ Invalid email or password.");
    }
  };

  return (
    <section className="form-section">
      <h2>Sign In</h2>
      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>

      <p>
        Don't have an account? <a href="/register">Sign Up</a>
      </p>

      <p style={{ marginTop: "10px" }}>
        <strong>Admin?</strong> <a href="/admin">Go to Admin Panel</a>
      </p>
    </section>
  );
}

export default Login;