# Atomic Design Principles in React

## What is Atomic Design?

A methodology for building UIs by breaking them into a hierarchy of reusable components — similar to how matter is built from atoms.

---

## The 5 Levels

| Level | Description | Example |
|-------|-------------|---------|
| **Atom** | Smallest unit, can't be broken down further | `<Button>`, `<Input>`, `<Label>` |
| **Molecule** | 2+ atoms working together | `<SearchBar>` (Input + Button) |
| **Organism** | Complex section made of molecules/atoms | `<Header>` (Logo + Nav + SearchBar) |
| **Template** | Page layout without real content | Skeleton/wireframe of a page |
| **Page** | Template filled with real content | Final rendered UI |

---

## Code Examples

### Atom
```jsx
const Button = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);
```

### Molecule
```jsx
const SearchBar = ({ onSubmit }) => (
  <div>
    <Input placeholder="Search..." />
    <Button onClick={onSubmit}>Go</Button>
  </div>
);
```

### Organism
```jsx
const Header = () => (
  <header>
    <Logo />
    <Navigation />
    <SearchBar onSubmit={() => {}} />
  </header>
);
```

### Page
```jsx
const HomePage = () => (
  <div>
    <Header />
    <Content />
    <Footer />
  </div>
);
```

---

## Folder Structure

```
/src
  /components
    /atoms
    /molecules
    /organisms
    /templates
    /pages
```

---

## Key Rules

- **Atoms** — stateless, single-purpose, no dependencies
- **Molecules** — combine atoms, still relatively simple
- **Organisms** — manage their own complexity; can hold state
- **State** lives at organism level and flows down via props
- Each component should do **one thing well** and be **reusable**

---

## Why Use It?

- Encourages **reusability** — build once, use everywhere
- Makes large codebases **easier to navigate**
- Promotes **design consistency** across the app
- Speeds up development by composing from existing components

---

## Common Pitfalls

- Over-complicating the hierarchy (not everything needs 5 levels)
- Putting state too low (atoms/molecules shouldn't own complex state)
- Skipping documentation — hard for new devs to understand the system
