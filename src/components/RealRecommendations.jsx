import React, { useState } from 'react';
import { Play, Volume2 } from 'lucide-react';

const REELS_DATA = [
  {
    id: 1,
    videoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    productName: 'Stun floor cleaner',
    price: '$29.99'
  },
  { id: 2, videoUrl: '', productName: 'Stun multi-surface', price: '$24.99' },
  { id: 3, videoUrl: '', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 4, videoUrl: '', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 5, videoUrl: '', productName: 'Stun bathroom care', price: '$19.99' },
  { id: 6, videoUrl: '', productName: 'Stun floor cleaner', price: '$29.99' }
];

const TICKER_ITEMS = [
  'POWERFUL CLEANING',
  'FRESH FRAGRANCE',
  'MADE FOR EVERYDAY USE',
  'MULTI-SURFACE SOLUTIONS',
  'TOUGH ON DIRT & GRIME',
  'MADE FOR YOUR HOME',
  'EASY TO USE',
  'A CLEANER HOME, EVERY DAY'
];

export default function RealRecommendations() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section
      style={{
        backgroundColor: '#FAF8F5',
        paddingTop: '64px',
        paddingBottom: '24px',
        overflow: 'hidden',
        borderBottom: '1px solid #E5E5E5'
      }}
    >
      {/* 1. SECTION TITLE */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#111111',
            margin: 0
          }}
        >
          REAL STORES, REAL RECOMMENDATIONS!
        </h2>
      </div>

      {/* 2. UGC REELS CAROUSEL */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          padding: '0 32px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
        className="reels-track"
      >
        {REELS_DATA.map((reel, index) => {
          const isActive = index === 0; // First item styled as the active reel from screenshot

          return (
            <div
              key={reel.id}
              style={{
                flex: '0 0 200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Vertical Reel Card */}
              <div
                style={{
                  width: '100%',
                  height: '320px',
                  borderRadius: '12px',
                  backgroundColor: '#DCDCDC',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isActive ? '0 6px 16px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                {reel.videoUrl ? (
                  <>
                    <img
                      src={reel.videoUrl}
                      alt="Customer Reel"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    {/* Top Left Play Icon */}
                    <button
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(0, 0, 0, 0.45)',
                        border: 'none',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Play size={14} fill="#FFFFFF" />
                    </button>

                    {/* Bottom Right Mute/Sound Icon */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        color: '#FFFFFF',
                        opacity: 0.85
                      }}
                    >
                      <Volume2 size={16} />
                    </div>
                  </>
                ) : null}
              </div>

              {/* Bottom Attached Product Box for Active Reel */}
              {isActive && (
                <div
                  style={{
                    width: '100%',
                    backgroundColor: '#FAF8F5',
                    border: '1px solid #111111',
                    borderRadius: '8px',
                    padding: '12px 10px',
                    marginTop: '10px',
                    textAlign: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#111111',
                      margin: '0 0 4px 0'
                    }}
                  >
                    {reel.productName}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '11px',
                      color: '#222222',
                      margin: 0
                    }}
                  >
                    {reel.price}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. PAGINATION DOTS */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginTop: '28px',
          marginBottom: '42px'
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            onClick={() => setActiveDot(dot)}
            style={{
              width: dot === activeDot ? '6px' : '5px',
              height: dot === activeDot ? '6px' : '5px',
              borderRadius: '50%',
              backgroundColor: dot === activeDot ? '#111111' : '#CCCCCC',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          />
        ))}
      </div>

      {/* 4. RUNNING TEXT TICKER AT THE BOTTOM */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          borderTop: '1px solid #ECEAE5',
          paddingTop: '16px'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 24px',
            gap: '24px'
          }}
          className="ticker-container"
        >
          {TICKER_ITEMS.map((text, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '9px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#222222',
                userSelect: 'none'
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .reels-track::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 900px) {
          .reels-track {
            justify-content: flex-start !important;
          }
          .ticker-container {
            gap: 16px !important;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}