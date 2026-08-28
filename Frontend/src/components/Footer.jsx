import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { personal } = portfolioData;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="night-sky-footer"
      style={{
        color: '#FFFFFF',
        padding: '72px 0 36px 0'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Top Row: Brand & Back to Top */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: '1.8rem',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  marginBottom: '6px'
                }}
              >
                {personal.name}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                Bachelor of Software Engineering • Iqra University, Karachi ('29)
              </p>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '40px',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#08080A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              Back to top
              <ArrowUp size={15} />
            </button>
          </div>

          {/* Nav & Socials */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
              {['Overview', 'About', 'Work', 'Capabilities', 'Credentials', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item === 'Overview' ? 'hero' : item === 'Work' ? 'projects' : item === 'Capabilities' ? 'skills' : item === 'Credentials' ? 'certifications' : item.toLowerCase()}`}
                  style={{
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-secondary)')}
                >
                  {item}
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                <Github size={20} />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Closing Bar */}
        <div
          style={{
            paddingTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)'
          }}
        >
          <span>© {currentYear} {personal.name}. All rights reserved.</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>
            Inspired by Greensward & Shakuro Monochrome Design System.
          </span>
        </div>
      </div>
    </footer>
  );
}
