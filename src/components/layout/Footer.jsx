import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        status: 'subscribed',
        date: serverTimestamp()
      });
      showToast('Thank you for subscribing to STUN updates!', 'success');
      setEmail('');
    } catch (err) {
      showToast('Subscription failed. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer-root">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="brand-logo footer-brand">
            ST<span style={{ color: 'var(--electric-cyan)' }}>UN</span>
          </div>
          <p className="footer-desc">
            Pakistani consumers' leading pick for clinical-grade domestic surface restoration and decontamination formulas.
          </p>
          <form className="footer-newsletter" onSubmit={handleNewsletter}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)} 
            />
            <button type="submit" disabled={loading}>Join</button>
          </form>
        </div>

        <div className="footer-col">
          <h4>Products</h4>
          <ul>
            <li><Link to="/shop?category=floor-cleaners">Floor Cleaners</Link></li>
            <li><Link to="/shop?category=glass-cleaners">Glass Cleaners</Link></li>
            <li><Link to="/shop?category=bathroom-cleaners">Bathroom Care</Link></li>
            <li><Link to="/shop?category=kitchen-cleaners">Kitchen Care</Link></li>
            <li><Link to="/shop?category=bundles">Special Bundles</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><Link to="/account/orders">Track Shipment</Link></li>
            <li><Link to="/shipping">Shipping Policy</Link></li>
            <li><Link to="/returns">Returns & Refunds</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Direct Dispatch Office</h4>
          <p className="contact-meta">Plot 12-C, Commercial Sector 5, Korangi Industrial Area, Karachi, Pakistan.</p>
          <p className="contact-meta">Support Hotline: +92 (021) 111-788-600</p>
          <p className="contact-meta">Email: operations@stunclean.pk</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-inner">
          <p>© 2026 STUN Pakistan Inc. All Rights Reserved.</p>
          <p className="payment-support-pill">Cash On Delivery (COD) Nationwide Enabled</p>
        </div>
      </div>

      <style>{`
        .footer-root {
          background: #061527;
          color: #94A3B8;
          padding-top: 4rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 3rem;
          padding-bottom: 4rem;
        }
        .footer-brand {
          font-size: 2.2rem;
          font-weight: 900;
          color: #fff;
          margin-bottom: 1rem;
        }
        .footer-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .footer-newsletter {
          display: flex;
          max-width: 320px;
        }
        .footer-newsletter input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #1E293B;
          background: #0F172A;
          color: #fff;
          border-radius: 4px 0 0 4px;
          outline: none;
        }
        .footer-newsletter button {
          background: var(--electric-cyan);
          color: var(--primary-navy);
          font-weight: 700;
          padding: 0 1.25rem;
          border-radius: 0 4px 4px 0;
        }
        .footer-col h4 {
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
        }
        .footer-col ul { list-style: none; }
        .footer-col ul li { margin-bottom: 0.75rem; }
        .footer-col ul li a {
          color: #94A3B8;
          font-size: 0.85rem;
          transition: var(--transition);
        }
        .footer-col ul li a:hover { color: var(--electric-cyan); }
        .contact-meta { font-size: 0.85rem; line-height: 1.6; margin-bottom: 0.5rem; }
        .footer-bottom {
          background: #040D18;
          padding: 1.5rem 0;
          border-top: 1px solid rgba(255,255,255,0.04);
          font-size: 0.8rem;
        }
        .bottom-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .payment-support-pill {
          background: #133E87;
          color: #fff;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-weight: 600;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
          .bottom-inner { flex-direction: column; gap: 1rem; text-align: center; }
        }
      `}</style>
    </footer>
  );
}