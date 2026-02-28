import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../hooks/useLanguage';

export default function StrengthCard({ strength }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useScrollAnimation();
  const { t, localize } = useLanguage();

  return (
    <div
      ref={ref}
      className={`strength-card no-modal animate-on-scroll${expanded ? ' expanded' : ''}`}
      data-strength={localize(strength.title)}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="strength-header">
        <div className="strength-name">
          {strength.emoji} {localize(strength.title)}
        </div>
      </div>
      <div className="strength-details">
        <ul>
          {localize(strength.points).map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
      <p className="small">{t('ui.clickDetails')}</p>
    </div>
  );
}
