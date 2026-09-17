import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function FloatingElements() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const current = -rect.top;
      const raw = current / totalScrollable;
      const clamped = Math.min(Math.max(raw, 0), 1);
      setProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Frame Calculations matched to the 4 video scenes
  // Pair 1: Orange (Left) & Mud (Right) -> Enter at 0.05, pass center at 0.25, exit top by 0.48
  const getPair1Y = () => {
    if (progress < 0.02) return 120; // Hidden below
    return 120 - (progress / 0.45) * 240; // 130vh -> -130vh
  };

  // Pair 2: Lightning (Left) & Ice Cube (Right) -> Enter at 0.35, pass center at 0.58, exit top by 0.78
  const getPair2Y = () => {
    if (progress < 0.32) return 120;
    const localProg = (progress - 0.32) / 0.46;
    return 120 - Math.min(Math.max(localProg, 0), 1) * 240;
  };

  // Pair 3: Purple Sparkles (Left) -> Enters at 0.65, passes center, exits completely by 0.95
  const getPair3Y = () => {
    if (progress < 0.62) return 120;
    const localProg = (progress - 0.62) / 0.36;
    return 120 - Math.min(Math.max(localProg, 0), 1) * 240;
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '120vh', // Extended scroll runway so sticky stays pinned for all 3 pairs
        backgroundColor: '#FCFBF7',
        margin: 0,
        padding: 0
      }}
    >
      {/* 100vh Sticky Viewport Screen */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* CENTER FIXED TEXT (Stable in all frames) */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '850px',
            padding: '0 24px',
            textAlign: 'center',
            userSelect: 'none'
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#111111',
              display: 'block',
              marginBottom: '16px'
            }}
          >
            OUR MISSION
          </span>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.3rem, 5.2vw, 4.4rem)',
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#111111',
              margin: '0 0 18px 0'
            }}
          >
            MAKING EVERY FLOOR<br />
            FEEL FRESH AGAIN.
          </h2>

          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '12px',
              lineHeight: 1.65,
              color: '#555555',
              maxWidth: '560px',
              margin: '0 auto 26px auto'
            }}
          >
            Powerful cleaning solutions designed to cut through everyday dirt, stains, and mess while leaving your floors looking fresh and spotless.
          </p>

          <div style={{ marginBottom: '24px' }}>
            <Link
              to="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#111111',
                color: '#FFFFFF',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '11px 26px',
                borderRadius: '24px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                cursor: 'pointer'
              }}
            >
              ABOUT US
            </Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', color: '#999999' }}>
            <ChevronDown size={22} strokeWidth={1.5} />
          </div>
        </div>

        {/* SCROLL-SYNCHRONIZED FLOATING BADGES */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 15
          }}
        >
          {/* PAIR 1 (LEFT): Orange Droplet (Matches image_61152c.png) */}
          <div
            style={{
              ...badgeStyle,
              top: '16%',
              left: '3%',
              backgroundColor: '#F97316',
              transform: `translate3d(0, ${getPair1Y()}vh, 0) rotate(${progress * 50}deg)`
            }}
            className="video-badge"
          >
            <svg width="74" height="74" viewBox="0 0 100 100" fill="none">
              <path d="M42 22 L45 28 L51 31 L45 34 L42 40 L39 34 L33 31 L39 28 Z" fill="#FFE57F" stroke="#000" strokeWidth="2.5" />
              <path d="M52 35 C52 35 74 62 74 76 C74 88 64 96 52 96 C40 96 30 88 30 76 C30 62 52 35 52 35 Z" fill="#FACC15" stroke="#000" strokeWidth="4" />
              <path d="M42 68 C42 62 48 55 54 50" stroke="#FFF" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* PAIR 1 (RIGHT): Yellow Mud Splash (Matches image_61152c.png) */}
          <div
            style={{
              ...badgeStyle,
              top: '52%',
              right: '4%',
              backgroundColor: '#EAB308',
              transform: `translate3d(0, ${getPair1Y()}vh, 0) rotate(${-progress * 60}deg)`
            }}
            className="video-badge"
          >
            <svg width="76" height="76" viewBox="0 0 100 100" fill="none">
              <path d="M50 32 C53 22 62 26 59 36 C66 32 72 38 67 45 C77 46 76 56 69 58 C74 65 67 72 61 68 C58 78 48 76 49 68 C42 74 34 68 38 60 C28 61 27 50 35 46 C29 40 36 32 43 37 C42 28 50 25 50 32 Z" fill="#78350F" stroke="#000" strokeWidth="3.5" />
              <circle cx="75" cy="32" r="3.5" fill="#78350F" stroke="#000" strokeWidth="2" />
              <circle cx="44" cy="79" r="4.5" fill="#78350F" stroke="#000" strokeWidth="2.5" />
            </svg>
          </div>

          {/* PAIR 2 (LEFT): Pink Lightning Bolt (Matches image_611569.png) */}
          <div
            style={{
              ...badgeStyle,
              top: '20%',
              left: '4%',
              backgroundColor: '#EC4899',
              transform: `translate3d(0, ${getPair2Y()}vh, 0) rotate(${progress * 70}deg)`
            }}
            className="video-badge"
          >
            <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
              <path d="M56 16 L32 54 L48 54 L40 88 L72 46 L54 46 Z" fill="#FACC15" stroke="#111" strokeWidth="4" />
              <path d="M42 48 L56 26" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* PAIR 2 (RIGHT): Yellow Ice Cube (Matches image_611569.png) */}
          <div
            style={{
              ...badgeStyle,
              top: '56%',
              right: '5%',
              backgroundColor: '#FACC15',
              transform: `translate3d(0, ${getPair2Y()}vh, 0) rotate(${-progress * 45}deg)`
            }}
            className="video-badge"
          >
            <svg width="76" height="76" viewBox="0 0 100 100" fill="none">
              <path d="M32 38 L65 26 L84 42 L52 56 Z" fill="#BAE6FD" stroke="#000" strokeWidth="4" />
              <path d="M32 38 L52 56 L52 86 L32 68 Z" fill="#7DD3FC" stroke="#000" strokeWidth="4" />
              <path d="M52 56 L84 42 L84 72 L52 86 Z" fill="#38BDF8" stroke="#000" strokeWidth="4" />
            </svg>
          </div>

          {/* PAIR 3 (LEFT): Purple Dual Sparkles (Matches image_6115a7.png) */}
          <div
            style={{
              ...badgeStyle,
              top: '24%',
              left: '3%',
              backgroundColor: '#8B5CF6',
              transform: `translate3d(0, ${getPair3Y()}vh, 0) rotate(${progress * 80}deg)`
            }}
            className="video-badge"
          >
            <svg width="76" height="76" viewBox="0 0 100 100" fill="none">
              <path d="M48 24 C48 38 38 48 24 48 C38 48 48 58 48 72 C48 58 58 48 72 48 C58 48 48 38 48 24 Z" fill="#FACC15" stroke="#000" strokeWidth="4" />
              <path d="M72 16 C72 23 67 28 60 28 C67 28 72 33 72 40 C72 33 77 28 84 28 C77 28 72 23 72 16 Z" fill="#FDE047" stroke="#000" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .video-badge {
            width: 95px !important;
            height: 95px !important;
          }
          .video-badge svg {
            width: 48px !important;
            height: 48px !important;
          }
        }
      `}</style>
    </div>
  );
}

const badgeStyle = {
  position: 'absolute',
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
  willChange: 'transform',
  transition: 'transform 0.04s linear'
};