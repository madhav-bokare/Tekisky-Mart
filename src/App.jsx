import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./home";
import LoginSignup from "./login/login.jsx";
import ProductDetail from "./components/ProductDetail.jsx"; 
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from "./Profile/Profile.jsx";
import Cart from "./components/Cart.jsx";
import { CartProvider } from "./components/CartContext.jsx"; 
import PopularProducts from "./components/popular.jsx";

function App() {
  return (
    <CartProvider> 
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginSignup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PopularProducts"
             element={
              <ProtectedRoute>
                <PopularProducts />
              </ProtectedRoute>
             }
             />

          <Route
            path="/product/:title"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}

export default App;
