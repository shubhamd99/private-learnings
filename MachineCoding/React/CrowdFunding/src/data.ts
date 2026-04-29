import type { Campaign } from "./App";

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    title: "Solar Panels for Community Center",
    description:
      "Help us power our local community center with clean solar energy.",
    goal: 10000,
    raised: 3500,
    contributors: [
      { id: 1, name: "Alice", amount: 2000 },
      { id: 2, name: "Bob", amount: 1500 },
    ],
  },
  {
    id: 2,
    title: "Kids Coding Bootcamp",
    description:
      "Fund a free coding bootcamp for underprivileged children in our city.",
    goal: 5000,
    raised: 1200,
    contributors: [
      { id: 3, name: "Carol", amount: 700 },
      { id: 4, name: "David", amount: 500 },
    ],
  },
  {
    id: 3,
    title: "Local Animal Shelter Renovation",
    description: "Renovate the shelter to give animals a safer, better home.",
    goal: 8000,
    raised: 7800,
    contributors: [
      { id: 5, name: "Eve", amount: 4000 },
      { id: 6, name: "Frank", amount: 3800 },
    ],
  },
];
