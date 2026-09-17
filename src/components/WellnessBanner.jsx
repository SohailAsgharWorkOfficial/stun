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
        height: '82vh',
        minHeight: '520px',
        maxHeight: '760px',
        backgroundImage: `url("${imageSrc}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 45%',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
      className="wellness-banner-section"
    >
      {/* Soft Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.08)'
        }}
      />

      {/* Content Layer (Single Line Text + Centered Button) */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          textAlign: 'center'
        }}
      >
        {/* Exact Bold Headline */}
        <h2
          style={{
            fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 'clamp(2.4rem, 6.5vw, 5.8rem)',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            lineHeight: 1,
            margin: 0,
            whiteSpace: 'nowrap',
            textShadow: '0 3px 20px rgba(0, 0, 0, 0.22)',
            userSelect: 'none'
          }}
          className="wellness-title"
        >
          {title}
        </h2>

        {/* Exact Compact Rounded Rectangle Button */}
        <div style={{ marginTop: '20px' }}>
          <Link
            to={buttonLink}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '8px 22px',
              borderRadius: '4px',
              border: '1px solid #000000',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
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

      <style>{`
        @media (max-width: 768px) {
          .wellness-title {
            white-space: normal !important;
            font-size: 2.2rem !important;
            line-height: 1.15 !important;
          }
        }
      `}</style>
    </section>
  );
}