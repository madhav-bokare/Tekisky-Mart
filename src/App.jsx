import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import DivComponents from "./components/DivComponents.jsx";
import MostPopular from "./NaveBarContents/components/popularSeries.jsx";
import PopularMovies from "./NaveBarContents/components/PopularMovies.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/anime/:animeName" element={<DivComponents />} />
        <Route path="/popular-series" element={<MostPopular />} />
        <Route path="/popular-movies" element={<PopularMovies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
