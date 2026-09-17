import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, updateDoc, doc, orderBy, query } from 'firebase/firestore';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const snap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch {
      const snap = await getDocs(collection(db, 'orders'));
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
  };

  useEffect(() => { loadOrders(); }, []);

  const changeStatus = async (id, status) => {
    await updateDoc(doc(db, 'orders', id), { status });
    loadOrders();
  };

  return (
    <div>
      <h1 className="editorial-title" style={{ fontSize: '2rem', marginBottom: '24px' }}>Customer Orders</h1>

      <table style={{ width: '100%', background: '#FFF', borderCollapse: 'collapse', border: '1px solid #E5E7EB' }}>
        <thead>
          <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
            <th style={th}>Order Ref</th>
            <th style={th}>Recipient</th>
            <th style={th}>City / Address</th>
            <th style={th}>Items</th>
            <th style={th}>Total (COD)</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
              <td style={td}><code>{o.id.substring(0, 8)}</code></td>
              <td style={td}>
                <div><strong>{o.customer?.fullName || o.customer?.name}</strong></div>
                <span style={{ fontSize: '0.75rem', color: '#666' }}>{o.customer?.phone}</span>
              </td>
              <td style={td}>
                <div>{o.customer?.city}</div>
                <span style={{ fontSize: '0.75rem', color: '#888' }}>{o.customer?.address}</span>
              </td>
              <td style={td}>{o.items?.length || 1} formulation(s)</td>
              <td style={td}><strong>₨ {o.total?.toLocaleString()}</strong></td>
              <td style={td}>
                <select 
                  value={o.status || 'Pending'} 
                  onChange={(e) => changeStatus(o.id, e.target.value)}
                  style={{ padding: '6px', fontSize: '0.75rem' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = { padding: '12px 16px', fontSize: '0.8rem', textTransform: 'uppercase', color: '#666' };
const td = { padding: '14px 16px', fontSize: '0.85rem' };