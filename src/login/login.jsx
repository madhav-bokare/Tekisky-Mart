import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginSignup = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setMsg("");

    if (!email || !password || (!isLogin && !name)) {
      setMsg("All fields required");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        const res = await axios.post("http://localhost:4000/api/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/", { replace: true }); // redirect to Home
      }
      else {
        // ===== SIGNUP =====
        const res = await axios.post("http://localhost:4000/api/signup", { name, email, password });

        setMsg(res.data.message); // Show success message
        setName("");
        setEmail("");
        setPassword("");

        // Switch to login form automatically
        setTimeout(() => setIsLogin(true), 1200);
      }

    } catch (err) {
      setMsg(err.response?.data?.error || "Authentication failed");
      console.error("Auth Error:", err.response || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        {msg && <p className="msg">{msg}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading} className="login-button">
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
                ? "Login"
                : "Signup"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="toggle-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setMsg("");
              setName("");
              setEmail("");
              setPassword("");
            }}
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
