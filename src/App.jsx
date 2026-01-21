import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import LoginSignup from "./login/login.jsx"; 
import DivComponents from "./components/DivComponents.jsx";
import FreeBooks from "./components/NaveBarContents/naveBarComponents/freeBooks.jsx";
import PaidBookDetail from "./components/buyBook.jsx";
import PaidBooks from "./components/NaveBarContents/naveBarComponents/paidBooks.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login/Signup page */}
        <Route path="/login" element={<LoginSignup />} />

        {/* Home page (protected) */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />

        {/* Other protected routes */}
        <Route 
          path="/book/:title" 
          element={
            <ProtectedRoute>
              <DivComponents />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/free-books" 
          element={
            <ProtectedRoute>
              <FreeBooks />
            </ProtectedRoute>
          } 
        />
          <Route path="/paid-book/:title" element={<ProtectedRoute><PaidBookDetail/></ProtectedRoute>} />
        <Route 
          path="/paid-books" 
          element={
            <ProtectedRoute>
              <PaidBooks />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
