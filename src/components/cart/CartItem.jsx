import React from 'react';
import { Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPKR } from '../../utils/formatters';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item-row">
      <img src={item.image} alt={item.name} className="item-thumb" />
      <div className="item-details">
        <h4 className="item-name">{item.name}</h4>
        {item.variantName && <span className="item-variant">Size: {item.variantName}</span>}
        <span className="item-price">{formatPKR(item.price)}</span>
        
        <div className="item-controls">
          <div className="item-stepper">
            <button onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}>+</button>
          </div>
          <button 
            onClick={() => removeFromCart(item.itemKey)} 
            className="item-delete-btn"
            title="Remove item"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <style>{`
        .cart-item-row {
          display: flex;
          gap: 12px;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-light);
        }
        .item-thumb {
          width: 70px;
          height: 70px;
          object-fit: contain;
          background: #F8FAFC;
          border-radius: 4px;
          padding: 4px;
          border: 1px solid var(--border-light);
        }
        .item-details { flex: 1; display: flex; flex-direction: column; }
        .item-name { font-size: 0.9rem; font-weight: 700; color: var(--primary-navy); line-height: 1.3; }
        .item-variant { font-size: 0.75rem; color: var(--text-muted); margin: 2px 0; }
        .item-price { font-size: 0.85rem; font-weight: 800; color: var(--primary-navy); margin-bottom: 6px; }
        .item-controls { display: flex; align-items: center; justify-content: space-between; }
        .item-stepper { display: inline-flex; border: 1px solid var(--border-light); border-radius: 4px; }
        .item-stepper button { padding: 2px 8px; font-weight: bold; font-size: 0.8rem; }
        .item-stepper span { padding: 0 8px; font-size: 0.8rem; font-weight: 600; display: flex; align-items: center; }
        .item-delete-btn { color: #94A3B8; }
        .item-delete-btn:hover { color: var(--accent-red); }
      `}</style>
    </div>
  );
}