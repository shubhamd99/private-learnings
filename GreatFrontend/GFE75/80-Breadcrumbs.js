import React, { useMemo } from "react";

const breadCrum = [
  { id: 3, parentId: 12, title: "Headphones" },
  { id: 19, parentId: 28, title: "True wireless" },
  { id: 28, parentId: 3, title: "Wired" },
  { id: 12, parentId: null, title: "Audio" },
  { id: null, parentId: 19, title: "Bluetooth" },
];

const arrToTree = (arr) => {
  const map = {};
  const roots = [];

  arr.forEach((item) => {
    map[item.id] = { ...item, children: null };
  });

  arr.forEach((item) => {
    if (!item.parentId) {
      roots.push(map[item.id]);
    } else {
      if (map[item.parentId]) {
        map[item.parentId].children = map[item.id];
      }
    }
  });

  return roots;
};

const BreadcrumbItem = ({ node, separator }) => {
  const isLast = !node.children;
  const label = node.title || node.label;
  const href = node.href || "#";

  return (
    <>
      <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {isLast ? (
          <span aria-current="page" style={{ color: "#555" }}>
            {label}
          </span>
        ) : (
          <a href={href} style={{ color: "#0070f3", textDecoration: "none" }}>
            {label}
          </a>
        )}
        {!isLast && (
          <span aria-hidden="true" style={{ color: "#999" }}>
            {separator}
          </span>
        )}
      </li>
      {node.children && (
        <BreadcrumbItem node={node.children} separator={separator} />
      )}
    </>
  );
};

/**
 * Breadcrumbs
 *
 * Props:
 *   items     - Array of items to be converted to tree
 *   separator - Optional string/element between crumbs. Defaults to ">".
 *
 * Accessibility:
 *   - <nav aria-label="Breadcrumb"> wraps the landmark so screen readers announce it.
 *   - <ol> conveys ordered sequence to AT.
 *   - aria-current="page" on the last crumb tells AT it's the current location.
 *   - Separators are aria-hidden so they're skipped by AT.
 *
 * Visual Output:
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Breadcrumbs                                                │
 * │                                                             │
 * │  [Home] > [Electronics] > [Phones] > iPhone 15             │
 * │   blue      blue            blue      grey (no link)        │
 * │                                                             │
 * │  Custom separator ( / )                                     │
 * │                                                             │
 * │  [Home] / [Electronics] / [Phones] / iPhone 15             │
 * └─────────────────────────────────────────────────────────────┘
 *
 * Each crumb:
 *   - Link crumb  → <a> in blue (#0070f3), no underline, clickable
 *   - Separator   → grey (#999), aria-hidden (screen readers skip it)
 *   - Current page → plain <span> in grey (#555), aria-current="page"
 */
function Breadcrumbs({ items, separator = ">" }) {
  const nodes = useMemo(() => arrToTree(items), [items]);

  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: "flex",
          listStyle: "none",
          padding: 0,
          margin: 0,
          gap: 8,
        }}
      >
        {nodes.map((node) => (
          <BreadcrumbItem
            key={node.id ?? (node.title || node.label)}
            node={node}
            separator={separator}
          />
        ))}
      </ol>
    </nav>
  );
}

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h3>Breadcrumbs</h3>
      <Breadcrumbs items={breadCrum} separator=">>" />

      <h3 style={{ marginTop: 32 }}>Custom separator ( / )</h3>
      <Breadcrumbs items={breadCrum} separator="/" />
    </div>
  );
}
