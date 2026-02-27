import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimationGroup } from '../hooks/useScrollAnimation';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import projectsData from '../data/projects.json';

const FILTERS = [
  { key: 'all', i18n: 'portfolio.allProjects' },
  { key: 'web', i18n: 'portfolio.frontend' },
  { key: 'fullstack', i18n: 'portfolio.fullstack' },
  { key: 'backend', i18n: 'portfolio.backend' },
  { key: 'mobile', i18n: 'portfolio.mobile' },
];

export default function Portfolio() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalProject, setModalProject] = useState(null);
  const mainRef = useScrollAnimationGroup();

  const filtered =
    activeFilter === 'all'
      ? projectsData.projects
      : projectsData.projects.filter((p) => p.category === activeFilter);

  return (
    <div ref={mainRef}>
      <h1 className="animate-fade">{t('portfolio.title')}</h1>
      <p className="small animate-fade">{t('portfolio.description')}</p>

      <div className="filter-bar animate-fade">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-btn${activeFilter === f.key ? ' active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {t(f.i18n)}
          </button>
        ))}
      </div>

      <div className="grid" id="projects-container">
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenModal={setModalProject}
          />
        ))}
      </div>

      {modalProject && (
        <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
      )}
    </div>
  );
}
