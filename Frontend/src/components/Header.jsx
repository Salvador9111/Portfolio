import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Header() {
  const { personal } = portfolioData;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#projects' },
    { name: 'Capabilities', href: '#skills' },
    { name: 'Credentials', href: '#certifications' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled
          ? 'linear-gradient(135deg, rgba(17, 17, 24, 0.85) 0%, rgba(8, 8, 12, 0.78) 100%)'
          : 'linear-gradient(135deg, rgba(20, 20, 28, 0.55) 0%, rgba(10, 10, 15, 0.45) 100%)',
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: scrolled
          ? '0 12px 36px -8px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)'
          : '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: scrolled ? '14px 0' : '20px 0'
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo */}
          <a
            href="#hero"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: '#FFFFFF'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                color: '#08080A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.25)'
              }}
            >
              H
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                {personal.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                SOFTWARE ENGINEER
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Glass Pill Hovers */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '8px' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-glass-link"
                style={{
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  padding: '8px 16px',
                  borderRadius: '12px',
                  transition: 'all 0.25s ease',
                  position: 'relative'
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="#contact"
              className="btn btn-primary btn-sm desktop-cta"
            >
              Get in Touch
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
              className="mobile-toggle"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <nav
            style={{
              paddingTop: '20px',
              paddingBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              marginTop: '16px'
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="nav-glass-link"
                style={{
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  padding: '10px 16px',
                  borderRadius: '10px'
                }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary btn-sm"
              style={{ marginTop: '8px', textAlign: 'center' }}
            >
              Get in Touch
            </a>
          </nav>
        )}
      </div>

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
          .mobile-toggle { display: none !important; }
        }

        .nav-glass-link:hover {
          color: #FFFFFF !important;
          background: rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(8px);
          box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </header>
  );
}
