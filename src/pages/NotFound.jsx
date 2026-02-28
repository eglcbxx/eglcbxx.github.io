import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div style={{ textAlign: 'center', paddingTop: 80 }}>
      <h1>404</h1>
      <p className="small">{t('notFound.message')}</p>
      <Link to="/" className="btn-primary" style={{ marginTop: 24, display: 'inline-block' }}>
        {t('notFound.goHome')}
      </Link>
    </div>
  );
}
