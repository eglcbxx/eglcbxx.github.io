import { useEffect } from 'react';

export default function ImageModal({ src, alt, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="image-modal active" onClick={onClose}>
      <button className="modal-close" aria-label="Close image" onClick={onClose}>
        ×
      </button>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
