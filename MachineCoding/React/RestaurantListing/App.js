import React, { useState, useEffect, useMemo } from "react";
import { fetchRestaurants } from "./mock/mockApi";
import { CartContext } from "./context/CartContext";
import { RestaurantCard } from "./components/RestaurantCard";
import { cartReducer } from "./utils/cartUtils";
import "./styles.css";

/**
 * Main Application Component
 *
 * Manages global application state including:
 * - Fetching and storing the list of restaurants from the mock API.
 * - Local UI state for filtering (cuisine) and sorting (rating/delivery time).
 * - Cart state management using a lightweight dispatch mechanism.
 *
 * Provides the CartContext to deeply nested components like RestaurantCard.
 */
export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("rating_desc");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchRestaurants()
      .then((data) => setRestaurants(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const dispatch = (action) => setCart((prev) => cartReducer(prev, action));

  const displayed = useMemo(() => {
    return restaurants
      .filter((r) => filter === "All" || r.cuisine === filter)
      .sort((a, b) => {
        if (sort === "rating_desc") return b.rating - a.rating;
        if (sort === "delivery_asc") return a.deliveryTime - b.deliveryTime;
        return 0;
      });
  }, [restaurants, filter, sort]);

  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  if (error) return <div>Error loading data.</div>;

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <div className="layout">
        <main className="main">
          <h1>Foodie Hub</h1>
          <div className="controls">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All Cuisines</option>
              {[...new Set(restaurants.map((r) => r.cuisine))].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="rating_desc">Rating (High to Low)</option>
              <option value="delivery_asc">Delivery (Fast to Slow)</option>
            </select>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid">
              {displayed.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          )}
        </main>

        <aside className="sidebar">
          <h2>Cart</h2>
          {cart.length === 0 ? (
            <p>Empty</p>
          ) : (
            <>
              {cart.map((i) => (
                <div key={i.id} className="cart-item">
                  <span>
                    {i.name} x{i.quantity}
                  </span>
                  <div>
                    <button
                      onClick={() => dispatch({ type: "REMOVE", id: i.id })}
                    >
                      -
                    </button>
                    <span>${i.price * i.quantity}</span>
                  </div>
                </div>
              ))}
              <h3>Total: ${total}</h3>
              <button onClick={() => dispatch({ type: "CLEAR" })}>Clear</button>
            </>
          )}
        </aside>
      </div>
    </CartContext.Provider>
  );
}
