import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import ProjectCard from './ProjectCard';

/**
 * 3D Round Carousel for Portfolio Projects
 * - Auto-rotates constantly on its own (never stops)
 * - Draggable horizontally with mouse/touch to spin faster or reverse
 * - Independent of vertical page scroll (scrolling down page does not hijack rotation)
 * - Premium 3D cylinder depth with customizable tilt and lighting
 */
export default function HorizontalProjects() {
  const { projects } = portfolioData;
  const count = projects.length;

  const ringRef = useRef(null);
  const rafRef = useRef(0);
  const rotYRef = useRef(0);
  const velRef = useRef(0);
  const lastTimeRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, lastX: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Configuration tuned for 320px wide project cards
  const cardWidth = 320;
  const spacing = 1.75; // increased space between project boxes
  const countSafe = Math.max(count, 3);
  const angle = 360 / countSafe;
  const radius = Math.round((cardWidth * spacing) / (2 * Math.tan(Math.PI / countSafe)));
  
  // Continuous base speed: slightly faster smooth rotation (~19 deg/sec)
  const baseSpeed = 19; // deg/sec
  const tilt = -4; // degrees forward tilt for 3D perspective
  const perspective = 2400;

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const render = (now) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      const drag = dragRef.current;

      if (!drag.active) {
        // Continuous auto-rotation that never stops
        // If user imparted a drag flick velocity, smoothly decay it towards baseSpeed
        if (Math.abs(velRef.current) > 0.5) {
          rotYRef.current += velRef.current * dt;
          velRef.current *= 0.95; // momentum decay
        } else {
          // Always maintain constant smooth auto-rotation
          rotYRef.current += baseSpeed * dt;
        }
      }

      // Keep angle normalized between 0-360
      if (rotYRef.current >= 360000 || rotYRef.current <= -360000) {
        rotYRef.current %= 360;
      }

      ring.style.transform = `translateZ(-${radius}px) rotateY(${rotYRef.current}deg)`;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [radius, baseSpeed]);

  const onPointerDown = (e) => {
    // Only engage drag if clicking the carousel stage (not when clicking links/buttons directly)
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
    dragRef.current = { active: true, startX: e.clientX, lastX: e.clientX };
    velRef.current = 0;
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const dx = e.clientX - drag.lastX;
    drag.lastX = e.clientX;

    const sensitivity = 0.32;
    rotYRef.current += dx * sensitivity;
    // Store flick momentum so carousel spins fluidly and keeps moving
    velRef.current = dx * sensitivity * 45;
  };

  const onPointerUp = (e) => {
    if (!dragRef.current.active) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
    dragRef.current.active = false;
  };

  return (
    <section
      id="work"
      style={{
        position: 'relative',
        padding: '120px 0 140px',
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }}
    >
      <span id="projects" style={{ position: 'absolute', top: 0 }} />

      {/* Header */}
      <div className="container" style={{ marginBottom: '40px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="editorial-badge" style={{ marginBottom: '10px' }}>
              <span className="editorial-line"></span>
              <span className="label-caps">02 / FEATURED WORKS ({projects.length})</span>
            </div>
            <h2
              className="section-editorial-title"
              style={{
                fontFamily: "'Big Shoulders Display', 'Montserrat', Impact, sans-serif",
                fontSize: 'clamp(38px, 5.5vw, 64px)',
                lineHeight: 0.98,
                fontWeight: 900,
                letterSpacing: '0.02em',
                color: '#FFFFFF',
                margin: 0
              }}
            >
              <strong style={{ fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.02em' }}>
                CASE STUDIES &amp; WORKING SYSTEMS.
              </strong>
            </h2>
          </div>
        </div>
      </div>

      {/* 3D Round Carousel Viewport */}
      <div
        style={{
          width: '100%',
          height: '560px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: `${perspective}px`,
          perspectiveOrigin: '50% 50%',
          cursor: 'grab',
          userSelect: 'none',
          touchAction: 'pan-y' // Allow vertical page scroll without locking, while horizontal drag rotates carousel
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Subtle Ambient Depth Lighting behind the ring */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '350px',
            background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.16) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 75%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* 3D Rotating Cylinder Stage */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt}deg)`,
            position: 'relative',
            width: `${cardWidth}px`,
            height: '440px'
          }}
        >
          <div
            ref={ringRef}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              willChange: 'transform'
            }}
          >
            {projects.map((project, i) => {
              const cardAngle = i * angle;
              return (
                <div
                  key={project.id}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: `${cardWidth}px`,
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'visible'
                  }}
                >
                  <ProjectCard project={project} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
