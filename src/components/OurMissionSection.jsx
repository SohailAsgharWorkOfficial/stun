import React from 'react';
import { Link } from 'react-router-dom';
import BigStunLogo from './BigStunLogo';

export default function OurMissionSection() {
  const points = [
    'Powerful cleaning for everyday messes.',
    'Tough on dirt, gentle on your floors.',
    'Fresh, spotless results with every use.'
  ];

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '520px',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        overflow: 'hidden'
      }}
      className="mission-split-container"
    >
      {/* LEFT PANEL: Light Grey Canvas with STUN Logo */}
      <div
        style={{
          flex: '0 0 50%',
          backgroundColor: '#DCDCDC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 40px',
          position: 'relative'
        }}
        className="mission-logo-panel"
      >
        <div style={{ maxWidth: '340px', width: '100%' }}>
          <BigStunLogo />
        </div>
      </div>

      {/* RIGHT PANEL: Clean White Editorial Content */}
      <div
        style={{
          flex: '0 0 50%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          boxSizing: 'border-box'
        }}
        className="mission-content-panel"
      >
        {/* Category Kicker */}
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#111111',
            marginBottom: '16px',
            display: 'block'
          }}
        >
          OUR MISSION
        </span>

        {/* Main Headline */}
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: '#111111',
            margin: '0 0 28px 0'
          }}
        >
          THERE’S A<br />
          CLEANER WAY TO<br />
          CLEAN.
        </h2>

        {/* Feature Checkpoints */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
          {points.map((text, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Circular Checkmark Icon */}
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '1.5px solid #111111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#111111" strokeWidth="2">
                  <polyline points="2.5 6 5 8.5 9.5 3.5" />
                </svg>
              </div>

              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '13px',
                  color: '#222222',
                  lineHeight: 1.4
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Read More Underline Link */}
        <div>
          <Link
            to="/about"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#111111',
              textDecoration: 'underline',
              textUnderlineOffset: '6px',
              display: 'inline-block',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            READ MORE
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .mission-split-container {
            flex-direction: column !important;
          }
          .mission-logo-panel, .mission-content-panel {
            flex: none !important;
            width: 100% !important;
            padding: 50px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}