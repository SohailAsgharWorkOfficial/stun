import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import BigStunLogo from '../components/BigStunLogo';
import OurProductsSection from '../components/OurProductsSection';
import WellnessBanner from '../components/WellnessBanner';
import CleanHomeFreshHome from '../components/CleanHomeFreshHome';
import PromoStrip from '../components/PromoStrip';
import RealRecommendations from '../components/RealRecommendations';
import OurMissionSection from '../components/OurMissionSection';
import waterHero from '../assets/water-hero.png';
import FloatingElements from '../components/FloatingElements';
import KeepFloorsClean from '../components/KeepFloorsClean';
import CustomerReviews from '../components/CustomerReviews';
import NewsletterBanner from '../components/NewsletterBanner';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (db) {
      getDocs(collection(db, 'products')).then((snap) => {
        if (!snap.empty) {
          setProducts(
            snap.docs.map((d) => ({
              id: d.id,
              name: d.data().name || 'Stun',
              price: d.data().price || '$29.99',
              image: d.data().thumbnail || ''
            }))
          );
        }
      }).catch(() => {});
    }
  }, []);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'row',
          minHeight: '82vh',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB'
        }}
        className="hero-split-container"
      >
        <div
          style={{
            flex: '0 0 62%',
            position: 'relative',
            minHeight: '560px',
            backgroundImage: `url(${waterHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%'
          }}
          className="hero-water-panel"
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 40% 50%, rgba(147, 215, 255, 0.25) 0%, rgba(79, 172, 230, 0.35) 100%)'
            }}
          />
        </div>

        <div
          style={{
            flex: '0 0 38%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 60px'
          }}
          className="hero-logo-panel"
        >
          <BigStunLogo />
        </div>
      </section>

      <OurProductsSection products={products} />

      <WellnessBanner />

      <CleanHomeFreshHome />

      <PromoStrip />

      <RealRecommendations />

      <OurMissionSection />

      <FloatingElements />

      <KeepFloorsClean />

      <CustomerReviews />

      <NewsletterBanner />

    </div>
  );
}