import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

export default function ProjectModal({ project, onClose }) {
  const { t, localize } = useLanguage();

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!project) return null;

  const { title, modalData, link } = project;

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label={t('ui.closeModal')} onClick={onClose}>
          ×
        </button>
        <div>
          <h2>{localize(title)}</h2>

          <div className="modal-section">
            <h4>{t('projectModal.problem')}</h4>
            <p className="small">{localize(modalData.problem)}</p>
          </div>

          <div className="modal-section">
            <h4>{t('projectModal.solution')}</h4>
            <p className="small">{localize(modalData.solution)}</p>
          </div>

          <div className="modal-section">
            <h4>{t('projectModal.technologies')}</h4>
            <div className="modal-tech">
              {modalData.tech.map((techItem) => (
                <span key={techItem} className="tag">
                  {techItem}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h4>{t('projectModal.keyLearnings')}</h4>
            <ul>
              {localize(modalData.lessons).map((lesson, i) => (
                <li key={i} className="small">
                  {lesson}
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <a href={link} target="_blank" rel="noreferrer">
              {t('ui.viewOnGithub')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
