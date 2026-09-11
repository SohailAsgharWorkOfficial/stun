import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [], loading = false }) {
  if (loading) {
    return (
      <div className="product-skeleton-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card-skeleton">
            <div className="skeleton-img"></div>
            <div className="skeleton-line full"></div>
            <div className="skeleton-line half"></div>
            <div className="skeleton-btn"></div>
          </div>
        ))}
        <style>{`
          .product-skeleton-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
            width: 100%;
          }
          .card-skeleton {
            background: #fff;
            border: 1px solid var(--border-light);
            border-radius: 8px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .skeleton-img { width: 100%; aspect-ratio: 1; background: #e2e8f0; border-radius: 6px; animation: pulse 1.2s infinite; }
          .skeleton-line { height: 16px; background: #e2e8f0; border-radius: 4px; animation: pulse 1.2s infinite; }
          .skeleton-line.full { width: 85%; }
          .skeleton-line.half { width: 50%; }
          .skeleton-btn { height: 38px; background: #e2e8f0; border-radius: 4px; margin-top: auto; animation: pulse 1.2s infinite; }
          @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 0.3; } }
        `}</style>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="no-products-msg">
        <h3>No cleaning solutions found.</h3>
        <p>Try clearing active filters or searching for alternate terms.</p>
        <style>{`
          .no-products-msg {
            padding: 4rem 1rem;
            text-align: center;
            background: white;
            border-radius: 8px;
            border: 1px dashed var(--border-light);
            width: 100%;
          }
          .no-products-msg h3 { color: var(--primary-navy); margin-bottom: 0.5rem; font-weight: 800; }
          .no-products-msg p { color: var(--text-muted); font-size: 0.9rem; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="rendered-product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      <style>{`
        .rendered-product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }
      `}</style>
    </div>
  );
}