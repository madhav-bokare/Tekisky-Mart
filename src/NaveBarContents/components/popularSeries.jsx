// MostPopular.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/naveContent.css"; 

const MostPopular = () => {
  const [mostPopular, setMostPopular] = useState([]);

  useEffect(() => {
    const fetchMostPopular = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/anime/mostpopular");
        const data = await res.json();
        setMostPopular(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };
    fetchMostPopular();
  }, []);


  return (
    <section className="anime-section">
      <h2 className="section-heading">Most Popular Series</h2>
      <div className="card-grid">
        {mostPopular.map((anime) => (
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

export default MostPopular;
