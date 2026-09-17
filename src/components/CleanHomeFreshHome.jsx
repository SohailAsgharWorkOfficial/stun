import React from 'react';

export default function CleanHomeFreshHome({ centerImage = '' }) {
  return (
    <section
      style={{
        backgroundColor: '#FAF8F5',
        padding: '80px 40px',
        color: '#111111',
        overflow: 'hidden'
      }}
      className="clean-fresh-section"
    >
      {/* 1. TOP TITLE */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', -apple-system, sans-serif",
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#111111',
            margin: 0
          }}
        >
          CLEAN HOME. FRESH HOME.
        </h2>
      </div>

      {/* 2. THREE COLUMN GRID */}
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.35fr 1fr',
          gap: '40px',
          alignItems: 'center'
        }}
        className="clean-fresh-grid"
      >
        {/* LEFT COLUMN: 3 FEATURES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {/* Item 1 */}
          <div style={featureItemStyle}>
            <div style={iconCircleStyle}>
              {/* Flask / Safe icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                <path d="M10 2v5.5L5 18a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 18l-5-10.5V2" />
                <path d="M8 2h8" />
                <path d="M7 16h10" />
              </svg>
            </div>
            <h3 style={featureTitleStyle}>SAFE FOR EVERYDAY CLEANING</h3>
            <p style={featureDescStyle}>
              Carefully formulated for regular household cleaning, helping keep your home fresh and hygienic.
            </p>
          </div>

          {/* Item 2 */}
          <div style={featureItemStyle}>
            <div style={iconCircleStyle}>
              {/* Science / Molecule icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                <path d="M14.5 4.5l-5 5m0-5l5 5M4.5 14.5l5 5m-5 0l5-5" />
                <circle cx="12" cy="12" r="3" />
                <path d="M2 12h3m14 0h3M12 2v3m0 14v3" />
              </svg>
            </div>
            <h3 style={featureTitleStyle}>POWERFUL CLEANING</h3>
            <p style={featureDescStyle}>
              Cuts through everyday dirt, dust, grease, and grime for visibly cleaner floors and surfaces.
            </p>
          </div>

          {/* Item 3 */}
          <div style={featureItemStyle}>
            <div style={iconCircleStyle}>
              {/* Leaves / Nature icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                <path d="M11 20A7 7 0 0 1 4 13a9 9 0 0 1 15-6 9 9 0 0 1-5 13H11z" />
                <path d="M11 20v-8a4 4 0 0 1 4-4" />
              </svg>
            </div>
            <h3 style={featureTitleStyle}>FRESH & LONG-LASTING</h3>
            <p style={featureDescStyle}>
              Leaves behind a pleasant, refreshing fragrance that helps your home feel clean and inviting.
            </p>
          </div>
        </div>

        {/* CENTER COLUMN: SHOWCASE DISPLAY CONTAINER */}
        <div
          style={{
            backgroundColor: '#D6D6D6',
            borderRadius: '16px',
            minHeight: '520px',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
          className="center-showcase-box"
        >
          {centerImage ? (
            <img
              src={centerImage}
              alt="Clean Home Fresh Home Showcase"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : null}
        </div>

        {/* RIGHT COLUMN: 3 FEATURES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {/* Item 4 */}
          <div style={featureItemStyle}>
            <div style={iconCircleStyle}>
              {/* Award / Tough on dirt icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <h3 style={featureTitleStyle}>TOUGH ON DIRT</h3>
            <p style={featureDescStyle}>
              Designed to tackle stubborn stains and everyday messes without making cleaning a chore.
            </p>
          </div>

          {/* Item 5 */}
          <div style={featureItemStyle}>
            <div style={iconCircleStyle}>
              {/* Microscope / Precision icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                <path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1" />
                <path d="M9 14h2M9 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2" />
                <path d="M12 6V3" />
              </svg>
            </div>
            <h3 style={featureTitleStyle}>FOR EVERY ROOM</h3>
            <p style={featureDescStyle}>
              Ideal for floors, kitchens, bathrooms, living spaces, and other commonly cleaned areas around your home.
            </p>
          </div>

          {/* Item 6 */}
          <div style={featureItemStyle}>
            <div style={iconCircleStyle}>
              {/* Spray Bottle / Easy to use icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                <path d="M10 8V5a2 2 0 0 1 2-2h3M10 8h5l2 4v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8l2-4" />
                <path d="M7 12h10M10 5l-4 3" />
              </svg>
            </div>
            <h3 style={featureTitleStyle}>EASY TO USE</h3>
            <p style={featureDescStyle}>
              Simply dilute or use as directed on the label for convenient, effective everyday cleaning.
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Viewport Rules */}
      <style>{`
        @media (max-width: 1024px) {
          .clean-fresh-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .center-showcase-box {
            order: -1;
            min-height: 380px !important;
          }
        }
        @media (max-width: 600px) {
          .clean-fresh-section {
            padding: 50px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}

const featureItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '0 12px'
};

const iconCircleStyle = {
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  border: '1.5px solid #111111',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px'
};

const featureTitleStyle = {
  fontFamily: "'Space Grotesk', -apple-system, sans-serif",
  fontSize: '13px',
  fontWeight: 800,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#111111',
  margin: '0 0 10px 0'
};

const featureDescStyle = {
  fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
  fontSize: '11px',
  lineHeight: 1.65,
  color: '#444444',
  margin: 0,
  maxWidth: '260px'
};