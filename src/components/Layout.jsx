import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import Navbar from './Navbar';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import ScrollProgress from './ScrollProgress';

export default function Layout() {
  const location = useLocation();
  const { t } = useLanguage();

  /* Re-trigger the page-load animation on every route change */
  useEffect(() => {
    document.body.style.animation = 'none';
    // Force reflow
    void document.body.offsetHeight;
    document.body.style.animation = '';
  }, [location.pathname]);

  return (
    <>
      <a href="#main-content" className="skip-to-main">
        {t('aria.skipToMain')}
      </a>
      <ScrollProgress />
      <Navbar />

      <main className="container" id="main-content" role="main">
        <Outlet />
      </main>

      <Footer />
      <ThemeToggle />
      <LanguageSwitcher />
    </>
  );
}
