import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', paddingTop: 80 }}>
      <h1>404</h1>
      <p className="small">Page not found.</p>
      <Link to="/" className="btn-primary" style={{ marginTop: 24, display: 'inline-block' }}>
        Go Home
      </Link>
    </div>
  );
}
