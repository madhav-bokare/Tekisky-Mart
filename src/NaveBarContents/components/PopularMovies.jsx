// PopularMovies.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../NavBarComponentsCss/naveContent.css"; 

const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/anime/popularmovies");
        const data = await res.json();
        setPopularMovies(data);
      } catch (err) {
        console.error("Failed to fetch popular movies:", err);
      }
    };
    fetchPopularMovies();
  }, []);

  return (
    <section className="anime-section">
      <h2 className="section-heading">Popular Movies</h2>
      <div className="card-grid">
        {popularMovies.map((anime) => (
          <div key={anime._id} className="anime-card">
            <Link to={`/anime/${encodeURIComponent(anime.name)}`}>
              <img src={anime.img} alt={anime.name} className="anime-img" />
            </Link>
            <p className="anime-name">{anime.name}</p>
          </div>
        ))}
      </div>
      <div className="back-button">
            <Link to="/" className="back-name">
              ⬅ Back to Home
            </Link>
          </div>
    </section>
  );
};

export default PopularMovies;
