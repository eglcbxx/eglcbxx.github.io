import { NavLink } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const logo = '/assets/images/logo.png';

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <header style={{ marginBottom: 20 }}>
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
  );
}
