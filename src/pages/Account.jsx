import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { formatPKR, formatFirestoreDate } from '../utils/formatters';

export default function Account() {
  const { user, profile, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'orders'),
          where('customerId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Failed to load user orders:", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [user]);

  return (
    <div>
      <Header />
      <main className="container account-page">
        <div className="account-banner">
          <div>
            <h1>Welcome, {profile?.fullName || user?.email}</h1>
            <p>{user?.email} • Member since {formatFirestoreDate(profile?.createdAt)}</p>
          </div>
          <button className="btn-logout-client" onClick={logout}>Sign Out</button>
        </div>

        <section className="orders-section">
          <h2>Order History</h2>
          {loading ? (
            <p>Retrieving recent purchases...</p>
          ) : orders.length === 0 ? (
            <p className="no-orders">You haven't placed any orders yet.</p>
          ) : (
            <div className="orders-table-wrapper">
              <table className="account-orders-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Items</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(ord => (
                    <tr key={ord.id}>
                      <td><strong>{ord.orderCode}</strong></td>
                      <td>{formatFirestoreDate(ord.createdAt)}</td>
                      <td><span className="order-pill">{ord.orderStatus}</span></td>
                      <td>{ord.items?.length || 0} Products</td>
                      <td><strong>{formatPKR(ord.total)}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
      <Footer />

      <style>{`
        .account-page { padding: 4rem 1.5rem; min-height: 60vh; }
        .account-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 3rem;
        }
        .account-banner h1 { font-size: 1.75rem; font-weight: 800; color: var(--primary-navy); }
        .account-banner p { color: var(--text-muted); font-size: 0.9rem; }
        .btn-logout-client {
          background: #FEF2F2;
          color: var(--accent-red);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-weight: 600;
        }
        .orders-section h2 { font-size: 1.25rem; font-weight: 800; margin-bottom: 1.5rem; }
        .account-orders-table { width: 100%; border-collapse: collapse; }
        .account-orders-table th, .account-orders-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--border-light);
        }
        .order-pill {
          background: #EFF6FF;
          color: var(--primary-blue);
          padding: 0.25rem 0.6rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}