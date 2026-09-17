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
      getDocs(collection(db, 'products')).then(snap => {
        setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      }).catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = products.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 70,
      background: 'rgba(17, 17, 17, 0.75)', backdropFilter: 'blur(5px)',
      display: 'flex', justifyContent: 'center', padding: '60px 20px'
    }}>
      <div style={{
        background: '#FFFFFF', width: '100%', maxWidth: '640px',
        maxHeight: '80vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Search size={20} color="#666" />
          <input 
            autoFocus
            type="text"
            placeholder="Search floor cleaners, sprays, collections..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }}
          />
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {searchTerm.trim() === '' ? (
            <p style={{ color: '#888', fontSize: '0.85rem' }}>Start typing to search STUN formulations.</p>
          ) : filtered.length === 0 ? (
            <p style={{ color: '#888', fontSize: '0.85rem' }}>No products found matching "{searchTerm}".</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.map(p => (
                <div 
                  key={p.id}
                  onClick={() => { navigate(`/products/${p.id}`); onClose(); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px', cursor: 'pointer', borderBottom: '1px solid #f2f2f2' }}
                >
                  <img src={p.thumbnail || 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=150&q=80'} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{p.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>₨ {p.price}</span>
                  </div>
                  <ArrowRight size={16} color="#888" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}