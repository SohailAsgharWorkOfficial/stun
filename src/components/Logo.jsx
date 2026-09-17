import React from 'react';
import { Link } from 'react-router-dom';
// Agar PNG hai to: import logoImg from '../assets/logo.png';
import logoImg from '../assets/logo.svg';

export default function Logo({ width = "135px", height = "auto" }) {
  return (
    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
      <img
        src={logoImg}
        alt="STUN Logo"
        style={{
          width: width,
          height: height,
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </Link>
  );
}