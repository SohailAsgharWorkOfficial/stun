import React, { useState } from 'react';

const REVIEWS = [
  {
    id: 1,
    title: 'FRESHER FLOORS, EVERY DAY',
    quote:
      '"I was amazed at how quickly Stun lifted everyday dirt and grime. My floors look noticeably cleaner and fresher after every use."',
    name: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80'
  },
  {
    id: 2,
    title: 'FINALLY, A CLEANER THAT WORKS',
    quote:
      '"I\'ve tried so many floor cleaners, but Stun actually delivers. It cuts through tough messes without leaving a sticky residue."',
    name: 'James K.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80'
  },
  {
    id: 3,
    title: 'GREAT CLEAN, GREAT RESULTS',
    quote:
      '"Stun makes cleaning so much easier. It leaves my floors spotless, fresh, and looking like new."',
    name: 'Anna W.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'
  },
  {
    id: 4,
    title: 'MY NEW CLEANING ROUTINE',
    quote:
      '"I use Stun every week and absolutely love the results. The floors feel fresh, clean, and beautifully maintained."',
    name: 'Lisa B.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80'
  }
];

export default function CustomerReviews() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        padding: '90px 24px 70px',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#111111',
              margin: 0
            }}
          >
            JOIN 10,000+<br />
            HAPPY CUSTOMERS
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '20px',
            alignItems: 'stretch'
          }}
          className="reviews-grid"
        >
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              style={{
                backgroundColor: '#FAF8F5',
                borderRadius: '16px',
                padding: '32px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px',
                boxSizing: 'border-box'
              }}
            >
              {/* Top Text Content */}
              <div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#181818',
                    margin: '0 0 16px 0',
                    lineHeight: 1.35
                  }}
                >
                  {review.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '12px',
                    lineHeight: 1.6,
                    color: '#444444',
                    margin: 0,
                    fontWeight: 400
                  }}
                >
                  {review.quote}
                </p>
              </div>

              {/* Bottom Author Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '28px'
                }}
              >
                <img
                  src={review.avatar}
                  alt={review.name}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '11px',
                      color: '#444444',
                      margin: '0 0 2px 0'
                    }}
                  >
                    - {review.name}, verified customer
                  </p>
                  <div style={{ display: 'flex', gap: '3px', color: '#F59E0B' }}>
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i} style={{ fontSize: '13px', lineHeight: 1 }}>
                        {star}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '36px'
          }}
        >
          {[0, 1].map((dot) => (
            <span
              key={dot}
              onClick={() => setActiveDot(dot)}
              style={{
                width: dot === activeDot ? '6px' : '5px',
                height: dot === activeDot ? '6px' : '5px',
                borderRadius: '50%',
                backgroundColor: dot === activeDot ? '#111111' : '#D1D5DB',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .reviews-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 620px) {
          .reviews-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}