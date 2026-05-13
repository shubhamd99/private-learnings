import React from "react";
import HighlightedText from "./HighlightedText";

export default function CityList({ cities, query }) {
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(query.toLowerCase()),
  );

  if (filteredCities.length === 0) {
    return <p>No cities found</p>;
  }

  return (
    <ul className="city-list">
      {filteredCities.map((city) => (
        <li key={city}>
          <HighlightedText text={city} query={query} />
        </li>
      ))}
    </ul>
  );
}
