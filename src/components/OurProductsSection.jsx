import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function OurProductsSection({ products = [] }) {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Default 5 items so carousel scroll works smoothly while showing 3 cards per view
  const defaultItems = [
    { id: '1', name: 'Stun', price: '$29.99', image: '' },
    { id: '2', name: 'Stun', price: '$29.99', image: '' },
    { id: '3', name: 'Stun', price: '$29.99', image: '' },
    { id: '4', name: 'Stun', price: '$29.99', image: '' },
    { id: '5', name: 'Stun', price: '$29.99', image: '' },
  ];

  const items = products.length > 0 ? products : defaultItems;

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      if (totalScrollable > 0) {
        setScrollProgress((scrollLeft / totalScrollable) * 100);
      }
    }
  };

  return (
    <section
      style={{
        padding: '90px 0 70px 0',
        backgroundColor: '#FCFBF7',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* 1. EDITORIAL HEADLINE WITH INLINE ASSETS (Exact match to screenshot) */}
        <div style={{ textAlign: 'center', marginBottom: '56px', padding: '0 20px' }}>
          {/* Subheading */}
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#111111',
              display: 'block',
              marginBottom: '14px'
            }}
          >
            PLANT POWERED
          </span>

          {/* Main Title Line 1 */}
          <h2
            style={{
              fontFamily: "'Space Grotesk', -apple-system, sans-serif",
              fontSize: 'clamp(1.8rem, 3.4vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#111111',
              margin: '0 0 4px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <span>DAILY</span>

            {/* Golden Capsule Asset */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '24px',
                borderRadius: '16px',
                background: 'radial-gradient(circle at 35% 30%, #FFE98A 0%, #D4AF37 50%, #997A15 100%)',
                boxShadow: '0 4px 10px rgba(212, 175, 55, 0.4), inset -2px -2px 4px rgba(0,0,0,0.2)',
                transform: 'rotate(-25deg)',
                margin: '0 4px',
                flexShrink: 0
              }}
            >
              <span
                style={{
                  width: '16px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  transform: 'translateY(-3px)'
                }}
              />
            </span>

            <span>SUPPLEMENTS WITH BENEFITS</span>
          </h2>

          {/* Main Title Line 2 */}
          <h2
            style={{
              fontFamily: "'Space Grotesk', -apple-system, sans-serif",
              fontSize: 'clamp(1.8rem, 3.4vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#111111',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <span>FOR YOU TO</span>

            {/* Circular Face Asset */}
            <span
              style={{
                display: 'inline-block',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                overflow: 'hidden',
                verticalAlign: 'middle',
                border: '2px solid #111111',
                flexShrink: 0,
                margin: '0 4px'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                alt="Feel Good"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </span>

            <span>FEEL GOOD</span>
          </h2>
        </div>

        {/* 2. 3 WIDE CARDS VIEWPORT CONTAINER */}
        <div style={{ padding: '0 48px', boxSizing: 'border-box' }} className="products-carousel-padding">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            style={{
              display: 'flex',
              gap: '28px',
              overflowX: 'auto',
              paddingBottom: '20px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            className="hide-scrollbar"
          >
            {items.map((item, index) => (
              <div
                key={item.id || index}
                style={{
                  flex: '0 0 calc((100% - 56px) / 3)', // Exactly 3 visible cards per row
                  minWidth: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                className="product-card-item"
              >
                {/* Rounded Grey Product Box */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1.05',
                    backgroundColor: '#D9D9D9',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px'
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : null}
                </div>

                {/* Name */}
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#111111',
                    marginBottom: '4px',
                    textAlign: 'center'
                  }}
                >
                  {item.name || 'Stun'}
                </span>

                {/* Price */}
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#111111',
                    textAlign: 'center'
                  }}
                >
                  {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price || '$29.99'}
                </span>
              </div>
            ))}
          </div>

          {/* 3. CENTERED PROGRESS BAR */}
          <div
            style={{
              width: '100%',
              margin: '36px 0 28px 0'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '1.5px',
                backgroundColor: '#E5E5E5',
                position: 'relative'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: `${scrollProgress * 0.60}%`,
                  top: 0,
                  height: '100%',
                  width: '40%',
                  backgroundColor: '#111111',
                  transition: 'left 0.1s ease-out'
                }}
              />
            </div>
          </div>

          {/* 4. VIEW ALL LINK */}
          <div style={{ textAlign: 'center' }}>
            <Link
              to="/shop"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#111111',
                textDecoration: 'underline',
                textUnderlineOffset: '5px'
              }}
            >
              VIEW ALL
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 1024px) {
          .product-card-item {
            flex: 0 0 calc((100% - 28px) / 2) !important;
          }
        }
        @media (max-width: 640px) {
          .products-carousel-padding {
            padding: 0 20px !important;
          }
          .product-card-item {
            flex: 0 0 85% !important;
          }
        }
      `}</style>
    </section>
  );
}