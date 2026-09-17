import React, { useState } from 'react';
import waterHero from '../assets/water-hero.png';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '340px',
        backgroundImage: `url(${waterHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        borderTop: '1px solid #E5E7EB',
        borderBottom: '1px solid #E5E7EB'
      }}
      className="newsletter-banner"
    >
      {/* Soft Water Cyan Ambient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(160, 215, 250, 0.25) 0%, rgba(130, 195, 240, 0.35) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Frosted Glass Floating Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '740px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderRadius: '16px',
          padding: '44px 36px',
          textAlign: 'center',
          boxShadow: '0 16px 40px rgba(45, 110, 160, 0.12)',
          boxSizing: 'border-box'
        }}
        className="newsletter-card"
      >
        {/* Main Headline */}
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.5rem, 2.8vw, 2.3rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#111111',
            margin: '0 0 12px 0'
          }}
        >
          CLEAN FLOORS. HAPPY HOMES.
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '12px',
            color: '#4B5563',
            lineHeight: 1.5,
            margin: '0 0 24px 0',
            fontWeight: 500
          }}
        >
          Be the first to discover cleaning tips, product updates, and exclusive offers from Stun.
        </p>

        {/* Form */}
        {subscribed ? (
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '12px',
              fontWeight: 700,
              color: '#059669',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: '12px 0 0 0'
            }}
          >
            Thank you for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              border: '1px solid #111111',
              padding: '3px',
              maxWidth: '460px',
              margin: '0 auto',
              boxSizing: 'border-box'
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '10px 16px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '12.5px',
                color: '#111111',
                backgroundColor: 'transparent'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#111111',
                color: '#FFFFFF',
                border: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '11px 22px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2E2E2E')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111111')}
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .newsletter-card {
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}