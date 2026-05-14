import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const PAGE_SIZE = 10;

export default function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const sentinelRef = useRef(null);

  useEffect(() => {
    let ignore = false;

    async function loadItems() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`,
        );
        const newItems = await response.json();

        if (!ignore) {
          setItems((currentItems) => [...currentItems, ...newItems]);
          setHasMore(newItems.length === PAGE_SIZE);
        }
      } catch (error) {
        if (!ignore) {
          setError("Failed to load posts");
        }
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
    const observer = new IntersectionObserver((entries) => {
      const isVisible = entries[0].isIntersecting;

      if (isVisible && !loading && hasMore) {
        setPage((currentPage) => currentPage + 1);
      }
    });

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
      <h1>Infinite Scroll</h1>

      <section className="list" aria-label="Items">
        {items.map((item) => (
          <article className="card" key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}
      {!hasMore && <p className="status">No more items</p>}
      <div ref={sentinelRef} className="sentinel" />
    </main>
  );
}
