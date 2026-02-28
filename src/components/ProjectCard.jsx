import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../hooks/useLanguage';
import ImageModal from './ImageModal';

export default function ProjectCard({ project, onOpenModal }) {
  const ref = useScrollAnimation();
  const [imageModalSrc, setImageModalSrc] = useState(null);
  const { t, localize } = useLanguage();

  const imgSrc = project.image.startsWith('assets/')
    ? `/${project.image}`
    : project.image;

  return (
    <>
      <div
        ref={ref}
        className="card animate-on-scroll project-item project-card-clickable"
        data-category={project.category}
        data-project={project.id}
        onClick={() => onOpenModal && onOpenModal(project)}
      >
        <h3>{localize(project.title)}</h3>
        <img
          className="project-img"
          src={imgSrc}
          alt={localize(project.title)}
          onClick={(e) => {
            e.stopPropagation();
            setImageModalSrc(imgSrc);
          }}
        />
        <p className="small">{localize(project.description)}</p>
        <p>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {t('ui.viewDetails')}
          </a>
        </p>
      </div>

      {imageModalSrc && (
        <ImageModal
          src={imageModalSrc}
          alt={localize(project.title)}
          onClose={() => setImageModalSrc(null)}
        />
      )}
    </>
  );
}
