import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimationGroup } from '../hooks/useScrollAnimation';
import ResourceCard from '../components/ResourceCard';
import resourcesData from '../data/resources.json';

export default function Links() {
  const { t } = useLanguage();
  const mainRef = useScrollAnimationGroup();

  return (
    <div ref={mainRef}>
      <h1 className="animate-fade">{t('links.title')}</h1>
      <p className="small animate-fade">{t('links.description')}</p>

      <div className="grid" id="resources-container">
        {resourcesData.resources.map((resource, i) => (
          <ResourceCard key={i} resource={resource} />
        ))}
      </div>
    </div>
  );
}
