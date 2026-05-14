import React, { useRef, useState } from "react";

export default function Accordion({ items, defaultOpenIndex = null }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);
  const buttonRefs = useRef([]);

  const togglePanel = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  const focusButton = (index) => {
    buttonRefs.current[index]?.focus();
  };

  const handleKeyDown = (event, index) => {
    const lastIndex = items.length - 1;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusButton(index === lastIndex ? 0 : index + 1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusButton(index === 0 ? lastIndex : index - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusButton(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      focusButton(lastIndex);
    }
  };

  return (
    <section className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `accordion-button-${index}`;
        const panelId = `accordion-panel-${index}`;

        return (
          <div className="accordion-item" key={item.title}>
            <h2 className="accordion-heading">
              <button
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                id={buttonId}
                className="accordion-trigger"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => togglePanel(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span>{item.title}</span>
                <span aria-hidden="true">{isOpen ? "-" : "+"}</span>
              </button>
            </h2>

            {isOpen && (
              <div
                id={panelId}
                className="accordion-panel"
                role="region"
                aria-labelledby={buttonId}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
