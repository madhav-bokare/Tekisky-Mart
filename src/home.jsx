import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Section from "./components/Section.jsx";
import defaultAnimeData from "./data/defaultAnimeData.jsx";

import "./CSS/Responsive.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [fetchedAnime, setFetchedAnime] = useState([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/anime");
        setFetchedAnime(res.data);
      } catch (err) {
        console.error("Error fetching anime:", err);
      }
    };
    fetchAnime();
  }, []);


  return (
    <>
      <Navbar setQuery={setQuery} />

      <Section
        query={query}
        fetchedAnime={fetchedAnime}
        defaultAnimeData={defaultAnimeData}
      />
      <Footer />
    </>
  );
};

export default Home;
