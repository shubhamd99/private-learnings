// The Holy Grail layout is a famous CSS page layout that has
// traditionally been hard to implement.
// It consists of a header, footer, and three columns.
// The left column contains navigation items,
// the middle column contains the page contents, and
// the right column contains ads.

export default function App() {
  return (
    <>
      <header>Header</header>
      <div className="columns">
        <nav>Navigation</nav>
        <main>Main</main>
        <aside>Sidebar</aside>
      </div>
      <footer>Footer</footer>
    </>
  );
}
