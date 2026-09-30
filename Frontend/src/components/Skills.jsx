import React, { useState } from 'react';
import './SkillsCabinet.css';

// 6 Curated Technical Drawers based on Muhammad Hammad Imran's Genuine Skillset & Experience
const DRAWERS = [
  {
    id: 'ai-rag',
    label: 'AI & RAG PIPELINES',
    c: '#FF4D6D',
    items: [
      ['LangChain & Gemini', 'Document chunking, vector chains, API prompt orchestration.', 3],
      ['RAG Architecture', 'Document vector indexing, retrieval grounding & low latency.', 3],
      ['Vector DBs & Embeddings', 'Chroma DB, all-MiniLM & Gemini embeddings for similarity search.', 3],
      ['Voice AI & Speech', 'Real-time STT & TTS integration for interactive voice assistants.', 2]
    ]
  },
  {
    id: 'languages',
    label: 'CORE LANGUAGES',
    c: '#F59E0B',
    items: [
      ['Python', 'AI workflows, LangChain pipelines, backend scripts & automation.', 3],
      ['JavaScript (ES6+)', 'Modern asynchronous web apps, event-driven DOM & fetch APIs.', 3],
      ['Java', 'OOP design patterns, reservation systems & robust file handling.', 2],
      ['C Language', 'Memory pointers, data structures, recursion & binary data files.', 2]
    ]
  },
  {
    id: 'web-interfaces',
    label: 'WEB & INTERFACES',
    c: '#10B981',
    items: [
      ['React.js', 'Modular component systems, reactive state, custom hooks.', 3],
      ['Responsive UI / UX', 'Cross-browser fluid layouts, CSS Grid, Flexbox & micro-interactions.', 3],
      ['REST API Integration', 'Async client-server data synchronization with fallback safety.', 3],
      ['Interactive Chat UIs', 'Streaming AI responses, context cards & conversational widgets.', 3]
    ]
  },
  {
    id: 'systems-data',
    label: 'SYSTEMS & DATA',
    c: '#06B6D4',
    items: [
      ['Data Structures', 'Arrays, linked lists, trees, hash maps & search algorithms.', 3],
      ['OOP Architecture', 'Encapsulation, inheritance, polymorphism for clean modularity.', 3],
      ['File Persistence', 'Structured data serialization, file I/O & state integrity.', 2],
      ['Algorithms & Optimization', 'Sorting algorithms, recursive problem solving & time complexity.', 2]
    ]
  },
  {
    id: 'tooling-devops',
    label: 'TOOLING & DEVOPS',
    c: '#8B5CF6',
    items: [
      ['Git & GitHub', 'Version control, semantic commit hygiene & branch management.', 3],
      ['GitHub Actions', 'Automated CI workflows, cron-based tasks & Python deployments.', 2],
      ['VS Code & Debugging', 'Virtual environments, profiling, linting & rapid prototyping.', 3],
      ['Linux Mint & Bash', 'Shell scripting, environment variables & package management.', 2]
    ]
  },
  {
    id: 'engineering-craft',
    label: 'ENGINEERING CRAFT',
    c: '#EC4899',
    items: [
      ['Problem Solving', 'Deconstructing complex bugs, root-cause analysis & clean fixes.', 3],
      ['Technical Documentation', 'Clear architectural READMEs, code comments & API contracts.', 3],
      ['Continuous Learning', 'Exploring bleeding-edge AI models, libraries & software patterns.', 3],
      ['Collaboration', 'Peer code reviews, design communication & knowledge sharing.', 2]
    ]
  }
];

export default function Skills() {
  // Keep the first drawer open by default as an interactive visual invitation
  const [openDrawers, setOpenDrawers] = useState([0]);

  const toggleDrawer = (index) => {
    setOpenDrawers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const allOpen = openDrawers.length === DRAWERS.length;

  const toggleAll = () => {
    if (allOpen) {
      setOpenDrawers([]);
    } else {
      setOpenDrawers(DRAWERS.map((_, i) => i));
    }
  };

  return (
    <section id="skills" className="section skills-cabinet-section" aria-label="Skills Workshop Cabinet">
      <div className="skills-cabinet-container">
        {/* Section Header with Quick Action */}
        <div className="skills-header-row">
          <div className="skills-header-info">
            <div className="editorial-badge" style={{ marginBottom: '14px' }}>
              <span className="editorial-line"></span>
              <span className="label-caps">03 / TECHNICAL CAPABILITIES</span>
            </div>
            <h2
              className="section-editorial-title"
              style={{
                fontFamily: "'Big Shoulders Display', 'Montserrat', Impact, sans-serif",
                fontSize: 'clamp(42px, 7vw, 76px)',
                lineHeight: 0.95,
                fontWeight: 900,
                letterSpacing: '0.02em',
                color: '#FFFFFF',
                margin: '0 0 14px'
              }}
            >
              WHAT'S IN THE DRAWERS
            </h2>
            <p
              className="body-large"
              style={{
                fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                color: '#A0A0AC',
                fontSize: '16.5px',
                lineHeight: 1.55,
                margin: 0,
                maxWidth: '56ch'
              }}
            >
              Skills organized the way a master workshop sorts precision hardware: by what they do,
              not by how impressive they sound. Pull a drawer to inspect what's inside and how often I reach for it.
            </p>
          </div>

          <div className="cabinet-actions">
            <button
              type="button"
              className="cabinet-btn"
              onClick={toggleAll}
              aria-label={allOpen ? 'Close all drawers' : 'Pull all drawers'}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {allOpen ? (
                  <>
                    <polyline points="18 15 12 9 6 15" />
                    <line x1="12" y1="9" x2="12" y2="21" />
                  </>
                ) : (
                  <>
                    <polyline points="6 9 12 15 18 9" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </>
                )}
              </svg>
              <span>{allOpen ? 'CLOSE ALL' : 'PULL ALL DRAWERS'}</span>
            </button>
          </div>
        </div>

        {/* Master Physical 3D Cabinet */}
        <div className="cabinet-chassis" role="group" aria-label="Skill drawers parts cabinet">
          {DRAWERS.map((drawer, n) => {
            const isOpen = openDrawers.includes(n);

            return (
              <div
                key={drawer.id}
                className={`cabinet-slot ${isOpen ? 'open' : ''}`}
                style={{ '--c': drawer.c }}
              >
                {/* Dark Inner Cavity */}
                <div className="cabinet-cavity" />

                {/* 3D Sliding Drawer */}
                <div className="cabinet-box">
                  {/* Left & Right 3D Side Walls */}
                  <div className="cabinet-side l" />
                  <div className="cabinet-side r" />

                  {/* 3D Drawer Floor & Vertical Card Wall */}
                  <div className="cabinet-floor">
                    <div className="cabinet-wall">
                      {drawer.items.map((item, i) => (
                        <div
                          key={item[0]}
                          className="cabinet-card"
                          style={{ '--i': i }}
                        >
                          <b title={item[0]}>{item[0]}</b>
                          <span title={item[1]}>{item[1]}</span>
                          <div
                            className="cabinet-wear"
                            role="img"
                            aria-label={`Wear frequency: ${item[2]} of 3`}
                          >
                            {[1, 2, 3].map((k) => (
                              <i
                                key={k}
                                className={k <= item[2] ? 'on' : ''}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tactile Front Face Plate & Handle */}
                  <button
                    type="button"
                    className="cabinet-face"
                    onClick={() => toggleDrawer(n)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleDrawer(n);
                      }
                    }}
                    aria-expanded={isOpen}
                    aria-label={`${drawer.label} drawer: ${drawer.items.length} tools. ${isOpen ? 'Click to close' : 'Click to open'}`}
                  >
                    <span className="cabinet-plate">{drawer.label}</span>
                    <span className="cabinet-pull" />
                    <span className="cabinet-count">
                      {drawer.items.length}
                      <small>tools</small>
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workshop Legend */}
        <div className="cabinet-legend">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.02em' }}>
              DOT WEAR RATING:
            </span>
            <span>Usage frequency across active builds</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span className="legend-item">
              <span className="cabinet-wear" style={{ margin: 0, '--c': '#10B981' }}>
                <i className="on" />
                <i className="on" />
                <i className="on" />
              </span>
              <span>Daily production weapon</span>
            </span>

            <span className="legend-item">
              <span className="cabinet-wear" style={{ margin: 0, '--c': '#06B6D4' }}>
                <i className="on" />
                <i className="on" />
                <i></i>
              </span>
              <span>Frequent project core</span>
            </span>

            <span className="legend-item">
              <span className="cabinet-wear" style={{ margin: 0, '--c': '#F59E0B' }}>
                <i className="on" />
                <i></i>
                <i></i>
              </span>
              <span>Specialized / on-demand</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
