import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <footer style={{ marginTop: 20 }}>
            <div className="container">
                <div className="social">
                    <a href="https://www.linkedin.com/in/etienne-lapointe-b82b101bb/" target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                    <a href="https://github.com/eglcbxx" target="_blank" rel="noreferrer">
                        GitHub
                    </a>
                    <a onClick={() => navigate('/contact')} rel="noreferrer">
                        {t('nav.contact')}
                    </a>
                </div>
                <p className="small">© {new Date().getFullYear()} Coach E.T @ Codeboxx · {t('footer.rights')}</p>
            </div>
        </footer>
    );
}