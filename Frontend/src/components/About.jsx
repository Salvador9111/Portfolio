import React from 'react';
import { MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personal } = portfolioData;

  const focusAreas = [
    {
      title: "AI Integration & Voice Processing",
      desc: "Building intelligent applications combining voice recognition, text-to-speech, and LLM APIs like Gemini."
    },
    {
      title: "Full-Stack Web & Modular State",
      desc: "Developing responsive interfaces using HTML, CSS, JavaScript, and asynchronous REST APIs."
    },
    {
      title: "OOP Systems & Data Persistence",
      desc: "Applying object-oriented principles (encapsulation, inheritance, polymorphism) and file handling for persistent structured data."
    }
  ];

  return (
    <section id="about" className="section" style={{ backgroundColor: 'transparent' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            alignItems: 'start'
          }}
          className="greensward-split-grid"
        >
          {/* Left Sticky Column: Section Title & Structured Metadata Box */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="editorial-badge">
              <span className="editorial-line"></span>
              <span className="label-caps">01 / ABOUT THE DEVELOPER</span>
            </div>

            <h2 className="section-editorial-title" style={{ marginBottom: '24px' }}>
              <strong>Turning complex requirements into <span className="text-accent">working systems</span>.</strong>
            </h2>

            {/* Shakuro Style Metadata Card - Liquid Glass */}
            <div
              className="liquid-glass-card"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.06) 100%)',
                backdropFilter: 'blur(24px) saturate(200%)',
                WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: '16px',
                padding: '24px',
                marginTop: '32px',
                boxShadow: '0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 2px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', position: 'relative', zIndex: 2 }}>
                <div>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    DEGREE & UNIV
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)' }}>
                    BSE • Iqra University
                  </span>
                </div>

                <div>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    LOCATION
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} color="#FFFFFF" />
                    {personal.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Focus Pillars */}
          <div>
            <p className="body-large" style={{ marginBottom: '28px', color: 'var(--color-text)', lineHeight: 1.75 }}>
              I am a <strong>Bachelor of Software Engineering</strong> student at <strong>Iqra University</strong> (Expected Graduation: 2029) based in Karachi, Pakistan. My focus centers on building functional, structured software—ranging from voice assistants to e-commerce engines and Java booking systems.
            </p>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.025rem', lineHeight: 1.7, marginBottom: '36px' }}>
              Rather than relying on vague claims, I measure progress through code efficiency, modular software architecture, and concrete performance outcomes (-40% feature integration time, -30% code redundancy, and 90% uptime reliability).
            </p>

            {/* Academic Coursework Tags */}
            <div style={{ marginBottom: '40px' }}>
              <span style={{ fontSize: '20px', fontFamily: 'var(--font-mono)', color: '#FFFFFF', display: 'block', marginBottom: '16px', fontWeight: 600, letterSpacing: '0.08em' }}>
                ACADEMIC FOUNDATION & COURSEWORK
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {personal.education.coursework.map((course) => (
                  <span
                    key={course}
                    style={{
                      fontSize: '0.875rem',
                      padding: '6px 14px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '20px',
                      color: '#FFFFFF',
                      fontWeight: 500
                    }}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* 3 Core Engineering Pillars - Liquid Glass Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {focusAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="liquid-glass-card"
                  style={{
                    padding: '28px 32px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.06) 100%)',
                    backdropFilter: 'blur(24px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    borderRadius: '20px',
                    boxShadow: '0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 2px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                      {area.title}
                    </h3>
                    <p style={{ fontSize: '0.975rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.7, margin: 0 }}>
                      {area.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .greensward-split-grid { grid-template-columns: 0.9fr 1.1fr !important; }
        }

        .liquid-glass-card {
          will-change: transform, box-shadow;
        }

        .liquid-glass-card:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.12) 100%) !important;
          border-color: rgba(255, 255, 255, 0.5) !important;
          transform: translateY(-6px) scale(1.01) !important;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 255, 255, 0.15), inset 0 1px 2px 0 rgba(255, 255, 255, 0.7) !important;
        }

        .liquid-glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
          transition: left 0.7s ease;
          pointer-events: none;
        }

        .liquid-glass-card:hover::before {
          left: 100%;
        }
      `}</style>
    </section>
  );
}
