import React, { useEffect, useRef } from 'react';
import './CursorGlow.css';

/**
 * Continuous Smooth Glowing Trail Cursor
 * Singular, dense, organic blue spotlight with inertial lag and velocity squash-and-stretch.
 */
export default function CursorGlow() {
  const containerRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const NUM_LAYERS = 3;
    
    // Track mouse and cursor position
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    const positions = [];
    // Cloud layers trail behind progressively slower
    const lerpSpeeds = [0.25, 0.15, 0.08]; 
    
    for (let i = 0; i < NUM_LAYERS; i++) {
      positions.push({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    
    let isHovering = false;
    let isVisible = false;
    let idleTimeout = null;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      if (!isVisible) {
        isVisible = true;
        // Snap positions when first starting to move after being hidden
        for (let i = 0; i < NUM_LAYERS; i++) {
          positions[i].x = mouse.x;
          positions[i].y = mouse.y;
        }
      }
      
      container.style.opacity = '1';

      // Reset idle timer whenever cursor moves
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        container.style.opacity = '0';
        isVisible = false;
      }, 250); // Fades out 250ms after stopping
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button';
      
      if (isInteractive) {
        isHovering = true;
        container.classList.add('hover');
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button';
      
      if (isInteractive) {
        isHovering = false;
        container.classList.remove('hover');
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      container.style.opacity = '0';
      if (idleTimeout) clearTimeout(idleTimeout);
    };
    
    const onMouseEnter = () => {
      isVisible = true;
      container.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId;

    const render = () => {
      const baseScale = isHovering ? 1.5 : 1.0;

      // Update each layer
      for (let i = 0; i < NUM_LAYERS; i++) {
        const pos = positions[i];
        const dt = lerpSpeeds[i];
        
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        
        const el = layersRef.current[i];
        if (el) {
          // No rotation or squash-and-stretch, just pure position lag which naturally forms a cloud flow
          el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${baseScale})`;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (idleTimeout) clearTimeout(idleTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="cursor-glow"
      ref={containerRef}
      aria-hidden="true"
    >
      {/* Cloud layers (indices 0, 1, 2) */}
      {[0, 1, 2].map((i) => (
        <div 
          key={i}
          className="cursor-glow-inner" 
          ref={el => layersRef.current[i] = el}
        />
      ))}
    </div>
  );
}
