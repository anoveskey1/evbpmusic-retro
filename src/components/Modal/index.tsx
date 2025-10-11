import React, { useEffect, useRef } from "react";
import "./style.less";
import Alert from "@components/Modal/Alert";
import { AlertType } from "@/types";

interface IModalProps {
  alertType: AlertType;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ alertType, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (children) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    }
    return () => {
      previouslyFocusedElement.current?.focus();
    };
  }, [children]);

  const handleOnClose = () => {
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;

    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // shift + tab
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // tab
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div
      className="modal-overlay"
      onKeyDown={handleKeyDown}
      ref={modalRef}
      role="dialog"
      tabIndex={-1}
    >
      <Alert alertType={alertType} onClose={handleOnClose}>
        {children}
      </Alert>
    </div>
  );
};

export default Modal;
