import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Github } from './Icons';
import TiltCard from './TiltCard';

export default function ProjectCard({ project }) {
  return (
    <TiltCard
      className="liquid-glass-card"
      style={{
        padding: '18px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '410px',
        maxHeight: '430px',
        borderRadius: '16px',
        background: 'linear-gradient(145deg, rgba(18, 18, 26, 0.88) 0%, rgba(10, 10, 15, 0.94) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)'
      }}
    >
      <div>
        {/* Balanced Vertical Image Frame (140px) */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-muted)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '12px'
          }}
        >
          <img
            src={project.image}
            alt={`${project.name} UI Preview`}
            style={{
              width: '100%',
              height: '140px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>

        {/* Project Title */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.38rem',
            fontWeight: 400,
            marginBottom: '6px',
            color: '#FFFFFF',
            lineHeight: 1.25
          }}
        >
          {project.name}
        </h3>

        <p style={{ color: 'rgba(255, 255, 255, 0.80)', fontSize: '0.835rem', marginBottom: '12px', lineHeight: 1.4, fontWeight: 400 }}>
          {project.tagline}
        </p>

        {/* Tech Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                padding: '3px 9px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '6px',
                color: '#FFFFFF'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
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
    </TiltCard>
  );
}
