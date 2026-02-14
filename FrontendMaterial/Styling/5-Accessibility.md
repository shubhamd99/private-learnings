# Web Accessibility (A11y)

Web accessibility is the practice of ensuring that websites and digital tools are usable by everyone, including people with visual, auditory, motor, and cognitive impairments.

## 1. Importance and Benefits

- **Social & Ethical:** Accessibility is a fundamental human right (UN) and promotes social inclusion.
- **Legal Compliance:** Adherence to regulations like **ADA** (US), **Section 508** (US Federal), **EU Web Accessibility Directive**, and **UK Equality Act 2010** avoids legal risks.
- **Business Impact:** Reaches a broader audience (~15% of the population), builds customer loyalty, and provides a competitive advantage.
- **SEO & Performance:** Accessibility practices (like semantic HTML and alt text) align with SEO best practices and improve site interoperability.
- **Usability for All:** Features like clear navigation and readable text benefit all users, not just those with disabilities.

## 2. Understanding User Needs

- **Visual Impairments:** Blindness (requires screen readers), low vision (requires zooming/high contrast), and color blindness.
- **Hearing Impairments:** Deaf or hard of hearing users require captions, transcripts, and visual alerts.
- **Motor Disabilities:** Users with limited mobility may rely on keyboard-only navigation, switch devices, or voice control.
- **Cognitive Disabilities:** Learning or memory impairments require clear, simple language, consistent layouts, and minimal distractions.

## 3. Web Accessibility Guidelines (WCAG)

The **Web Content Accessibility Guidelines (WCAG)** are the international standard, organized around the **POUR** principles:

1.  **Perceivable:** Users must be able to perceive information (e.g., alt text for images, captions for video).
2.  **Operable:** UI components must be navigable (e.g., keyboard accessibility, sufficient time to complete tasks).
3.  **Understandable:** Information and operation must be clear (e.g., predictable patterns, error guidance).
4.  **Robust:** Content must work with current and future user agents, including assistive technologies.

**Conformance Levels:**

- **Level A:** Minimum accessibility.
- **Level AA:** The mid-range, industry-standard target (removes most common barriers).
- **Level AAA:** The highest and most complex level.

## 4. Implementation Best Practices

### Content & Design

- **Text Alternatives:** Provide descriptive `alt` text for functional images and `alt=""` for decorative ones.
- **Multimedia:** Include synchronized captions, transcripts, and audio descriptions.
- **Color & Contrast:** Maintain a contrast ratio of at least **4.5:1** for normal text. Avoid using color as the sole conveyor of information.
- **Language:** Use plain, concise language and proper heading hierarchies (`<h1>`-`<h6>`).

### Navigation & Interaction

- **Keyboard Access:** Ensure all interactive elements are reachable via `Tab` and activatable via `Enter/Space`.
- **Focus Indicators:** Always provide highly visible focus states.
- **Skip Links:** Allow users to bypass repetitive navigation to reach the main content quickly.

### Forms & Controls

- **Labels:** Every input must have a programmatically associated `<label>`.
- **Error Handling:** Provide immediate, descriptive feedback and link errors to inputs using `aria-describedby`.
- **Grouping:** Use `<fieldset>` and `<legend>` for related controls like radio buttons.

## 5. ARIA (Accessible Rich Internet Applications)

ARIA attributes supplement HTML to communicate roles, states, and properties to assistive technologies.

- **Roles:** Define what an element is (e.g., `role="dialog"`, `role="tablist"`).
- **States:** Describe current conditions (e.g., `aria-expanded="true"`, `aria-checked="false"`).
- **Properties:** Provide additional context (e.g., `aria-label`, `aria-labelledby`).
- **Rule of Thumb:** Always prefer native HTML elements over ARIA where possible.

## 6. Testing for Accessibility

A robust strategy combines multiple methods:

- **Manual Testing:** Checking tab order, keyboard operation, and screen reader (NVDA, JAWS, VoiceOver) output.
- **Automated Tools:**
  - **WAVE & Axe:** Browser extensions for identifying common violations.
  - **Lighthouse:** Built-in Chrome tool for high-level audits.
  - **Tenon.io:** API-based testing for CI/CD workflows.
- **User Testing:** Engaging people with actual disabilities to identify real-world usability barriers.
