import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const user = { name, email, password };

    // ✅ Save to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ Set a temporary fake userId for cart (can be replaced with real _id later)
    if (!localStorage.getItem("userId")) {
      const tempUserId = "user_" + Date.now(); // or use uuid
      localStorage.setItem("userId", tempUserId);
    }

    alert("Registration successful! Redirecting to login...");
    navigate("/login");
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
