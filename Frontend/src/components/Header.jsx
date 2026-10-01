import React, { useEffect, useRef, useState, useCallback } from 'react';
import { portfolioData } from '../data/portfolioData';
import './HeaderScrubber.css';

const SECTIONS = [
  { id: 'overview', label: 'Overview', cap: 'Introduction' },
  { id: 'about', label: 'About', cap: 'Who I am' },
  { id: 'work', label: 'Work', cap: 'Selected projects' },
  { id: 'capabilities', label: 'Capabilities', cap: 'Skills and tools' },
  { id: 'credentials', label: 'Credentials', cap: 'Education and certificates' },
  { id: 'contact', label: 'Contact', cap: 'Reach me' },
];

export default function Header() {
  const { personal } = portfolioData;

  const rulerRef = useRef(null);
  const canvasRef = useRef(null);
  const headRef = useRef(null);
  const capRef = useRef(null);
  const labelsRef = useRef(null);
  const liRefs = useRef([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [caption, setCaption] = useState('Introduction');
  const [capSw, setCapSw] = useState(false);
  const [isHeadRight, setIsHeadRight] = useState(false);

  // Animation & Drag internal state
  const mathRef = useRef({
    W: 0,
    H: 32,
    maxScroll: 1,
    xs: [0, 0.2, 0.4, 0.6, 0.8, 1],
    hx: 0,
    mx: -999,
    hover: false,
    drag: false,
    curIdx: 0,
    shownCap: 'Introduction',
    reduceMotion: false
  });

  const setCaptionAnimated = useCallback((text) => {
    if (mathRef.current.shownCap === text) return;
    mathRef.current.shownCap = text;
    setCaption(text);
    setCapSw(true);
    setTimeout(() => setCapSw(false), 400);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ruler = rulerRef.current;
    const cv = canvasRef.current;
    if (!ruler || !cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    mathRef.current.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Elements mapped to sections
    const getSecEls = () => SECTIONS.map(s => document.getElementById(s.id));

    // Calculate layout & button positions
    const measure = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      const W = ruler.clientWidth;
      const H = ruler.clientHeight || 32;
      mathRef.current.W = W;
      mathRef.current.H = H;

      cv.width = W * d;
      cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);

      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const maxScroll = Math.max(1, docH - winH);
      mathRef.current.maxScroll = maxScroll;

      const secEls = getSecEls();
      const xs = secEls.map(el => {
        if (!el) return 0;
        return Math.max(0, Math.min(1, el.offsetTop / maxScroll));
      });
      mathRef.current.xs = xs;

      // Smart Non-Collision Button Spacing Algorithm
      if (W > 0 && liRefs.current.length === SECTIONS.length) {
        const n = SECTIONS.length;
        const widths = liRefs.current.map(li => (li ? li.offsetWidth : 70));
        const pos = new Array(n).fill(0);

        pos[0] = 0; // Overview pinned at start
        pos[n - 1] = Math.max(0, W - widths[n - 1]); // Contact pinned at right

        const DEFAULT_GAP = 10;
        const CREDENTIALS_CONTACT_GAP = 14; // Dedicated breathing room between Credentials & Contact

        // Natural anchor based on section document position
        for (let i = 1; i < n - 1; i++) {
          const idealCenter = xs[i] * W;
          pos[i] = idealCenter - widths[i] / 2;
        }

        // Forward pass: maintain minimum gap from previous button
        for (let i = 1; i < n - 1; i++) {
          const minAllowed = pos[i - 1] + widths[i - 1] + DEFAULT_GAP;
          if (pos[i] < minAllowed) {
            pos[i] = minAllowed;
          }
        }

        // Backward pass: ensure right-side clearance, especially between Credentials (n-2) and Contact (n-1)
        for (let i = n - 2; i >= 1; i--) {
          const gap = (i === n - 2) ? CREDENTIALS_CONTACT_GAP : DEFAULT_GAP;
          const maxAllowed = pos[i + 1] - widths[i] - gap;
          if (pos[i] > maxAllowed) {
            pos[i] = maxAllowed;
          }
        }

        // Final forward stabilization
        for (let i = 1; i < n - 1; i++) {
          const minAllowed = pos[i - 1] + widths[i - 1] + DEFAULT_GAP;
          if (pos[i] < minAllowed) {
            pos[i] = minAllowed;
          }
        }

        // Apply positions
        liRefs.current.forEach((li, i) => {
          if (li) {
            li.style.transform = `translateX(${Math.round(pos[i])}px)`;
            li.style.left = '0px';
          }
        });
      }
    };

    // Draw the precision dynamic gauge with increased line density
    const draw = () => {
      const { W, H, hx, mx, hover, drag, xs } = mathRef.current;
      ctx.clearRect(0, 0, W, H);

      // Increased line density: step = 3.5px gives ~180-200 lines across desktop viewports
      const step = 3.5;
      const n = Math.floor(W / step);

      for (let i = 0; i <= n; i++) {
        const x = i * step + 0.5;
        // Major ticks every 10, medium ticks every 5, minor ticks otherwise
        const h = (i % 10 === 0) ? 13 : (i % 5 === 0) ? 9 : 5;
        const d = x - mx;
        const bump = (hover || drag) ? 20 * Math.exp(-(d * d) / (2 * 48 * 48)) : 0;

        ctx.fillStyle = x <= hx
          ? 'rgba(255, 255, 255, 0.95)'
          : `rgba(255, 255, 255, ${0.24 + bump / 35})`;

        ctx.fillRect(Math.round(x) - 0.5, H - h - bump, 1, h + bump);
      }

      // Tall section anchor ticks connecting to the ruler
      ctx.fillStyle = '#FFFFFF';
      xs.forEach((p) => {
        ctx.fillRect(Math.min(W - 1, Math.round(p * W)), H - 26, 1, 26);
      });
    };

    let animationFrameId;

    const frame = () => {
      const { W, maxScroll, reduceMotion } = mathRef.current;
      const y = window.scrollY;
      const targetX = (y / maxScroll) * W;

      if (reduceMotion) {
        mathRef.current.hx = targetX;
      } else {
        mathRef.current.hx += (targetX - mathRef.current.hx) * 0.28;
        if (Math.abs(targetX - mathRef.current.hx) < 0.2) {
          mathRef.current.hx = targetX;
        }
      }

      const hx = mathRef.current.hx;
      if (headRef.current) {
        headRef.current.style.transform = `translateX(${hx}px)`;
      }

      setIsHeadRight(hx > W * 0.75);

      // Determine active section index
      const mid = y + window.innerHeight * 0.38;
      const secEls = getSecEls();
      let currentIdx = 0;
      secEls.forEach((el, i) => {
        if (el && el.offsetTop <= mid) {
          currentIdx = i;
        }
      });

      if (currentIdx !== mathRef.current.curIdx) {
        mathRef.current.curIdx = currentIdx;
        setActiveIdx(currentIdx);
        if (!mathRef.current.hover && !mathRef.current.drag) {
          setCaptionAnimated(SECTIONS[currentIdx].cap);
        }
      }

      draw();
      animationFrameId = requestAnimationFrame(frame);
    };

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }

    animationFrameId = requestAnimationFrame(frame);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, [setCaptionAnimated]);

  // Scrub interaction handler
  const scrubFromPointer = (clientX) => {
    if (!rulerRef.current) return;
    const rect = rulerRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const targetY = p * mathRef.current.maxScroll;
    window.scrollTo({ top: targetY, behavior: 'instant' });
  };

  const findNearestSectionIdx = (x) => {
    const { xs, W } = mathRef.current;
    let bestIdx = 0;
    let bestDist = Infinity;
    xs.forEach((p, i) => {
      const dist = Math.abs(p * W - x);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    return bestIdx;
  };

  const handlePointerEnter = () => {
    mathRef.current.hover = true;
  };

  const handlePointerLeave = () => {
    mathRef.current.hover = false;
    mathRef.current.mx = -999;
    if (!mathRef.current.drag) {
      setCaptionAnimated(SECTIONS[mathRef.current.curIdx].cap);
    }
  };

  const handlePointerMove = (e) => {
    if (!rulerRef.current) return;
    const rect = rulerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    mathRef.current.mx = mx;

    if (mathRef.current.drag) {
      scrubFromPointer(e.clientX);
    }

    const nearestIdx = findNearestSectionIdx(mx);
    setCaptionAnimated(SECTIONS[nearestIdx].cap);
  };

  const handlePointerDown = (e) => {
    mathRef.current.drag = true;
    if (rulerRef.current && rulerRef.current.setPointerCapture) {
      rulerRef.current.setPointerCapture(e.pointerId);
    }
    scrubFromPointer(e.clientX);
  };

  const handlePointerUp = () => {
    mathRef.current.drag = false;
    if (!mathRef.current.hover) {
      setCaptionAnimated(SECTIONS[mathRef.current.curIdx].cap);
    }
  };

  return (
    <header className="scrub-bar" role="banner">
      {/* Brand Mark (Left) */}
      <a
        className="scrub-mark"
        href="#overview"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('overview');
        }}
        aria-label="Hammad Imran - Return to top"
      >
        <b>HAMMAD</b>
        <em ref={capRef} className={capSw ? 'sw' : ''}>
          {caption}
        </em>
      </a>

      {/* Center Precision Track & Interactive Ruler */}
      <nav className="scrub-track" aria-label="Main Navigation">
        {/* Section Pill Buttons with Guaranteed Clear Spacing */}
        <ol className="scrub-labels" id="labels" ref={labelsRef}>
          {SECTIONS.map((sec, i) => (
            <li
              key={sec.id}
              ref={(el) => {
                liRefs.current[i] = el;
              }}
            >
              <a
                href={`#${sec.id}`}
                data-cap={sec.cap}
                aria-current={activeIdx === i ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(sec.id);
                }}
                onMouseEnter={() => setCaptionAnimated(sec.cap)}
                onMouseLeave={() => setCaptionAnimated(SECTIONS[activeIdx].cap)}
                onFocus={() => setCaptionAnimated(sec.cap)}
                onBlur={() => setCaptionAnimated(SECTIONS[activeIdx].cap)}
              >
                {sec.label}
              </a>
            </li>
          ))}
        </ol>

        {/* Dynamic Scrubber Ruler with High Density Lines */}
        <div
          className="scrub-ruler"
          id="ruler"
          ref={rulerRef}
          title="Drag to scrub the page"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <canvas ref={canvasRef} id="cv" />
          <i
            className={`scrub-head ${isHeadRight ? 'r' : ''}`}
            ref={headRef}
            id="head"
            aria-hidden="true"
          >
            <span className="scrub-flag" id="flag">
              {SECTIONS[activeIdx]?.label || 'Overview'}
            </span>
          </i>
        </div>
      </nav>

      {/* Right Cyber-Architectural Bracket CTA */}
      <a
        className="scrub-cta"
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('contact');
        }}
        aria-label="Get in touch with Hammad"
      >
        <span className="scrub-roll">
          <span>Get in touch</span>
          <span>Let's talk</span>
        </span>
      </a>
    </header>
  );
}
