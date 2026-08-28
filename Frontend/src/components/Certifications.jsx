import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { CheckCircle2, ExternalLink, X } from 'lucide-react';
import {
  MicrosoftLogo,
  IBMLogo,
  SimplilearnLogo,
  UdemyLogo,
  DataCampLogo,
  HelsinkiLogo
} from './CertLogos';

export default function Certifications() {
  const { certifications } = portfolioData;

  // Map issuer to SVG logos
  const getIssuerLogo = (cert, size = 28) => {
    const title = cert.title.toLowerCase();
    const issuer = cert.issuer.toLowerCase();

    if (issuer.includes('microsoft')) return <MicrosoftLogo size={size} color="#FFFFFF" />;
    if (issuer.includes('ibm')) return <IBMLogo size={size} color="#FFFFFF" />;
    if (issuer.includes('simplilearn')) return <SimplilearnLogo size={size} color="#FFFFFF" />;
    if (issuer.includes('udemy')) return <UdemyLogo size={size} color="#FFFFFF" />;
    if (issuer.includes('datacamp') || title.includes('github')) return <DataCampLogo size={size} color="#FFFFFF" />;
    if (issuer.includes('helsinki') || title.includes('elements of ai')) return <HelsinkiLogo size={size} color="#FFFFFF" />;
    return <MicrosoftLogo size={size} color="#FFFFFF" />;
  };

  return (
    <section id="certifications" className="section">
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="editorial-badge">
            <span className="editorial-line"></span>
            <span className="label-caps">04 / CREDENTIALS & LEARNING</span>
          </div>
          <h2 className="section-editorial-title" style={{ fontWeight: 800 }}>
            VERIFIED CREDENTIALS
          </h2>
          <p className="body-large" style={{ marginTop: '12px', maxWidth: '640px' }}>
            Verified technical credentials in Generative AI, Python Data Science, Web Development, and CS Fundamentals. Click any credential card to inspect certificate details.
          </p>
        </div>

        {/* Visual Certificate Showcase Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '24px'
          }}
          className="cert-editorial-grid"
        >
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              onClick={() => cert.credentialUrl && window.open(cert.credentialUrl, '_blank', 'noopener,noreferrer')}
              style={{ cursor: cert.credentialUrl ? 'pointer' : 'default' }}
            >
              <TiltCard
                className="dark-neumorphic-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  borderRadius: '22px'
                }}
              >
                {/* Visual Header Artwork Banner */}
                <div
                  style={{
                    padding: '24px 24px 18px 24px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <div
                    className="dark-neumorphic-inset"
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getIssuerLogo(cert, 26)}
                  </div>

                  <div
                    className="dark-neumorphic-badge"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#FFFFFF',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontWeight: 700
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        display: 'inline-block',
                        animation: 'pulseDot 1.5s infinite ease-in-out',
                        boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'
                      }}
                    />
                    VERIFIED
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '24px', position: 'relative', zIndex: 2 }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-muted)',
                      display: 'block',
                      marginBottom: '6px'
                    }}
                  >
                    ISSUER: {cert.issuer.toUpperCase()}
                  </span>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      fontFamily: 'var(--font-serif)',
                      color: '#FFFFFF',
                      marginBottom: '18px',
                      lineHeight: 1.3
                    }}
                  >
                    {cert.title}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      marginTop: '12px'
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      Credential Inspection
                    </span>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dark-neumorphic-btn"
                      onClick={(e) => e.stopPropagation()}
                      style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                    >
                      View Certificate <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>


      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @media (min-width: 768px) {
          .cert-editorial-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 1024px) {
          .cert-editorial-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
