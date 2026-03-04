import { NavLink } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const logo = '/assets/images/logo.png';

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <>
      {/* ── Desktop top navbar ── */}
      <header className="desktop-nav" style={{ marginBottom: 20 }}>
        <div className="container nav">
          <div className="brand">
            <img src={logo} alt="Logo" />
            <span>Coach E.T @ Codeboxx</span>
          </div>
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('nav.home')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('nav.portfolio')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/links" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('nav.links')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('nav.contact')}
              </NavLink>
            </li>
          </ul>
        </div>
      </header>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="mobile-bottom-nav" role="navigation" aria-label="Main navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
          aria-label={t('nav.home')}
        >
          <svg className="bottom-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
          </svg>
          <span className="bottom-nav-label">{t('nav.home')}</span>
        </NavLink>

        <NavLink
          to="/portfolio"
          className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
          aria-label={t('nav.portfolio')}
        >
          <svg className="bottom-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2" />
          </svg>
          <span className="bottom-nav-label">{t('nav.portfolio')}</span>
        </NavLink>

        <NavLink
          to="/links"
          className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
          aria-label={t('nav.links')}
        >
          <svg className="bottom-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="bottom-nav-label">{t('nav.links')}</span>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
          aria-label={t('nav.contact')}
        >
          <svg className="bottom-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="bottom-nav-label">{t('nav.contact')}</span>
        </NavLink>
      </nav>
    </>
  );
}
