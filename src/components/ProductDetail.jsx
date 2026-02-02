import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import "../CSS/ProductDetail.css";
import { useCart } from "./CartContext.jsx";

const ProductDetail = () => {
  const { title } = useParams();
   const { addToCart, buyNow } = useCart();

  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/mart/title/${encodeURIComponent(title)}`
        );

        setProduct(res.data);

        const all = await axios.get("http://localhost:5000/api/mart");

        const related = all.data.filter(
          (item) =>
            item.category === res.data.category &&
            item.title !== res.data.title
        );

        setSuggestions(related.slice(0, 6));
      } catch {
        setError("Product not found");
      }
    };

    fetchProduct();
  }, [title]);

  if (error) {
    return (
      <>
        <Navbar />
        <p className="error-text">{error}</p>
        <Link to="/" className="back-name">⬅ Back</Link>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <p className="loading-text">Loading product...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* ===== PRODUCT DETAIL ===== */}
      <div className="purchase-container">
        <div className="paid-book-image">
          <img src={product.img} alt={product.title} />
        </div>

        <div className="book-info">
          <h1>{product.title}</h1>
          <p className="category">Category: {product.category}</p>
          <p className="price">₹{product.price}</p>
          <p className="available">In Stock</p>
        </div>

        {/* ===== BUY BOX ===== */}
        <div className="purchase-box">
          <p className="box-price">₹{product.price}</p>

           <button
            className="purchase-btn cart"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product); 
              alert("Product added to cart!"); // product add to cart
            }}
          >
            Add to Cart
          </button>

          <button
            className="purchase-btn buy"
            onClick={() => {
             buyNow(product);
              alert("Buying is Suss!");
            }}
            
          
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* ===== SUGGESTIONS ===== */}
      {suggestions.length > 0 && (
        <div className="suggestions-section">
          <h2 className="suggestions-related-h">Related Products</h2>

          <div className="card-container">
            {suggestions.map((item) => (
              <div key={item._id} className="card">
                <Link to={`/product/${encodeURIComponent(item.title)}`}>
                  <img src={item.img} alt={item.title} />
                </Link>
                <p className="product-name">{item.title}</p>
                <p className="product-price">₹{item.price}</p>
                <button
                  className="buy-now-btn"
                >
                  Buy now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
