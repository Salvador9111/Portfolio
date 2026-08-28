import React from 'react';

export default function ScrollReveal({ children, className = '' }) {
  return (
    <div className={`scroll-reveal is-visible ${className}`}>
      {children}
    </div>
  );
}
