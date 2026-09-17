import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      getDocs(collection(db, 'products'))
        .then((snap) => {
          setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        })
        .catch(console.error);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        zIndex: 99999, // Header aur announcement bar ke upar
        display: 'flex',
        justifyContent: 'flex-start'
      }}
    >
      {/* Slide-over White Drawer Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          maxWidth: '520px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '8px 0 35px rgba(0, 0, 0, 0.18)',
          boxSizing: 'border-box'
        }}
      >
        {/* Top Input Header (Fully visible & clean) */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: '#FFFFFF'
          }}
        >
          <Search size={19} color="#111111" />
          <input
            autoFocus
            type="text"
            placeholder="Search floor cleaners, sprays, collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: '#111111',
              backgroundColor: 'transparent'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9CA3AF',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#111111',
              padding: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 28px'
          }}
        >
          {searchTerm.trim() === '' ? (
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#6B7280',
                fontSize: '13px',
                margin: 0
              }}
            >
              Start typing to search STUN formulations.
            </p>
          ) : filtered.length === 0 ? (
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#6B7280',
                fontSize: '13px',
                margin: 0
              }}
            >
              No products found matching "{searchTerm}".
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filtered.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    navigate(`/products/${p.id}`);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <img
                    src={
                      p.thumbnail ||
                      p.image ||
                      'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=150&q=80'
                    }
                    alt={p.name}
                    style={{
                      width: '52px',
                      height: '52px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      backgroundColor: '#F3F4F6'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '13.5px',
                        fontWeight: 700,
                        color: '#111111',
                        margin: '0 0 4px 0'
                      }}
                    >
                      {p.name}
                    </h4>
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#4B5563'
                      }}
                    >
                      {typeof p.price === 'number' ? `₨ ${p.price.toLocaleString()}` : p.price}
                    </span>
                  </div>
                  <ArrowRight size={16} color="#9CA3AF" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}