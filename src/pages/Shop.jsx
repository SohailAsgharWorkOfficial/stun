import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/product/ProductCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';
  const searchTerm = searchParams.get('search') || '';
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    async function loadShopData() {
      setLoading(true);
      try {
        const prodSnap = await getDocs(collection(db, 'products'));
        const catSnap = await getDocs(collection(db, 'categories'));

        setProducts(prodSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setCategories(catSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Failed to load catalog:", err);
      } finally {
        setLoading(false);
      }
    }
    loadShopData();
  }, []);

  const filtered = products.filter(p => {
    if (!p.active) return false;
    const matchesCategory = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="page-shell">
      <Header />
      <main className="container shop-layout">
        <aside className="shop-filters">
          <div className="filter-block">
            <h3>Categories</h3>
            <ul>
              <li 
                className={selectedCategory === 'all' ? 'active' : ''} 
                onClick={() => setSearchParams({ category: 'all' })}
              >
                All Cleaning Solutions
              </li>
              {categories.map(c => (
                <li 
                  key={c.id} 
                  className={selectedCategory === c.slug ? 'active' : ''} 
                  onClick={() => setSearchParams({ category: c.slug })}
                >
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="shop-content">
          <div className="shop-bar">
            <span>Showing <strong>{filtered.length}</strong> products</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="loading-state">Loading store catalog...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">No products found matching the criteria.</div>
          ) : (
            <div className="products-grid">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />

      <style>{`
        .shop-layout { display: grid; grid-template-columns: 240px 1fr; gap: 3rem; padding: 4rem 1.5rem; }
        .filter-block h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 1rem; }
        .filter-block ul { list-style: none; }
        .filter-block ul li {
          padding: 0.6rem 0;
          font-size: 0.9rem;
          cursor: pointer;
          color: var(--text-muted);
          transition: var(--transition);
        }
        .filter-block ul li.active, .filter-block ul li:hover {
          color: var(--primary-navy);
          font-weight: 700;
        }
        .shop-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
        }
        .shop-bar select {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-light);
          border-radius: 4px;
        }
        .products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 900px) {
          .shop-layout { grid-template-columns: 1fr; }
          .products-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 550px) {
          .products-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}