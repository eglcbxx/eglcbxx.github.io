import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../hooks/useLanguage';

export default function SkillCard({ skill }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useScrollAnimation({ threshold: 0.5 });
  const { t, localize } = useLanguage();

  return (
    <div
      ref={ref}
      className={`skill-card animate-on-scroll${expanded ? ' expanded' : ''}`}
      data-skill={skill.id}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="skill-header">
        <div className="skill-name">
          {skill.emoji} {localize(skill.name)}
        </div>
        <div className="skill-level">{localize(skill.level)}</div>
      </div>
      <p className="small">{localize(skill.technologies)}</p>
      <div className="skill-details">
        <ul>
          {localize(skill.details).map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      </div>
      <p className="small">{t('ui.clickDetails')}</p>
    </div>
  );
}
