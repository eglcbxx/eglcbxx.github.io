import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function SkillCard({ skill }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useScrollAnimation({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      className={`skill-card animate-on-scroll${expanded ? ' expanded' : ''}`}
      data-skill={skill.id}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="skill-header">
        <div className="skill-name">
          {skill.emoji} {skill.name}
        </div>
        <div className="skill-level">{skill.level}</div>
      </div>
      <p className="small">{skill.technologies}</p>
      <div className="skill-details">
        <ul>
          {skill.details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      </div>
      <p className="small">Click to see details</p>
    </div>
  );
}
