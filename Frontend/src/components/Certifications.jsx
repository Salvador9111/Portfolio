import React, { useState, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import './CertificatesDeck.css';

// 6 Verified Certifications with Standardized 1200x850 Real Pictures
const CERTS = [
  {
    id: "ms-genai",
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft",
    year: 2024,
    date: "August 2024",
    code: "MS-GENAI-3023",
    tone: "#D4AF37", // Imperial Gold
    image: "/images/certificates/cert_microsoft_genai.png",
    url: "https://www.linkedin.com/learning/certificates/3023f0c72912ba13ffcc2c8c6b13c9f598aa6d4a2196e05fa8fc37510297d3ab"
  },
  {
    id: "ibm-python",
    title: "Python 101 for Data Science",
    issuer: "IBM",
    year: 2024,
    date: "July 2024",
    code: "IBM-CC-E334",
    tone: "#3B82F6", // Cobalt Sapphire
    image: "/images/certificates/cert_ibm_python.png",
    url: "https://courses.cognitiveclass.ai/certificates/e33414a53abd47a0b9631b4cfe4b53e0"
  },
  {
    id: "simp-frontend",
    title: "Introduction to Front End Development",
    issuer: "Simplilearn",
    year: 2024,
    date: "October 2024",
    code: "SIMP-FE-10300",
    tone: "#10B981", // Emerald Green
    image: "/images/certificates/cert_simplilearn_frontend.png",
    url: "https://certificates.simplicdn.net/share/10300174_10595165_1780424168270.pdf"
  },
  {
    id: "udemy-c",
    title: "C Programming For Beginners",
    issuer: "Udemy",
    year: 2024,
    date: "May 2024",
    code: "UC-F77DF0F9",
    tone: "#8B5CF6", // Royal Amethyst
    image: "/images/certificates/cert_udemy_c.png",
    url: "https://www.udemy.com/certificate/UC-f77df0f9-6868-49f6-a89c-70042ff9dabb/"
  },
  {
    id: "datacamp-git",
    title: "GitHub Foundations",
    issuer: "DataCamp",
    year: 2024,
    date: "November 2024",
    code: "DC-GH-B7569",
    tone: "#06B6D4", // Electric Cyan
    image: "/images/certificates/cert_datacamp_github.png",
    url: "https://www.datacamp.com/statement-of-accomplishment/track/b75695f027afb854cb11b24d35414654718bf87d?raw=1"
  },
  {
    id: "helsinki-ai",
    title: "Elements of AI",
    issuer: "Univ of Helsinki",
    year: 2024,
    date: "December 2024",
    code: "UH-EOAI-184X",
    tone: "#F43F5E", // Ruby Crimson
    image: "/images/certificates/cert_helsinki_ai.png",
    url: "https://certificates.mooc.fi/validate/o184xt35tr"
  }
];

export default function Certifications() {
  const [active, setActive] = useState(0);
  const panelScrollRef = useRef(null);

  const total = CERTS.length;
  const currentCert = CERTS[active];

  const selectCertificate = (index) => {
    setActive(index);
    if (panelScrollRef.current) {
      const items = panelScrollRef.current.children;
      if (items[index]) {
        items[index].scrollIntoView({
          behavior: 'smooth',
          inline: 'nearest',
          block: 'nearest'
        });
      }
    }
  };

  return (
    <section id="certifications" className="section cert-section-clean" aria-labelledby="cert-heading">
      <div className="cert-clean-wrap">
        {/* Section Header */}
        <div className="cert-clean-header">
          <div className="editorial-badge" style={{ marginBottom: '14px' }}>
            <span className="editorial-line"></span>
            <span className="label-caps">04 / CREDENTIALS & LEARNING</span>
          </div>

          <h2 id="cert-heading" className="cert-clean-h2">
            Verified Certificates
          </h2>

          <p className="cert-clean-lede">
            Formal proof of the technical skills behind my projects. Scroll through the certificates
            on the left to inspect each authentic credential in the showcase.
          </p>
        </div>

        {/* ==================================================================
            2-COLUMN LAYOUT: Left Inside-Scrollable Panel, Right Showcase Stage
            ================================================================== */}
        <div className="cert-split-layout">
          {/* Left Column: Internally Scrollable Certificate Names Panel */}
          <div className="cert-names-panel-col">
            <div className="cert-panel-header">
              <span className="cert-panel-header-label">Certificate Names</span>
              <span style={{ fontFamily: 'var(--cert-mono)', fontSize: '0.8rem', color: 'var(--cert-muted)' }}>
                {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>

            <div
              className="cert-panel-scroll-box"
              ref={panelScrollRef}
              role="tablist"
              aria-label="Certificate list"
            >
              {CERTS.map((c, i) => {
                const isSelected = active === i;

                return (
                  <button
                    key={c.id}
                    type="button"
                    className="cert-name-btn"
                    data-i={i}
                    onClick={() => selectCertificate(i)}
                    aria-current={isSelected}
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`${c.title}, ${c.issuer}, ${c.year}`}
                  >
                    <span className="t">{c.title}</span>
                    <span className="y">{c.year}</span>
                    <span className="i">{c.issuer}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Showcase Stage in Front of the User */}
          <div className="cert-showcase-col">
            <div className="cert-stage-box" aria-live="polite">
              {CERTS.map((c, i) => {
                const p = i - active;
                let transform = '';
                let opacity = 1;
                let pointerEvents = 'auto';
                let zIndex = total - p;
                let filter = 'none';

                if (p < 0) {
                  // Previously viewed certificates exit smoothly to top-left
                  transform = 'translate(-22%, -6%) rotate(-9deg) scale(.96)';
                  opacity = 0;
                  pointerEvents = 'none';
                  zIndex = 0;
                } else if (p === 0) {
                  // Active top certificate picture
                  transform = 'translate(0%, 0%) rotate(0deg) scale(1)';
                  opacity = 1;
                  zIndex = total;
                  filter = 'brightness(1)';
                } else {
                  // Stacked subsequent certificates
                  transform = `translate(${p * 4.6}%, ${p * 5.2}%) rotate(${p * 1.8}deg) scale(${1 - p * 0.035})`;
                  opacity = p > 3 ? 0 : 1;
                  zIndex = total - p;
                  filter = `brightness(${Math.max(0.65, 1 - p * 0.12)})`;
                }

                return (
                  <article
                    key={c.id}
                    className={`cert-page ${p === 0 ? 'top' : ''}`}
                    onClick={() => selectCertificate(i)}
                    style={{
                      '--tone': c.tone,
                      transform,
                      opacity,
                      pointerEvents,
                      zIndex,
                      filter
                    }}
                    aria-label={`${c.title}, ${c.issuer}. Click to bring forward.`}
                  >
                    <img
                      src={c.image}
                      alt={`${c.title} - ${c.issuer}`}
                      className="cert-page-img"
                      loading="lazy"
                    />
                  </article>
                );
              })}
            </div>

            {/* Verification Bar Directly Below the Pictures */}
            <div className="cert-verify-bar">
              <div className="cert-verify-info">
                <span className="cert-verify-dot" />
                <div>
                  <span className="cert-verify-title">{currentCert.title}</span>
                  <span className="cert-verify-meta" style={{ display: 'block', marginTop: '2px' }}>
                    {currentCert.issuer} • ID {currentCert.code}
                  </span>
                </div>
              </div>

              <a
                href={currentCert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-verify-link"
                aria-label={`Verify ${currentCert.title} credential on ${currentCert.issuer}`}
              >
                <span>Verify credential</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
