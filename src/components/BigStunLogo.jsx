import React from 'react';
// Agar PNG hai to: import logoImg from '../assets/logo.png';
import logoImg from '../assets/logo.svg';

export default function BigStunLogo({ maxWidth = "520px" }) {
  return (
    <div style={{ width: '100%', maxWidth: maxWidth, display: 'flex', justifyContent: 'center' }}>
      <img
        src={logoImg}
        alt="STUN"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
}