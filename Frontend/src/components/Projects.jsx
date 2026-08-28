import React, { useRef, useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import ProjectCard from './ProjectCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Projects() {
  const { projects } = portfolioData;
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <section id="projects" className="section" style={{ overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header with Custom Arrows */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '52px',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div className="editorial-badge" style={{ marginBottom: '8px' }}>
              <span className="editorial-line"></span>
              <span className="label-caps">02 / FEATURED WORKS ({projects.length})</span>
            </div>
            <h2 className="section-editorial-title" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              <strong>CASE STUDIES & <span className="text-accent">WORKING SYSTEMS</span>.</strong>
            </h2>
            <p className="body-large" style={{ marginTop: '6px', maxWidth: '580px' }}>
              Scroll, swipe, or use keyboard to explore the 3D cover flow of AI integration, web apps, and OOP systems.
            </p>
          </div>

          {/* Smooth Side-Scroll Arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 700 }}>
              0{activeIndex + 1} / 0{projects.length}
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="custom-swiper-prev"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous Slide"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                className="custom-swiper-next"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next Slide"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Swiper Coverflow Track with Mousewheel Control */}
        <div style={{ margin: '0 -24px', padding: '0 24px', paddingBottom: '40px' }}>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            initialSlide={0} // Start on the 1st slide as requested
            coverflowEffect={{
              rotate: 35,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            mousewheel={{
              forceToAxis: true, // Scroll vertically to slide horizontally
              releaseOnEdges: true, // Allow page scroll when reaching the start or end
              sensitivity: 1, // Scroll sensitivity
            }}
            keyboard={{
              enabled: true,
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            modules={[EffectCoverflow, Pagination, Mousewheel, Keyboard]}
            className="projects-swiper"
          >
            {projects.map((project) => (
              <SwiperSlide
                key={project.id}
                style={{
                  width: '320px',
                  maxWidth: '320px',
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))'
                }}
              >
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Global overrides for Swiper styling to match monochromatic theme */}
      <style>{`
        .projects-swiper {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 50px;
        }
        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 320px;
        }
        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          border-radius: 14px;
          background-image: linear-gradient(to right, rgba(8, 8, 10, 0.8), rgba(8, 8, 10, 0)) !important;
        }
        .swiper-slide-shadow-right {
          background-image: linear-gradient(to left, rgba(8, 8, 10, 0.8), rgba(8, 8, 10, 0)) !important;
        }
        .swiper-pagination-bullet {
          background: var(--color-border);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #FFFFFF;
        }
      `}</style>
    </section>
  );
}
