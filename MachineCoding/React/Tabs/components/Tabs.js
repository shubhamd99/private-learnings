import React, { useRef, useState } from "react";

export default function Tabs({ tabs, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const tabRefs = useRef([]);
  const activeTab = tabs[activeIndex];

  const selectTab = (index) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event, index) => {
    const lastIndex = tabs.length - 1;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectTab(index === lastIndex ? 0 : index + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectTab(index === 0 ? lastIndex : index - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectTab(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectTab(lastIndex);
    }
  };

  return (
    <section className="tabs">
      <div className="tab-list" role="tablist" aria-label="Demo tabs">
        {tabs.map((tab, index) => {
          const isActive = activeIndex === index;
          const tabId = `tab-${index}`;
          const panelId = `tabpanel-${index}`;

          return (
            <button
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId}
              key={tab.label}
              className="tab"
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`tabpanel-${activeIndex}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeIndex}`}
        className="tab-panel"
      >
        {activeTab.content}
      </div>
    </section>
  );
}
