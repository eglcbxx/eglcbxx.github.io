import { HashRouter, Routes, Route } from 'react-router-dom';
import LanguageProvider from './hooks/useLanguage.jsx';
import Layout from './components/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Links from './pages/Links';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import SecretBackoffice from './pages/SecretBackoffice';
import './styles.css';

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
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
      </HashRouter>
    </LanguageProvider>
  );
}
