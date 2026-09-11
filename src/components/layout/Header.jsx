import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, User, Menu, X, ShieldAlert } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartDrawer from '../cart/CartDrawer';

export default function Header() {
  const { totalItems } = useCart();
  const { user, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setMenuOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="header-wrapper">
        {/* Top Announcement Ribbon */}
        <div className="top-banner">
          <div className="container banner-inner">
            <span>⚡ FLAT 20% OFF ON BUNDLES | EXPRESS DELIVERY & COD ACROSS PAKISTAN</span>
          </div>
        </div>

        <div className="nav-container container">
          {/* Mobile Menu Button */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* STUN Brand Logo */}
          <Link to="/" className="brand-logo">
            <span className="logo-st">ST</span>
            <span className="logo-un">
              U<span className="bolt">N</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''} 
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={isActive('/shop') && !location.search.includes('bundles') ? 'active' : ''} 
              onClick={() => setMenuOpen(false)}
            >
              All Products
            </Link>
            <Link 
              to="/shop?category=bundles" 
              className={location.search.includes('bundles') ? 'active' : ''} 
              onClick={() => setMenuOpen(false)}
            >
              Bundles & Packs
            </Link>
            <Link 
              to="/shop?category=cleaners" 
              className={location.search.includes('cleaners') ? 'active' : ''} 
              onClick={() => setMenuOpen(false)}
            >
              Floor & Tile Care
            </Link>

            {isAdmin && (
              <Link to="/admin" className="admin-pill-link" onClick={() => setMenuOpen(false)}>
                <ShieldAlert size={15} /> Admin Portal
              </Link>
            )}
          </nav>

          {/* Action Icons & Quick Search */}
          <div className="header-actions">
            <form className="search-bar" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" aria-label="Search">
                <Search size={17} />
              </button>
            </form>

            <Link to="/account/wishlist" className="action-btn" title="Saved Wishlist">
              <Heart size={22} />
            </Link>

            <Link to={user ? "/account" : "/login"} className="action-btn" title="Customer Account">
              <User size={22} />
            </Link>

            <button 
              className="action-btn cart-btn" 
              onClick={() => setCartDrawerOpen(true)}
              title="Shopping Cart"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && <span className="cart-counter">{totalItems}</span>}
            </button>
          </div>
        </div>

        <style>{`
          .header-wrapper {
            background: #ffffff;
            position: sticky;
            top: 0;
            z-index: 999;
            box-shadow: 0 4px 18px rgba(11, 37, 69, 0.05);
            border-bottom: 1px solid var(--border-light);
          }
          .top-banner {
            background: var(--primary-navy);
            color: var(--electric-cyan);
            font-size: 0.78rem;
            font-weight: 800;
            padding: 0.45rem 1rem;
            letter-spacing: 0.06em;
            text-align: center;
          }
          .nav-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 76px;
          }
          .brand-logo {
            font-size: 2.25rem;
            font-weight: 900;
            letter-spacing: -0.05em;
            color: var(--primary-navy);
            display: flex;
            align-items: center;
            line-height: 1;
            user-select: none;
          }
          .brand-logo .bolt {
            color: var(--electric-cyan);
            text-shadow: 0 0 10px rgba(0, 210, 255, 0.5);
          }
          .nav-links {
            display: flex;
            gap: 2.25rem;
            align-items: center;
          }
          .nav-links a {
            font-weight: 700;
            font-size: 0.92rem;
            color: #334155;
            transition: var(--transition);
            position: relative;
          }
          .nav-links a:hover,
          .nav-links a.active {
            color: var(--primary-blue);
          }
          .nav-links a.active::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 0;
            width: 100%;
            height: 2.5px;
            background: var(--electric-cyan);
            border-radius: 2px;
          }
          .admin-pill-link {
            background: #EFF6FF !important;
            color: var(--primary-blue) !important;
            padding: 0.35rem 0.85rem;
            border-radius: 50px;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            border: 1px solid #BFDBFE;
          }
          .admin-pill-link:hover {
            background: #DBEAFE !important;
          }
          .header-actions {
            display: flex;
            align-items: center;
            gap: 1.25rem;
          }
          .search-bar {
            display: flex;
            align-items: center;
            background: #F1F5F9;
            border-radius: 50px;
            padding: 0.4rem 0.9rem;
            border: 1px solid transparent;
            transition: var(--transition);
          }
          .search-bar:focus-within {
            background: #fff;
            border-color: var(--primary-blue);
            box-shadow: 0 0 0 3px rgba(19, 62, 135, 0.1);
          }
          .search-bar input {
            border: none;
            background: transparent;
            outline: none;
            font-size: 0.85rem;
            width: 150px;
            font-weight: 500;
          }
          .search-bar button {
            color: #64748B;
            display: flex;
          }
          .action-btn {
            color: var(--primary-navy);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
          }
          .action-btn:hover {
            color: var(--primary-blue);
            transform: translateY(-1px);
          }
          .cart-counter {
            position: absolute;
            top: -6px;
            right: -8px;
            background: var(--accent-red);
            color: #ffffff;
            font-size: 0.7rem;
            font-weight: 800;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .mobile-toggle {
            display: none;
            color: var(--primary-navy);
          }
          @media (max-width: 992px) {
            .search-bar { display: none; }
            .mobile-toggle { display: block; }
            .nav-links {
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background: #ffffff;
              flex-direction: column;
              padding: 2rem;
              gap: 1.5rem;
              box-shadow: 0 16px 24px rgba(0,0,0,0.08);
              display: none;
              border-top: 1px solid var(--border-light);
            }
            .nav-links.open { display: flex; }
          }
        `}</style>
      </header>

      {/* Cart Drawer triggered globally from Header */}
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </>
  );
}