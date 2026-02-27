import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LanguageProvider from './hooks/useLanguage.jsx';
import Layout from './components/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Links from './pages/Links';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import SecretBackoffice from './pages/SecretBackoffice';
import './styles.css';

/** ⌘+Shift+K (Mac) / Ctrl+Shift+K (other) → navigate to backoffice */
function SecretShortcut() {
  const navigate = useNavigate();
  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        navigate('/secret-backoffice');
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <MemoryRouter>
        <SecretShortcut />
        <Routes>
          {/* Public site with shared layout (Navbar, Footer, etc.) */}
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="links" element={<Links />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin backoffice – standalone (no Navbar/Footer) */}
          <Route path="secret-backoffice" element={<SecretBackoffice />} />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>
  );
}
