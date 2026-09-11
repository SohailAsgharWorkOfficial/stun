import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { formatFirestoreDate } from '../../utils/formatters';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const snap = await getDocs(collection(db, 'users'));
        setCustomers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Customers load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="admin-page-container">
      <div className="view-head">
        <div>
          <h1>Registered Shoppers</h1>
          <p>Customer accounts, registration dates, and security clearance roles.</p>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: '1.5rem' }}>
        {loading ? (
          <p style={{ padding: '2rem', color: 'var(--text-muted)' }}>Compiling customer records...</p>
        ) : customers.length === 0 ? (
          <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No customers registered yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td><strong style={{ color: 'var(--primary-navy)' }}>{c.fullName || 'Verified Shopper'}</strong></td>
                  <td>{c.email}</td>
                  <td>
                    <span className={`status-badge ${c.role === 'super_admin' ? 'delivered' : 'processing'}`}>
                      {c.role || 'customer'}
                    </span>
                  </td>
                  <td>{formatFirestoreDate(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .admin-page-container { max-width: 1240px; margin: 0 auto; width: 100%; }
        .view-head h1 { font-size: 1.85rem; font-weight: 900; color: var(--primary-navy); }
        .view-head p { color: var(--text-muted); font-size: 0.9rem; margin-top: 0.2rem; }
        .admin-card { background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; overflow: hidden; }
      `}</style>
    </div>
  );
}