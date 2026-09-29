import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // 👈 Render backend api import kiya

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("⚠️ All fields are required.");
      return;
    }

    if (password.length < 6) {
      alert("⚠️️ Password must be at least 6 characters.");
      return;
    }

    try {
      // ✅ Call Render backend register route via api.js
      await api.post("/users/register", { name, email, password });

      alert("✅ Registration successful! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      console.error("❌ Registration error:", err);
      alert(err.response?.data?.message || "❌ Registration failed. Try again.");
    }
  };

  return (
    <section className="form-section">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Sign In</a>
      </p>
    </section>
  );
}

export default Register;