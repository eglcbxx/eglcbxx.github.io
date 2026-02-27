export default function Footer() {
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
          <a href="mailto:etienne.gonthier-lapointe@codeboxx.bix">Email</a>
        </div>
        <p className="small">© {new Date().getFullYear()} Coach E.T @ Codeboxx</p>
      </div>
    </footer>
  );
}
