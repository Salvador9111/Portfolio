import React from 'react';

// 1. Microsoft Logo
export function MicrosoftLogo({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <rect x="2" y="2" width="9.5" height="9.5" />
      <rect x="12.5" y="2" width="9.5" height="9.5" />
      <rect x="2" y="12.5" width="9.5" height="9.5" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" />
    </svg>
  );
}

// 2. IBM Logo
export function IBMLogo({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M2 4h4v2H2V4zm0 4h4v2H2V8zm0 4h4v2H2v-2zm0 4h4v2H2v-2zm6-12h4v2H8V4zm0 4h4v2H8V8zm0 4h4v2H8v-2zm0 4h4v2H8v-2zm6-12h8v2h-8V4zm2 4h4v2h-4V8zm-2 4h8v2h-8v-2zm2 4h4v2h-4v-2z" />
    </svg>
  );
}

// 3. Simplilearn Logo
export function SimplilearnLogo({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

// 4. Udemy Logo
export function UdemyLogo({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2.5L3 7.5v8l9 5 9-5v-8l-9-5zm6 12.3l-6 3.3-6-3.3V9.2l6-3.3 6 3.3v5.6z" />
    </svg>
  );
}

// 5. DataCamp / GitHub Logo
export function DataCampLogo({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// 6. University of Helsinki / Elements of AI Logo
export function HelsinkiLogo({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <circle cx="12" cy="12" r="4" fill={color} />
    </svg>
  );
}
