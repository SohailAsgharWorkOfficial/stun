import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { formatPKR, formatFirestoreDate } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import { Eye, Search } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'orders'));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setOrders(list);
      setFiltered(list);
    } catch (err) {
      showToast('Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let res = orders;
    if (filterStatus !== 'all') {
      res = res.filter(o => o.orderStatus?.toLowerCase() === filterStatus.toLowerCase());
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      res = res.filter(o => 
        o.orderCode?.toLowerCase().includes(term) ||
        o.customer?.fullName?.toLowerCase().includes(term) ||
        o.customer?.phone?.includes(term)
      );
    }
    setFiltered(res);
  }, [searchTerm, filterStatus, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { orderStatus: newStatus });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
      showToast(`Order marked as ${newStatus}`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="view-head">
        <div>
          <h1>Customer Orders Queue</h1>
          <p>Process pending dispatches, print invoices, and update delivery timelines.</p>
        </div>
      </div>

      <div className="orders-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search by Order ID, Name, Phone..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="filter-select">
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="admin-card" style={{ marginTop: '1.5rem' }}>
        {loading ? (
          <p style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading orders database...</p>
        ) : filtered.length === 0 ? (
          <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No matching orders found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order Code</th>
                <th>Customer Info</th>
                <th>City</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Change Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td><strong>{o.orderCode}</strong></td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{o.customer?.fullName || 'N/A'}</div>
                    <small style={{ color: 'var(--text-muted)' }}>{o.customer?.phone}</small>
                  </td>
                  <td>{o.customer?.city || 'Pakistan'}</td>
                  <td>{formatFirestoreDate(o.createdAt)}</td>
                  <td><strong>{formatPKR(o.total)}</strong></td>
                  <td>
                    <span className={`status-badge ${o.orderStatus?.toLowerCase()}`}>
                      {o.orderStatus}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={o.orderStatus || 'Pending'} 
                      onChange={e => handleStatusChange(o.id, e.target.value)}
                      className="status-dropdown"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <Link to={`/admin/orders/${o.id}`} className="icon-btn-view" title="View Full Details">
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .orders-toolbar { display: flex; gap: 1rem; margin-top: 1.5rem; }
        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          background: #fff;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 0.6rem 1rem;
          gap: 8px;
        }
        .search-box input { border: none; outline: none; width: 100%; font-size: 0.9rem; }
        .filter-select {
          background: #fff;
          border: 1px solid var(--border-light);
          padding: 0.6rem 1.25rem;
          border-radius: 8px;
          outline: none;
          font-weight: 600;
        }
        .status-dropdown {
          padding: 4px 8px;
          border-radius: 6px;
          border: 1px solid var(--border-light);
          font-size: 0.85rem;
          font-weight: 700;
          outline: none;
        }
        .icon-btn-view {
          color: var(--primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}