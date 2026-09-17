import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function OurProductsSection({ products = [] }) {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    <section style={{ padding: '70px 0 60px 0', backgroundColor: '#FFFFFF', width: '100%', overflow: 'hidden' }}>
      
      {/* 1. SECTION TITLE */}
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', -apple-system, sans-serif",
            fontSize: '22px',
            fontWeight: 800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#000000',
            margin: 0
          }}
        >
          OUR PRODUCTS
        </h2>
      </div>

      {/* 2. CENTERED HORIZONTAL CARDS */}
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
          boxSizing: 'border-box'
        }}
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: 'flex',
            gap: '18px',
            overflowX: 'auto',
            justifyContent: 'center', // Perfect horizontal centering
            paddingBottom: '20px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="hide-scrollbar products-scroll-row"
        >
          {items.map((item, index) => (
            <div
              key={item.id || index}
              style={{
                flex: '0 0 250px',
                maxWidth: '260px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              {/* Card Rounded Grey Image Box */}
              <div
                style={{
                  width: '100%',
                  height: '310px',
                  backgroundColor: '#D9D9D9',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
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

              {/* Product Title */}
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#111111',
                  marginBottom: '4px',
                  textAlign: 'center'
                }}
              >
                {item.name || 'Stun'}
              </span>

              {/* Product Price */}
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#111111',
                  textAlign: 'center'
                }}
              >
                {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price || '$29.99'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CENTERED PROGRESS BAR / SLIDER INDICATOR */}
      <div
        style={{
          maxWidth: '1320px',
          margin: '28px auto 32px',
          padding: '0 24px',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: '#E5E5E5',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `${scrollProgress * 0.65}%`,
              top: 0,
              height: '100%',
              width: '35%',
              backgroundColor: '#000000',
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
            color: '#000000',
            textDecoration: 'underline',
            textUnderlineOffset: '5px'
          }}
        >
          VIEW ALL
        </Link>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 1380px) {
          .products-scroll-row {
            justifyContent: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}