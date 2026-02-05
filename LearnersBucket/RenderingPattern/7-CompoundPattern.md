# Compound Component Pattern in React

The **Compound Component Pattern** is an advanced React pattern that allows multiple distinct components to work together to share a common state and logic, much like HTML `<select>` and `<option>` elements interact.

## What is it?

It involves a **Parent Component** (the container) that manages state and logic, and multiple **Child Components** that consume that state and handle rendering. They communicate implicitly via the **Context API**, avoiding "Prop Drilling".

## Why use it?

1.  **Encapsulation:** The parent handles the complex logic (state management, event handling), while children just render the UI.
2.  **Flexibility:** Consumers can arrange the child components in any order they like.
3.  **No Prop Drilling:** State is shared via context, so you don't need to pass props through multiple layers.
4.  **Reusable API:** Creates clean, declarative APIs (e.g., `<Dropdown><Dropdown.Toggle /><Dropdown.Menu /></Dropdown>`).

## How to Implement

### 1. Create the Context

Create a context to hold the state shared between components.

```javascript
const DropdownContext = React.createContext();
```

### 2. Create the Parent Component (Provider)

This component holds the state and provides it to children.

```javascript
const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className="dropdown">{children}</div>
    </DropdownContext.Provider>
  );
};
```

### 3. Create Child Components (Consumers)

These components use the context to interact with the parent.

```javascript
/* Toggle Component */
const Toggle = ({ children }) => {
  const { toggle } = React.useContext(DropdownContext);
  return <button onClick={toggle}>{children}</button>;
};

/* Menu Component */
const Menu = ({ children }) => {
  const { isOpen } = React.useContext(DropdownContext);
  return isOpen ? <ul>{children}</ul> : null;
};

// Assign as properties for cleaner API (Optional)
Dropdown.Toggle = Toggle;
Dropdown.Menu = Menu;
```

### 4. Usage

Consumers can now compose the UI flexibly.

```javascript
<Dropdown>
  <Dropdown.Toggle>Options</Dropdown.Toggle>
  <Dropdown.Menu>
    <li>Edit</li>
    <li>Delete</li>
  </Dropdown.Menu>
</Dropdown>
```

## Best Practices

- **Keep State Simple:** Use `useState` for simple states and `useReducer` for complex ones.
- **Validation:** Ensure children are validated or handle missing context gracefully.
- **Accessibility:** Manage focus and ARIA attributes within the parent to ensure the component is accessible.

## Real-World Examples

- **HTML:** `<select>` and `<option>`.
- **UI Libraries:** `Tabs` (TabList, Tab, TabPanel), `Accordion` (Item, Header, Content) found in libraries like Material UI or Radix UI.

## Case Studies: Real-World Usage

### 1. Netflix: Browsing Experience

- **Use Case:** Building the "Trending Now" or "Continue Watching" rails.
- **Implementation:** A `CategoryList` (Parent) manages the active category state.
- **Children:** `CategoryItem`, `PlayButton`, and `InfoButton` consume this state to highlight selection or play media.
- **Benefit:** Consistent behavior across different content rails while allowing different layouts.

### 2. Airbnb: Listing Management

- **Use Case:** Handling complex filters and listing grids.
- **Implementation:** A `ListingManager` provides context for listings, active filters, and sort options.
- **Children:** `Filter` components (Price, Location) update the context, while `ListingItem` components display the data.
- **Benefit:** Decouples the deep "Filter" logic from the "Display" logic, making it easier to add new filter types.

### 3. Shopify: Product Customization

- **Use Case:** Dynamic product pages where users select variants (Size, Color).
- **Implementation:** A `ProductPage` provider holds the selected variant state.
- **Children:** `VariantSelector`, `ProductOption`, and `AddToCartButton` all react to changes (e.g., updating the price or image when "Red" is picked).
- **Benefit:** Allows for highly flexible product page layouts without rewriting the core state logic for every theme.
