// src/components/Profile.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import userIcon from "../images/UserLogo.png";
import Navbar from "../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const purchasedBooks = JSON.parse(localStorage.getItem("purchasedBooks")) || [];
  const readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Navbar />
    <div className="profile-page">
      <h1 className="profile-heading">Profile</h1>

      <div className="profile-info">
        <img src={userIcon} alt="User" className="profile-user-icon" />
        <p><strong>Name:</strong> {user?.name || "User"}</p>
        <p><strong>Email:</strong> {user?.email || "Not Available"}</p>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <div className="books-section">
        <h2>Purchased Books ({purchasedBooks.length})</h2>
        {purchasedBooks.length > 0 ? (
          <div className="books-grid">
            {purchasedBooks.map(book => (
              <div key={book._id} className="book-card">
                <Link to={`/paid-book/${encodeURIComponent(book.title)}`}>
                  <img src={book.img || "/default.jpg"} alt={book.title} />
                </Link>
                <p>{book.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No purchased books yet.</p>
        )}
      </div>

      <div className="books-section">
        <h2>Read Books ({readBooks.length})</h2>
        {readBooks.length > 0 ? (
          <div className="books-grid">
            {readBooks.map(book => (
              <div key={book._id} className="book-card">
                <Link to={book.link === "paid" ? `/paid-book/${encodeURIComponent(book.title)}` : `/book/${encodeURIComponent(book.title)}`}>
                  <img src={book.img || "/default.jpg"} alt={book.title} />
                </Link>
                <p>{book.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No books read yet.</p>
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
