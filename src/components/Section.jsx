import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "../CSS/Section.css"

const Section = ({ query, fetchedAnime, defaultAnimeData }) => {
  // === Combine All Data ===
  const allAnime = useMemo(() => [
    ...defaultAnimeData.mostPopular,
    ...defaultAnimeData.mostLike,
    ...defaultAnimeData.popularMovies,
    ...(defaultAnimeData.recommendedSeries || []),
    ...(defaultAnimeData.recommendedMovies || []),
    ...fetchedAnime,
  ], [fetchedAnime, defaultAnimeData]);

  // === Search Logic ===
  const searchResults = query
    ? allAnime.filter((anime) =>
      anime.name?.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  // === Split categories ===
  const mostPopular = [
    ...defaultAnimeData.mostPopular,
    ...fetchedAnime.filter((a) => a.category === "mostPopular"),
  ];
  const mostLike = [
    ...defaultAnimeData.mostLike,
    ...fetchedAnime.filter((a) => a.category === "mostLike"),
  ];
  const popularMovies = [
    ...defaultAnimeData.popularMovies,
    ...fetchedAnime.filter((a) => a.category === "popularMovies"),
  ];

  const recommendedSeries = defaultAnimeData.recommendedSeries || [];
  const recommendedMovies = defaultAnimeData.recommendedMovies || [];

  // === Helper to render cards ===
  const renderCards = (items) => (
    <div className="card-container">
      {items.map((item, i) => (
        <div key={i} className="card">
          <Link to={`/anime/${encodeURIComponent(item.name)}`}>
            <img src={item.img} alt={item.name} />
          </Link>

          <p className="anime-name">{item.name}</p>
        </div>
      ))}
    </div>
  );

  // === When query present → Show search results ===
  if (query) {
    return (
      <section className="section search-section">
        <h2>Search Results</h2>
        {searchResults.length > 0 ? (
          renderCards(searchResults)
        ) : (
          <p>No results found</p>
        )}
      </section>
    );
  }

  // === Otherwise show all normal sections ===
  return (
    <>
      {/* Recommended Series */}
      <section className="auto-slide-section">
  <h2 className="cardHeading">Recommended Series</h2>
  <div className="auto-slide-container">
    <div className="auto-slide-track">
      {recommendedSeries.concat(recommendedSeries).map((item, i) => (
        <div key={i} className="card">
          <Link to={`/anime/${encodeURIComponent(item.name)}`}>
            <img className="card-img" src={item.img} alt={item.name} />
          </Link>
          <p className="anime-name">{item.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="auto-slide-section">
  <h2 className="cardHeading">Recommended Movies</h2>
  <div className="auto-slide-container">
    <div className="auto-slide-track">
      {recommendedMovies.concat(recommendedMovies).map((item, i) => (
        <div key={i} className="card">
          <Link to={`/anime/${encodeURIComponent(item.name)}`}>
            <img className="card-img" src={item.img} alt={item.name} />
          </Link>
          <p className="anime-name">{item.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Most Popular */}
      <section>
        <h2 className="cardHeading">Most Popular</h2>
        {renderCards(mostPopular)}
      </section>

      {/* Most Like */}
      <section>
        <h2 className="cardHeading">Most Like</h2>
        {renderCards(mostLike)}
      </section>

      {/* Popular Movies */}
      <section>
        <h2 className="cardHeading">Popular Movies</h2>
        {renderCards(popularMovies)}
      </section>
    </>
  );
};

export default Section;
