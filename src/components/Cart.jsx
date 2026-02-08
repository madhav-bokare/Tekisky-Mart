import React from "react";
import { useCart } from "./CartContext.jsx";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";
import "../CSS/cart.css"; 

const Cart = () => {
  const { cart, removeFromCart, total, buyNow } = useCart();

  return (
   <> 
    <Navbar />
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.map((item, index) => (
        <div className="cart-item" key={index}>
          <img src={item.img} alt={item.title} className="cart-item-img" />
          <div className="cart-item-details">
            <h4 className="cart-item-title">{item.title}</h4>
            <p className="cart-item-price">₹{item.price}</p>
            <button
              className="remove-btn"
              onClick={() => removeFromCart(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-footer">
        <h3>Total: ₹{total}</h3>
        <button className="buy-btn" onClick={buyNow}>
          Buy Now
        </button>
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

export default Cart;
