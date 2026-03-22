// Modal dialogs are interactive overlay windows that temporarily
// disable the main content of a web page
// focusing user attention on specific tasks or information.
// They serve various purposes, including displaying critical alerts,
// requesting user input, confirming actions, and presenting additional content
// without navigating away from the current context.

// React Portal - In React, a portal is a feature that allows you to render children
// into a DOM node that exists outside the DOM hierarchy of the parent component,
// while still maintaining the component's logical position in the React tree.
// This is achieved using the createPortal method from react-dom

// Normally whatever you render in a component ends up nested inside that component's DOM node
// But some UI elements like modals, tooltips, and dropdowns need to visually break out of their container
// especially when the parent has overflow: hidden or a low z-index that would clip or hide them.

// Without portal:
// <div style="overflow: hidden">        ← clips everything inside
//   <Modal />                           ← modal gets clipped, looks broken
// </div>

// With portal:
// <div style="overflow: hidden">        ← does not affect modal anymore
//   (modal is teleported out)
// </div>
// <Modal />                             ← renders here, at body level

// Even though the HTML is outside in the DOM, React still treats it as inside the component tree, So,
// Events still bubble up through React's component tree normally
// Context still works
// State still works

import { useState } from "react";

import ModalDialog from "./ModalDialog";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Show Modal</button>
      <ModalDialog
        open={open}
        title={"Modal Title"}
        onClose={() => {
          setOpen(false);
        }}
      >
        One morning, when Gregor Samsa woke from troubled dreams, he found
        himself transformed in his bed into a horrible vermin. He lay on his
        armour-like back, and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches into stiff sections.
      </ModalDialog>
    </div>
  );
}
