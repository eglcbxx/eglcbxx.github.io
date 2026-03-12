import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../hooks/useLanguage';
import { getImageUrl } from '../utils/getImageUrl';

export default function ResourceCard({ resource }) {
  const ref = useScrollAnimation();
  const { t, localize } = useLanguage();

  const imgSrc = getImageUrl(resource.image);

  return (
    <div ref={ref} className="card no-modal animate-on-scroll">
      <h3>{resource.title}</h3>
      <img className="project-img" src={imgSrc} alt={resource.title} />
      <p className="small">{localize(resource.description)}</p>
      <a href={resource.link} target="_blank" rel="noreferrer">
        {t('ui.visit')}
      </a>
    </div>
  );
}
