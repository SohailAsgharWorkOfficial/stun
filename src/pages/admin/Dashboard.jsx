import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { formatPKR } from '../../utils/formatters';
import { DollarSign, ShoppingCart, Users, Package, AlertTriangle, ArrowUpRight, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    ordersCount: 0,
    customersCount: 0,
    productsCount: 0,
    lowStockCount: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardMetrics() {
      setLoading(true);
      try {
        const [ordersSnap, productsSnap, usersSnap] = await Promise.all([
          getDocs(collection(db, 'orders')),
          getDocs(collection(db, 'products')),
          getDocs(collection(db, 'users'))
        ]);

        let sales = 0;
        const allOrders = [];
        ordersSnap.forEach(doc => {
          const d = doc.data();
          sales += Number(d.total || 0);
          allOrders.push({ id: doc.id, ...d });
        });

        // Client-side sort safely avoids missing index issues
        allOrders.sort((a, b) => {
          const tA = a.createdAt?.seconds || 0;
          const tB = b.createdAt?.seconds || 0;
          return tB - tA;
        });

        let lowStock = 0;
        productsSnap.forEach(doc => {
          if (Number(doc.data().stock || 0) <= 5) lowStock++;
        });

        setStats({
          totalSales: sales,
          ordersCount: ordersSnap.size,
          customersCount: usersSnap.size,
          productsCount: productsSnap.size,
          lowStockCount: lowStock
        });

        setRecentOrders(allOrders.slice(0, 6));
      } catch (err) {
        console.error("Admin dashboard calculation error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardMetrics();
  }, []);

  return (
    <div className="admin-page-container">
      <div className="view-head">
        <div>
          <h1>Commerce Intelligence</h1>
          <p>Live sales tracking, order queues, and inventory notifications.</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary">
          <Plus size={16} /> New Product
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon primary"><DollarSign size={22} /></div>
          <div>
            <p>Gross Store Revenue</p>
            <h3>{formatPKR(stats.totalSales)}</h3>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon blue"><ShoppingCart size={22} /></div>
          <div>
            <p>Total Orders</p>
            <h3>{stats.ordersCount}</h3>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon cyan"><Users size={22} /></div>
          <div>
            <p>Registered Shoppers</p>
            <h3>{stats.customersCount}</h3>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon warning"><Package size={22} /></div>
          <div>
            <p>Active SKUs</p>
            <h3>{stats.productsCount}</h3>
          </div>
        </div>
      </div>

      {stats.lowStockCount > 0 && (
        <div className="admin-alert-banner">
          <AlertTriangle size={20} color="var(--accent-red)" />
          <span><strong>{stats.lowStockCount} Products</strong> have low stock (5 or less).</span>
          <Link to="/admin/inventory">Review Inventory &rarr;</Link>
        </div>
      )}

      <div className="admin-card" style={{ marginTop: '2rem' }}>
        <div className="card-head">
          <h3>Recent Store Orders</h3>
          <Link to="/admin/orders" className="view-all-link">View Full Queue &rarr;</Link>
        </div>

        {loading ? (
          <p style={{ padding: '2rem', color: 'var(--text-muted)' }}>Retrieving live ledger...</p>
        ) : recentOrders.length === 0 ? (
          <div className="empty-orders-prompt">
            <p>No customer orders placed yet.</p>
            <small>Orders will automatically appear here once customers checkout via COD.</small>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order Code</th>
                <th>Customer</th>
                <th>City</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.orderCode}</strong></td>
                  <td>{order.customer?.fullName || 'Guest Customer'}</td>
                  <td>{order.customer?.city || 'Karachi'}</td>
                  <td><strong>{formatPKR(order.total)}</strong></td>
                  <td><span className="badge-cod">{order.paymentMethod || 'COD'}</span></td>
                  <td>
                    <span className={`status-badge ${order.orderStatus?.toLowerCase()}`}>
                      {order.orderStatus || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin/orders/${order.id}`} className="row-action-btn">
                      View <ArrowUpRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .admin-page-container { max-width: 1240px; margin: 0 auto; }
        .view-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .view-head h1 { font-size: 1.85rem; font-weight: 900; color: var(--primary-navy); }
        .view-head p { color: var(--text-muted); font-size: 0.9rem; margin-top: 0.2rem; }
        .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .kpi-card {
          background: #fff;
          border: 1px solid var(--border-light);
          padding: 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: var(--shadow-sm);
        }
        .kpi-icon { width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .kpi-icon.primary { background: #EFF6FF; color: var(--primary-blue); }
        .kpi-icon.blue { background: #DBEAFE; color: var(--primary-navy); }
        .kpi-icon.cyan { background: #E0F2FE; color: #0284C7; }
        .kpi-icon.warning { background: #FEF3C7; color: #D97706; }
        .kpi-card p { font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
        .kpi-card h3 { font-size: 1.4rem; font-weight: 800; color: var(--primary-navy); margin-top: 0.25rem; }
        .admin-alert-banner {
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 8px;
          padding: 0.9rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: #991B1B;
        }
        .admin-alert-banner a { margin-left: auto; font-weight: 800; text-decoration: underline; }
        .admin-card { background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; overflow: hidden; }
        .card-head { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-light); }
        .card-head h3 { font-size: 1.15rem; font-weight: 800; color: var(--primary-navy); }
        .view-all-link { font-size: 0.85rem; font-weight: 700; color: var(--primary-blue); }
        .badge-cod { background: #ECFDF5; color: #059669; font-weight: 800; font-size: 0.75rem; padding: 3px 8px; border-radius: 4px; }
        .row-action-btn { display: inline-flex; align-items: center; gap: 3px; font-weight: 700; color: var(--primary-blue); font-size: 0.85rem; }
        .empty-orders-prompt { padding: 3rem; text-align: center; color: var(--text-muted); }
        @media (max-width: 1024px) {
          .kpi-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}