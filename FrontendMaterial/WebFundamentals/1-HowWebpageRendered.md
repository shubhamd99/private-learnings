# How a Web Page is Rendered

Understanding the web page rendering process is crucial for web developers to optimize application performance. The transformation of an HTML document into a visualized page is known as the **Critical Rendering Path (CRP)**.

## The Critical Rendering Path

When a browser makes an HTTP request for an HTML page:

1.  **Bytes** are received (server returns data in bytes).
2.  **Characters** are decoded from bytes.
3.  **Tokens** are generated.
4.  **Nodes** are created.
5.  **DOM** (Document Object Model) is finally constructed.

Optimizing the CRP leads to faster loading times and a smoother user experience without glitches or jank.

## The 5 Steps of Rendering

The complete page rendering process can be broken down into five distinct steps:

1.  **Creation of DOM**
2.  **Creation of CSSOM**
3.  **Formation of Render Tree**
4.  **Layout**
5.  **Paint**

### 1. Creation of DOM (Document Object Model)

- The HTML bytes are parsed into a tree-like structure of nodes.
- Parsing can be halted by external resources like scripts and media.
- **Optimization Tip**: Load scripts at the end or use `defer`/`async` to prevent blocking the parser.

### 2. Creation of CSSOM (CSS Object Model)

- Similar to the DOM but stores styling information.
- **Blocking Nature**: CSSOM construction blocks rendering until all CSS is parsed to handle cascading rules and overrides.
- Styles cascade down from parent to child nodes.
- Browser-specific (user agent) styles are also applied.

### 3. Formation of Render Tree

- Combines the DOM and CSSOM.
- **Visible Elements Only**: Contains only nodes that will be displayed on the screen. Elements with `display: none` and their descendants are excluded.

### 4. Layout

- Determines the dimensions and position of each element relative to the viewport.
- The layout is bounded by the device dimensions.
- **Viewport Meta Tag**: Essential for responsive design. Without `<meta name="viewport" content="width=device-width">`, browsers may default to a standard width (often 960px).
- Layout recalculation happens on window resize or device rotation.

### 5. Paint

- Converts the layout into actual pixels on the screen (painting).
- Ideally happens at a refresh rate of **60 frames per second (fps)**.
- Initial paint covers the entire page; subsequent updates reconstruct and repaint only modified elements.

> **Note**: Frequent DOM manipulation triggers re-rendering, causing performance issues. Minimize frequent changes to avoid jank.
