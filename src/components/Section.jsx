import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "../CSS/Section.css";

const Section = ({ query = "", fetchedBook = [], paidBook = [] }) => {
  // === Combine Free + Paid books ===
  const allBooks = useMemo(() => [...fetchedBook, ...paidBook], [fetchedBook, paidBook]);

  // === Split categories ===
  const Entertainment = allBooks.filter(b => b.category?.toLowerCase() === "entertainment");
  const History = allBooks.filter(b => b.category?.toLowerCase() === "history");
  const Emotional = allBooks.filter(b => b.category?.toLowerCase() === "emotional");

  // === Search logic ===
  const searchResults = query
    ? allBooks.filter(b => b.title?.toLowerCase().includes(query.toLowerCase()))
    : [];

  // === Card render function ===
  const renderCards = (items) => (
    <div className="card-container">
      {items.map(item => (
        <div key={item._id} className="card">
          {/* Link to detail page */}
          <Link
            to={item.link === "paid" ? `/paid-book/${encodeURIComponent(item.title)}` : `/book/${encodeURIComponent(item.title)}`}
          >
            <img src={item.img || "/default.jpg"} alt={item.title} />
          </Link>

          <p className="book-name">{item.title}</p>

          {/* Paid book details */}
          {item.link === "paid" && (
            <>
              <p className="book-price">₹{item.price}</p>
              <Link to={`/paid-book/${encodeURIComponent(item.title)}`}>
                <button className="buy-btn">Buy Now</button>
              </Link>
            </>
          )}
        </div>
      ))}
    </div>
  );

  // === Search results view ===
  if (query) {
    return (
      <section className="section search-section">
        <h2>Search Results</h2>
        {searchResults.length > 0 ? renderCards(searchResults) : <p>No results found</p>}
      </section>
    );
  }

  // === Normal category sections ===
  return (
    <>
      <section>
        <h2 className="cardHeading">Entertainment</h2>
        {renderCards(Entertainment)}
      </section>

      <section>
        <h2 className="cardHeading">History</h2>
        {renderCards(History)}
      </section>

      <section>
        <h2 className="cardHeading">Emotional</h2>
        {renderCards(Emotional)}
      </section>
    </>
  );
};

export default Section;
