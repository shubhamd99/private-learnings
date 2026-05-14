import React from "react";
import Accordian from "./components/Accordion";
import "./styles.css";

const faqs = [
  {
    title: "What is an accordion?",
    content:
      "An accordion shows one or more expandable sections. It is useful when we want to keep related content compact.",
  },
  {
    title: "Why is state needed?",
    content:
      "State stores which panel is open. Clicking or pressing Enter/Space updates that active panel.",
  },
  {
    title: "What about accessibility?",
    content:
      "Each header is a button with aria-expanded and aria-controls. The panel uses role region and aria-labelledby.",
  },
];

export default function App() {
  return (
    <main className="page">
      <h1>Accordion</h1>
      <Accordian items={faqs} defaultOpenIndex={0} />
    </main>
  );
}
