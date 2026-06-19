export const cartReducer = (prevCart, action) => {
  switch (action.type) {
    case "ADD": {
      const { item, restaurantId } = action.payload;

      // Prevent adding items from different restaurants
      if (prevCart.length > 0 && prevCart[0].restaurantId !== restaurantId) {
        if (!window.confirm("Start new cart from this restaurant?"))
          return prevCart;
        return [{ ...item, quantity: 1, restaurantId }];
      }

      const exists = prevCart.find((i) => i.id === item.id);
      if (exists) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prevCart, { ...item, quantity: 1, restaurantId }];
    }

    case "REMOVE":
      return prevCart
        .map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0);

    case "CLEAR":
      return [];

    default:
      return prevCart;
  }
};
