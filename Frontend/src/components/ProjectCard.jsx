import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Github } from './Icons';

// Distinct light color palettes for each project card with high-contrast darkened text
const THEMES = {
  'uclothes': {
    name: 'light-blue',
    className: 'theme-light-blue',
    chipBg: 'rgba(255, 255, 255, 0.85)',
    chipBorder: 'rgba(59, 130, 246, 0.35)',
    chipText: '#1D4ED8',
    divider: 'rgba(59, 130, 246, 0.25)'
  },
  'hospital-crm': {
    name: 'light-green',
    className: 'theme-light-green',
    chipBg: 'rgba(255, 255, 255, 0.85)',
    chipBorder: 'rgba(34, 197, 94, 0.35)',
    chipText: '#15803D',
    divider: 'rgba(34, 197, 94, 0.25)'
  },
  'jarvis': {
    name: 'light-purple',
    className: 'theme-light-purple',
    chipBg: 'rgba(255, 255, 255, 0.85)',
    chipBorder: 'rgba(168, 85, 247, 0.35)',
    chipText: '#7E22CE',
    divider: 'rgba(168, 85, 247, 0.25)'
  },
  'lumina': {
    name: 'light-yellow',
    className: 'theme-light-yellow',
    chipBg: 'rgba(255, 255, 255, 0.90)',
    chipBorder: 'rgba(234, 179, 8, 0.40)',
    chipText: '#A16207',
    divider: 'rgba(234, 179, 8, 0.25)'
  },
  'rag-chatbot': {
    name: 'light-red',
    className: 'theme-light-red',
    chipBg: 'rgba(255, 255, 255, 0.85)',
    chipBorder: 'rgba(244, 63, 94, 0.35)',
    chipText: '#BE123C',
    divider: 'rgba(244, 63, 94, 0.25)'
  },
  'lunar-lander': {
    name: 'light-cyan',
    className: 'theme-light-cyan',
    chipBg: 'rgba(255, 255, 255, 0.85)',
    chipBorder: 'rgba(20, 184, 166, 0.35)',
    chipText: '#0F766E',
    divider: 'rgba(20, 184, 166, 0.25)'
  },
  'autonomous-driving': {
    name: 'light-peach',
    className: 'theme-light-peach',
    chipBg: 'rgba(255, 255, 255, 0.90)',
    chipBorder: 'rgba(249, 115, 22, 0.40)',
    chipText: '#C2410C',
    divider: 'rgba(249, 115, 22, 0.25)'
  }
};

const THEME_LIST = [
  THEMES['uclothes'],
  THEMES['hospital-crm'],
  THEMES['jarvis'],
  THEMES['lumina'],
  THEMES['rag-chatbot'],
  THEMES['lunar-lander'],
  THEMES['autonomous-driving']
];

export default function ProjectCard({ project, index }) {
  const theme =
    THEMES[project.id] ||
    (typeof index === 'number'
      ? THEME_LIST[index % THEME_LIST.length]
      : THEME_LIST[0]);

  return (
    <div
      className={`liquid-glass-card ${theme.className}`}
      style={{
        padding: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '420px',
        maxHeight: '440px',
        borderRadius: '20px',
        position: 'relative'
      }}
    >
      <div>
        {/* Balanced Vertical Image Frame */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '14px',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)'
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

        {/* Project Title - Darkened for high readability on light card */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.42rem',
            fontWeight: 700,
            marginBottom: '8px',
            color: '#0F172A',
            letterSpacing: '-0.01em',
            lineHeight: 1.25
          }}
        >
          {project.name}
        </h3>

        {/* Tagline - Darkened readable slate */}
        <p
          style={{
            color: '#1E293B',
            fontSize: '0.875rem',
            marginBottom: '14px',
            lineHeight: 1.45,
            fontWeight: 500
          }}
        >
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
                fontWeight: 600,
                padding: '4px 10px',
                background: theme.chipBg,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: `1px solid ${theme.chipBorder}`,
                borderRadius: '8px',
                color: theme.chipText
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          paddingTop: '10px',
          borderTop: `1px solid ${theme.divider}`
        }}
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-btn"
          >
            <Github size={12} color="#FFFFFF" />
            Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-btn project-card-btn-demo"
          >
            <ExternalLink size={12} color="#0F172A" />
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
