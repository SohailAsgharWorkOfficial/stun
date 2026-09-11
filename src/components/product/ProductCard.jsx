import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  const discountPercent = product.regularPrice && product.price < product.regularPrice 
    ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100) 
    : null;

  return (
    <div className="product-card">
      <div className="product-thumb">
        {discountPercent && <div className="badge-discount">{discountPercent}% OFF</div>}
        <Link to={`/product/${product.slug}`}>
          <img 
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&q=80&w=400'} 
            alt={product.name} 
          />
        </Link>
      </div>

      <div className="product-info">
        <div className="rating-row">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(product.rating || 5) ? "#F59E0B" : "#E2E8F0"} 
                stroke="none" 
              />
            ))}
          </div>
          <span className="reviews-count">({product.reviewCount || 12})</span>
        </div>

        <h3 className="product-title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="price-row">
          <span className="current-price">Rs. {Number(product.price).toLocaleString()} PKR</span>
          {product.regularPrice && (
            <span className="regular-price">Rs. {Number(product.regularPrice).toLocaleString()} PKR</span>
          )}
        </div>

        <button 
          className="btn-choose"
          onClick={() => addToCart(product, product.variants?.[0] || null, 1)}
        >
          <ShoppingCart size={16} /> Choose Options
        </button>
      </div>

      <style>{`
        .product-card {
          background: #fff;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
        }
        .product-card:hover {
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }
        .product-thumb {
          position: relative;
          background: #f8fafc;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .product-thumb img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .product-card:hover .product-thumb img {
          transform: scale(1.05);
        }
        .product-info {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .rating-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .reviews-count {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .product-title {
          font-size: 0.95rem;
          font-weight: 700;
          line-height: 1.35;
          margin-bottom: 0.5rem;
          color: var(--primary-navy);
          min-height: 2.7rem;
        }
        .price-row {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }
        .current-price {
          font-weight: 800;
          color: var(--primary-navy);
          font-size: 1rem;
        }
        .regular-price {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .btn-choose {
          margin-top: auto;
          background: #fff;
          border: 1.5px solid var(--primary-navy);
          color: var(--primary-navy);
          padding: 0.6rem 1rem;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          transition: var(--transition);
        }
        .btn-choose:hover {
          background: var(--primary-navy);
          color: #fff;
        }
      `}</style>
    </div>
  );
}