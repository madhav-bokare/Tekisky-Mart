import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import Section from "./components/Section.jsx";
import Footer from "./components/Footer.jsx";
import "./css/Responsive.css"

const Home = () => {
  const [query, setQuery] = useState("");
  const [fetchedBook, setFetchedBook] = useState([]);
  const [paidBook, setPaidBook] = useState([]);

  // Optional: token check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  // Fetch Free Books
  useEffect(() => {
    axios.get("http://localhost:5000/api/book/free")
      .then(res => setFetchedBook(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch Paid Books
  useEffect(() => {
    axios.get("http://localhost:5000/api/book/paid")
      .then(res => setPaidBook(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar setQuery={setQuery} />
      <Section query={query} fetchedBook={fetchedBook} paidBook={paidBook} />
      <Footer />
    </>
  );
};

export default Home;
