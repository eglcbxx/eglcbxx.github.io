import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function StrengthCard({ strength }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`strength-card no-modal animate-on-scroll${expanded ? ' expanded' : ''}`}
      data-strength={strength.title}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="strength-header">
        <div className="strength-name">
          {strength.emoji} {strength.title}
        </div>
      </div>
      <div className="strength-details">
        <ul>
          {strength.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
      <p className="small">Click to see details</p>
    </div>
  );
}
