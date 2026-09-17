import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, User, ShoppingBag, X, Menu } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '../context/CartContext';

export default function Header({ onOpenSearch }) {
  const cartContext = useCart();
  const itemCount = cartContext?.itemCount || 0;
  const setIsDrawerOpen = cartContext?.setIsDrawerOpen || (() => {});
  
  const [showTopBar, setShowTopBar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ width: '100%', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* 1. TOP BLACK ANNOUNCEMENT BAR */}
      {showTopBar && (
        <div
          style={{
            backgroundColor: '#161616',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.04em',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            userSelect: 'none'
          }}
        >
          {/* Repeating Announcement Text */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flex: 1,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              gap: '40px',
              paddingRight: '20px'
            }}
          >
            <span>Free shipping on US orders over $100</span>
            <span className="hide-mobile">Free shipping on US orders over $100</span>
            <span className="hide-tablet">Free shipping on US orders over $100</span>
            <span className="hide-laptop">Free shipping on US orders over $100</span>
            <span className="hide-desktop">Free shipping on US orders over $100</span>
          </div>

          {/* Close Banner Button */}
          <button
            onClick={() => setShowTopBar(false)}
            aria-label="Close Announcement"
            style={{
              color: '#9CA3AF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* 2. MAIN HEADER BAR */}
      <header
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #E5E7EB',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px'
        }}
      >
        {/* Left: Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo />
        </div>

        {/* Center: Exact Navigation Links */}
        <nav
          className="desktop-navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '26px'
          }}
        >
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <Link to="/shop" style={navLinkStyle}>
              SHOP
            </Link>
            <ChevronDown size={14} strokeWidth={2.5} style={{ color: '#111' }} />
          </div>

          <Link to="/about" style={navLinkStyle}>
            ABOUT
          </Link>

          <Link to="/about" style={navLinkStyle}>
            SCIENCE
          </Link>

          <Link to="/shop" style={navLinkStyle}>
            QUIZ
          </Link>

          <Link to="/about" style={navLinkStyle}>
            BLOG
          </Link>

          <Link to="/contact" style={navLinkStyle}>
            CONTACT
          </Link>

          <Link to="/shop" style={navLinkStyle}>
            THEME FEATURES
          </Link>
        </nav>

        {/* Right: Currency, Language & Utility Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* US Currency Selector */}
          <div
            className="hide-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              color: '#111'
            }}
          >
            <span style={{ fontSize: '15px' }}></span>
            <span>USD</span>
            <ChevronDown size={12} strokeWidth={2.5} />
          </div>

          {/* Language Selector */}
          <div
            className="hide-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              color: '#111',
              marginRight: '6px'
            }}
          >
            <span>EN</span>
            <ChevronDown size={12} strokeWidth={2.5} />
          </div>

          {/* Search Action */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search"
            style={{ padding: '6px', display: 'flex', alignItems: 'center', color: '#111', cursor: 'pointer' }}
          >
            <Search size={20} strokeWidth={1.75} />
          </button>

          {/* User Account */}
          <Link
            to="/account"
            aria-label="Account"
            style={{ padding: '6px', display: 'flex', alignItems: 'center', color: '#111' }}
          >
            <User size={20} strokeWidth={1.75} />
          </Link>

          {/* Cart Bag */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Shopping Bag"
            style={{ position: 'relative', padding: '6px', display: 'flex', alignItems: 'center', color: '#111', cursor: 'pointer' }}
          >
            <ShoppingBag size={20} strokeWidth={1.75} />
            {itemCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '1px',
                  right: '0px',
                  backgroundColor: '#111',
                  color: '#FFF',
                  borderRadius: '50%',
                  fontSize: '10px',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger"
            aria-label="Toggle Navigation"
            style={{ display: 'none', padding: '6px', color: '#111', cursor: 'pointer' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E5E7EB',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>SHOP</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>ABOUT</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>SCIENCE</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>QUIZ</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>BLOG</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>CONTACT</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>THEME FEATURES</Link>
        </div>
      )}

      {/* Responsive Viewport CSS */}
      <style>{`
        @media (max-width: 1080px) {
          .desktop-navigation { display: none !important; }
          .mobile-hamburger { display: block !important; }
          .hide-desktop { display: none !important; }
        }
        @media (max-width: 768px) {
          .hide-tablet { display: none !important; }
          .hide-laptop { display: none !important; }
          header { padding: 0 16px !important; }
        }
        @media (max-width: 600px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}

const navLinkStyle = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#111111',
  textDecoration: 'none'
};

const mobileLinkStyle = {
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#111111',
  textDecoration: 'none',
  padding: '6px 0'
};