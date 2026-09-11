import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { getProductBySlug } from '../firebase/firestore';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatPKR } from '../utils/formatters';
import { Star, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItem() {
      setLoading(true);
      const res = await getProductBySlug(slug);
      if (res) {
        setProduct(res);
        setActiveImg(res.images?.[0] || '');
        if (res.variants?.length > 0) {
          setSelectedVariant(res.variants[0]);
        }
      }
      setLoading(false);
    }
    loadItem();
  }, [slug]);

  if (loading) return <div className="loading-state">Loading product specs...</div>;
  if (!product) return <div className="empty-state">Product not found.</div>;

  const currentPrice = selectedVariant?.price || product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, qty);
    showToast(`Added ${qty}x ${product.name} to cart!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, qty);
    navigate('/checkout');
  };

  return (
    <div>
      <Header />
      <main className="container pdp-wrap">
        <div className="pdp-grid">
          {/* Gallery */}
          <div className="pdp-gallery">
            <div className="main-image">
              <img src={activeImg} alt={product.name} />
            </div>
            {product.images?.length > 1 && (
              <div className="thumbs-row">
                {product.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    className={activeImg === img ? 'thumb active' : 'thumb'} 
                    onClick={() => setActiveImg(img)} 
                    alt="Thumbnail" 
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="pdp-info">
            <span className="pdp-brand">STUN ADVANCED SOLUTIONS</span>
            <h1>{product.name}</h1>

            <div className="rating-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#F59E0B" stroke="none" />
              ))}
              <span>({product.reviewCount || 24} Verified Reviews)</span>
            </div>

            <div className="pdp-price">
              <h2>{formatPKR(currentPrice)}</h2>
              {product.regularPrice && <del>{formatPKR(product.regularPrice)}</del>}
            </div>

            <p className="pdp-desc">{product.description}</p>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="pdp-variants">
                <label>Select Size / Variant:</label>
                <div className="variant-pills">
                  {product.variants.map((v, i) => (
                    <button 
                      key={i} 
                      className={`variant-pill ${selectedVariant?.sku === v.sku ? 'selected' : ''}`}
                      onClick={() => setSelectedVariant(v)}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="pdp-actions">
              <div className="quantity-counter">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>

              <button className="btn-primary" onClick={handleAddToCart}>
                Add To Cart
              </button>

              <button className="btn-cyan" onClick={handleBuyNow}>
                Buy It Now
              </button>

              <button 
                className="btn-wishlist-pdp" 
                onClick={() => toggleWishlist(product)}
                title="Save to Wishlist"
              >
                <Heart size={20} fill={isInWishlist(product.id) ? "var(--accent-red)" : "none"} />
              </button>
            </div>

            <div className="pdp-assurances">
              <div className="assurance-row"><Truck size={18} /><span>Free delivery over Rs. 3,000 nationwide.</span></div>
              <div className="assurance-row"><ShieldCheck size={18} /><span>100% Laboratory Verified Chemical Formulation.</span></div>
              <div className="assurance-row"><RefreshCw size={18} /><span>7-Day Hassle-Free Exchange Policy.</span></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .pdp-wrap { padding: 4rem 1.5rem; }
        .pdp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
        .main-image {
          background: #F8FAFC;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-light);
        }
        .main-image img { max-width: 90%; max-height: 90%; object-fit: contain; }
        .thumbs-row { display: flex; gap: 1rem; margin-top: 1rem; }
        .thumb {
          width: 80px;
          height: 80px;
          object-fit: contain;
          border: 1px solid var(--border-light);
          border-radius: 4px;
          cursor: pointer;
        }
        .thumb.active { border-color: var(--primary-navy); }
        .pdp-brand { font-size: 0.8rem; font-weight: 800; color: var(--text-muted); }
        .pdp-info h1 { font-size: 2rem; font-weight: 900; color: var(--primary-navy); margin: 0.5rem 0 1rem; }
        .pdp-price { display: flex; align-items: baseline; gap: 1rem; margin: 1.5rem 0; }
        .pdp-price h2 { font-size: 1.75rem; font-weight: 900; color: var(--primary-navy); }
        .pdp-price del { color: var(--text-muted); }
        .pdp-desc { line-height: 1.6; color: #475569; margin-bottom: 2rem; }
        .variant-pills { display: flex; gap: 0.5rem; margin-top: 0.5rem; margin-bottom: 2rem; }
        .variant-pill {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-light);
          border-radius: 4px;
          font-weight: 600;
        }
        .variant-pill.selected {
          border-color: var(--primary-navy);
          background: var(--primary-navy);
          color: white;
        }
        .pdp-actions { display: flex; gap: 1rem; align-items: center; margin-bottom: 2.5rem; }
        .quantity-counter {
          display: flex;
          align-items: center;
          border: 1px solid var(--border-light);
          border-radius: 4px;
        }
        .quantity-counter button { padding: 0.75rem 1rem; font-weight: 800; }
        .quantity-counter span { padding: 0 0.5rem; font-weight: 700; }
        .btn-wishlist-pdp {
          border: 1px solid var(--border-light);
          padding: 0.85rem;
          border-radius: 4px;
          display: flex;
        }
        .pdp-assurances { border-top: 1px solid var(--border-light); padding-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .assurance-row { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: var(--text-dark); }
        @media (max-width: 900px) { .pdp-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}