// LoginSignup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginSignup = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ NEW: success / error flag
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setMsg("");
    setIsSuccess(false); // reset

    // Validate input
    if (!email || !password || (!isLogin && !name)) {
      setMsg("All fields required");
      setIsSuccess(false);
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        // ===== LOGIN =====
        const res = await axios.post(
          "https://tekisky-mart-backend-login.onrender.com/api/login",
          { email, password }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/profile", { replace: true });
      } else {
        // ===== SIGNUP =====
        const res = await axios.post(
          "https://tekisky-mart-backend-login.onrender.com/api/signup",
          { name, email, password }
        );

        // ✅ SUCCESS MESSAGE (GREEN)
        setMsg("Signup successful");
        setIsSuccess(true);

        setName("");
        setEmail("");
        setPassword("");

        // Switch to login after signup
        setTimeout(() => setIsLogin(true), 1200);
      }
    } catch (err) {
      // ❌ ERROR MESSAGE (RED)
      setMsg(err.response?.data?.error || "Network / Auth Error");
      setIsSuccess(false);
      console.error("Auth Error:", err.response || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        {/* ✅ COLOR CONTROLLED MESSAGE */}
        {msg && (
          <p className={isSuccess ? "msg success" : "msg error"}>
            {msg}
          </p>
        )}

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
              autoComplete="name"
            />
          )}

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
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
          {isLogin ? "Don't have an account →" : "Already have an account →"}{" "}
          <span
            className="toggle-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setMsg("");
              setIsSuccess(false);
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
