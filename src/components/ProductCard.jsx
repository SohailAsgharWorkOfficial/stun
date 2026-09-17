import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{
          height: '320px',
          background: '#F0ECE1',
          overflow: 'hidden',
          marginBottom: '16px',
          position: 'relative'
        }}>
          <img 
            src={product.thumbnail || 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80'} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          />
          {product.salePrice && (
            <span style={{
              position: 'absolute', top: '12px', left: '12px',
              background: '#EF4444', color: '#fff', fontSize: '0.7rem',
              fontWeight: 700, padding: '4px 8px', letterSpacing: '0.05em'
            }}>
              SALE
            </span>
          )}
        </div>
      </Link>

      <span className="editorial-sub" style={{ color: '#888', marginBottom: '4px', fontSize: '0.7rem' }}>
        {product.category || 'General Home'}
      </span>
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '6px' }}>{product.name}</h4>
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
          ₨ {(product.salePrice || product.price).toLocaleString()}
        </span>
        {product.salePrice && (
          <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '0.85rem' }}>
            ₨ {product.price.toLocaleString()}
          </span>
        )}
      </div>

      <button 
        onClick={() => addToCart(product)} 
        className="btn-stun" 
        style={{ padding: '10px 14px', fontSize: '0.75rem', width: '100%' }}
      >
        <ShoppingBag size={14} /> ADD TO BAG
      </button>
    </div>
  );
}