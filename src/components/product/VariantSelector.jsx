import React from 'react';
import { formatPKR } from '../../utils/formatters';

export default function VariantSelector({ variants = [], selectedVariant, onSelect }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="variant-wrapper">
      <span className="variant-label">Container Size:</span>
      <div className="variant-list">
        {variants.map((v, i) => {
          const isSelected = selectedVariant?.sku === v.sku;
          return (
            <button
              key={v.sku || i}
              type="button"
              className={`variant-chip ${isSelected ? 'active' : ''}`}
              onClick={() => onSelect(v)}
            >
              <span className="chip-name">{v.name}</span>
              <span className="chip-price">{formatPKR(v.price)}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        .variant-wrapper { margin: 1rem 0; }
        .variant-label { font-size: 0.85rem; font-weight: 700; color: var(--text-dark); display: block; margin-bottom: 6px; }
        .variant-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .variant-chip {
          border: 1.5px solid var(--border-light);
          background: #fff;
          padding: 8px 14px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          cursor: pointer;
          transition: var(--transition);
        }
        .variant-chip:hover { border-color: var(--primary-blue); }
        .variant-chip.active {
          border-color: var(--primary-navy);
          background: #F0F4F8;
          box-shadow: 0 0 0 1px var(--primary-navy);
        }
        .chip-name { font-size: 0.85rem; font-weight: 700; color: var(--primary-navy); }
        .chip-price { font-size: 0.75rem; color: var(--text-muted); }
      `}</style>
    </div>
  );
}