import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const savedPurchased = JSON.parse(localStorage.getItem("purchasedItems")) || [];
    setCart(savedCart);
    setPurchasedItems(savedPurchased);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  // Save purchased items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  // Add to cart + history
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);

    const history = JSON.parse(localStorage.getItem("cartHistory")) || [];
    history.push({ action: "Added to Cart", product, date: new Date().toISOString() });
    localStorage.setItem("cartHistory", JSON.stringify(history));
  };

  // Remove from cart + history
  const removeFromCart = (index) => {
    setCart((prev) => {
      const removed = prev[index];
      const newCart = prev.filter((_, i) => i !== index);

      const history = JSON.parse(localStorage.getItem("cartHistory")) || [];
      history.push({ action: "Removed from Cart", product: removed, date: new Date().toISOString() });
      localStorage.setItem("cartHistory", JSON.stringify(history));

      return newCart;
    });
  };

  // Buy Now from Cart or ProductDetail
  const buyNow = (product = null) => {
    let itemsToBuy = product ? [product] : cart;

    if (itemsToBuy.length === 0) return;

    setPurchasedItems((prev) => [...prev, ...itemsToBuy]);

    const history = JSON.parse(localStorage.getItem("cartHistory")) || [];
    itemsToBuy.forEach((p) => {
      history.push({ action: "Purchased", product: p, date: new Date().toISOString() });
    });
    localStorage.setItem("cartHistory", JSON.stringify(history));

    // If buying from cart, clear cart
    if (!product) setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, purchasedItems, addToCart, removeFromCart, buyNow, total }}>
      {children}
    </CartContext.Provider>
  );
};
