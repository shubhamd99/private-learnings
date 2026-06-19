const MOCK_DATA = [
  {
    id: "r1",
    name: "Spicy Symphony",
    cuisine: "Indian",
    rating: 4.5,
    deliveryTime: 30,
    menu: [
      { id: "m1", name: "Butter Chicken", price: 15 },
      { id: "m2", name: "Naan", price: 3 },
    ],
  },
  {
    id: "r2",
    name: "Tokyo Bites",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: 45,
    menu: [
      { id: "m3", name: "Sushi", price: 14 },
      { id: "m4", name: "Miso", price: 4 },
    ],
  },
  {
    id: "r3",
    name: "Burger Joint",
    cuisine: "American",
    rating: 4.0,
    deliveryTime: 20,
    menu: [
      { id: "m5", name: "Burger", price: 10 },
      { id: "m6", name: "Fries", price: 4 },
    ],
  },
];

export const fetchRestaurants = () =>
  new Promise((res) => setTimeout(() => res(MOCK_DATA), 1000));
