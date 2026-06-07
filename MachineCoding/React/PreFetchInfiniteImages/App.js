import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const PAGE_SIZE = 10;

// Utility to prefetch actual images into the browser cache
const prefetchImages = (images) => {
  images.forEach((url) => {
    const img = new Image();
    img.decoding = "async"; // Ensures decoding happens off the main thread
    img.src = url;
  });
};

function LazyImage({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`image-wrapper ${className}`}>
      {/* Show the shimmer placeholder until the actual image finishes loading */}
      {!isLoaded && <div className="image-placeholder"></div>}

      {/* We rely on native loading="lazy" instead of a second IntersectionObserver */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`image ${isLoaded ? "loaded" : "loading"}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);

  useEffect(() => {
    let ignore = false;

    async function loadItems() {
      try {
        setLoading(true);
        // Using Picsum API for placeholder images
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=${PAGE_SIZE}`,
        );
        const newItems = await response.json();

        if (!ignore) {
          // Pre-fetch the actual image bytes into browser cache.
          // When they scroll into view and LazyImage sets the src,
          // it resolves instantly from the disk cache.
          const imageUrls = newItems.map((item) => item.download_url);
          prefetchImages(imageUrls);

          setItems((currentItems) => [...currentItems, ...newItems]);
          setHasMore(newItems.length === PAGE_SIZE);
        }
      } catch (error) {
        console.error("Failed to load images", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      ignore = true;
    };
  }, [page]);

  useEffect(() => {
    // Observer pattern for Infinite Scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        if (isVisible && !loading && hasMore) {
          setPage((currentPage) => currentPage + 1);
        }
      },
      {
        // Trigger the next page fetch much earlier (1000px before reaching the bottom)
        // This gives the network enough time to fetch the JSON *and* prefetch the heavy image bytes
        // before the user actually scrolls down to them.
        rootMargin: "1000px",
      },
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [loading, hasMore]);

  return (
    <main className="page">
      <h1>Infinite Gallery</h1>
      <section className="image-grid">
        {items.map((item) => (
          <LazyImage
            key={item.id}
            src={item.download_url}
            alt={item.author}
            className="gallery-item"
          />
        ))}
      </section>

      {loading && <p className="status">Loading more images...</p>}
      {!hasMore && <p className="status">End of gallery</p>}
      <div ref={sentinelRef} className="sentinel" />
    </main>
  );
}
