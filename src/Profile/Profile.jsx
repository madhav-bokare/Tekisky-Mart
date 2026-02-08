import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import userIcon from "../images/UserLogo.png";
import Navbar from "../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();

  // Get user info
  const user = JSON.parse(localStorage.getItem("user"));

  // Purchased products
  const [purchasedItems, setPurchasedItems] = useState(
    JSON.parse(localStorage.getItem("purchasedItems")) || []
  );

  // Cart & purchase history
  const [cartHistory, setCartHistory] = useState(
    JSON.parse(localStorage.getItem("cartHistory")) || []
  );

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ===== Clear Functions =====
  const clearPurchased = () => {
    localStorage.removeItem("purchasedItems");
    setPurchasedItems([]);
  };

  const clearHistory = () => {
    localStorage.removeItem("cartHistory");
    setCartHistory([]);
  };

  // Optional: sync purchasedItems & readProducts if they change externally
  useEffect(() => {
    setPurchasedItems(JSON.parse(localStorage.getItem("purchasedItems")) || []);
  }, []);

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <h1 className="profile-heading">Profile</h1>

        {/* ===== USER INFO ===== */}
        <div className="profile-info">
          <img src={userIcon} alt="User" className="profile-user-icon" />
          <p><strong>Name:</strong> {user?.name || "User"}</p>
          <p><strong>Email:</strong> {user?.email || "Not Available"}</p>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        {/* ===== PURCHASED PRODUCTS ===== */}
        <div className="item-section">
          <h2 className="item-section-h2">
            Purchased Products ({purchasedItems.length})
            {purchasedItems.length > 0 && (
              <button className="clear-btn" onClick={clearPurchased}>Clear</button>
            )}
          </h2>
          {purchasedItems.length > 0 ? (
            <div className="item-grid">
              {purchasedItems.map(item => (
                <div key={item._id} className="item-card">
                  <Link to={`/paid-product/${encodeURIComponent(item.title)}`}>
                    <img src={item.img || "/default.jpg"} alt={item.title} />
                  </Link>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No purchased products yet.</p>
          )}
        </div>

        {/* ===== CART / PURCHASE HISTORY ===== */}
        <div className="item-section">
          <h2 className="item-section-h2">
            Cart & Purchase History ({cartHistory.length})
            {cartHistory.length > 0 && (
              <button className="clear-btn" onClick={clearHistory}>Clear</button>
            )}
          </h2>
          {cartHistory.length > 0 ? (
            <div className="history-list">
              {cartHistory.map((entry, index) => (
                <div key={index} className="history-card">
                  <p>
                    <strong>{entry.action}:</strong> {entry.product.title} 
                    {entry.product.price ? ` - ₹${entry.product.price}` : ""}
                  </p>
                  <p className="history-date">{new Date(entry.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No history yet.</p>
          )}
        </div>
      </div>
        <div className="back-button">
              <Link to="/" className="back-name">
                ⬅ Back to Home
              </Link>
    </div>
    </>
  );
};

export default Profile;
