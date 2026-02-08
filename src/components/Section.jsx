import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Section.css";

const Section = ({ query = "", products = [] }) => {
  const navigate = useNavigate();

  /* ===== SLIDER ===== */
  const [sliderImgs, setSliderImgs] = useState([1]);
  const [current, setCurrent] = useState(0);

  // 🔥 ONLY SLIDER BANNERS
  useEffect(() => {
    axios
      .get("https://tekisky-mart-backend.onrender.com/api/mart/slider")
      .then((res) => setSliderImgs(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔥 AUTO SLIDE (1 sec)
  useEffect(() => {
    if (sliderImgs.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImgs.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [sliderImgs]);

  /* ===== CATEGORIES ===== */
  const Clothes = useMemo(
    () => products.filter((p) => p.category?.toLowerCase() === "clothes"),
    [products]
  );

  const Foods = useMemo(
    () => products.filter((p) => p.category?.toLowerCase() === "foods"),
    [products]
  );

  const Electronics = useMemo(
    () => products.filter((p) => p.category?.toLowerCase() === "electronics"),
    [products]
  );

  /* ===== SEARCH ===== */
  const searchResults = query.trim()
    ? products.filter((p) =>
        p.title?.toLowerCase().includes(query.trim().toLowerCase())
      )
    : [];

  /* ===== CARDS ===== */
  const renderCards = (items) => (
    <div className="card-container">
      {items.map((item) => (
        <div
          key={item._id || item.id}
          className="card"
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

  /* ===== SEARCH VIEW ===== */
  if (query) {
    return (
      <section className="section search-section">
        <h2>Search Results</h2>
        {searchResults.length > 0 ? renderCards(searchResults) : <p>No results found</p>}
      </section>
    );
  }

  /* ===== MAIN VIEW ===== */
  return (
    <>
      {/* 🔥 SLIDER */}
      {sliderImgs.length > 0 && (
        <div className="slider-section">
          <h1 className="cardHeading">Trending</h1>
          <img
            src={sliderImgs[current].slideBanner}
            alt="Trending Banner"
            className="slider-img"
          />
        </div>
      )}

      <section>
        <h2 className="cardHeading">Clothes</h2>
        {renderCards(Clothes)}
      </section>

      <section>
        <h2 className="cardHeading">Foods</h2>
        {renderCards(Foods)}
      </section>

      <section>
        <h2 className="cardHeading">Electronics</h2>
        {renderCards(Electronics)}
      </section>
    </>
  );
};

export default Section;
