import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation, useScrollAnimationGroup } from '../hooks/useScrollAnimation';
import Carousel from '../components/Carousel';
import SkillCard from '../components/SkillCard';
import StrengthCard from '../components/StrengthCard';
import skillsData from '../data/skills.json';
import strengthsData from '../data/strengths.json';
import eglPicture from '../assets/images/egl-picture.jpg';

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useScrollAnimation();
  const mainRef = useScrollAnimationGroup();

  return (
    <div ref={mainRef}>
      <section className="hero animate-fade" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span>{t('hero.greeting')}</span> <span className="wave">👋</span>
            </h1>
            <p className="hero-subtitle">{t('hero.subtitle')}</p>
            <p className="hero-description">{t('hero.description')}</p>
            <div className="hero-tags">
              <span className="tag">JavaScript</span>
              <span className="tag">React</span>
              <span className="tag">HTML/CSS</span>
              <span className="tag">Ruby on Rails</span>
              <span className="tag">SQL</span>
              <span className="tag">{t('hero.aiExpert')}</span>
            </div>
            <div className="hero-cta">
              <Link to="/portfolio" className="btn-primary">
                {t('hero.viewWork')}
              </Link>
              <Link to="/contact" className="btn-secondary">
                {t('hero.getInTouch')}
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-wrapper">
              <img src={eglPicture} alt="Coach E.T @ Codeboxx" />
            </div>
          </div>
        </div>
      </section>

      <div className="section-header">
        <h2 className="animate-on-scroll">{t('sections.skills')}</h2>
      </div>

      <Carousel id="skills-carousel">
        {skillsData.skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </Carousel>

      <div className="section-header">
        <h2 className="animate-on-scroll">{t('sections.strengths')}</h2>
      </div>

      <Carousel id="strengths-carousel">
        {strengthsData.strengths.map((strength, i) => (
          <StrengthCard key={i} strength={strength} />
        ))}
      </Carousel>
    </div>
  );
}
