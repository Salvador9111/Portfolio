import React from 'react';
import { ArrowDown, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section
      id="hero"
      className="section"
      style={{
        paddingTop: '160px',
        paddingBottom: '80px',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Centered Greensward Editorial Hero Text */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >

          {/* Hero Editorial Title */}
          <h1
            className="hero-editorial-title animate-fade-in animate-delay-1"
            style={{
              marginTop: '12px',
              marginBottom: '24px',
              fontFamily: 'var(--font-gotham)',
              fontStyle: 'normal'
            }}
          >
            <span style={{ display: 'block', fontWeight: 700, whiteSpace: 'nowrap', fontSize: '65px', textTransform: 'uppercase' }}>
              Building software systems
            </span>
            <span style={{ display: 'block', fontWeight: 400, fontStyle: 'normal', marginTop: '10px', fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)' }}>
              rooted in clarity, precision, and measured performance.
            </span>
          </h1>

          {/* Intro Paragraph */}
          <p
            className="body-large animate-fade-in animate-delay-2"
            style={{
              maxWidth: '680px',
              margin: '0 auto 36px auto',
              color: 'var(--color-text-secondary)',
              fontWeight: 400
            }}
          >
            {personal.summary}
          </p>

          {/* Pill Action CTAs */}
          <div className="animate-fade-in animate-delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '0' }}>
            <a href="#projects" className="btn btn-primary">
              Explore Featured Works
              <ArrowDown size={16} />
            </a>
            <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <Download size={16} />
              View Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
