import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style.css"; // ✅ Ensure this path is correct

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("isLoggedIn", "true");

      // ✅ Ensure userId exists for cart system
      if (!localStorage.getItem("userId")) {
        const tempUserId = "user_" + Date.now();
        localStorage.setItem("userId", tempUserId);
      }

      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid email or password.");
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
