import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 99,
      background: '#111111',
      color: '#FFFFFF',
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      fontSize: '0.85rem'
    }}>
      {type === 'success' ? <CheckCircle2 size={18} color="#00D1D1" /> : <AlertCircle size={18} color="#EF4444" />}
      <span>{message}</span>
      <button onClick={onClose} style={{ color: '#888', marginLeft: '8px', cursor: 'pointer' }}>×</button>
    </div>
  );
}