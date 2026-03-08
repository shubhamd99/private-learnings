import { useState } from "react";

/**
 * Accordion Component
 *
 * Features:
 * - Supports multiple sections being open simultaneously.
 * - Uses a Set for O(1) lookup and easy toggling of section state.
 */
export default function Accordion({ sections }) {
  // We use a Set to store the 'value' of all currently open sections.
  // This allows for an "expand-multiple" behavior.
  const [openSections, setOpenSections] = useState(new Set());

  return (
    <div className="accordion">
      {sections.map(({ value, title, contents }) => {
        // Derive expansion state for each item.
        const isExpanded = openSections.has(value);

        return (
          <div className="accordion-item" key={value}>
            <button
              className="accordion-item-title"
              type="button"
              onClick={() => {
                // To update state in React with a Set, we must create a NEW Set instance.
                const newOpenSections = new Set(openSections);

                if (newOpenSections.has(value)) {
                  newOpenSections.delete(value); // Close if already open
                } else {
                  newOpenSections.add(value); // Open if closed
                }

                setOpenSections(newOpenSections);
              }}
            >
              {title}
              <span
                aria-hidden={
                  true
                } /* a11y - hide the decorative icon from screen readers */
                className={[
                  "accordion-icon",
                  isExpanded && "accordion-icon--rotated",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            </button>
            {/* 
                We use the 'hidden' attribute to toggle visibility. 
                CSS should handle the actual hiding logic based on this attribute.
            */}
            <div className="accordion-item-contents" hidden={!isExpanded}>
              {contents}
            </div>
          </div>
        );
      })}
    </div>
  );
}
