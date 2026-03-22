import { useId } from "react";
import { createPortal } from "react-dom";

export default function ModalDialog({
  children,
  open = false,
  title,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  open?: boolean;
  title: string;
  onClose: VoidFunction;
}>) {
  const titleId = useId();

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        // Only close if the user clicked exactly the overlay,
        // and not on the modal body itself.
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h1 id={titleId} className="modal-title">
          {title}
        </h1>
        <div>{children}</div>
        <button onClick={onClose} aria-label="Close modal">
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}
