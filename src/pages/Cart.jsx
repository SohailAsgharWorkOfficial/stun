import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '120px auto', textAlign: 'center', padding: '0 20px' }}>
        <h2 className="editorial-title" style={{ fontSize: '2rem', marginBottom: '16px' }}>Your Shopping Bag is Empty</h2>
        <p style={{ color: '#666', marginBottom: '32px' }}>Explore our botanical cleaning line and select your formulations.</p>
        <Link to="/shop" className="btn-stun">Explore Shop</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 24px' }}>
      <h1 className="editorial-title" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Shopping Bag</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
        <div>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '20px', padding: '20px 0', borderBottom: '1px solid var(--color-border)' }}>
              <img src={item.thumbnail} alt={item.name} style={{ width: '80px', height: '100px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{item.name}</h3>
                <p style={{ margin: '6px 0', fontWeight: 700 }}>₨ {(item.salePrice || item.price).toLocaleString()}</p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '2px 8px', border: '1px solid #ccc' }}>-</button>
                  <span style={{ fontSize: '0.85rem' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '2px 8px', border: '1px solid #ccc' }}>+</button>
                  <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 'auto', color: '#EF4444' }}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FAF9F6', padding: '32px', border: '1px solid var(--color-border)', height: 'fit-content' }}>
          <h3 className="editorial-sub" style={{ marginBottom: '20px' }}>Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span>Subtotal</span>
            <span style={{ fontWeight: 700 }}>₨ {subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <Link to="/checkout" className="btn-stun" style={{ width: '100%' }}>
            Proceed to Checkout <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}