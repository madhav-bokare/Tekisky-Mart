import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import Section from "./components/Section.jsx";
import Footer from "./components/Footer.jsx";
import "./CSS/Responsive.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [marts, setMarts] = useState([]);

  // Token check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  // Fetch All Mart Products
  useEffect(() => {
    axios
      .get("https://tekisky-mart-backend.onrender.com/api/mart")
      .then((res) => setMarts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar setQuery={setQuery} />
      <Section query={query} products={marts} />
      <Footer />
    </>
  );
};

export default Home;
