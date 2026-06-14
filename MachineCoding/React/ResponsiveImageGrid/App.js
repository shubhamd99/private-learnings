import React from "react";
import "./styles.css";

// Generate an array of mock images
const IMAGES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  url: `https://picsum.photos/seed/${i + 42}/400/300`,
  alt: `Random image ${i + 1}`,
}));

export default function App() {
  return (
    <main className="page">
      <h1>Responsive Image Grid</h1>
      <p className="subtitle">
        Powered by CSS Grid: <code>repeat(auto-fit, minmax(250px, 1fr))</code>
      </p>

      <div className="image-grid">
        {IMAGES.map((img) => (
          <div key={img.id} className="grid-item">
            <img src={img.url} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </main>
  );
}
