import React, { useState } from "react";
import { cities } from "./data/cities";
import SearchBox from "./components/SearchBox";
import CityList from "./components/CityList";
import "./styles.css";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="app">
      <h2>City Search</h2>
      <SearchBox value={query} onChange={setQuery} />
      <CityList cities={cities} query={query} />
    </div>
  );
}
