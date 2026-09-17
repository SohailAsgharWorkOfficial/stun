import React from 'react';
import { Link } from 'react-router-dom';

export default function KeepFloorsClean() {
  return (
    <section
      style={{
        backgroundColor: '#DCDCDC',
        width: '100%',
        minHeight: '480px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px',
        textAlign: 'center',
        boxSizing: 'border-box',
        borderTop: '1px solid #CECECE',
        borderBottom: '1px solid #CECECE'
      }}
      className="keep-floors-clean-section"
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#444444',
            margin: '0 0 16px 0',
            fontWeight: 500
          }}
        >
          Smart floor cleaning solutions<br />
          designed for a cleaner, healthier home.
        </p>

        {/* Main Bold Headline */}
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: '#222222',
            margin: '0 0 32px 0'
          }}
        >
          KEEP FLOORS CLEAN.<br />
          KEEP LIFE SIMPLE.
        </h2>

        {/* Outlined Pill CTA Button */}
        <div>
          <Link
            to="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              color: '#111111',
              border: '1.5px solid #111111',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '12px 32px',
              borderRadius: '9999px',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#111111';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#111111';
            }}
          >
            OUR MISSION
          </Link>
        </div>
      </div>
    </section>
  );
}