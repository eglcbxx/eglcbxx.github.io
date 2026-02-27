import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();

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
                        Contact
                    </a>
                </div>
                <p className="small">© {new Date().getFullYear()} Coach E.T @ Codeboxx</p>
            </div>
        </footer>
    );
}