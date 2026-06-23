function Logo({ width = 40, height = 47 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 137"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TechNova logo"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#00F5D4" />
        </linearGradient>
      </defs>

      <polygon points="60,0 120,34 120,103 60,137 0,103 0,34" fill="none" stroke="url(#logoGrad)" strokeWidth="2.5" />
      <polygon points="60,18 104,43 104,93 60,118 16,93 16,43" fill="#8B5CF6" opacity="0.12" />
      <line x1="60" y1="8" x2="60" y2="129" stroke="url(#logoGrad)" strokeWidth="1.2" opacity="0.35" />
      <line x1="8" y1="38" x2="112" y2="99" stroke="url(#logoGrad)" strokeWidth="1.2" opacity="0.35" />
      <line x1="112" y1="38" x2="8" y2="99" stroke="url(#logoGrad)" strokeWidth="1.2" opacity="0.35" />
      <polygon points="60,42 80,54 80,78 60,90 40,78 40,54" fill="url(#logoGrad)" />
      <circle cx="60" cy="10" r="3.5" fill="#00F5D4" />
      <circle cx="112" cy="40" r="3.5" fill="#8B5CF6" />
      <circle cx="112" cy="97" r="3.5" fill="#00F5D4" />
      <circle cx="60" cy="127" r="3.5" fill="#8B5CF6" />
      <circle cx="8" cy="97" r="3.5" fill="#00F5D4" />
      <circle cx="8" cy="40" r="3.5" fill="#8B5CF6" />
    </svg>
  )
}

export default Logo