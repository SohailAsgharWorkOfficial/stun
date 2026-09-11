import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminNavbar from '../../components/layout/AdminNavbar';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { formatPKR, formatFirestoreDate } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import { ArrowLeft, Printer } from 'lucide-react';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, 'orders', id));
        if (snap.exists()) {
          setOrder({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        showToast(err.message, 'error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const updateStatus = async (status) => {
    try {
      await updateDoc(doc(db, 'orders', id), { orderStatus: status });
      setOrder(prev => ({ ...prev, orderStatus: status }));
      showToast(`Status updated to ${status}`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  if (loading) return <div className="admin-screen p-4">Loading order...</div>;
  if (!order) return <div className="admin-screen p-4">Order record not found.</div>;

  return (
    <div className="admin-view-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminNavbar />
        <div className="admin-container">
          <div className="od-top-bar">
            <Link to="/admin/orders" className="back-link"><ArrowLeft size={16} /> All Orders</Link>
            <div className="od-actions">
              <button className="btn-print" onClick={() => window.print()}><Printer size={16} /> Print Invoice</button>
              <select 
                value={order.orderStatus} 
                onChange={e => updateStatus(e.target.value)}
                className="status-select"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="od-card printable-area">
            <div className="od-header">
              <div>
                <h2>Order #{order.orderCode}</h2>
                <p>Placed on {formatFirestoreDate(order.createdAt)}</p>
              </div>
              <div className="od-badge">{order.orderStatus}</div>
            </div>

            <div className="od-grid">
              <div className="od-box">
                <h4>Customer Details</h4>
                <p><strong>{order.customer?.fullName}</strong></p>
                <p>{order.customer?.email}</p>
                <p>{order.customer?.phone}</p>
              </div>
              <div className="od-box">
                <h4>Shipping Address</h4>
                <p>{order.customer?.address}</p>
                <p>{order.customer?.city}, {order.customer?.province} {order.customer?.postalCode}</p>
                <p>Payment: {order.paymentMethod}</p>
              </div>
            </div>

            <table className="admin-table od-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{item.name}</strong>
                      {item.variantName && <div><small>Size: {item.variantName}</small></div>}
                    </td>
                    <td>{item.variantSku || 'N/A'}</td>
                    <td>{formatPKR(item.price)}</td>
                    <td>{item.quantity}</td>
                    <td><strong>{formatPKR(item.price * item.quantity)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="od-summary">
              <div className="od-sum-row"><span>Subtotal:</span> <span>{formatPKR(order.subtotal)}</span></div>
              <div className="od-sum-row"><span>Shipping:</span> <span>{formatPKR(order.shippingFee)}</span></div>
              {order.discount > 0 && (
                <div className="od-sum-row discount"><span>Discount:</span> <span>- {formatPKR(order.discount)}</span></div>
              )}
              <div className="od-sum-row grand"><span>Total:</span> <span>{formatPKR(order.total)}</span></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-view-shell { display: flex; min-height: 100vh; background: #F8FAFC; }
        .admin-main { flex: 1; display: flex; flex-direction: column; }
        .od-top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .od-actions { display: flex; gap: 1rem; }
        .btn-print { display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: #fff; border: 1px solid var(--border-light); border-radius: 4px; font-weight: 600; cursor: pointer; }
        .status-select { padding: 6px 12px; border-radius: 4px; border: 1px solid var(--border-light); font-weight: 700; }
        .od-card { background: #fff; border: 1px solid var(--border-light); border-radius: 8px; padding: 2.5rem; }
        .od-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 1.5rem; margin-bottom: 1.5rem; }
        .od-badge { background: var(--primary-navy); color: #fff; padding: 4px 12px; border-radius: 50px; font-weight: 800; font-size: 0.85rem; }
        .od-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem; }
        .od-box h4 { font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px; }
        .od-table { margin-top: 1rem; }
        .od-summary { max-width: 320px; margin-left: auto; margin-top: 2rem; border-top: 2px dashed var(--border-light); padding-top: 1rem; }
        .od-sum-row { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .od-sum-row.grand { font-weight: 900; font-size: 1.2rem; color: var(--primary-navy); border-top: 1px solid var(--border-light); padding-top: 8px; }
        @media print {
          .admin-sidebar, .admin-navbar, .od-top-bar { display: none; }
          .admin-view-shell { display: block; background: #fff; }
          .od-card { border: none; padding: 0; }
        }
      `}</style>
    </div>
  );
}