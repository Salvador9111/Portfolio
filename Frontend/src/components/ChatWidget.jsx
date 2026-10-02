import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ChatWidget.css';

const QUICK_CHIPS = [
  'Tech stack',
  'Background',
  'Get in touch'
];

/**
 * Formats inline markdown (bold, italic, code) and strips any stray asterisks.
 */
function formatInlineText(text) {
  if (!text) return null;

  const parts = [];
  let remaining = text;
  let keyIndex = 0;
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let match;
  let lastIndex = 0;

  while ((match = pattern.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      parts.push(remaining.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      const content = token.slice(2, -2);
      parts.push(<strong key={keyIndex++} className="chat-bold">{content}</strong>);
    } else if (token.startsWith('`') && token.endsWith('`')) {
      const content = token.slice(1, -1);
      parts.push(<code key={keyIndex++} className="chat-code">{content}</code>);
    } else if (token.startsWith('*') && token.endsWith('*')) {
      const content = token.slice(1, -1);
      parts.push(<em key={keyIndex++} className="chat-italic">{content}</em>);
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < remaining.length) {
    parts.push(remaining.substring(lastIndex));
  }

  // Strip any stray unparsed asterisks from plain strings
  return parts.map((part) => {
    if (typeof part === 'string') {
      return part.replace(/\*/g, '');
    }
    return part;
  });
}

/**
 * FormattedMessage parses markdown headings, bullet lists, numbered lists,
 * and paragraphs, preventing single-paragraph collapse and removing raw asterisks.
 */
function FormattedMessage({ text }) {
  if (!text) return null;

  const normalized = text.replace(/\r\n/g, '\n').trim();
  const rawLines = normalized.split('\n');

  const blocks = [];
  let currentList = null; // { type: 'ul' | 'ol', items: [] }
  let currentParagraph = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const pText = currentParagraph.join(' ').trim();
      if (pText) {
        blocks.push({
          type: 'p',
          content: pText
        });
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    // Markdown Headings: ### Heading, ## Heading, # Heading
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        content: headingMatch[2].replace(/\*\*/g, '').trim()
      });
      continue;
    }

    // Standalone bold header line (e.g. "**Key Skills:**" or "**Education**")
    const boldHeaderMatch = line.match(/^\*\*([^*]+)\*\*:?$/);
    if (boldHeaderMatch && line.length < 65) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'heading',
        level: 3,
        content: boldHeaderMatch[1].trim()
      });
      continue;
    }

    // Bullet List items: * item, - item, • item, + item
    const bulletMatch = line.match(/^[\*\-•\+]\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(bulletMatch[1]);
      continue;
    }

    // Numbered List items: 1. item, 2. item
    const numberedMatch = line.match(/^(\d+)[\.\)]\s+(.+)$/);
    if (numberedMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(numberedMatch[2]);
      continue;
    }

    // Regular line in paragraph
    flushList();
    currentParagraph.push(line);
  }

  flushParagraph();
  flushList();

  return (
    <div className="chat-formatted-body">
      {blocks.map((block, idx) => {
        if (block.type === 'heading') {
          return (
            <h4 key={idx} className="chat-msg-heading">
              {block.content}
            </h4>
          );
        }
        if (block.type === 'ul') {
          return (
            <ul key={idx} className="chat-msg-list">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="chat-msg-list-item">
                  <span className="chat-bullet" aria-hidden="true" />
                  <span className="chat-item-text">{formatInlineText(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'ol') {
          return (
            <ol key={idx} className="chat-msg-numbered-list">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="chat-msg-numbered-item">
                  <span className="chat-num">{itemIdx + 1}.</span>
                  <span className="chat-item-text">{formatInlineText(item)}</span>
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p key={idx} className="chat-msg-para">
            {formatInlineText(block.content)}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Welcome. I can walk you through Hammad's work, his stack, and how to reach him. Where would you like to begin?",
      sources: null,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatbotRef = useRef(null);
  const canvasRef = useRef(null);

  // Animation energy for ridgeline signal
  const energyRef = useRef(1);
  const targetEnergyRef = useRef(1);

  // Generate session ID once
  const [sessionId] = useState(
    () => `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  );

  // Dynamic API URL Resolution
  const getApiUrl = () => {
    if (import.meta.env?.VITE_API_URL) {
      const base = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
      return base.endsWith('/chat') ? base : `${base}/chat`;
    }
    return '/chat';
  };

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // ─── Layered Ridgeline Wave Signal (Canvas Animation) ───
  useEffect(() => {
    if (!isOpen) return;

    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId;
    let W = 0;
    let H = 0;

    const resize = () => {
      const rect = cv.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      cv.width = W * d;
      cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(cv);

    const draw = (t) => {
      energyRef.current += (targetEnergyRef.current - energyRef.current) * 0.04;
      const energy = energyRef.current;
      ctx.clearRect(0, 0, W, H);

      const N = 20;
      const gap = 6;
      const base = 50;

      for (let i = 0; i < N; i++) {
        const y0 = base + i * gap;
        const f = i / N;

        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let px = 0; px <= W; px += 4) {
          const u = px / W;
          const env = Math.exp(-Math.pow((u - 0.68) / 0.24, 2));
          const w =
            Math.sin(px * 0.021 + t * 0.0006 + i * 0.33) +
            0.55 * Math.sin(px * 0.055 - t * 0.0010 + i * 0.6) +
            0.25 * Math.sin(px * 0.12 + t * 0.0017);
          ctx.lineTo(px, y0 - env * w * 22 * energy * (0.5 + f));
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fillStyle = '#08080a';
        ctx.fill();

        if (i === N - 1) {
          const g = ctx.createLinearGradient(0, 0, W, 0);
          g.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
          g.addColorStop(0.5, '#9a6bff');
          g.addColorStop(1, '#ffffff');
          ctx.shadowColor = '#6C31E3';
          ctx.shadowBlur = 8;
          ctx.strokeStyle = g;
        } else {
          ctx.shadowBlur = 0;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + f * 0.26})`;
        }

        ctx.lineWidth = i === N - 1 ? 1.3 : 0.8;
        ctx.beginPath();
        for (let px = 0; px <= W; px += 4) {
          const u = px / W;
          const env = Math.exp(-Math.pow((u - 0.68) / 0.24, 2));
          const w =
            Math.sin(px * 0.021 + t * 0.0006 + i * 0.33) +
            0.55 * Math.sin(px * 0.055 - t * 0.0010 + i * 0.6) +
            0.25 * Math.sin(px * 0.12 + t * 0.0017);
          const yy = y0 - env * w * 22 * energy * (0.5 + f);
          if (px === 0) {
            ctx.moveTo(px, yy);
          } else {
            ctx.lineTo(px, yy);
          }
        }
        ctx.stroke();
      }

      if (!reduceMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isOpen]);

  const logoBtnRef = useRef(null);

  // Eye & Face tracking micro-animation for character logo
  useEffect(() => {
    const P = { x: window.innerWidth / 2, y: window.innerHeight / 2, t: -1e9 };
    const handlePointerMove = (e) => {
      P.x = e.clientX;
      P.y = e.clientY;
      P.t = performance.now();
    };
    window.addEventListener('pointermove', handlePointerMove);

    let wd = { x: 0, y: 0, next: 0 };
    let animId = 0;

    const loop = (now) => {
      const eyeEls = document.querySelectorAll('.chatbot-toggle .eye');
      const faceEls = document.querySelectorAll('.chatbot-toggle .face');

      if (now > wd.next) {
        wd = {
          x: Math.random() * 2 - 1,
          y: Math.random() * 1.2 - 0.6,
          next: now + 1500 + Math.random() * 2000,
        };
      }
      const idle = now - P.t > 3000;

      eyeEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0) return;
        const k = r.width * 0.19;
        const dx = P.x - (r.left + r.width / 2);
        const dy = P.y - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        let tx, ty, ts;
        if (idle) {
          tx = wd.x * k;
          ty = wd.y * k;
          ts = 1;
        } else {
          const m = Math.min(1, d / (r.width * 3));
          tx = (dx / d) * k * m;
          ty = (dy / d) * k * m;
          ts = 1 + 0.28 * (1 - Math.min(1, d / (r.width * 9)));
        }

        const prevX = parseFloat(el.dataset.x || '0');
        const prevY = parseFloat(el.dataset.y || '0');
        const prevS = parseFloat(el.dataset.s || '1');

        const newX = prevX + (tx - prevX) * 0.13;
        const newY = prevY + (ty - prevY) * 0.13;
        const newS = prevS + (ts - prevS) * 0.1;

        el.dataset.x = newX;
        el.dataset.y = newY;
        el.dataset.s = newS;

        el.style.setProperty('--px', `${newX}px`);
        el.style.setProperty('--py', `${newY}px`);
        el.style.setProperty('--ps', newS);
      });

      faceEls.forEach((o) => {
        const r = o.getBoundingClientRect();
        if (r.width === 0) return;
        const w = r.width;
        const prevX = parseFloat(o.dataset.x || '0');
        const prevY = parseFloat(o.dataset.y || '0');
        const cx = r.left + w / 2 - prevX;
        const cy = r.top + w / 2 - prevY;
        const dx = idle ? 0 : P.x - cx;
        const dy = idle ? 0 : P.y - cy;
        const d = Math.hypot(dx, dy) || 1;
        const m = Math.min(d, 220) / 220;
        const newX = prevX + ((dx / d) * m * w * 0.05 - prevX) * 0.09;
        const newY = prevY + ((dy / d) * m * w * 0.05 - prevY) * 0.09;
        o.dataset.x = newX;
        o.dataset.y = newY;
        o.style.transform = `translate(${newX}px, ${newY}px)`;
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  // Adjust wave energy on typing state
  useEffect(() => {
    targetEnergyRef.current = isTyping ? 2.3 : 1.0;
  }, [isTyping]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  // Send message
  const handleSendMessage = useCallback(async (customQuery) => {
    const text = (customQuery !== undefined ? customQuery : inputText).trim();
    if (!text || isTyping) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        type: 'me',
        text,
        sources: null,
      },
    ]);

    setInputText('');
    setIsTyping(true);
    setShowChips(false);

    try {
      const apiUrl = getApiUrl();
      let response;
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: text,
            session_id: sessionId,
          }),
        });
      } catch (networkErr) {
        // Fallback for local development direct connection
        if (apiUrl === '/chat' && !import.meta.env?.PROD) {
          const fallbackUrl = `http://${window.location.hostname || 'localhost'}:8000/chat`;
          response = await fetch(fallbackUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              query: text,
              session_id: sessionId,
            }),
          });
        } else {
          throw networkErr;
        }
      }

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            type: 'bot',
            text: data?.detail || data?.message || "The AI service is temporarily busy because its API quota has been reached. Please try again shortly.",
            sources: null,
          },
        ]);
        return;
      }

      if (!response.ok) {
        throw new Error(data?.detail || data?.message || `Server returned HTTP ${response.status}`);
      }

      const answer = data?.answer || data?.response || data?.message || "Sorry, I couldn't generate an answer.";
      const sources = Array.isArray(data?.sources) && data.sources.length > 0 ? data.sources : null;

      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: answer,
          sources,
        },
      ]);
    } catch (error) {
      console.error('Chat API Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: error.message?.includes('Failed to fetch')
            ? "I can't connect to the chatbot backend right now. Please make sure the backend is running."
            : `Sorry, something went wrong: ${error.message}`,
          sources: null,
        },
      ]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [inputText, isTyping, sessionId]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div ref={chatbotRef} className="chatbot-container">
      {/* Floating Interactive Character Logo Launcher */}
      <button
        ref={logoBtnRef}
        className={`chatbot-toggle lg ${isOpen ? 'active-open' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat with Hammad's assistant" : "Chat with me"}
        type="button"
      >
        <span className="disc">
          <svg className="ring" viewBox="0 0 64 64" aria-hidden="true">
            <defs>
              <path
                id="chat-logo-ring-path"
                d="M32 32m-24.5 0a24.5 24.5 0 1 1 49 0a24.5 24.5 0 1 1-49 0"
              />
            </defs>
            <circle className="core" cx="32" cy="32" r="16.5" />
            <text>
              <textPath href="#chat-logo-ring-path" textLength="152" lengthAdjust="spacing">
                psst · ask me anything · I don't bite ·{' '}
              </textPath>
            </text>
          </svg>
          <span className="face">
            <i className="eye e1">
              <i className="pupil" />
            </i>
            <i className="eye e2">
              <i className="pupil" />
            </i>
            <i className="smirk" />
          </span>
        </span>
      </button>

      {/* Compact Chat Panel Window */}
      <section
        className={`chat-panel ${isOpen ? 'open' : ''}`}
        aria-label="Chat with Hammad's assistant"
      >
        {/* Layered Ridgeline Wave Signal Canvas */}
        <canvas ref={canvasRef} id="wave" className="chat-wave" />

        {/* Header */}
        <header className="chat-header">
          <div className="chat-top-row">
            <span className="chat-live">
              <i aria-hidden="true" />
              Online
            </span>
            <button
              className="chat-eyeball-btn"
              onClick={toggleChat}
              aria-label="Close chat"
              title="Close chat"
              type="button"
            >
              <div className="orb-rings" />
              <img
                src="/images/chatbot_orb.jpg"
                alt="AI Core"
                className="orb-image"
                draggable={false}
              />
            </button>
          </div>

          {/* Heading - Pure White Font as explicitly requested */}
          <h1 className="chat-title">
            Ask about
            <br />
            <em>Hammad.</em>
          </h1>
        </header>

        {/* Conversation Feed */}
        <div className="chat-feed" id="feed" aria-live="polite">
          {messages.map((message, index) => (
            <div
              key={`${message.type}-${index}`}
              className={`chat-msg ${message.type}`}
            >
              <div className="txt">
                {message.type === 'bot' ? (
                  <FormattedMessage text={message.text} />
                ) : (
                  message.text
                )}
              </div>
              {message.sources && (
                <div className="msg-sources">
                  <span>📂 Sources:</span> {message.sources.join(', ')}
                </div>
              )}
            </div>
          ))}

          {/* Sweeping Triple-Bar Typing Indicator */}
          {isTyping && (
            <div className="chat-msg bot">
              <div className="chat-typing">
                <b />
                <b />
                <b />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Chips */}
        {showChips && (
          <div className="chat-chips" id="chips">
            {QUICK_CHIPS.map((chipText) => (
              <button
                key={chipText}
                className="chat-chip"
                type="button"
                onClick={() => handleSendMessage(chipText)}
              >
                {chipText}
              </button>
            ))}
          </div>
        )}

        {/* Pill Input Form */}
        <form
          className="chat-form"
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            ref={inputRef}
            id="in"
            className="chat-input"
            type="text"
            placeholder="Write a message…"
            autoComplete="off"
            aria-label="Message"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <button
            className="chat-send-btn"
            type="submit"
            aria-label="Send message"
            disabled={isTyping || !inputText.trim()}
          >
            ↑
          </button>
        </form>
      </section>
    </div>
  );
}