import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Account from './pages/Account';
import InfoPage from './pages/InfoPage';

import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminOrders from './admin/AdminOrders';
import AdminHomepageCMS from './admin/AdminHomepageCMS';
import AdminLogin from './admin/AdminLogin';

// Clean Customer Layout wrapper with Outlet
function CustomerLayout({ onOpenSearch }) {
  return (
    <>
      <Header onOpenSearch={onOpenSearch} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
          <CartDrawer />
          
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-bg)' }}>
            <Routes>
              {/* Admin Portal */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="cms" element={<AdminHomepageCMS />} />
              </Route>

              {/* Customer Front Store (Standard Clean Routing) */}
              <Route element={<CustomerLayout onOpenSearch={() => setSearchOpen(true)} />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/account" element={<Account />} />

                {/* Info Pages */}
                <Route path="/about" element={<InfoPage />} />
                <Route path="/contact" element={<InfoPage />} />
                <Route path="/shipping" element={<InfoPage />} />
                <Route path="/returns" element={<InfoPage />} />
                <Route path="/privacy" element={<InfoPage />} />
                <Route path="/terms" element={<InfoPage />} />
              </Route>

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}