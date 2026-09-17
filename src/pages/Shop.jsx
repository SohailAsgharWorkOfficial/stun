import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { label: 'All Formulations', value: 'all' },
    { label: 'Floor Care', value: 'floor' },
    { label: 'Surfaces', value: 'surface' },
    { label: 'Glass Sparkle', value: 'glass' },
    { label: 'Bathroom', value: 'bathroom' }
  ];

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, 'products'));
        let items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (items.length === 0) {
          items = [
            { id: '1', name: 'STUN Clean Floor Formula', price: 1250, category: 'floor', thumbnail: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80' },
            { id: '2', name: 'Surface Gloss Degreaser', price: 950, category: 'surface', thumbnail: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80' },
            { id: '3', name: 'Pure Botanical Glass Mist', price: 890, category: 'glass', thumbnail: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=600&q=80' },
            { id: '4', name: 'Bathroom Scale Purifier', price: 1400, category: 'bathroom', thumbnail: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80' }
          ];
        }
        setProducts(items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const displayed = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '60px 40px' }}>
      <div style={{ marginBottom: '40px' }}>
        <span className="editorial-sub" style={{ color: '#888' }}>ARCHIVE COLLECTION</span>
        <h1 className="editorial-title" style={{ fontSize: '2.5rem', marginTop: '8px' }}>STUN Formulations</h1>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSearchParams(cat.value === 'all' ? {} : { category: cat.value })}
            style={{
              padding: '8px 18px',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              border: '1px solid',
              borderColor: activeCategory === cat.value ? 'var(--color-dark)' : 'var(--color-border)',
              background: activeCategory === cat.value ? 'var(--color-dark)' : 'transparent',
              color: activeCategory === cat.value ? '#FFF' : 'var(--color-text)'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: '#888' }}>Retrieving catalogue...</p>
      ) : displayed.length === 0 ? (
        <p style={{ color: '#888' }}>No formulations found in this category.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '36px'
        }}>
          {displayed.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}