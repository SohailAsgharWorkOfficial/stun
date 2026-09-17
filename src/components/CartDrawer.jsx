import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { cart, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeFromCart, subtotal } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div
  style={{
    position: 'fixed',
    inset: 0,
    zIndex: 9999, // Header se zyada hona zaroori hai
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'flex-end'
  }}
>
      <div 
        onClick={() => setIsDrawerOpen(false)} 
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }} 
      />
      <div
    style={{
      position: 'relative',
      width: '100%',
      maxWidth: '420px',
      height: '100vh',
      backgroundColor: '#FFFFFF',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-4px 0 25px rgba(0, 0, 0, 0.15)'
    }}
  >
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="editorial-title" style={{ fontSize: '1.25rem' }}>Your Bag</h3>
          <button onClick={() => setIsDrawerOpen(false)}><X size={20} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>Your shopping bag is empty.</p>
              <button onClick={() => setIsDrawerOpen(false)} className="btn-stun">Explore Collection</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
                  <img src={item.thumbnail || 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=200&q=80'} alt={item.name} style={{ width: '70px', height: '85px', objectFit: 'cover', background: '#f5f5f5' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.name}</h4>
                      <button onClick={() => removeFromCart(item.id)} style={{ color: '#999' }}><X size={14} /></button>
                    </div>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, margin: '6px 0' }}>₨ {(item.salePrice || item.price).toLocaleString()}</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #e5e5e5' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '4px 8px' }}><Minus size={12} /></button>
                      <span style={{ fontSize: '0.8rem', padding: '0 8px' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '4px 8px' }}><Plus size={12} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="editorial-sub">Subtotal</span>
              <span style={{ fontWeight: 700 }}>₨ {subtotal.toLocaleString()}</span>
            </div>
            <Link 
              to="/checkout" 
              onClick={() => setIsDrawerOpen(false)}
              className="btn-stun" 
              style={{ width: '100%', boxSizing: 'border-box' }}
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}