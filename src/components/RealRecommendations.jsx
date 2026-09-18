import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const REELS_DATA = [
  { id: 1, youtubeId: '5BTH-FgLJAo', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 2, youtubeId: 'U7BTnQkJK8U', productName: 'Stun multi-surface', price: '$24.99' },
  { id: 3, youtubeId: '5BTH-FgLJAo', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 4, youtubeId: 'ItJ2fKXKEdo', productName: 'Stun bathroom care', price: '$19.99' },
  { id: 5, youtubeId: 'j3OJTedoNII', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 6, youtubeId: '5BTH-FgLJAo', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 7, youtubeId: '5BTH-FgLJAo', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 8, youtubeId: '5BTH-FgLJAo', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 9, youtubeId: '5BTH-FgLJAo', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 10, youtubeId: '5BTH-FgLJAo', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 11, youtubeId: '5BTH-FgLJAo', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 12, youtubeId: '5BTH-FgLJAo', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 13, youtubeId: '5BTH-FgLJAo', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 14, youtubeId: '5BTH-FgLJAo', productName: 'Stun floor cleaner', price: '$29.99' },
  { id: 15, youtubeId: 'SpAsUAe-zbY', productName: 'Stun multi-surface', price: '$24.99' }
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
  const [activeIndex, setActiveIndex] = useState(2);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const itemRefs = useRef([]);

  // Active playing card ko viewport ke LEFT par scroll karna
  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    const container = scrollContainerRef.current;

    if (activeItem && container) {
      // Left offset ke sath smooth scroll taake card screen ke left par cleanly place ho
      const targetScrollLeft = activeItem.offsetLeft - 36;
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  // YouTube IFrame API initialization & auto-next
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    let checkYTInterval = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(checkYTInterval);
        loadPlayer();
      }
    }, 150);

    const loadPlayer = () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }

      const activeReel = REELS_DATA[activeIndex];
      if (!activeReel) return;

      playerRef.current = new window.YT.Player('active-yt-player', {
        videoId: activeReel.youtubeId,
        playerVars: {
          autoplay: 1,
          mute: isMuted ? 1 : 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          loop: 0
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            setIsPlaying(true);
          },
          onStateChange: (event) => {
            if (event.data === 0) {
              setActiveIndex((prev) => (prev + 1) % REELS_DATA.length);
            }
          }
        }
      });
    };

    return () => {
      clearInterval(checkYTInterval);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [activeIndex]);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (playerRef.current && playerRef.current.isMuted) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (playerRef.current && playerRef.current.getPlayerState) {
      const state = playerRef.current.getPlayerState();
      if (state === 1) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section
      style={{
        backgroundColor: '#FAF8F5',
        paddingTop: '60px',
        paddingBottom: '20px',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        borderBottom: '1px solid #E5E5E5'
      }}
    >
      {/* 1. SECTION TITLE */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#111111',
            margin: 0
          }}
        >
          REAL STORES, REAL RECOMMENDATIONS!
        </h2>
      </div>

      {/* 2. LEFT-ALIGNED FULL-WIDTH CAROUSEL */}
      <div
        ref={scrollContainerRef}
        style={{
          width: '100%',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingBottom: '12px',
          scrollBehavior: 'smooth'
        }}
        className="hide-scrollbar"
      >
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start',
            width: 'max-content',
            padding: '0 36px', // Screen ke left edge se natural clean margin
            boxSizing: 'border-box'
          }}
        >
          {REELS_DATA.map((reel, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={`${reel.id}-${index}`}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => setActiveIndex(index)}
                style={{
                  flex: isActive ? '0 0 250px' : '0 0 195px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'flex 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Reel Card */}
                <div
                  style={{
                    width: '100%',
                    height: isActive ? '390px' : '320px',
                    borderRadius: '16px',
                    backgroundColor: '#DCDCDC',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isActive ? '0 14px 32px rgba(0, 0, 0, 0.12)' : 'none',
                    transition: 'height 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {isActive ? (
                    <>
                      <div
                        id="active-yt-player"
                        style={{
                          width: '100%',
                          height: '100%',
                          pointerEvents: 'none'
                        }}
                      />

                      <button
                        onClick={togglePlay}
                        aria-label="Play Pause"
                        style={{
                          position: 'absolute',
                          top: '14px',
                          left: '14px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(0, 0, 0, 0.45)',
                          border: 'none',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          zIndex: 10
                        }}
                      >
                        {isPlaying ? <Pause size={15} fill="#FFFFFF" /> : <Play size={15} fill="#FFFFFF" />}
                      </button>

                      <button
                        onClick={toggleSound}
                        aria-label="Sound Toggle"
                        style={{
                          position: 'absolute',
                          bottom: '14px',
                          right: '14px',
                          background: 'rgba(0, 0, 0, 0.45)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          zIndex: 10,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#DCDCDC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg`}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: 0.85
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Bottom Attached Product Box for Active Card */}
                {isActive && (
                  <div
                    style={{
                      width: '100%',
                      backgroundColor: '#FAF8F5',
                      border: '1px solid #111111',
                      borderRadius: '10px',
                      padding: '12px 10px',
                      marginTop: '12px',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      boxSizing: 'border-box'
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
                        fontWeight: 700,
                        color: '#111111',
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
      </div>

      {/* 3. PAGINATION DOTS */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginTop: '28px',
          marginBottom: '34px'
        }}
      >
        {REELS_DATA.map((_, dot) => (
          <span
            key={dot}
            onClick={() => setActiveIndex(dot)}
            style={{
              width: dot === activeIndex ? '6px' : '5px',
              height: dot === activeIndex ? '6px' : '5px',
              borderRadius: '50%',
              backgroundColor: dot === activeIndex ? '#111111' : '#CCCCCC',
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
            padding: '0 20px',
            gap: '24px'
          }}
          className="ticker-container"
        >
          {TICKER_ITEMS.map((text, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '9.5px',
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
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 900px) {
          .ticker-container {
            gap: 16px !important;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}