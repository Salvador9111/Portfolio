import React, { useEffect, useRef, useState } from 'react';
import './AboutEditorial.css';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personal } = portfolioData;

  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const copyBtnRef = useRef(null);
  const beltRef = useRef(null);
  const canvasRef = useRef(null);
  const tipRef = useRef(null);
  const stackRef = useRef(null);
  const holdBtnRef = useRef(null);
  const factRef = useRef(null);

  // Accordion state
  const [openPanels, setOpenPanels] = useState({
    p1: true,
    p2: false,
    p3: false,
  });

  const togglePanel = (panelId) => {
    setOpenPanels((prev) => ({
      ...prev,
      [panelId]: !prev[panelId],
    }));
  };

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;




    // --- Belt Marquee Content & Scrolling Logic ---
    const beltEl = beltRef.current;
    const starSvg =
      '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0C10.6 6 14 9.4 20 10 14 10.6 10.6 14 10 20 9.4 14 6 10.6 0 10 6 9.4 9.4 6 10 0Z"/></svg>';
    const beltSkills = [
      'Voice AI',
      'Full-Stack Web',
      'OOP Systems',
      'Python & Java',
      'RAG Pipelines',
      'UI/UX Engineering',
    ];
    let beltMarkup = '';
    beltSkills.forEach((skill) => {
      beltMarkup += `<span>${skill}</span>${starSvg}`;
    });
    if (beltEl) {
      beltEl.innerHTML = beltMarkup + beltMarkup + beltMarkup + beltMarkup;
    }

    // --- Tooltip on Hover Items ---
    const tipEl = tipRef.current;
    let isTipActive = false;
    const clientItems = sectionRef.current?.querySelectorAll('.about-cl') || [];

    const handleItemEnter = (e) => {
      if (tipEl) {
        tipEl.textContent = e.currentTarget.dataset.tip;
        tipEl.classList.add('on');
        isTipActive = true;
      }
    };
    const handleItemLeave = () => {
      if (tipEl) {
        tipEl.classList.remove('on');
        isTipActive = false;
      }
    };
    const handleItemFocus = (e) => {
      if (tipEl) {
        const rect = e.currentTarget.getBoundingClientRect();
        tipEl.textContent = e.currentTarget.dataset.tip;
        tipEl.style.transform = `translate(${rect.left}px, ${rect.bottom + 8}px)`;
        tipEl.classList.add('on');
      }
    };
    const handleItemBlur = () => {
      if (tipEl) {
        tipEl.classList.remove('on');
      }
    };

    clientItems.forEach((item) => {
      item.addEventListener('pointerenter', handleItemEnter);
      item.addEventListener('pointerleave', handleItemLeave);
      item.addEventListener('focus', handleItemFocus);
      item.addEventListener('blur', handleItemBlur);
    });

    // --- Copy Email Button Magnetic Pull & Feedback ---
    const copyBtn = copyBtnRef.current;
    const originalCopyText = copyBtn ? copyBtn.textContent : 'Copy hammad.a.work@gmail.com';
    let copyResetTimer = null;

    const handleCopyClick = () => {
      if (!copyBtn) return;
      const targetEmail = personal.email || 'hammad.a.work@gmail.com';
      const onCopied = () => {
        copyBtn.textContent = 'Copied!';
        if (copyResetTimer) clearTimeout(copyResetTimer);
        copyResetTimer = setTimeout(() => {
          copyBtn.textContent = originalCopyText;
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(targetEmail).then(onCopied, () => {
          window.location.href = `mailto:${targetEmail}`;
        });
      } else {
        window.location.href = `mailto:${targetEmail}`;
      }
    };

    if (copyBtn) {
      copyBtn.addEventListener('click', handleCopyClick);
    }

    // --- Press & Hold Reveal ---
    const holdBtn = holdBtnRef.current;
    const factEl = factRef.current;
    // --- Text Scramble Utility for Developer Facts ---
    const scramble = (element, targetText) => {
      if (!element) return;
      if (isReduced) {
        element.textContent = targetText;
        return;
      }
      if (element._scrId) clearInterval(element._scrId);
      let progress = 0;
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      element._scrId = setInterval(() => {
        element.textContent = targetText
          .split('')
          .map((char, index) => {
            if (index < progress || char === ' ') return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        progress += 1.4;
        if (progress > targetText.length + 1) {
          element.textContent = targetText;
          clearInterval(element._scrId);
          element._scrId = null;
        }
      }, 28);
    };

    let holdAnimFrame = 0;
    let factIndex = 0;
    const developerFacts = [
      'I built Jarvis, a voice-controlled AI assistant powered by Gemini API.',
      'I prioritize clean object-oriented architecture and modular components.',
      'I measure software by runtime speed, reliability, and zero redundancy.',
    ];

    const startHold = () => {
      if (holdAnimFrame) return;
      if (holdBtn) holdBtn.setAttribute('data-holding', 'true');
      const startTime = performance.now();
      const tickHold = (time) => {
        const progress = Math.min(1, (time - startTime) / 1000);
        if (holdBtn) {
          holdBtn.style.setProperty('--p', progress);
        }
        if (progress >= 1) {
          holdAnimFrame = 0;
          if (holdBtn) {
            holdBtn.setAttribute('data-filled', 'true');
            holdBtn.removeAttribute('data-holding');
          }
          scramble(factEl, developerFacts[factIndex++ % developerFacts.length]);
          return;
        }
        holdAnimFrame = requestAnimationFrame(tickHold);
      };
      holdAnimFrame = requestAnimationFrame(tickHold);
    };

    const endHold = () => {
      if (holdAnimFrame) {
        cancelAnimationFrame(holdAnimFrame);
        holdAnimFrame = 0;
      }
      if (holdBtn) {
        holdBtn.style.setProperty('--p', 0);
        holdBtn.removeAttribute('data-holding');
        holdBtn.removeAttribute('data-filled');
      }
    };

    if (holdBtn) {
      holdBtn.addEventListener('pointerdown', startHold);
      ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach((evt) => {
        holdBtn.addEventListener(evt, endHold);
      });
      holdBtn.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          startHold();
        }
      });
      holdBtn.addEventListener('keyup', endHold);
      holdBtn.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    // --- Animated Stats Counters ---
    const statElements = sectionRef.current?.querySelectorAll('[data-n]') || [];
    const runCounter = (el) => {
      const targetVal = +el.dataset.n;
      if (isReduced) {
        el.textContent = el.dataset.plus ? `${targetVal}+` : `${targetVal}`;
        return;
      }
      let startTime = null;
      const step = (now) => {
        if (!startTime) startTime = now;
        const progress = Math.min(1, (now - startTime) / 1400);
        const current = Math.round(targetVal * (1 - Math.pow(1 - progress, 3)));
        el.textContent = el.dataset.plus ? `${current}+` : `${current}`;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    let counterObserver = null;
    if ('IntersectionObserver' in window) {
      counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      statElements.forEach((el) => counterObserver.observe(el));
    } else {
      statElements.forEach(runCounter);
    }

    // Hover replay on stats
    const statContainers = sectionRef.current?.querySelectorAll('.about-stats > div:not(.about-stack)') || [];
    statContainers.forEach((div) => {
      const numSpan = div.querySelector('[data-n]');
      if (!numSpan) return;
      div.addEventListener('pointerenter', () => {
        if (numSpan._busy) return;
        numSpan._busy = true;
        runCounter(numSpan);
        setTimeout(() => {
          numSpan._busy = false;
        }, 1600);
      });
    });

    // --- Interactive Testimonial / Projects Stack ---
    const stackEl = stackRef.current;
    let cardElements = [];
    let cardOrder = [];

    const layoutCards = () => {
      cardOrder.forEach((card, index) => {
        card.style.zIndex = 10 - index;
        card.style.opacity = index > 2 ? 0 : 1 - index * 0.3;
        card.style.transform = `translateY(${index * 18}px) scale(${1 - index * 0.05})`;
      });
    };

    const nextCard = () => {
      if (cardOrder.length < 2) return;
      const topCard = cardOrder.shift();
      topCard.style.transform = 'translateY(-36px) rotate(-3deg)';
      topCard.style.opacity = 0;
      setTimeout(() => {
        cardOrder.push(topCard);
        layoutCards();
      }, isReduced ? 0 : 280);
    };

    if (stackEl) {
      cardElements = Array.from(stackEl.querySelectorAll('.about-card'));
      cardOrder = cardElements.slice();
      layoutCards();

      stackEl.addEventListener('click', nextCard);
      stackEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          nextCard();
        }
      });
    }

    // --- Canvas Sparkling White Starburst FX ---
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let particles = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      if (!canvas || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawStar = (x, y, s, a, color) => {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = a;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(0, 0, s, 0);
      ctx.quadraticCurveTo(0, 0, 0, s);
      ctx.quadraticCurveTo(0, 0, -s, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s);
      ctx.fill();
      ctx.restore();
    };

    const handleSectionPointerDown = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      // Burst 14 pure white stars (ZERO orange)
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 2;
        particles.push({
          x: localX,
          y: localY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          size: Math.random() * 6 + 4,
          color: Math.random() < 0.75 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
        });
      }
    };

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      sectionElement.addEventListener('pointerdown', handleSectionPointerDown);
    }

    // --- Main Spotlight & Motion Animation Loop ---
    const headline = headlineRef.current;
    const headlineLines = headline ? headline.querySelectorAll('span') : [];

    const setSpotlight = (x, y, radius) => {
      headlineLines.forEach((line) => {
        line.style.setProperty('--mx', `${x}px`);
        line.style.setProperty('--my', `${y - line.offsetTop}px`);
        line.style.setProperty('--r', `${radius}px`);
      });
    };

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let lastPointerTime = -9999;
    let headlinePulse = 0;
    let copyButtonX = 0;
    let copyButtonY = 0;
    let marqueeOffset = 0;
    let marqueeDirection = -1;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let marqueePeriod = 0;

    const handlePointerMove = (e) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      lastPointerTime = performance.now();
    };

    if (isFinePointer) {
      document.addEventListener('pointermove', handlePointerMove);
    }

    const handleHeadlineDown = () => {
      headlinePulse = 1.3;
    };
    if (headline) {
      headline.addEventListener('pointerdown', handleHeadlineDown);
    }

    const baseRadius = Math.max(200, Math.min(380, window.innerWidth * 0.24));
    const headlineRect0 = headline ? headline.getBoundingClientRect() : { width: 400, height: 120 };
    let targetX = headlineRect0.width * 0.3;
    let targetY = headlineRect0.height * 0.5;
    let currentX = targetX;
    let currentY = targetY;
    let currentRadius = 0;
    let targetRadius = 0;

    let animFrameId = 0;

    const animationFrame = (timestamp) => {
      if (headline) {
        const headlineRect = headline.getBoundingClientRect();
        const isIdle = timestamp - lastPointerTime > 2500;
        const isPointerNear =
          pointerY > headlineRect.top - 140 && pointerY < headlineRect.bottom + 140;

        if (!isIdle) {
          targetX = pointerX - headlineRect.left;
          targetY = pointerY - headlineRect.top;
          targetRadius = isPointerNear ? baseRadius : 0;
        } else {
          targetX = headlineRect.width * (0.5 + 0.38 * Math.sin(timestamp / 2300));
          targetY = headlineRect.height * (0.5 + 0.3 * Math.sin(timestamp / 1600 + 1));
          targetRadius = Math.max(150, Math.min(baseRadius, headlineRect.width * 0.4)) * 0.9;
        }

        headlinePulse *= 0.93;
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        currentRadius += (targetRadius * (1 + headlinePulse) - currentRadius) * 0.1;
        setSpotlight(currentX, currentY, currentRadius);

        // Subtle parallax
        if (isFinePointer) {
          headline.style.transform = `translate(${(pointerX - window.innerWidth / 2) * -0.01}px, ${(pointerY - window.innerHeight / 2) * -0.01}px)`;
        }
      }

      // Tooltip position following pointer
      if (isFinePointer && isTipActive && tipEl) {
        tipEl.style.transform = `translate(${pointerX + 18}px, ${pointerY + 18}px)`;
      }

      // Copy Button Magnetic Pull
      if (isFinePointer && copyBtn) {
        const btnRect = copyBtn.getBoundingClientRect();
        const deltaX = pointerX - (btnRect.left + btnRect.width / 2);
        const deltaY = pointerY - (btnRect.top + btnRect.height / 2);
        const distance = Math.hypot(deltaX, deltaY);
        const pullX = distance < 110 ? deltaX * 0.3 : 0;
        const pullY = distance < 110 ? deltaY * 0.3 : 0;
        copyButtonX += (pullX - copyButtonX) * 0.15;
        copyButtonY += (pullY - copyButtonY) * 0.15;
        copyBtn.style.transform = `translate(${copyButtonX}px, ${copyButtonY}px)`;
      }

      // Belt Marquee Scroll-Reactive Movement
      if (beltEl) {
        if (!marqueePeriod && beltEl.children.length) {
          marqueePeriod =
            beltEl.children[beltEl.children.length / 2].offsetLeft - beltEl.children[0].offsetLeft;
        }
        scrollVelocity += (window.scrollY - lastScrollY - scrollVelocity) * 0.1;
        lastScrollY = window.scrollY;
        if (Math.abs(scrollVelocity) > 0.5) {
          marqueeDirection = scrollVelocity > 0 ? -1 : 1;
        }
        marqueeOffset += marqueeDirection * (0.7 + Math.abs(scrollVelocity) * 0.35);
        if (marqueePeriod) {
          if (marqueeOffset <= -marqueePeriod) marqueeOffset += marqueePeriod;
          if (marqueeOffset > 0) marqueeOffset -= marqueePeriod;
        }
        beltEl.style.transform = `translateX(${marqueeOffset}px)`;
      }

      // Starburst Canvas Particles
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter((p) => p.life > 0);
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.93;
          p.vy *= 0.93;
          p.life -= 0.018;
          drawStar(p.x, p.y, p.size * p.life + 1, p.life, p.color);
        });
      }

      animFrameId = requestAnimationFrame(animationFrame);
    };

    animFrameId = requestAnimationFrame(animationFrame);

    return () => {
      cancelAnimationFrame(animFrameId);
      if (counterObserver) counterObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      if (isFinePointer) {
        document.removeEventListener('pointermove', handlePointerMove);
      }
      if (copyBtn) {
        copyBtn.removeEventListener('click', handleCopyClick);
      }
      if (holdBtn) {
        holdBtn.removeEventListener('pointerdown', startHold);
      }
      if (headline) {
        headline.removeEventListener('pointerdown', handleHeadlineDown);
      }
      if (sectionElement) {
        sectionElement.removeEventListener('pointerdown', handleSectionPointerDown);
      }
      clientItems.forEach((item) => {
        item.removeEventListener('pointerenter', handleItemEnter);
        item.removeEventListener('pointerleave', handleItemLeave);
        item.removeEventListener('focus', handleItemFocus);
        item.removeEventListener('blur', handleItemBlur);
      });
    };
  }, [personal]);

  return (
    <section id="about" className="about-editorial-section" ref={sectionRef}>
      {/* Interactive Floating Tooltip */}
      <div className="about-tip" id="about-tip" ref={tipRef}></div>

      {/* Sparkling Starburst Canvas (Pure White, Zero Orange) */}
      <canvas className="about-fx-canvas" id="about-fx-canvas" ref={canvasRef}></canvas>

      <div className="about-editorial-wrap">
        {/* Hero Spotlight Headline (Pure White, No Orange) */}
        <h1
          id="about-h"
          className="about-hero-h1"
          ref={headlineRef}
          aria-label="I make things feel inevitable."
        >
          <span data-t="I make things" aria-hidden="true">
            I make things
          </span>
          <span data-t="feel inevitable." aria-hidden="true">
            feel inevitable.
          </span>
        </h1>

        {/* 3-Column Info Grid */}
        <div className="about-info-grid">
          <div>
            <p>
              <strong>I engineer AI systems, voice agents, and responsive web platforms</strong>{' '}
              with architectural clarity and measured performance. Studying Software Engineering at
              Iqra University, I treat clean modular code, low redundancy, and rock-solid
              reliability as non-negotiable fundamentals.
            </p>
          </div>

          <dl className="about-dl">
            <div>
              <dt>Focus</dt>
              <dd>
                <i
                  className="about-cl"
                  tabIndex="0"
                  data-tip="Speech recognition, Gemini API, command handler"
                >
                  Voice AI
                </i>
                ,{' '}
                <i
                  className="about-cl"
                  tabIndex="0"
                  data-tip="React, JavaScript, responsive state"
                >
                  Full-Stack Web
                </i>
                ,{' '}
                <i
                  className="about-cl"
                  tabIndex="0"
                  data-tip="Modular OOP architecture, Java & Python"
                >
                  OOP Systems
                </i>
              </dd>
            </div>
            <div>
              <dt>Degree</dt>
              <dd>BSE • Iqra University (Exp. 2029)</dd>
            </div>
            <div>
              <dt>Now</dt>
              <dd id="about-now-text">Exploring RAG & LLM pipelines</dd>
            </div>
          </dl>

          <div className="about-avail">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 0C10.6 6 14 9.4 20 10 14 10.6 10.6 14 10 20 9.4 14 6 10.6 0 10 6 9.4 9.4 6 10 0Z" />
            </svg>
            <div>
              <p>Open for select software & AI collaborations.</p>
              <button
                className="about-copy-btn"
                id="about-copy"
                type="button"
                ref={copyBtnRef}
              >
                Copy {personal.email || 'hammad.a.work@gmail.com'}
              </button>
            </div>
          </div>
        </div>

        {/* Running Marquee Belt */}
        <div className="about-belt-wrap" aria-hidden="true">
          <div className="about-belt-track" id="about-belt" ref={beltRef}></div>
        </div>

        {/* Split Lower Grid: Accordion / Press-and-Hold & Stats / Stack */}
        <div className="about-more-grid">
          <div>
            <div className="about-acc" id="about-acc">
              {/* Accordion Item 1 */}
              <div>
                <button
                  type="button"
                  className="about-acc-btn"
                  aria-expanded={openPanels.p1}
                  aria-controls="about-p1"
                  onClick={() => togglePanel('p1')}
                >
                  Start with the problem
                  <svg viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M7 0v14M0 7h14" fill="none" strokeWidth="1.5" />
                  </svg>
                </button>
                <div
                  className={`about-panel ${openPanels.p1 ? 'open' : ''}`}
                  id="about-p1"
                >
                  <p>
                    Before writing a single line of code, I break down system requirements, user
                    workflows, and core constraints. Clean architecture begins with conceptual clarity.
                  </p>
                </div>
              </div>

              {/* Accordion Item 2 */}
              <div>
                <button
                  type="button"
                  className="about-acc-btn"
                  aria-expanded={openPanels.p2}
                  aria-controls="about-p2"
                  onClick={() => togglePanel('p2')}
                >
                  Build modular, clean code
                  <svg viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M7 0v14M0 7h14" fill="none" strokeWidth="1.5" />
                  </svg>
                </button>
                <div
                  className={`about-panel ${openPanels.p2 ? 'open' : ''}`}
                  id="about-p2"
                >
                  <p>
                    Every module, class, and component must have a single clear responsibility.
                    Loose coupling and high cohesion keep systems maintainable and scalable.
                  </p>
                </div>
              </div>

              {/* Accordion Item 3 */}
              <div>
                <button
                  type="button"
                  className="about-acc-btn"
                  aria-expanded={openPanels.p3}
                  aria-controls="about-p3"
                  onClick={() => togglePanel('p3')}
                >
                  Measure by working results
                  <svg viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M7 0v14M0 7h14" fill="none" strokeWidth="1.5" />
                  </svg>
                </button>
                <div
                  className={`about-panel ${openPanels.p3 ? 'open' : ''}`}
                  id="about-p3"
                >
                  <p>
                    I evaluate software not by lines of code, but by runtime speed, reliability,
                    and seamless user interaction. Zero fluff, just working systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Press and Hold Reveal */}
            <div className="about-hold-wrap">
              <button
                className="about-hold-btn"
                id="about-hold"
                type="button"
                ref={holdBtnRef}
              >
                <i></i>
                <span>Press and hold to know me better</span>
              </button>
              <p
                className="about-fact"
                id="about-fact"
                ref={factRef}
                aria-live="polite"
              ></p>
            </div>
          </div>

          {/* Stats Column & Interactive Card Deck */}
          <div className="about-stats">
            <div>
              <b data-n="2" data-plus="true">
                0
              </b>
              <span>Years in practice</span>
            </div>
            <div>
              <b data-n="8" data-plus="true">
                0
              </b>
              <span>Projects shipped</span>
            </div>
            <div>
              <b data-n="8">0</b>
              <span>Certifications earned</span>
            </div>

            {/* Testimonials / Project Deck Stack */}
            <div
              className="about-stack"
              id="about-stack"
              ref={stackRef}
              tabIndex="0"
              role="button"
              aria-label="Click to show next project highlight"
            >
              <div className="about-card">
                <p>
                  “Engineered Jarvis, a Python voice assistant combining speech recognition and
                  Gemini API that cut feature integration time by 40% with a modular command
                  handler.”
                </p>
                <b className="about-card-title">Jarvis Voice Assistant</b>
              </div>

              <div className="about-card">
                <p>
                  “Built a responsive clothing e-commerce web platform featuring dynamic product
                  filtering, cart state persistence, and fluid navigation.”
                </p>
                <b className="about-card-title">Uclothes Store</b>
              </div>

              <div className="about-card">
                <p>
                  “Developed a console-based airline reservation system in Java implementing
                  object-oriented passenger booking, seating allocation, and file persistence.”
                </p>
                <b className="about-card-title">Airline Reservation System</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
