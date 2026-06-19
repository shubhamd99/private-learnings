import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const RestaurantCard = ({ restaurant }) => {
  const { cart, dispatch } = useContext(CartContext);

  return (
    <div className="card">
      <div className="card-header">
        <h3>{restaurant.name}</h3>
        <span>
          ⭐ {restaurant.rating} | ⏱ {restaurant.deliveryTime}m
        </span>
      </div>
      <p className="cuisine">{restaurant.cuisine}</p>
      <div className="menu">
        {restaurant.menu.map((item) => {
          const qty = cart.find((i) => i.id === item.id)?.quantity || 0;
          return (
            <div key={item.id} className="menu-item">
              <span>
                {item.name} - ${item.price}
              </span>
              <button
                onClick={() =>
                  dispatch({
                    type: "ADD",
                    payload: { item, restaurantId: restaurant.id },
                  })
                }
              >
                {qty > 0 ? `Add (${qty})` : "Add"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
