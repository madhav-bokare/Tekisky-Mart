import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/popular.css";
import Navbar from "./Navbar.jsx";

const PopularProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState(""); // search query state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===== Fetch products from backend =====
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://tekisky-mart-backend.onrender.com/api/mart");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ===== Popular products (first 5) + search =====
  const popularProducts = useMemo(() => {
    return products
      .slice(0, 5)
      .filter((p) =>
        p.title.toLowerCase().includes(query.trim().toLowerCase())
      );
  }, [products, query]);

  // ===== Render cards =====
  const renderCards = (items) => (
    <div className="popular-slider">
      {items.map((item) => (
        <div
          key={item._id}
          className="popular-card"
          onClick={() =>
            navigate(`/product/${encodeURIComponent(item.title)}`)
          }
        >
          <img src={item.img} alt={item.title} />
          <p className="product-name">{item.title}</p>
          <p className="product-price">₹{item.price}</p>
          <button className="buy-now-btn">Buy now</button>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Navbar at the top */}
      <Navbar setQuery={setQuery} />

      <div className="home-page">
        <h1 className="page-title">Popular Products</h1>

        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}

        {!loading && !error &&
          (popularProducts.length > 0
            ? renderCards(popularProducts)
            : <p>No products found</p>)
        }
      </div>
    </>
  );
};

export default PopularProducts;
