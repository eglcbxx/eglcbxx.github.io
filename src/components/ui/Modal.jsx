import { useEffect } from 'react';

/**
 * Reusable modal component.
 * Uses existing .modal / .modal-content CSS classes.
 *
 * @param {boolean}  open      – whether the modal is visible
 * @param {function} onClose   – called when overlay or Escape pressed
 * @param {string}   [className] – extra class on .modal-content
 * @param {React.ReactNode} children
 */
export default function Modal({ open, onClose, className = '', children }) {
  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal active" onClick={onClose}>
      <div
        className={`modal-content ${className}`.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
