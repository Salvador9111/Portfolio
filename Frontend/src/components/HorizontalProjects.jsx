import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import ProjectCard from './ProjectCard';

// ─── Parametric Lemniscate (Infinity) Equations ─────────────────────────────
// Bernard Bernoulli's lemniscate:
//   x(t) = A · cos(t) / (1 + sin²(t))
//   y(t) = B · sin(t)·cos(t) / (1 + sin²(t))
// We use a Lissajous variant with Z depth for a 3D "∞" in space.
const lemniscate = (t, A, B, C) => {
  const denom = 1 + Math.sin(t) * Math.sin(t);
  const x = A * Math.cos(t) / denom;
  const y = B * Math.sin(t) * Math.cos(t) / denom;
  const z = C * Math.sin(t);         // Z depth — forward at top lobe, back at bottom
  return { x, y, z };
};

const NUM_CARDS = 5;
const TWO_PI = Math.PI * 2;

export default function HorizontalProjects() {
  const { projects } = portfolioData;
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [uiProgress, setUiProgress] = useState(0);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    let animationFrameId;

    const renderLoop = () => {
      if (!sectionRef.current) {
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const totalScrollable = sectionHeight - windowHeight;
      const currentScroll = -rect.top;

      let raw = currentScroll / totalScrollable;
      targetProgress.current = Math.max(0, Math.min(1, raw));

      // Butter LERP — factor 0.07 = silky momentum
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.07;

      const p = currentProgress.current;

      // ── Infinity Path: drive all cards through 1.5 loops (3π radians total) ──
      // As p goes 0→1, the "anchor angle" sweeps 0 → 3π
      const anchorAngle = p * Math.PI * 2;

      // Amplitude tuning — these feel best at 1080p+ viewports
      const AX = window.innerWidth * 0.30;  // horizontal spread
      const AY = window.innerHeight * 0.18;  // vertical height of the lobe
      const AZ = 320;                         // depth pop (pixels of perspective)

      const cardW = 290;
      const cardH = 430;

      let closestZ = -Infinity;
      let closestIdx = 0;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        // Each card is equally spaced around the loop
        const phase = anchorAngle + (i / NUM_CARDS) * TWO_PI;
        const { x, y, z } = lemniscate(phase, AX, AY, AZ);

        // Map Z (-AZ..+AZ) → scale (0.55..1.0) and opacity (0.3..1.0)
        const zNorm = (z + AZ) / (2 * AZ);          // 0 (back) … 1 (front)
        const scale = 0.55 + zNorm * 0.45;
        const opacity = 0.25 + zNorm * 0.75;

        // zIndex so front-cards visually overlap back-cards
        const zIndex = Math.round(zNorm * 100);

        el.style.transform =
          `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0px) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;

        if (z > closestZ) { closestZ = z; closestIdx = i; }
      });

      // Update UI occasionally (not every frame)
      const roundedP = Math.round(p * 100) / 100;
      setUiProgress(roundedP);
      setActiveIndex(closestIdx);

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);
    return () => { if (animationFrameId) cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '350vh',
        backgroundColor: 'transparent'
      }}
    >
      {/* ── Sticky viewport ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          perspective: '1200px'
        }}
      >
        {/* Header row */}
        <div
          className="container"
          style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            zIndex: 200
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="editorial-badge" style={{ marginBottom: '8px' }}>
                <span className="editorial-line"></span>
                <span className="label-caps">02 / FEATURED WORKS ({projects.length})</span>
              </div>
              <h2 className="section-editorial-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', margin: 0 }}>
                <strong>CASE STUDIES & <span className="text-accent">WORKING SYSTEMS</span>.</strong>
              </h2>
            </div>

            {/* Progress indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 700 }}>
                0{activeIndex + 1} / 0{projects.length}
              </span>
              <div style={{ width: '100px', height: '4px', backgroundColor: 'var(--color-border)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${uiProgress * 100}%`, backgroundColor: '#FFFFFF', transition: 'width 0.12s linear' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Infinity Track ── */}
        {/* Cards are absolutely positioned at center, then moved by the lemniscate math */}
        <div
          ref={containerRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={el => cardRefs.current[i] = el}
              style={{
                position: 'absolute',
                top: '55%',
                left: '50%',
                width: '290px',
                willChange: 'transform, opacity',
                transformOrigin: 'center center'
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Subtle ∞ guide trace — decorative only */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.06,
            pointerEvents: 'none',
            zIndex: 1
          }}
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 500 300 C 550 150, 800 150, 800 300 C 800 450, 550 450, 500 300 C 450 150, 200 150, 200 300 C 200 450, 450 450, 500 300 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      <style>{`
        #projects .project-card-inner {
          transition: opacity 0.08s linear;
        }
      `}</style>
    </section>
  );
}
