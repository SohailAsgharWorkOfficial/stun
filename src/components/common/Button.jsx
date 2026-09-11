import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  onClick, 
  type = 'button',
  icon: Icon,
  className = '',
  ...rest 
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn-root btn-${variant} btn-sz-${size} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="btn-spinner"></span>
      ) : (
        <>
          {Icon && <Icon size={size === 'sm' ? 14 : 18} />}
          {children}
        </>
      )}

      <style>{`
        .btn-root {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 6px;
          font-family: inherit;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
          border: none;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .btn-root:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          filter: grayscale(0.5);
        }
        .btn-sz-sm { padding: 0.45rem 0.9rem; font-size: 0.75rem; }
        .btn-sz-md { padding: 0.75rem 1.4rem; font-size: 0.875rem; }
        .btn-sz-lg { padding: 1rem 2rem; font-size: 1rem; }

        .btn-primary { background: var(--primary-navy); color: #fff; }
        .btn-primary:hover:not(:disabled) { background: var(--primary-blue); box-shadow: 0 4px 12px rgba(19, 62, 135, 0.35); }

        .btn-cyan { background: var(--electric-cyan); color: var(--primary-navy); }
        .btn-cyan:hover:not(:disabled) { filter: brightness(1.08); box-shadow: 0 4px 14px rgba(0, 210, 255, 0.4); }

        .btn-outline { background: transparent; border: 1.5px solid var(--primary-navy); color: var(--primary-navy); }
        .btn-outline:hover:not(:disabled) { background: var(--primary-navy); color: #fff; }

        .btn-danger { background: var(--accent-red); color: #fff; }
        .btn-danger:hover:not(:disabled) { filter: brightness(0.9); }

        .btn-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </button>
  );
}