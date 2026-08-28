import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import HorizontalProjects from './components/HorizontalProjects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import MarqueeTicker from './components/MarqueeTicker';
import ChatWidget from './components/ChatWidget';

export default function App() {
  return (
    <div className="portfolio-app" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Global Ambient Glass Lights & Optical Background Nodes */}
      <div
        className="ambient-glass-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '20%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '35%',
            right: '-5%',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.015) 50%, transparent 75%)',
            filter: 'blur(120px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '65%',
            left: '-10%',
            width: '650px',
            height: '650px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)',
            filter: 'blur(110px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-5%',
            right: '25%',
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.11) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)',
            filter: 'blur(90px)'
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <main>
          <Hero />

          {/* Neoconda Infinite Tech Stack Marquee */}
          <MarqueeTicker />

          <ScrollReveal>
            <About />
          </ScrollReveal>

          {/* Mandatory 3D Horizontal Scroll-Pinned Projects Section */}
          <HorizontalProjects />

          <ScrollReveal>
            <Skills />
          </ScrollReveal>
          <ScrollReveal>
            <Certifications />
          </ScrollReveal>
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </div>
  );
}
