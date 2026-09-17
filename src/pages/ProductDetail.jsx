import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCart } from '../context/CartContext';
import { Shield, Sparkles, Droplets, ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, 'products', id));
        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        } else {
          // Fallback demo matching reference
          setProduct({
            id,
            name: 'STUN Clean Floor Formula',
            price: 1250,
            salePrice: 1100,
            category: 'floor',
            description: 'Advanced botanical blend designed for marble, polished tile, and fine laminate floors. Completely streak-free residue formula with sustained fresh essential citrus notes.',
            thumbnail: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
            ingredients: 'Pure water, Coconut-derived surfactants, Organic lemon peel oil, Plant chelators.',
            usageInstructions: 'Dilute 2 capfuls per half-bucket of clean warm water. Mop evenly and allow 3 minutes to dry.'
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading formulation...</div>;
  if (!product) return <div style={{ padding: '80px', textAlign: 'center' }}>Product not found.</div>;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 40px 100px' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '32px' }}>
        <ArrowLeft size={16} /> BACK TO CATALOGUE
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '64px' }}>
        {/* Gallery */}
        <div style={{ background: '#F0ECE1', minHeight: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={product.thumbnail} alt={product.name} style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="editorial-sub" style={{ color: '#888', marginBottom: '8px' }}>{product.category}</span>
          <h1 className="editorial-title" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>₨ {(product.salePrice || product.price).toLocaleString()}</span>
            {product.salePrice && <span style={{ textDecoration: 'line-through', color: '#888' }}>₨ {product.price.toLocaleString()}</span>}
          </div>

          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '32px', fontSize: '0.95rem' }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', border: '1px solid #CCC', alignItems: 'center' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '12px 16px' }}>-</button>
              <span style={{ padding: '0 12px', fontWeight: 600 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ padding: '12px 16px' }}>+</button>
            </div>
            <button onClick={() => addToCart(product, qty)} className="btn-stun" style={{ flex: 1 }}>
              ADD TO BAG
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Droplets size={16} color="#00D1D1" />
              <span><strong>Ingredients:</strong> {product.ingredients || 'Standard natural botanical complex.'}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Sparkles size={16} color="#00D1D1" />
              <span><strong>Directions:</strong> {product.usageInstructions || 'Apply directly or dilute.'}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Shield size={16} color="#00D1D1" />
              <span>100% money back guarantee if unsealed within 7 days.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}