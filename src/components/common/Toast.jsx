import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast, closeToast } = useToast();
  if (!toast) return null;

  return (
    <div className={`toast-banner toast-${toast.type}`}>
      {toast.type === 'success' && <CheckCircle2 size={18} />}
      {toast.type === 'error' && <AlertCircle size={18} />}
      {toast.type === 'info' && <Info size={18} />}
      <span>{toast.message}</span>
      <button onClick={closeToast}><X size={16} /></button>

      <style>{`
        .toast-banner {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: #0B2545;
          color: white;
          padding: 14px 20px;
          border-radius: 6px;
          box-shadow: var(--shadow-xl);
          z-index: 9999;
          font-size: 0.9rem;
          font-weight: 500;
          animation: slideUp 0.25s ease-out forwards;
        }
        .toast-success { border-left: 4px solid var(--success); }
        .toast-error { border-left: 4px solid var(--accent-red); }
        .toast-info { border-left: 4px solid var(--electric-cyan); }
        .toast-banner button { color: #94A3B8; display: flex; }
        .toast-banner button:hover { color: #fff; }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}