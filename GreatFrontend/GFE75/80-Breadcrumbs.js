/**
 * Breadcrumbs
 *
 * Props:
 *   items     - Array of { label, href }. Last item is the current page (no link).
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
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={item.href ?? item.label}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {isLast ? (
                <span aria-current="page" style={{ color: "#555" }}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  style={{ color: "#0070f3", textDecoration: "none" }}
                >
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span aria-hidden="true" style={{ color: "#999" }}>
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Electronics", href: "/electronics" },
  { label: "Phones", href: "/electronics/phones" },
  { label: "iPhone 15" }, // current page — no href needed
];

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h3>Breadcrumbs</h3>
      <Breadcrumbs items={CRUMBS} />

      <h3 style={{ marginTop: 32 }}>Custom separator ( / )</h3>
      <Breadcrumbs items={CRUMBS} separator="/" />
    </div>
  );
}
