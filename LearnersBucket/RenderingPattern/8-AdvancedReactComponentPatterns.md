# Advanced React Component Patterns

Design patterns in React provide standardized solutions to common problems, helping to maintain code quality, scalability, and reusability in enterprise codebases. Below are some essential advanced patterns.

## 1. Headless Components

**"Logic only, no UI"**

Headless components Abstract logic and state management from the visual presentation. They do not render any specific UI themselves but expose state and methods to their children (usually via Render Props or Function as Child), giving the consumer complete control over styling and structure.

- **Key Characteristics:**
  - **Separation of Concerns:** Logic and View are completely decoupled.
  - **Maximum Flexibility:** multiple UI implementations can share the same core logic.

### Example: Headless Modal

```jsx
const HeadlessModal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return children({
    close: onClose,
    // other internal methods or state
  });
};

// Usage
<HeadlessModal isOpen={true} onClose={() => {}}>
  {({ close }) => (
    <div className="modal-wrapper">
      <h1>My Modal</h1>
      <button onClick={close}>Close</button>
    </div>
  )}
</HeadlessModal>;
```

---

## 2. Polymorphic Components

**"One component, many tags"**

Polymorphic components can be rendered as different HTML elements or React components while maintaining the same behavior and API. This is typically achieved using an `as` or `component` prop.

- **Key Characteristics:**
  - **Semantic HTML:** Allows using the correct HTML tag (e.g., `h1`, `span`, `p`) for accessibility.
  - **Type Safety:** (In TypeScript) ensures valid props for the specific element are used.

### Example: Polymorphic Text Component

```jsx
const Text = ({ as: Component = "span", children, className, ...props }) => {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

// Usage
const App = () => (
  <>
    {/* Renders an <h1> */}
    <Text as="h1" style={{ fontSize: "2rem" }}>
      Page Title
    </Text>

    {/* Renders a <p> */}
    <Text as="p" style={{ color: "grey" }}>
      This is a paragraph description.
    </Text>

    {/* Renders a <label> */}
    <Text as="label" htmlFor="username">
      Username:
    </Text>
  </>
);
```

---

## 3. Compound Components

**"Implicit state sharing"**

Compound components allow multiple components to work together as a cohesive unit (like `<select>` and `<option>`). The parent component manages the state and shares it with children implicitly (often via Context), avoiding prop drilling.

- **Key Characteristics:**
  - **Declarative API:** Components function like HTML elements.
  - **Tight Coupling:** Child components are meant to be used within the specific Parent.

### Example: Accordion

```jsx
<Accordion>
  <Accordion.Item id="1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content for section 1</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

---

## 4. Higher-Order Components (HOCs)

**"Enhancing components"**

A technique based on functional programming where a function takes a component and returns a new component with enhanced data or functionality. It is useful for reusing logic across many components (e.g., Auth, Loading states).

- **Key Characteristics:**
  - **Composition:** Enhances components without modifying their source code.
  - **Props Proxy:** Passes new props to the wrapped component.

### Example: `withLoading`

```jsx
const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <div>Loading...</div>;
    return <WrappedComponent {...props} />;
  };
};

const UserProfileWithLoading = withLoading(UserProfile);
```

---

## 5. Render Props

**"Sharing code via a prop value"**

A pattern where a component shares code between components using a prop whose value is a function. The component calls this function with its internal state, "inverting control" of rendering to the parent.

- **Key Characteristics:**
  - **Dynamic Rendering:** The consumer decides exactly what to render based on the state provided.
  - **Cross-Cutting Concerns:** Great for logic like mouse tracking, window resizing, or scroll position.

### Example: Mouse Tracker

```jsx
const MouseTracker = ({ render }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  // ... logic to update position on mousemove ...
  return render(pos);
};

// Usage
<MouseTracker
  render={({ x, y }) => (
    <h1>
      The mouse is at {x}, {y}
    </h1>
  )}
/>;
```
