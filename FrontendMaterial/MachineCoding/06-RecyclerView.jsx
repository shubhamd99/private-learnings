import { useRef, useState, useEffect, useCallback, useMemo } from "react";

const ITEM_HEIGHT = 120;
const LOAD_SIZE = 20;
const OVERSCAN = 3; // Extra nodes above/below viewport to prevent flickering

const VirtualizedList = () => {
  const containerRef = useRef(null);
  const [data, setData] = useState(() =>
    Array.from({ length: LOAD_SIZE }, (_, i) => i),
  );
  const [scrollTop, setScrollTop] = useState(0);

  // 1. Calculate the visible range based on scroll position
  const { startIndex, visibleNodes } = useMemo(() => {
    // window.innerHeight is the height of the viewport
    const poolSize = Math.ceil(window.innerHeight / ITEM_HEIGHT) + OVERSCAN * 2;

    // Calculate raw start index and clamp it to 0
    let start = Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN;
    start = Math.max(0, start);

    // Calculate how many items we can actually show
    const end = Math.min(data.length, start + poolSize);

    return {
      startIndex: start,
      visibleNodes: data.slice(start, end),
    };
  }, [scrollTop, data]);

  // 2. Load more logic (Functional update to avoid stale data)
  const loadMore = useCallback(() => {
    setData((prev) => {
      const nextValue = prev.length;
      const more = Array.from({ length: LOAD_SIZE }, (_, i) => nextValue + i);
      return [...prev, ...more];
    });
  }, []);

  // 3. Optimized Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const currentScrollTop = containerRef.current.scrollTop;
      setScrollTop(currentScrollTop);

      // Infinite Scroll Trigger
      const scrollBottom = currentScrollTop + containerRef.current.clientHeight;
      const totalHeight = data.length * ITEM_HEIGHT;

      if (scrollBottom >= totalHeight - 500) {
        loadMore();
      }
    };

    const node = containerRef.current;
    node?.addEventListener("scroll", handleScroll, { passive: true });
    return () => node?.removeEventListener("scroll", handleScroll);
  }, [data.length, loadMore]); // Re-bind when data length changes

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch", // Smooth scroll for iOS
      }}
    >
      {/* Tall container to provide the scrollbar */}
      <div
        style={{
          height: data.length * ITEM_HEIGHT,
          position: "relative",
          width: "100%",
        }}
      >
        {visibleNodes.map((itemValue, index) => {
          // Calculate the actual position in the total list
          const actualIndex = startIndex + index;

          return (
            <div
              key={itemValue} // Use itemValue as key for better reconciliation
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: ITEM_HEIGHT,
                width: "100%",
                transform: `translateY(${actualIndex * ITEM_HEIGHT}px)`,
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                background: "white",
                boxSizing: "border-box",
              }}
            >
              Item {itemValue}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedList;
