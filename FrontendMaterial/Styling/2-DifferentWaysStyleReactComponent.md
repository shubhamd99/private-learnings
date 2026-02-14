# 3 Different Ways to Write CSS in React

React promotes component-driven development, where state, logic, and styles are isolated within the component itself while allowing for composition and extensibility.

---

## 1. Global Styling with CSS Files

This is the traditional way of applying styles using standard CSS files and selectors (ID, Class, Element).

- **How it works**: Create a standard `.css` file and import it directly into your component.
- **Example**:

  ```css
  /* index.css */
  p {
    color: red;
    font-size: 1.5em;
  }
  ```

  ```javascript
  import "./index.css";

  const App = () => {
    return <h1>Learnersbucket.com</h1>;
  };
  ```

- **Pros**: Simple and familiar to anyone who knows CSS.
- **Cons**:
  - **Global Scope**: Styles apply to all matching elements across the entire application.
  - **Conflicts**: Even with separate files, bundlers dump all styles into a single file, leading to class name collisions.

---

## 2. CSS Modules (Component-Level Styling)

CSS Modules solve the global scope problem by creating locally scoped class names.

- **How it works**: Name your files as `*.module.css`. Import the styles as a JavaScript object.
- **Example**:

  ```css
  /* app.module.css */
  .red {
    color: red;
  }
  .large {
    font-size: 3em;
  }
  ```

  ```javascript
  import Styles from "./app.module.css";
  import ClassNames from "classnames";

  const App = () => {
    return (
      <h1 className={ClassNames(Styles.red, Styles.large)}>
        Learnersbucket.com
      </h1>
    );
  };
  ```

- **Pros**:
  - **Isolation**: Class names are hashed, preventing global scope leakage.
  - **Interoperability**: Works well with standard CSS features.
- **Cons**:
  - **Class Merging**: Requires external utilities like `classnames` to merge multiple styles easily.

---

## 3. Styled-Components (CSS-in-JS)

Styled-components allow you to write actual CSS code to style your components directly in JavaScript.

- **How it works**: Uses tagged template literals to create a component that has styles attached to it.
- **Key Features**:
  - **Dynamic Styling**: Supports props to change styles at runtime.
  - **Pseudo-states**: Handles `:hover`, `:focus`, `:after`, etc., natively.
  - **Extensibility**: You can wrap existing styled-components to override or extend their styles.
- **Example**:

  ```javascript
  import Styled from "styled-components";

  const OutlinedButton = Styled.button`
      background: ${(props) => (props.fill ? "gray" : "transparent")};
      border-radius: 3px;
      color: ${(props) => (props.fill ? "white" : "black")};
      border: 1px solid;
      cursor: pointer;
  
      &:hover {
        color: ${(props) => (props.fill ? "blue" : "red")};
      }
  `;

  const FilledButton = Styled(OutlinedButton)`
    background: green;
    border-color: yellow;
  `;
  ```

- **Pros**:
  - True component-driven styling.
  - No class name management required.
  - Powerful dynamic styling capabilities.
- **Cons**: Requires an external library and has a slight runtime overhead.
