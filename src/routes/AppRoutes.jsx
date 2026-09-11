import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Storefront Pages
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Protected Customer Pages
import ProtectedRoute from './ProtectedRoute';
import Account from '../pages/Account';

// Protected Admin Portal
import AdminRoute from './AdminRoute';
import AdminSidebar from '../components/layout/AdminSidebar';
import AdminNavbar from '../components/layout/AdminNavbar';

// Admin Views
import AdminDashboard from '../pages/admin/Dashboard';
import AdminOrders from '../pages/admin/Orders';
import OrderDetails from '../pages/admin/OrderDetails';
import AdminProducts from '../pages/admin/Products';
import ProductForm from '../pages/admin/ProductForm';
import AdminCategories from '../pages/admin/Categories';
import AdminInventory from '../pages/admin/Inventory';
import AdminCoupons from '../pages/admin/Coupons';
import AdminReviews from '../pages/admin/Reviews';
import AdminBanners from '../pages/admin/Banners';
import AdminCustomers from '../pages/admin/Customers';

// Persistent Admin Layout Shell
function AdminLayout() {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-body-area">
        <AdminNavbar />
        <main className="admin-main-viewport">
          <Outlet />
        </main>
      </div>

      <style>{`
        .admin-shell {
          display: flex;
          min-height: 100vh;
          background: #F8FAFC;
        }
        .admin-body-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow-x: hidden;
        }
        .admin-main-viewport {
          flex: 1;
          padding: 2rem 2.5rem;
        }
        @media (max-width: 768px) {
          .admin-shell { flex-direction: column; }
          .admin-main-viewport { padding: 1.25rem; }
        }
      `}</style>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Storefront */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer Area */}
      <Route element={<ProtectedRoute />}>
        <Route path="/account" element={<Account />} />
        <Route path="/account/orders" element={<Account />} />
        <Route path="/account/wishlist" element={<Account />} />
      </Route>

      {/* Admin Operations Portal with Shared Layout */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="customers" element={<AdminCustomers />} />
        </Route>
      </Route>

      <Route path="*" element={<Home />} />
    </Routes>
  );
}