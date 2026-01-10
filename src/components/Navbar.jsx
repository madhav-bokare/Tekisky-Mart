import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../CSS/Navbar.css";

const Navbar = ({ setQuery = () => {} }) => {
  const location = useLocation();

  return (
    <>
      {/* ===== TOP NAVBAR ===== */}
      <nav className="navbar">
        <div className="logo">✦ Anime Library</div>

        <div className="nav-links">
          <Link
            to="/"
            className={location.pathname === "/" ? "active-link" : ""}
          >
            Home
          </Link>

          <Link
            to="/popular-series"
            className={location.pathname === "/popular-series" ? "active-link" : ""}
          >
            Popular Series
          </Link>

          <Link
            to="/popular-movies"
            className={
              location.pathname === "/popular-movies" ? "active-link" : ""
            }
          >
            Popular Movies
          </Link>
        </div>

        <div className="search-container">
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
