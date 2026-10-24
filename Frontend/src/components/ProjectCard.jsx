import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Github } from './Icons';
import TiltCard from './TiltCard';

export default function ProjectCard({ project }) {
  return (
    <div
      className="liquid-glass-card"
      style={{
        padding: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '420px',
        maxHeight: '440px',
        borderRadius: '20px',
        background: 'linear-gradient(145deg, rgba(38, 43, 56, 0.94) 0%, rgba(26, 30, 40, 0.98) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.28)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        position: 'relative'
      }}
    >
      <div>
        {/* Balanced Vertical Image Frame */}
        <div
          style={{
            backgroundColor: '#1e222d',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
          }}
        >
          <picture>
            <source srcSet={project.image.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
            <img
              src={project.image}
              alt={`${project.name} UI Preview`}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '145px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </picture>
        </div>

        {/* Project Title */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.42rem',
            fontWeight: 600,
            marginBottom: '8px',
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
            lineHeight: 1.25
          }}
        >
          {project.name}
        </h3>

        <p style={{ color: '#E2E8F0', fontSize: '0.875rem', marginBottom: '14px', lineHeight: 1.45, fontWeight: 400 }}>
          {project.tagline}
        </p>

        {/* Tech Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                padding: '4px 10px',
                background: 'rgba(255, 255, 255, 0.14)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '8px',
                color: '#F8FAFC'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            <Github size={12} />
            Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            <ExternalLink size={12} />
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
