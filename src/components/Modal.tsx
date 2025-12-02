import React from "react";
import clsx from "clsx";
import Button from "./Button";

interface ModalProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className={clsx(
          "bg-ui-card dark:bg-[var(--card)] rounded-2xl shadow-xl w-full max-w-md p-6 border border-ui-border dark:border-[var(--border)]"
        )}
      >
        {title && (
          <h2 className="text-lg font-semibold text-ui-text dark:text-[var(--text)] mb-4">
            {title}
          </h2>
        )}

        <div className="mb-6 text-sm text-ui-text dark:text-[var(--text)]">{children}</div>

        <div className="flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}