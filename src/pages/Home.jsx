import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/product/ProductCard';
import { getStoreProducts } from '../firebase/firestore';

export default function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDynamicCatalog() {
      setLoading(true);
      try {
        const products = await getStoreProducts();
        if (products && products.length > 0) {
          setBestSellers(products.filter(p => p.isBestSeller).slice(0, 4));
          setBundles(products.filter(p => p.categorySlug === 'bundles').slice(0, 4));
        }
      } catch (err) {
        console.error("Home product fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDynamicCatalog();
  }, []);

  return (
    <div className="home-wrapper">
      <Header />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-badge">STUN ADVANCED CLEANING FORMULA</span>
            <h1 className="hero-headline">
              Har Ghar Ki <br />
              <span className="highlight-text">PEHLI PASAND.</span>
            </h1>
            <p className="hero-subtext">
              High-performance laboratory formulated cleaners engineered to dissolve tough stains, 
              degrease instantly, and eliminate 99.9% of bacteria.
            </p>
            <div className="hero-ctas">
              <Link to="/shop" className="btn-primary">Order Now</Link>
              <Link to="/shop?category=bundles" className="btn-cyan">View Bundles</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="trust-seal">
              <ShieldCheck size={26} className="seal-icon" />
              <div>
                <strong>TRUSTED BY</strong>
                <p>THOUSANDS ⭐⭐⭐⭐⭐</p>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&q=80&w=800" 
              alt="STUN Complete Cleaning Lineup" 
              className="hero-lineup-img"
            />
          </div>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="features-strip">
        <div className="container features-grid">
          <div className="feature-item">
            <Sparkles className="feature-icon" />
            <div>
              <h4>Maximum Strength</h4>
              <p>Industrial performance for domestic care</p>
            </div>
          </div>
          <div className="feature-item">
            <Award className="feature-icon" />
            <div>
              <h4>Surface-Safe</h4>
              <p>Non-corrosive, no residue formula</p>
            </div>
          </div>
          <div className="feature-item">
            <Truck className="feature-icon" />
            <div>
              <h4>Express Dispatch</h4>
              <p>Cash on Delivery across Pakistan</p>
            </div>
          </div>
          <div className="feature-item">
            <CheckCircle2 className="feature-icon" />
            <div>
              <h4>100% Quality Guaranteed</h4>
              <p>Certified laboratory standard</p>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLING PRODUCTS */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>BEST SELLING PRODUCTS</h2>
            <div className="header-divider"></div>
          </div>

          {loading ? (
            <div className="loading-grid-spinner">Loading store products from Firestore...</div>
          ) : bestSellers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
              No best sellers published yet. Mark products as "Best Seller" in the Admin panel.
            </div>
          ) : (
            <div className="products-grid">
              {bestSellers.map(product => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          )}

          <div className="view-all-wrapper">
            <Link to="/shop" className="btn-primary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="promo-banner">
        <div className="container promo-content">
          <h2>Double The Clean, Half The Price</h2>
          <p>Save Rs. 1,000 on Every Bundle Selection Today</p>
        </div>
      </section>

      {/* BEST VALUE BUNDLES */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>BEST VALUE BUNDLES</h2>
            <p className="section-subtitle">Don't Miss These Value Packs</p>
            <div className="header-divider"></div>
          </div>

          {loading ? (
            <div className="loading-grid-spinner">Loading bundles...</div>
          ) : bundles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
              No bundles currently listed. Add a product with category "bundles" in Admin.
            </div>
          ) : (
            <div className="products-grid">
              {bundles.map(product => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          )}

          <div className="view-all-wrapper">
            <Link to="/shop?category=bundles" className="btn-primary">View All Bundles</Link>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .home-wrapper { display: flex; flex-direction: column; min-height: 100vh; }
        .hero-section {
          background: linear-gradient(135deg, #07192f 0%, #0B2545 60%, #133E87 100%);
          color: white;
          padding: 4.5rem 0 5.5rem 0;
          position: relative;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        .hero-badge {
          display: inline-block;
          color: var(--electric-cyan);
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }
        .hero-headline {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1.25rem;
        }
        .hero-headline .highlight-text {
          color: var(--electric-cyan);
        }
        .hero-subtext {
          font-size: 1.05rem;
          color: #CBD5E1;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 480px;
        }
        .hero-ctas { display: flex; gap: 1rem; }
        .hero-visual { position: relative; display: flex; justify-content: center; }
        .hero-lineup-img {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
          object-fit: cover;
          max-height: 440px;
        }
        .trust-seal {
          position: absolute;
          top: -20px;
          right: -10px;
          background: #0B2545;
          border: 2px solid var(--electric-cyan);
          padding: 0.6rem 0.9rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          box-shadow: var(--shadow-xl);
          z-index: 2;
        }
        .seal-icon { color: var(--accent-orange); }
        .trust-seal strong { font-size: 0.75rem; display: block; color: #fff; }
        .trust-seal p { font-size: 0.65rem; color: #94A3B8; }

        .features-strip { background: #fff; border-bottom: 1px solid var(--border-light); padding: 2.25rem 0; }
        .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .feature-item { display: flex; align-items: center; gap: 1rem; }
        .feature-icon { color: var(--primary-blue); width: 32px; height: 32px; flex-shrink: 0; }
        .feature-item h4 { font-size: 0.95rem; font-weight: 800; color: var(--primary-navy); }
        .feature-item p { font-size: 0.8rem; color: var(--text-muted); }

        .section-padding { padding: 4.5rem 0; }
        .section-header { text-align: center; margin-bottom: 2.5rem; }
        .section-header h2 { font-size: 2rem; font-weight: 900; color: var(--primary-navy); letter-spacing: -0.02em; }
        .section-subtitle { color: var(--text-muted); font-weight: 600; margin-top: 0.25rem; }
        .header-divider { width: 60px; height: 4px; background: var(--electric-cyan); margin: 0.8rem auto 0; border-radius: 2px; }
        .products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .view-all-wrapper { text-align: center; margin-top: 2.5rem; }

        .promo-banner { background: linear-gradient(90deg, #0B2545 0%, #133E87 100%); color: white; text-align: center; padding: 3rem 1rem; }
        .promo-content h2 { font-size: 2.2rem; font-weight: 900; }
        .promo-content p { color: var(--electric-cyan); font-weight: 700; font-size: 1.1rem; margin-top: 0.35rem; }
        .loading-grid-spinner { text-align: center; padding: 3rem 0; color: var(--text-muted); font-weight: 700; }

        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
          .products-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-headline { font-size: 2.5rem; }
          .products-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}