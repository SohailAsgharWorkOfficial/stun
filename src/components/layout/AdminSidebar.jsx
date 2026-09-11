import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Layers, 
  Archive, 
  Tag, 
  MessageSquare, 
  Image as ImageIcon, 
  Users, 
  ArrowLeft 
} from 'lucide-react';

export default function AdminSidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Inventory', path: '/admin/inventory', icon: Archive },
    { name: 'Coupons', path: '/admin/coupons', icon: Tag },
    { name: 'Reviews', path: '/admin/reviews', icon: MessageSquare },
    { name: 'Banners CMS', path: '/admin/banners', icon: ImageIcon },
    { name: 'Customers', path: '/admin/customers', icon: Users }
  ];

  return (
    <aside className="admin-sidebar-pane">
      <div className="sidebar-brand-box">
        <Link to="/" className="brand-badge-link">
          <div className="logo-brand">
            ST<span className="logo-cyan">UN</span>
          </div>
          <span className="panel-pill">PANEL</span>
        </Link>
      </div>

      <nav className="sidebar-nav-list">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom-action">
        <Link to="/" className="storefront-link">
          <ArrowLeft size={16} />
          <span>View Storefront</span>
        </Link>
      </div>

      <style>{`
        .admin-sidebar-pane {
          width: 250px;
          min-width: 250px;
          background: #0B2545;
          color: #fff;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          user-select: none;
        }
        .sidebar-brand-box {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 1.25rem;
        }
        .brand-badge-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
        }
        .logo-brand {
          font-size: 1.75rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #ffffff;
          line-height: 1;
        }
        .logo-cyan {
          color: var(--electric-cyan);
        }
        .panel-pill {
          background: var(--primary-blue);
          color: var(--electric-cyan);
          font-size: 0.7rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.08em;
        }
        .sidebar-nav-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.75rem 1rem;
          color: #94A3B8;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: var(--transition);
        }
        .sidebar-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }
        .sidebar-link.active {
          color: #ffffff;
          background: var(--primary-blue);
          box-shadow: 0 4px 12px rgba(19, 62, 135, 0.4);
        }
        .sidebar-bottom-action {
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .storefront-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94A3B8;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          padding: 0.5rem;
          border-radius: 6px;
          transition: var(--transition);
        }
        .storefront-link:hover {
          color: var(--electric-cyan);
        }
      `}</style>
    </aside>
  );
}