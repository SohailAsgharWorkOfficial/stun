import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, Sliders, LogOut } from 'lucide-react';
import Logo from '../components/Logo';

export default function AdminLayout() {
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <h2>Unauthorized</h2>
        <p>Access is restricted to authorized STUN administrators.</p>
        <Link to="/admin/login" className="btn-stun" style={{ marginTop: '20px' }}>Sign In</Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F9FA' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: '#111', color: '#FFF', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
        <Logo light />
        <span style={{ fontSize: '0.65rem', color: '#00D1D1', letterSpacing: '0.15em', marginTop: '6px', fontWeight: 700 }}>MANAGEMENT PORTAL</span>
        
        <nav style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <Link to="/admin" style={sidebarLinkStyle}><LayoutDashboard size={18} /> Dashboard</Link>
          <Link to="/admin/products" style={sidebarLinkStyle}><Package size={18} /> Products</Link>
          <Link to="/admin/orders" style={sidebarLinkStyle}><ShoppingCart size={18} /> Orders</Link>
          <Link to="/admin/cms" style={sidebarLinkStyle}><Sliders size={18} /> Homepage CMS</Link>
        </nav>

        <button onClick={() => { logout(); navigate('/'); }} style={{ ...sidebarLinkStyle, color: '#F87171', marginTop: 'auto' }}>
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* Main Administrative Console Body */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}

const sidebarLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '4px',
  fontSize: '0.85rem',
  color: '#AAA',
  transition: 'all 0.2s ease',
  textDecoration: 'none'
};