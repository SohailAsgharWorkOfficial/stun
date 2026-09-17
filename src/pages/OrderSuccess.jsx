import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
  const { state } = useLocation();
  const orderId = state?.orderId || 'STUN-' + Math.floor(100000 + Math.random() * 900000);
  const total = state?.total || 1500;

  return (
    <div style={{ maxWidth: '640px', margin: '100px auto', textAlign: 'center', padding: '0 24px' }}>
      <CheckCircle2 size={64} color="#00D1D1" style={{ margin: '0 auto 24px' }} />
      <h1 className="editorial-title" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Order Confirmed</h1>
      <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
        Thank you for choosing STUN. Your Cash on Delivery order has been registered in our logistics queue.
      </p>

      <div style={{ background: '#FAF9F6', padding: '24px', border: '1px solid var(--color-border)', marginBottom: '32px', textAlign: 'left' }}>
        <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}><strong>Order Tracking Reference:</strong> {orderId}</p>
        <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}><strong>Payable at Doorstep:</strong> ₨ {total.toLocaleString()}</p>
        <p style={{ fontSize: '0.85rem' }}><strong>Estimated Delivery:</strong> 2–4 business days across Pakistan.</p>
      </div>

      <Link to="/" className="btn-stun">
        Continue Shopping <ArrowRight size={16} />
      </Link>
    </div>
  );
}