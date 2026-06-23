function Footer() {
  return (
    <footer className="footer-custom py-4 mt-5 text-center">
      <p className="m-0" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} <strong style={{ color: 'var(--text)' }}>Tech<span style={{ color: 'var(--accent-2)' }}>Nova</span></strong> — Tecnología que se siente.
      </p>
    </footer>
  )
}

export default Footer