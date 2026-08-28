import React from 'react';

export default function MarqueeTicker() {
  const items = [
    "PYTHON",
    "JAVA",
    "JAVASCRIPT",
    "GEMINI API",
    "REST APIs",
    "OBJECT-ORIENTED PROGRAMMING",
    "DATA STRUCTURES",
    "ALGORITHMS",
    "C PROGRAMMING",
    "REACT",
    "SQL DATABASES",
    "MODULAR ARCHITECTURE"
  ];

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.18)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
        padding: '18px 0',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        position: 'relative',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <div
        className="marquee-track-3d"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '36px',
          animation: 'marqueeScroll 25s linear infinite',
          willChange: 'transform',
          transformStyle: 'preserve-3d'
        }}
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <React.Fragment key={idx}>
            <span
              className="marquee-item-3d"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.14em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '6px 14px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <span style={{ color: '#FFFFFF', fontSize: '1.1rem' }}>•</span>
              {item}
            </span>
          </React.Fragment>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }

        .marquee-item-3d:hover {
          color: #FFFFFF !important;
          background: rgba(255, 255, 255, 0.1) !important;
          transform: translateZ(20px) scale(1.15) !important;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5) !important;
        }
      `}</style>
    </div>
  );
}
