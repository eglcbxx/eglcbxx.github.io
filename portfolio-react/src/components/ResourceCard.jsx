import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function ResourceCard({ resource }) {
  const ref = useScrollAnimation();

  const imgSrc = resource.image.startsWith('assets/')
    ? `/${resource.image}`
    : resource.image;

  return (
    <div ref={ref} className="card no-modal animate-on-scroll">
      <h3>{resource.title}</h3>
      <img className="project-img" src={imgSrc} alt={resource.title} />
      <p className="small">{resource.description}</p>
      <a href={resource.link} target="_blank" rel="noreferrer">
        Visit →
      </a>
    </div>
  );
}
