import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

export default function ImageModal({ src, alt, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="image-modal active" onClick={onClose}>
      <button className="modal-close" aria-label={t('ui.closeImage')} onClick={onClose}>
        ×
      </button>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
