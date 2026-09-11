import React from 'react';

export default function Badge({ children, variant = 'primary', className = '' }) {
  const variantStyles = {
    primary: 'background: var(--primary-navy); color: #ffffff;',
    cyan: 'background: var(--electric-cyan); color: var(--primary-navy); font-weight: 800;',
    discount: 'background: var(--primary-blue); color: #ffffff;',
    warning: 'background: #FEF3C7; color: #B45309;',
    danger: 'background: #FEE2E2; color: #B91C1C;',
    success: 'background: #DCFCE7; color: #15803D;'
  };

  return (
    <span className={`stun-badge ${className}`}>
      {children}
      <style>{`
        .stun-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1;
          ${variantStyles[variant] || variantStyles.primary}
        }
      `}</style>
    </span>
  );
}