import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../CSS/DivComponents.css";
import Navbar from "./Navbar.jsx"

const DivComponents = () => {
  const { animeName } = useParams();
  const [anime, setAnime] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/anime/name/${encodeURIComponent(animeName)}`
        );
        setAnime(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Anime not found");
      }``
    };

    fetchAnime();
  }, [animeName]);

  const convertDriveUrl = (url) => {
    if (!url) return "";
    if (url.includes("drive.google.com")) {
      // extract ID from Google Drive link
      const match = url.match(/\/d\/([^/]+)\//);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return url;
  };

  if (error) return <p className="error">{error}</p>;
  if (!anime) return <p className="loading">Loading...</p>;

  return (
     <>
        <Navbar/>

    <div className="anime-details">
      <div className="anime-header">
        <img src={anime.img} alt={anime.name} className="anime-image" />
        <div className="anime-info">
          <h1 className="anime-info-h">{anime.name}</h1>
          <p className="anime-info-p">Category: {anime.category}</p>
        </div>
      </div>

      <div className="anime-videos">
        <h2 className="anime-videos-h">Episodes</h2>
        {anime.videos && anime.videos.length > 0 ? (
          <div className="video-grid">
            {anime.videos.map((v, index) => (
              <div key={index} className="video-card">
                <h3>{v.title}</h3>
                <iframe
                  src={convertDriveUrl(v.videoUrl)}
                  title={v.title}
                  className="anime-video"
                  allow="autoplay; fullscreen; encrypted-media"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No videos available</p>
        )}
      </div>

      <div className="back-btn-container">
        <Link to="/" className="back-home">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
    </>
  );
};

export default DivComponents;
