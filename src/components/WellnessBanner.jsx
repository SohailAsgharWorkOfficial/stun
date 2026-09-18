import React from 'react';
import { Link } from 'react-router-dom';

export default function WellnessBanner({
  imageSrc = '/wellness.png',
  title = 'YOUR WELLNESS, OUR PRIORITY',
  buttonText = 'BUILD BUNDLE',
  buttonLink = '/shop'
}) {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '84vh',
        minHeight: '520px',
        maxHeight: '780px',
        backgroundImage: `url("${imageSrc}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
      className="wellness-banner-section"
    >
      {/* Soft Ambient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.08)',
          zIndex: 1
        }}
      />

      {/* Main Stack: Marquee Line on Top + Button Below */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px' // Marquee aur Button ke beech ka exact gap
        }}
      >
        {/* 1. INFINITE HORIZONTAL MARQUEE TRACK (Upper Row) */}
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex',
            userSelect: 'none'
          }}
        >
          <div className="marquee-content">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="marquee-item">
                {title}
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <span key={`clone-${i}`} className="marquee-item">
                {title}
              </span>
            ))}
          </div>
        </div>

        {/* 2. BUTTON LOCATED DIRECTLY UNDER MARQUEE (Lower Row) */}
        <div>
          <Link
            to={buttonLink}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '9.5px',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '8px 24px',
              borderRadius: '4px',
              border: '1px solid #111111',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#000000';
            }}
          >
            {buttonText}
          </Link>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .marquee-content {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          animation: marqueeScroll 60s linear infinite;
        }

        .marquee-item {
          font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(2.8rem, 7vw, 6rem);
          font-weight: 800;
          letterSpacing: 0.04em;
          text-transform: uppercase;
          color: #FFFFFF;
          line-height: 1.05;
          margin: 0;
          padding: 0 45px;
          text-shadow: 0 3px 25px rgba(0, 0, 0, 0.25);
          white-space: nowrap;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
}