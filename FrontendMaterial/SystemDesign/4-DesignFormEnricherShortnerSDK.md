# Design a Form Enrichment & Shortener Javascript SDK

## Overview

A case study on designing a JavaScript SDK for **Apollo** that enriches and shortens meeting booking forms. The SDK is injected into a customer's website to autofill user information (based on an email address) from Apollo's vast database and optionally hide the pre-filled fields to save users time.

## Core Requirements

1. **Auto-fill Fields:** Map database values to specific form fields based on the user's email address.
2. **Shorten/Hide Fields:** Visually hide fields that have been successfully auto-populated to streamline the user experience.
3. **Embeddable SDK:** Provide an easy-to-embed JavaScript `<script>` tag that executes cleanly on various customer websites.

## Technical Architecture & Challenges

### 1. Selecting the Target Form

- **Challenge:** The host website can be custom-built, rely on generic plugins, or use client-side rendering without traditional `<form>` boundaries.
- **Solution:** Allow the customer to configure the ID of the form or DOM element housing the inputs. If unavailable, dynamically fall back to the first discovered form element on the page.

### 2. Capturing Email Input & Security

- **Challenge:** Detecting when a user finishes typing an email and preventing malicious cross-origin (CORS) abuse.
- **Solution:**
  - Attach an `input` event listener with a **debounce** on the email field.
  - To allow CORS, ask customers to **whitelist up to 5 domains** when generating the SDK snippet.
  - Use a unique `appId` and secret headers in the script configuration initialized via the script's `onload` method.

```html
<script
  type="text/javascript"
  src="https://cdn.example.com/js/enrichment-sdk.js"
  defer
  onload='window.meetings.initSDK({appId: "...", schedulingLink: "..."})'
></script>
```

### 3. Populating and Formatting Form Fields

Make an API call to get mapping definitions and user details, then update DOM elements:

- **Inputs & Textareas:** directly update the `.value` property.
- **Select options:** Check if valid `<option>` elements correspond to the fetched data before updating `.value`. Unselect all prior options for multi-selects.
- **Radio & Checkboxes:** Uncheck all previously checked elements in the named group. Loop through matching values and set `.checked = true`.
- **Hiding Fields:** Dynamically apply `display: none` for enriched fields.

### 4. Bypassing Client-Side Framework Event Traps

- **Challenge:** In modern JS setups, programmatically setting `input.value = "text"` does not trigger the event listeners (like Ajax requests) hooked into the form.
- **Solution:** Trigger custom synthetic events (`input`, `change`, `click`) immediately after updating values.

```javascript
input.dispatchEvent(new InputEvent("input", { bubbles: true }));
```

### 5. Handling React's Synthetic Events

- **Challenge:** React tracks inputs natively via a wrapper and suppresses manual changes dispatched globally. Checkboxes and radio buttons notoriously fail to update state when altered via DOM APIs.
- **Solution:** For React-driven forms, utilize utilities like `react-trigger-change`. It bypasses React’s property descriptor hacks temporarily, issues a `MouseEvent` `click`, and safely toggles `node.checked` through the simulated interaction.

### 6. Bundling the SDK for Production

- **Challenge:** The SDK lived within an existing monorepo but needed to be delivered independently to users without constant URL changes.
- **Solution:** Extracted it as a separate `entry` point in Webpack. Configured the `output.filename` to strip `[contenthash]` explicitly in production environments to ensure the JS URL remains statically hostable via CDN (`js/enrichment-sdk.js`).
- **Best Practice:** Encourage loading the script using the `defer` attribute. This guarantees the script executes only after the entire HTML block is parsed, ensuring the target form DOM nodes already exist.

### 7. Optimizations

We cached the outbound API enrichment requests for specific email thresholds to dramatically reduce repetitive payload processing. However, the DOM inputs themselves skipped state caching to ensure users could manually overwrite prepopulated data smoothly.
