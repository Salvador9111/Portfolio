import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Footer.css';

const CFG = {
  email: 'hammad.a.work@gmail.com',
  tz: 'Asia/Karachi',
  words: ["Let's", 'make', 'something', 'worth', 'keeping.'],
  small: [
    { t: 'hammad.a.work@gmail.com', c: 'k', email: true },
    { t: 'Open for work', c: 'w', status: true },
    { t: 'GitHub', c: 'y', h: 'https://github.com/Salvador9111' },
    { t: 'LinkedIn', c: 'g', h: 'https://www.linkedin.com/in/hammad-imran-6b7005394/' },
    { t: 'Work', c: 'pure-white', h: '#projects' },
    { t: 'About', c: 'w', h: '#about' },
    { t: 'Skills', c: 'p', h: '#skills' },
    { t: 'Credentials', c: 'pure-white', h: '#certifications' },
    { t: 'Contact', c: 'r', h: '#contact' },
  ],
};

const COLS = ['y', 'w', 'g', 'p', 'r'];

export default function Footer() {
  const [movedCount, setMovedCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const doorRef = useRef(null);
  const magRefs = useRef([]);
  const magnetDataRef = useRef([]);
  const dragRef = useRef(null);
  const movedSetRef = useRef(new Set());
  const toastTimerRef = useRef(null);
  const startedRef = useRef(false);
  const topZIndexRef = useRef(20);

  // Compile list of magnets
  const magnetsList = useRef([
    ...CFG.words.map((w, i) => ({
      t: w,
      c: COLS[i % COLS.length],
      words: true,
      size: 'big',
      id: `word-${i}`,
      whiteText: w.toLowerCase() === 'make',
    })),
    ...CFG.small.map((o, i) => ({
      ...o,
      size: 'sm',
      id: `sm-${i}`,
      whiteText: o.t.toLowerCase() === 'github' || o.t.toLowerCase() === 'skills',
    })),
  ]).current;

  // Initialize slight, almost straight horizontal rotations (-0.4deg to +0.4deg)
  if (magnetDataRef.current.length === 0) {
    magnetDataRef.current = magnetsList.map(() => ({
      x: 0,
      y: 0,
      rot: Math.round((Math.random() * 0.8 - 0.4) * 10) / 10,
      homeX: 0,
      homeY: 0,
    }));
  }

  const place = (el, x, y, r) => {
    if (!el) return;
    el.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
  };

  const layout = useCallback(() => {
    const door = doorRef.current;
    if (!door) return;
    const computed = window.getComputedStyle(door);
    const fontSize = parseFloat(computed.fontSize) || 16;
    const pad = fontSize * 1.4;
    const gap = 12;
    const W = Math.max(door.clientWidth - pad * 2 - 24, 200);

    let x = 0;
    let y = 0;
    let rh = 0;
    let sepDone = false;

    magnetsList.forEach((m, i) => {
      const el = magRefs.current[i];
      const data = magnetDataRef.current[i];
      if (!el || !data) return;

      const isSmall = m.size === 'sm';
      if (isSmall && !sepDone) {
        sepDone = true;
        y += rh + gap * 2.5;
        x = 0;
        rh = 0;
      }

      const w = el.offsetWidth || 100;
      const h = el.offsetHeight || 40;

      if (x + w > W && x > 0) {
        x = 0;
        y += rh + gap;
        rh = 0;
      }

      data.homeX = pad + x;
      data.homeY = pad + y;
      x += w + gap;
      rh = Math.max(rh, h);
    });

    door.style.height = `${pad * 2 + y + rh}px`;
  }, [magnetsList]);

  const tidy = useCallback((stagger = true) => {
    layout();
    topZIndexRef.current = 20;
    magnetsList.forEach((_, i) => {
      const el = magRefs.current[i];
      const data = magnetDataRef.current[i];
      if (!el || !data) return;

      el.classList.add('anim');
      el.style.transitionDelay = stagger ? `${i * 70}ms` : '0ms';
      el.style.zIndex = String(i + 1);
      data.x = data.homeX;
      data.y = data.homeY;
      data.rot = Math.round((Math.random() * 0.8 - 0.4) * 10) / 10;
      place(el, data.homeX, data.homeY, data.rot);
    });

    setTimeout(() => {
      magnetsList.forEach((_, i) => {
        const el = magRefs.current[i];
        if (el) el.style.transitionDelay = '0ms';
      });
    }, stagger ? magnetsList.length * 70 + 900 : 900);

    movedSetRef.current.clear();
    setMovedCount(0);
  }, [layout, magnetsList]);

  const scramble = useCallback(() => {
    const door = doorRef.current;
    if (!door) return;
    const W = door.clientWidth;
    const H = door.clientHeight;

    magnetsList.forEach((_, i) => {
      const el = magRefs.current[i];
      const data = magnetDataRef.current[i];
      if (!el || !data) return;

      el.classList.add('anim');
      el.style.transitionDelay = '0ms';
      const nx = Math.random() * Math.max(W - el.offsetWidth - 40, 20) + 10;
      const ny = Math.random() * Math.max(H - el.offsetHeight - 20, 20) + 10;
      const nr = Math.round((Math.random() * 4 - 2) * 10) / 10;
      data.x = nx;
      data.y = ny;
      data.rot = nr;
      place(el, nx, ny, nr);
      movedSetRef.current.add(i);
    });

    setMovedCount(movedSetRef.current.size);
  }, [magnetsList]);

  const scatterAbove = useCallback(() => {
    const door = doorRef.current;
    if (!door) return;
    const W = door.clientWidth;

    magnetsList.forEach((_, i) => {
      const el = magRefs.current[i];
      const data = magnetDataRef.current[i];
      if (!el || !data) return;

      el.classList.remove('anim');
      const nx = Math.random() * Math.max(W - (el.offsetWidth || 120), 20);
      const ny = -120 - Math.random() * 80;
      const nr = Math.round((Math.random() * 6 - 3) * 10) / 10;
      data.x = nx;
      data.y = ny;
      data.rot = nr;
      place(el, nx, ny, nr);
    });
    layout();
  }, [layout, magnetsList]);

  // Initial scattering and Intersection Observer entrance
  useEffect(() => {
    const door = doorRef.current;
    if (!door) return;

    scatterAbove();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          tidy(!reduceMotion);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(door);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (startedRef.current) tidy(false);
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [scatterAbove, tidy]);

  // Drag Handlers
  const handlePointerDown = (e, index) => {
    if (e.button > 0) return;
    const el = magRefs.current[index];
    const data = magnetDataRef.current[index];
    if (!el || !data) return;

    el.setPointerCapture(e.pointerId);
    dragRef.current = {
      index,
      wasDrag: false,
      dist: 0,
      sx: e.clientX,
      sy: e.clientY,
      ox: data.x,
      oy: data.y,
    };

    el.classList.remove('anim');
    el.classList.add('lift');

    topZIndexRef.current += 1;
    el.style.zIndex = String(topZIndexRef.current);
  };

  const handlePointerMove = (e, index) => {
    const drag = dragRef.current;
    if (!drag || drag.index !== index) return;
    const el = magRefs.current[index];
    const data = magnetDataRef.current[index];
    const door = doorRef.current;
    if (!el || !data || !door) return;
    if (!el.hasPointerCapture(e.pointerId)) return;

    const dx = e.clientX - drag.sx;
    const dy = e.clientY - drag.sy;
    drag.dist = Math.max(drag.dist, Math.hypot(dx, dy));

    const W = door.clientWidth - el.offsetWidth;
    const H = door.clientHeight - el.offsetHeight;
    const nx = Math.min(Math.max(drag.ox + dx, 0), W);
    const ny = Math.min(Math.max(drag.oy + dy, 0), H);

    const rotDelta = (e.movementX || 0) * 0.03 * (drag.dist > 6 ? 1 : 0);
    const clampedRot = Math.max(-1.2, Math.min(1.2, data.rot + rotDelta));
    data.x = nx;
    data.y = ny;
    place(el, nx, ny, clampedRot);
  };

  const handlePointerUp = (e, index) => {
    const drag = dragRef.current;
    if (!drag || drag.index !== index) return;
    const el = magRefs.current[index];
    const data = magnetDataRef.current[index];
    if (!el || !data) return;
    if (!el.classList.contains('lift')) return;

    el.classList.remove('lift');
    el.classList.add('anim');

    data.rot = Math.max(-0.5, Math.min(0.5, data.rot));

    if (drag.dist > 6) {
      drag.wasDrag = true;
      movedSetRef.current.add(index);
      setMovedCount(movedSetRef.current.size);
      place(el, data.x, data.y, data.rot);
    } else {
      place(el, data.x, data.y, data.rot);
    }

    try {
      el.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handleClick = async (e, m) => {
    const drag = dragRef.current;
    if (drag && drag.wasDrag) {
      e.preventDefault();
      drag.wasDrag = false;
      return;
    }
    if (m.email) {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(CFG.email);
        setShowToast(true);
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        toastTimerRef.current = setTimeout(() => setShowToast(false), 2200);
      } catch (_) {}
    }
  };

  const toggleTheme = () => {
    const r = document.documentElement;
    const isDark = r.classList.contains('dark') || r.dataset.theme === 'dark';
    if (isDark) {
      r.classList.remove('dark');
      r.dataset.theme = 'light';
    } else {
      r.classList.add('dark');
      r.dataset.theme = 'dark';
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="magnets-footer">
      <div className="wrap">
        {/* Head Bar */}
        <div className="head">
          <p>Drag the magnets around. The email one copies, the round ones go places.</p>
          <div className="ctrl">
            <span className="count">{movedCount} moved</span>
            <button className="btn" type="button" onClick={scramble}>
              Scramble
            </button>
            <button className="btn" type="button" onClick={() => tidy(true)}>
              Tidy up
            </button>
          </div>
        </div>

        {/* Hidden SEO & Accessibility Announcement */}
        <h2 style={{ position: 'absolute', left: '-9999px' }}>
          Let's make something worth keeping. Email {CFG.email}
        </h2>

        {/* The Metal Fridge Door */}
        <div
          ref={doorRef}
          className="door"
          aria-label="Fridge door with draggable magnets"
        >
          {magnetsList.map((m, i) => {
            const isLink = !!m.h;
            const isEmail = !!m.email;
            const Tag = isLink ? 'a' : isEmail ? 'button' : 'div';
            const extraProps = isLink
              ? {
                  href: m.h,
                  target: m.h.startsWith('http') ? '_blank' : undefined,
                  rel: m.h.startsWith('http') ? 'noopener noreferrer' : undefined,
                  draggable: false,
                }
              : isEmail
              ? {
                  type: 'button',
                  'aria-label': `Copy email ${CFG.email}`,
                }
              : m.words
              ? { 'aria-hidden': 'true' }
              : {};

            return (
              <Tag
                key={m.id}
                ref={(el) => (magRefs.current[i] = el)}
                className={`mg ${m.size} ${m.c} ${m.whiteText ? 'white-text' : ''}`}
                onPointerDown={(e) => handlePointerDown(e, i)}
                onPointerMove={(e) => handlePointerMove(e, i)}
                onPointerUp={(e) => handlePointerUp(e, i)}
                onPointerCancel={(e) => handlePointerUp(e, i)}
                onClick={(e) => handleClick(e, m)}
                {...extraProps}
              >
                {m.status && <i className="dot" aria-hidden="true" />}
                {m.t}
                {isLink && (
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12L12 4M5 4h7v7" />
                  </svg>
                )}
                {isEmail && (
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="5" y="5" width="8" height="8" rx="1.5" />
                    <path d="M3 10V4a1 1 0 011-1h6" />
                  </svg>
                )}
              </Tag>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <div className="bar">
          <div className="bar-spacer" aria-hidden="true" />
          <span className="mid">HAMMAD</span>
          <div className="r">
            <button className="btn" type="button" onClick={toggleTheme}>
              Theme
            </button>
            <button className="btn" type="button" onClick={scrollToTop}>
              Top
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div
        className={`magnets-footer-toast ${showToast ? 'show' : ''}`}
        role="status"
        aria-live="polite"
      >
        Email copied
      </div>
    </footer>
  );
}
