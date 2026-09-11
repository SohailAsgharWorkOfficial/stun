import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, ExternalLink, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminNavbar() {
  const { user, profile, logout } = useAuth();

  return (
    <div className="admin-nav-bar">
      <div className="admin-status">
        <Shield size={16} color="var(--electric-cyan)" />
        <span>Role: <strong>{profile?.role?.toUpperCase() || 'ADMIN'}</strong></span>
      </div>

      <div className="admin-nav-actions">
        <Link to="/" target="_blank" className="nav-store-link">
          Store Front <ExternalLink size={14} />
        </Link>
        <span className="admin-email">{user?.email}</span>
        <button onClick={logout} className="btn-logout" title="Sign Out">
          <LogOut size={16} />
        </button>
      </div>

      <style>{`
        .admin-nav-bar {
          height: 60px;
          background: #FFFFFF;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
        }
        .admin-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-dark);
        }
        .admin-nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav-store-link {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary-blue);
        }
        .admin-email {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .btn-logout {
          color: var(--accent-red);
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
}