import { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
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
        <button className="modal-close" aria-label="Close modal" onClick={onClose}>
          ×
        </button>
        <div>
          <h2>{title}</h2>

          <div className="modal-section">
            <h4>🎯 Problem</h4>
            <p className="small">{modalData.problem}</p>
          </div>

          <div className="modal-section">
            <h4>💡 Solution</h4>
            <p className="small">{modalData.solution}</p>
          </div>

          <div className="modal-section">
            <h4>🛠️ Technologies</h4>
            <div className="modal-tech">
              {modalData.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h4>📚 Key Learnings</h4>
            <ul>
              {modalData.lessons.map((lesson, i) => (
                <li key={i} className="small">
                  {lesson}
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <a href={link} target="_blank" rel="noreferrer">
              View on GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
