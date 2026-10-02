import React, { useEffect, useRef } from 'react';
import './HeroEditorial.css';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { personal } = portfolioData;

  const heroRef = useRef(null);
  const wrapRef = useRef(null);
  const starsRef = useRef(null);
  const glRef = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = heroRef.current;
    const cv = glRef.current;
    const sc = starsRef.current;
    if (!hero || !cv || !sc) return;

    const M = { x: 0.5, y: 0.5, px: -999, py: -999 };
    const D = Math.min(window.devicePixelRatio || 1, 2);

    let burst = 0;
    let isNarrow = false;
    let R = null;
    let animId = 0;
    let lastTime = performance.now();
    let totalTime = 0;

    // --- Pointer Tracking ---
    const handlePointerMove = (e) => {
      M.px = e.clientX;
      M.py = e.clientY;
      const r = cv.getBoundingClientRect();
      M.x = (e.clientX - r.left) / (r.width || 1);
      M.y = (e.clientY - r.top) / (r.height || 1);
    };
    window.addEventListener('pointermove', handlePointerMove);

    // Click to take apart / burst 3D object
    const handleHeroClick = (e) => {
      if (!e.target.closest('a') && !e.target.closest('button')) {
        burst = burst ? 0 : 2.4;
      }
    };
    hero.addEventListener('click', handleHeroClick);

    // --- Canvas Starfield & Shooting Meteors ---
    const sg = sc.getContext('2d');
    let SW = hero.clientWidth || window.innerWidth;
    let SH = hero.clientHeight || window.innerHeight;
    let starsArr = [];
    let shootingStar = null;
    let nextMeteorTimer = 4;

    const initStars = () => {
      if (!hero || !sc || !sg) return;
      SW = window.innerWidth;
      SH = window.innerHeight;
      sc.width = SW * D;
      sc.height = SH * D;
      sg.setTransform(D, 0, 0, D, 0, 0);

      const starCount = Math.round((SW * SH) / 4200);
      starsArr = Array.from({ length: starCount }, () => ({
        x: Math.random() * SW,
        y: Math.random() * SH,
        z: 0.2 + Math.random() * 0.8,
        p: Math.random() * 6.28,
        s: 0.5 + Math.random() * 1.5,
        b: Math.random() > 0.9,
      }));
    };

    const renderStars = (t, dt) => {
      if (!sg) return;
      sg.clearRect(0, 0, SW, SH);

      starsArr.forEach((s) => {
        const x = s.x + (M.x - 0.5) * s.z * -26;
        const y = ((s.y - window.scrollY * s.z * 0.22) % SH + SH) % SH;
        const twinkle = isReduced ? 0.8 : 0.65 + 0.35 * Math.sin(t * s.s + s.p);
        const alpha = (0.18 + 0.6 * s.z) * twinkle;

        sg.fillStyle = s.b
          ? `rgba(196,167,122,${alpha})`
          : `rgba(236,230,218,${alpha})`;
        sg.beginPath();
        sg.arc(x, y, 0.35 + s.z * 0.9, 0, Math.PI * 2);
        sg.fill();

        // 4-point cross sparkle for prominent foreground stars
        if (s.z > 0.93) {
          sg.strokeStyle = `rgba(236,230,218,${alpha * 0.6})`;
          sg.lineWidth = 0.6;
          sg.beginPath();
          sg.moveTo(x - 5, y);
          sg.lineTo(x + 5, y);
          sg.moveTo(x, y - 5);
          sg.lineTo(x, y + 5);
          sg.stroke();
        }
      });

      if (isReduced) return;

      // Shooting Meteor
      nextMeteorTimer -= dt;
      if (nextMeteorTimer < 0 && !shootingStar) {
        nextMeteorTimer = 6 + Math.random() * 7;
        shootingStar = {
          x: SW * (0.4 + Math.random() * 0.6),
          y: Math.random() * SH * 0.4,
          life: 1,
        };
      }

      if (shootingStar) {
        shootingStar.x -= dt * 620;
        shootingStar.y += dt * 300;
        shootingStar.life -= dt * 0.9;
        const grad = sg.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x + 110,
          shootingStar.y - 53
        );
        grad.addColorStop(0, `rgba(236,230,218,${Math.max(0, shootingStar.life)})`);
        grad.addColorStop(1, 'rgba(236,230,218,0)');
        sg.strokeStyle = grad;
        sg.lineWidth = 1.4;
        sg.beginPath();
        sg.moveTo(shootingStar.x, shootingStar.y);
        sg.lineTo(shootingStar.x + 110, shootingStar.y - 53);
        sg.stroke();
        if (shootingStar.life <= 0) shootingStar = null;
      }
    };

    // --- Three.js 3D Exploded Polyhedron ---
    const THREE = window.THREE;
    if (THREE) {
      try {
        const ren = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
        ren.setPixelRatio(D);
        const scene = new THREE.Scene();
        const cam = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        cam.position.z = 9;

        scene.add(new THREE.AmbientLight(0xffffff, 0.28));
        const kl = new THREE.DirectionalLight(0xffffff, 1.6);
        kl.position.set(-4, 5, 6);
        scene.add(kl);
        const rl = new THREE.DirectionalLight(0xffffff, 1.8);
        rl.position.set(5, -2, -4);
        scene.add(rl);
        const pl = new THREE.PointLight(0xffffff, 1.5, 16);
        pl.position.set(0, 0, 4);
        scene.add(pl);

        const root = new THREE.Group();
        const group = new THREE.Group();
        root.add(group);
        scene.add(root);

        const mat = new THREE.MeshStandardMaterial({
          color: 0x0a0a0a,
          metalness: 0.8,
          roughness: 0.3,
          flatShading: true,
          side: THREE.DoubleSide,
        });

        const g = new THREE.IcosahedronGeometry(2, 1).toNonIndexed();
        const pa = g.attributes.position;
        const F = [];

        for (let i = 0; i < pa.count; i += 3) {
          const a = new THREE.Vector3().fromBufferAttribute(pa, i);
          const b = new THREE.Vector3().fromBufferAttribute(pa, i + 1);
          const c = new THREE.Vector3().fromBufferAttribute(pa, i + 2);
          const ct = a.clone().add(b).add(c).divideScalar(3);

          const fg = new THREE.BufferGeometry().setFromPoints([
            a.sub(ct),
            b.sub(ct),
            c.sub(ct),
          ]);
          fg.computeVertexNormals();

          const lm = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.35,
          });
          const o = new THREE.Group();
          o.add(new THREE.Mesh(fg, mat), new THREE.LineLoop(fg, lm));
          o.scale.setScalar(0.96);
          o.position.copy(ct);
          group.add(o);

          F.push({
            o,
            c: ct.clone(),
            d: ct.clone().normalize(),
            r: Math.random(),
            r2: Math.random(),
            lm,
            k: 0,
          });
        }

        R = { ren, scene, cam, root, group, F, pl, V: new THREE.Vector3() };
      } catch (err) {
        console.warn('Three.js initialization skipped:', err);
      }
    }

    const handleResize = () => {
      if (!hero) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      isNarrow = w / h < 1.15;
      initStars();
      if (!R) return;
      R.ren.setSize(w, h, false);
      R.cam.aspect = w / h;
      R.cam.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let EX = isReduced ? 0 : 3.4;
    let targetX = isNarrow ? 0 : 2.3;
    let targetY = isNarrow ? 1.3 : 0;
    let targetScale = isNarrow ? 0.74 : 1.08;

    // --- Main Animation Frame Loop ---
    const frameLoop = (timestamp) => {
      const dt = Math.min(0.05, (timestamp - lastTime) / 1000);
      lastTime = timestamp;
      totalTime += dt;

      // Hero scroll follow-through till About section
      let opacity = 1;
      const aboutEl = document.getElementById('about');
      const vh = window.innerHeight || 800;

      if (aboutEl) {
        const ar = aboutEl.getBoundingClientRect();
        // ar.top is distance from top of viewport to top of About section
        // When in Hero or entering About: ar.top >= 0 -> fully visible
        // When user scrolls into About: stays visible past headline and fades gently
        if (ar.top >= 0) {
          opacity = 1;
        } else if (ar.top > -vh * 0.75) {
          opacity = Math.max(0, 1 - (-ar.top) / (vh * 0.75));
        } else {
          opacity = 0;
        }

        if (wrapRef.current) {
          wrapRef.current.style.opacity = opacity;
        }
      }

      if (opacity > 0.01) {
        renderStars(totalTime, dt);
      }

      if (R && opacity > 0.01) {
        const k = isReduced ? 1 : 1 - Math.exp(-dt * 3);
        const scrollProg = Math.max(0, window.scrollY / vh);
        const Q = Math.min(1.4, scrollProg);

        EX += (Math.max(burst, Math.min(1, Q * 1.3) * 1.8) * (isNarrow ? 0.6 : 1) - EX) * k;
        targetX += ((isNarrow ? 0 : 2.3 - Q * 0.8) - targetX) * k;
        targetY += ((isNarrow ? 1.3 - Q * 0.9 : -Q * 2.2) - targetY) * k;
        targetScale += ((isNarrow ? 0.74 : 1.08 - Q * 0.15) - targetScale) * k;

        const { root, group, F, pl, V, cam, ren, scene } = R;

        root.position.set(targetX, targetY, 0);
        root.scale.setScalar(targetScale);

        if (!isReduced) group.rotation.y += dt * (0.14 + EX * 0.06);
        root.rotation.x += ((M.y - 0.5) * 0.55 - root.rotation.x) * Math.min(1, dt * 4);
        root.rotation.y += ((M.x - 0.5) * 0.5 - root.rotation.y) * Math.min(1, dt * 4);
        pl.position.set((M.x - 0.5) * 9, (0.5 - M.y) * 5, 3.5);
        root.updateMatrixWorld(true);

        F.forEach((f) => {
          const o = f.o;
          o.position.copy(f.c).addScaledVector(f.d, EX * (0.6 + f.r) * 1.3);
          o.rotation.set(f.r * EX * 0.9, f.r2 * EX * 0.9, 0);

          V.copy(o.position).applyMatrix4(group.matrixWorld).project(cam);
          const d = Math.hypot(
            (V.x * 0.5 + 0.5) * window.innerWidth - M.px,
            (-V.y * 0.5 + 0.5) * window.innerHeight - M.py
          );
          const t = isReduced ? 0 : Math.max(0, 1 - d / 150);
          f.k += (t - f.k) * 0.15;
          o.position.addScaledVector(f.d, f.k * 0.55);
          f.lm.opacity = 0.3 + f.k * 0.7;
        });

        ren.render(scene, cam);
      }

      animId = requestAnimationFrame(frameLoop);
    };

    animId = requestAnimationFrame(frameLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      hero.removeEventListener('click', handleHeroClick);
      if (R?.ren) {
        R.ren.dispose();
      }
    };
  }, []);

  return (
    <section id="overview" className="hero-editorial-section" ref={heroRef}>
      {/* Background Canvases */}
      <div className="hero-canvas-wrap" ref={wrapRef}>
        <canvas ref={starsRef} className="hero-stars-canvas" aria-hidden="true"></canvas>
        <canvas ref={glRef} className="hero-gl-canvas" aria-hidden="true"></canvas>
      </div>

      {/* Main Hero Copy Container */}
      <div className="hero-wrap hero-copy-block">
        <h1 className="hero-editorial-h1" aria-label="Muhammad Hammad Imran">
          <span className="hero-ln" aria-hidden="true">
            <span>Muhammad</span>
          </span>
          <span className="hero-ln" aria-hidden="true">
            <span>Hammad Imran</span>
          </span>
        </h1>

        <p className="hero-role-title hero-fade-in">
          Software engineer building AI-powered apps and full-stack web experiences.
        </p>

        <p className="hero-sub-title hero-fade-in">
          Software Engineering student at Iqra University.
        </p>
      </div>

      {/* Bottom Status / Tip Bar */}
      <div className="hero-wrap hero-foot-row hero-fade-in">
        <div className="hero-tip">
          Click or tap the object to take it apart
        </div>
      </div>
    </section>
  );
}
