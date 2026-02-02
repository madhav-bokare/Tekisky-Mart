import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../CSS/Navbar.css";
import UserLogo from "../images/UserLogo.png";
import CartLogo from "../images/cartLogo.png";


const Navbar = ({ setQuery = () => {} }) => {
  const location = useLocation();

  return (
    <>
    {/* Desktop / Tablet Links */}
   <nav className="navbar">
  <div className="logo">✦ Tekisky Mart</div>
  
    <div className="nav-links">
      <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
        Home
      </Link>
      <Link
        to="/PopularProducts"
        className={location.pathname === "/PopularProducts" ? "active-link" : ""}
      >
        Populars
      </Link>
    </div>

    <div className="search-container">
      <input
        type="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
     <Link
      to="/cart"
      className={location.pathname === "/cart" ? "active-link" : ""}
    >
      <img src={CartLogo} alt="Cart" className="user-icon" />
    </Link>
    <Link
      to="/profile"
      className={location.pathname === "/profile" ? "active-link" : ""}
    >
      <img src={UserLogo} alt="Profile" className="user-icon" />
    </Link>
</nav>
{/* Mobile Navbar */}
  <nav className="navbar-mobile">
  <div className="mobile-top">
    {/* Logo */}
    <div className="mobile-logo">✦Tekisky Mart</div>

    {/* Right Icons */}
    <div className="mobile-icons">
      <Link to="/cart">
        <img src={CartLogo} alt="Cart" className="mobile-icon" />
      </Link>
       <Link to="/profile">
        <img src={UserLogo} alt="Profile" className="mobile-icon" />
      </Link>
    </div>
  </div>

  {/* Search bar */}
  <div className="mobile-search-container">
    <input
      type="search"
      placeholder="Search for sarees, t-shirts & more"
      onChange={(e) => setQuery(e.target.value)}
    />
  </div>
</nav>

    </>
  );
};

export default Navbar;