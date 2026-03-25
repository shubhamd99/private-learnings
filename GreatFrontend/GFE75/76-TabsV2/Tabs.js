import React, { useState, Children, isValidElement } from "react";
import "./Tabs.css";

/**
 * Machine Coding optimized Tabs component (JavaScript Version).
 *
 * Performance Highlight:
 * Uses React conditional rendering to mount only the active panel.
 */

export default function Tabs({
  tabs = [],
  children,
  defaultValue,
  value: controlledValue,
  onChange,
}) {
  // Uncontrolled state: use first tab if no default is provided
  const [internalValue, setInternalValue] = useState(
    defaultValue || (tabs.length > 0 ? tabs[0].value : ""),
  );

  const activeValue =
    controlledValue !== undefined ? controlledValue : internalValue;

  const handleTabClick = (val) => {
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  /**
   * OPTIMIZATION:
   * Filter 'children' array and only render the panel matching 'activeValue'.
   */
  const activePanel = Children.toArray(children).find((child) => {
    return isValidElement(child) && child.props.value === activeValue;
  });

  return (
    <div className="tabs">
      {/* Tabs Menu List */}
      <div className="tabs-list">
        {tabs.map(({ label, value }) => {
          const isActive = value === activeValue;
          return (
            <button
              key={value}
              type="button"
              className={`tabs-list-item ${isActive ? "tabs-list-item--active" : ""}`}
              onClick={() => handleTabClick(value)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab Content: Only the current active panel is mounted */}
      <div className="tabs-panel">{activePanel}</div>
    </div>
  );
}

/**
 * TabPanel Container
 */
export function TabPanel({ children, value }) {
  // value is used by the parent (Tabs) to determine visibility
  return <>{children}</>;
}

// Usage

<Tabs
  tabs={[
    { label: "Tab 1", value: "tab1" },
    { label: "Tab 2", value: "tab2" },
    { label: "Tab 3", value: "tab3" },
  ]}
>
  <TabPanel value="tab1">
    <p>Content for Tab 1</p>
  </TabPanel>
  <TabPanel value="tab2">
    <p>Content for Tab 2</p>
  </TabPanel>
  <TabPanel value="tab3">
    <p>Content for Tab 3</p>
  </TabPanel>
</Tabs>;
