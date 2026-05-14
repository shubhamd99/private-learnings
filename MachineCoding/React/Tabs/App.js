import React from "react";
import Tabs from "./components/Tabs";
import "./styles.css";

const tabs = [
  {
    label: "React",
    content: "React helps build reusable UI with component state and props.",
  },
  {
    label: "Accessibility",
    content:
      "Tabs use role tablist, tab, and tabpanel so keyboard and screen reader users can understand the UI.",
  },
  {
    label: "Interview",
    content:
      "Keep state simple: activeIndex decides which tab and panel are selected.",
  },
];

export default function App() {
  return (
    <main className="page">
      <h1>Tabs</h1>
      <Tabs tabs={tabs} />
    </main>
  );
}
