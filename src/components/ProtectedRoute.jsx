import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check token in localStorage
  const token = localStorage.getItem("token");

  // If no token, redirect to login/signup page
  if (!token) return <Navigate to="/login" replace />;

  // If token exists, show protected content
  return children;
};

export default ProtectedRoute;
