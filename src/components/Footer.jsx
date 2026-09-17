import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import stunLogo from '../assets/logo-footer.png';
export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#111111',
        color: '#FFFFFF',
        padding: '70px 48px 40px',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        borderTop: '1px solid #222222',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* TOP: 4 DISTINCT COLUMNS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr 2.4fr',
            gap: '40px',
            marginBottom: '60px'
          }}
          className="footer-grid-top"
        >
          {/* Column 1: PRODUCTS */}
          <div>
            <h4 style={columnTitleStyle}>PRODUCTS</h4>
            <ul style={listStyle}>
              {[...Array(8)].map((_, i) => (
                <li key={i}>
                  <Link to="/shop" style={linkStyle}>
                    Stun floor cleaner
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: INFO */}
          <div>
            <h4 style={columnTitleStyle}>INFO</h4>
            <ul style={listStyle}>
              <li><Link to="/faq" style={linkStyle}>FAQ</Link></li>
              <li><Link to="/about" style={linkStyle}>About Us</Link></li>
              <li><Link to="/about" style={linkStyle}>Our Mission</Link></li>
            </ul>
          </div>

          {/* Column 3: SOCIAL */}
          <div>
            <h4 style={columnTitleStyle}>SOCIAL</h4>
            <ul style={listStyle}>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer" style={linkStyle}>Youtube</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" style={linkStyle}>TikTok</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" style={linkStyle}>Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" style={linkStyle}>Instagram</a></li>
            </ul>
          </div>

          {/* Column 4: ABOUT STUN */}
          <div>
            <h4 style={columnTitleStyle}>ABOUT STUN</h4>
            <p
              style={{
                fontSize: '11px',
                lineHeight: 1.7,
                color: '#CCCCCC',
                marginBottom: '18px',
                maxWidth: '440px'
              }}
            >
              With years of experience and a passion for making everyday cleaning easier,
              we're here to help you keep your home fresh, clean, and effortlessly maintained.
              Stun Floor Cleaners are designed to deliver powerful cleaning while leaving your
              floors looking spotless and feeling fresh.
            </p>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
              Clean smarter. Live fresher. 🧼
            </p>
            <p style={{ fontSize: '11px', color: '#AAAAAA' }}>
              Because a cleaner floor makes for a happier home.
            </p>
          </div>
        </div>

        {/* MIDDLE: SELECTORS + SOCIAL ICONS & PAYMENT BADGES */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            paddingBottom: '40px',
            borderBottom: '1px solid #1E1E1E'
          }}
          className="footer-middle-bar"
        >
          {/* Left: Country / Currency / Language & Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
            {/* Country / Currency */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#FFFFFF', cursor: 'pointer' }}>
              <span style={{ fontSize: '13px' }}></span>
              <span>US / USD</span>
              <ChevronDown size={11} />
            </div>

            {/* Language */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#FFFFFF', cursor: 'pointer' }}>
              <span>EN</span>
              <ChevronDown size={11} />
            </div>

            {/* Social Icons matching the screenshot: Facebook, X, Instagram, Pinterest */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginLeft: '6px' }}>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={socialIconStyle}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" style={socialIconStyle}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={socialIconStyle}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" style={socialIconStyle}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Payment Cards (Exact match to screenshot) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* VISA */}
            <span style={badgeStyle('#1A1F71')}>
              <span style={{ color: '#FFFFFF', fontWeight: 900, fontStyle: 'italic', fontSize: '9px', letterSpacing: '0.05em' }}>VISA</span>
            </span>

            {/* MASTERCARD */}
            <span style={badgeStyle('#222222')}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EB001B', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F79E1B', display: 'inline-block', marginLeft: '-4px', opacity: 0.95 }} />
              </div>
            </span>

            {/* AMEX */}
            <span style={badgeStyle('#006FCF')}>
              <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '7px', letterSpacing: '-0.02em', lineHeight: 1 }}>AM<br/>EX</span>
            </span>

            {/* PAYPAL */}
            <span style={badgeStyle('#003087')}>
              <span style={{ color: '#0079C1', fontWeight: 900, fontStyle: 'italic', fontSize: '10px' }}>P</span>
              <span style={{ color: '#00457C', fontWeight: 900, fontStyle: 'italic', fontSize: '10px', marginLeft: '-2px' }}>P</span>
            </span>

            {/* DINERS CLUB */}
            <span style={badgeStyle('#FFFFFF')}>
              <span style={{ color: '#004A97', fontWeight: 800, fontSize: '12px', lineHeight: 1 }}>◖◗</span>
            </span>

            {/* DISCOVER */}
            <span style={badgeStyle('#FFFFFF')}>
              <span style={{ color: '#000000', fontWeight: 800, fontSize: '6px', letterSpacing: '0.02em' }}>DISC<span style={{ color: '#FF6000' }}>O</span>VER</span>
            </span>
          </div>
        </div>

        {/* BOTTOM: MASSIVE EDITORIAL STUN BRANDING */}
       <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: '36px',
    userSelect: 'none'
  }}
>
  <img
    src={stunLogo}
    alt="STUN"
    style={{
      width: '100%',
      maxWidth: '920px',
      height: 'auto',
      display: 'block',
      objectFit: 'contain'
    }}
  />
</div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid-top {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid-top {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .footer-middle-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </footer>
  );
}

const columnTitleStyle = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#FFFFFF',
  marginBottom: '20px'
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const linkStyle = {
  fontSize: '11px',
  color: '#A0A0A0',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  display: 'inline-block'
};

const socialIconStyle = {
  color: '#FFFFFF',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.2s',
  opacity: 0.9
};

const badgeStyle = (bgColor) => ({
  backgroundColor: bgColor,
  width: '38px',
  height: '24px',
  borderRadius: '3px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(255, 255, 255, 0.12)'
});