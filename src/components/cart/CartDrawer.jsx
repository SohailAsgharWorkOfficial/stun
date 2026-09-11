import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import Button from '../common/Button';
import { formatPKR } from '../../utils/formatters';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, subtotal } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={e => e.stopPropagation()}>
        <div className="drawer-head">
          <div className="drawer-title">
            <ShoppingBag size={20} />
            <h3>Your Cart ({cart.length})</h3>
          </div>
          <button onClick={onClose} className="drawer-close"><X size={20} /></button>
        </div>

        <div className="drawer-content">
          {cart.length === 0 ? (
            <div className="empty-drawer">
              <ShoppingBag size={48} color="var(--text-muted)" />
              <p>Your cleaning basket is empty.</p>
              <Button variant="outline" size="sm" onClick={() => { onClose(); navigate('/shop'); }}>
                Browse Solutions
              </Button>
            </div>
          ) : (
            <div className="drawer-items-list">
              {cart.map(item => (
                <CartItem key={item.itemKey} item={item} />
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="subtotal-bar">
              <span>Subtotal:</span>
              <strong>{formatPKR(subtotal)}</strong>
            </div>
            <p className="shipping-hint">Shipping calculated at final checkout.</p>
            <Button 
              variant="primary" 
              className="drawer-checkout-btn"
              onClick={() => { onClose(); navigate('/checkout'); }}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>

      <style>{`
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(11, 37, 69, 0.6);
          backdrop-filter: blur(2px);
          z-index: 6000;
          display: flex;
          justify-content: flex-end;
        }
        .drawer-panel {
          background: #fff;
          width: 100%;
          max-width: 400px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-xl);
          animation: slideIn 0.25s ease-out;
        }
        .drawer-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-light);
        }
        .drawer-title { display: flex; align-items: center; gap: 8px; color: var(--primary-navy); }
        .drawer-title h3 { font-size: 1.1rem; font-weight: 800; }
        .drawer-close { color: var(--text-muted); }
        .drawer-content { flex: 1; overflow-y: auto; padding: 1.5rem; }
        .empty-drawer { text-align: center; padding: 3rem 0; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .drawer-foot { padding: 1.5rem; border-top: 1px solid var(--border-light); background: #F8FAFC; }
        .subtotal-bar { display: flex; justify-content: space-between; font-size: 1.1rem; margin-bottom: 4px; }
        .shipping-hint { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem; }
        .drawer-checkout-btn { width: 100%; }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}