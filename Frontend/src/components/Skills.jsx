import React, { useState } from 'react';
import { Code, Wrench, Brain, Users } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

function SkillCard({ group, idx }) {
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt calculations
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;  
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlare({
      opacity: 0.22,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <div
      className="liquid-glass-card tech-stack-3d-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: '32px',
        borderRadius: '20px',
        transform: transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
        willChange: 'transform'
      }}
    >
      {/* Background Image with Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(to bottom, rgba(17, 17, 24, 0.85), rgba(8, 8, 10, 0.94)), url(${group.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.65,
          transition: 'opacity 0.3s ease, transform 0.5s ease',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* 3D Dynamic Light Reflection Glare */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}), transparent 65%)`,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 1
        }}
      />

      {/* Header with 3D Depth */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          transform: 'translateZ(25px)',
          transformStyle: 'preserve-3d',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            className="animated-3d-icon"
            style={{
              padding: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transform: 'translateZ(15px)'
            }}
          >
            {group.icon}
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', fontWeight: 400, color: '#FFF' }}>
              {group.title}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              {group.subtitle}
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: '0.725rem',
            fontFamily: 'var(--font-mono)',
            color: '#FFFFFF',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '4px 10px',
            borderRadius: '12px',
            fontWeight: 600,
            transform: 'translateZ(15px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          {group.badge}
        </span>
      </div>

      {/* 3D Floating Skill Tags */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '12px',
          transform: 'translateZ(35px)',
          transformStyle: 'preserve-3d',
          position: 'relative',
          zIndex: 2
        }}
      >
        {group.items.map((skill, sIdx) => (
          <div
            key={skill}
            className="skill-chip-3d"
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              padding: '10px 18px',
              backgroundColor: 'rgba(8, 8, 10, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              color: 'var(--color-text)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              animation: `float3D 3.5s ease-in-out ${sIdx * 0.3}s infinite alternate`
            }}
          >
            <span 
              style={{ 
                width: '6px', 
                height: '6px', 
                borderRadius: '50%', 
                backgroundColor: 'rgba(255, 245, 230, 0.95)', 
                boxShadow: '0 0 6px rgba(255, 245, 230, 0.8)',
                display: 'inline-block' 
              }} 
            />
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { skills } = portfolioData;

  const skillGroups = [
    {
      title: "Main Weapons",
      badge: "LANGUAGES",
      subtitle: "Languages I write code in daily",
      icon: <Code size={20} color="#FFFFFF" />,
      items: skills.languages,
      bgImage: "/images/skills_languages.png"
    },
    {
      title: "Battle Station",
      badge: "TOOLS & PLATFORMS",
      subtitle: "Tools & platforms I command",
      icon: <Wrench size={20} color="#FFFFFF" />,
      items: skills.tools,
      bgImage: "/images/skills_tools.png"
    },
    {
      title: "Brain Fuel",
      badge: "CONCEPTS",
      subtitle: "CS concepts & software architecture",
      icon: <Brain size={20} color="#FFFFFF" />,
      items: skills.concepts,
      bgImage: "/images/skills_concepts.png"
    },
    {
      title: "Human OS",
      badge: "SOFT SKILLS",
      subtitle: "Collaboration & engineering mindset",
      icon: <Users size={20} color="#FFFFFF" />,
      items: skills.professional,
      bgImage: "/images/skills_softskills.png"
    }
  ];

  return (
    <section id="skills" className="section" style={{ backgroundColor: 'transparent', perspective: '1200px' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="editorial-badge">
            <span className="editorial-line"></span>
            <span className="label-caps">03 / TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="section-editorial-title" style={{ fontWeight: 800 }}>
            MY TECH STACK
          </h2>
          <p className="body-large" style={{ marginTop: '12px', maxWidth: '640px' }}>
            Structured breakdown of programming languages, tools & platforms, computer science concepts, and soft skills.
          </p>
        </div>

        {/* 4 Skill Category Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px'
          }}
          className="skills-sassy-grid"
        >
          {skillGroups.map((group, idx) => (
            <SkillCard key={idx} group={group} idx={idx} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .skills-sassy-grid { grid-template-columns: 1fr 1fr !important; }
        }

        @keyframes float3D {
          0% {
            transform: translateZ(20px) translateY(0px);
          }
          100% {
            transform: translateZ(35px) translateY(-5px);
          }
        }

        .skill-chip-3d:hover {
          background-color: #FFFFFF !important;
          color: #08080A !important;
          border-color: #FFFFFF !important;
          transform: translateZ(55px) scale(1.1) !important;
          box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25), 0 0 20px rgba(255, 245, 230, 0.5) !important;
        }

        .animated-3d-icon {
          animation: pulseIcon 3s ease-in-out infinite alternate;
        }

        @keyframes pulseIcon {
          0% { transform: translateZ(15px) scale(1); }
          100% { transform: translateZ(28px) scale(1.12) rotateZ(5deg); }
        }
      `}</style>
    </section>
  );
}
