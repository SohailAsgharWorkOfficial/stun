import React, { useState } from 'react';
import Modal from '../common/Modal';
import VariantSelector from './VariantSelector';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPKR } from '../../utils/formatters';

export default function QuickViewModal({ product, isOpen, onClose }) {
  if (!product) return null;

  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const price = selectedVariant?.price || product.price;

  const handleAdd = () => {
    addToCart(product, selectedVariant, quantity);
    showToast(`Added ${quantity}x ${product.name} to cart!`, 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Quick Look">
      <div className="qv-layout">
        <div className="qv-media">
          <img src={product.images?.[0] || ''} alt={product.name} />
        </div>
        <div className="qv-body">
          <h2 className="qv-title">{product.name}</h2>
          <div className="qv-price-row">
            <span className="qv-price">{formatPKR(price)}</span>
            {product.regularPrice && <del className="qv-del">{formatPKR(product.regularPrice)}</del>}
          </div>
          <p className="qv-desc">{product.description?.slice(0, 140)}...</p>

          <VariantSelector 
            variants={product.variants} 
            selectedVariant={selectedVariant} 
            onSelect={setSelectedVariant} 
          />

          <div className="qv-cta-row">
            <div className="qv-qty">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <Button variant="primary" onClick={handleAdd} className="qv-add-btn">
              Add To Cart
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        .qv-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .qv-media {
          background: #F8FAFC;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .qv-media img { max-width: 100%; max-height: 220px; object-fit: contain; }
        .qv-title { font-size: 1.15rem; font-weight: 800; color: var(--primary-navy); margin-bottom: 0.5rem; }
        .qv-price-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 0.75rem; }
        .qv-price { font-size: 1.25rem; font-weight: 900; color: var(--primary-navy); }
        .qv-del { color: var(--text-muted); font-size: 0.9rem; }
        .qv-desc { font-size: 0.85rem; color: #475569; line-height: 1.4; margin-bottom: 1rem; }
        .qv-cta-row { display: flex; gap: 10px; margin-top: 1rem; }
        .qv-qty {
          display: flex;
          align-items: center;
          border: 1px solid var(--border-light);
          border-radius: 4px;
        }
        .qv-qty button { padding: 6px 12px; font-weight: 800; }
        .qv-qty span { padding: 0 8px; font-weight: 700; font-size: 0.9rem; }
        .qv-add-btn { flex-grow: 1; }
        @media (max-width: 600px) { .qv-layout { grid-template-columns: 1fr; } }
      `}</style>
    </Modal>
  );
}