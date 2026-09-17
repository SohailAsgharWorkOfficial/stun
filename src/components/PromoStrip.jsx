import React, { useState } from 'react';

export default function PromoStrip() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr 1.3fr 0.9fr',
        minHeight: '440px',
        borderTop: '1px solid #E5E5E5',
        borderBottom: '1px solid #E5E5E5',
        overflow: 'hidden'
      }}
      className="promo-strip-container"
    >
      {/* Panel 1: Coral Red with Product Tagline & Carousel Dots */}
      <div
        style={{
          backgroundColor: '#FF4D4D',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative'
        }}
        className="promo-panel"
      >
        <div style={{ marginBottom: '24px' }}>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.12em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#FFFFFF',
              margin: '0 0 6px 0'
            }}
          >
            STUN HOME CLEANING
          </p>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '11px',
              color: '#FFFFFF',
              opacity: 0.9,
              margin: 0
            }}
          >
            From $39.99
          </p>
        </div>

        {/* Carousel Pagination Dots */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {[0, 1, 2, 3].map((dot) => (
            <span
              key={dot}
              onClick={() => setActiveDot(dot)}
              style={{
                width: dot === activeDot ? '6px' : '5px',
                height: dot === activeDot ? '6px' : '5px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                opacity: dot === activeDot ? 1 : 0.35,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Panel 2: Clean Off-White / Cream */}
      <div
        style={{
          backgroundColor: '#FAF9F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
        className="promo-panel"
      >
        {/* Placeholder for optional upright bottle/product graphic */}
      </div>

      {/* Panel 3: Soft Mauve / Pink (SPARKLING CLEAN FLOORS) */}
      <div
        style={{
          backgroundColor: '#E591B2',
          padding: '40px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative'
        }}
        className="promo-panel"
      >
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 3.2vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            margin: 0,
            userSelect: 'none'
          }}
        >
          SPARKLING<br />
          CLEAN<br />
          FLOORS
        </h3>
      </div>

      {/* Panel 4: Coral Red (FRESH HOME. FRESH FEELING) */}
      <div
        style={{
          backgroundColor: '#FF4D4D',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative'
        }}
        className="promo-panel"
      >
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 3.2vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            margin: 0,
            userSelect: 'none'
          }}
        >
          FRESH<br />
          HOME.<br />
          FRESH<br />
          FEELING
        </h3>
      </div>

      {/* Responsive Stacking */}
      <style>{`
        @media (max-width: 900px) {
          .promo-strip-container {
            grid-template-columns: 1fr 1fr !important;
          }
          .promo-panel {
            min-height: 260px !important;
          }
        }
        @media (max-width: 550px) {
          .promo-strip-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}