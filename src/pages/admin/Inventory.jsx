import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useToast } from '../../context/ToastContext';

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const loadInventory = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'products'));
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadInventory(); 
  }, []);

  const handleStockUpdate = async (id, newStock) => {
    try {
      await updateDoc(doc(db, 'products', id), { stock: Number(newStock) });
      setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Number(newStock) } : p));
      showToast('Inventory level adjusted', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="view-head">
        <div>
          <h1>Inventory & Stock Ledger</h1>
          <p>Real-time units monitoring and low stock threshold alerts.</p>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: '1.5rem' }}>
        {loading ? (
          <p style={{ padding: '2rem', color: 'var(--text-muted)' }}>Reading stock databases...</p>
        ) : products.length === 0 ? (
          <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No products registered.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Status</th>
                <th>Available Units</th>
                <th>Quick Adjust</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => {
                const stock = Number(p.stock || 0);
                let state = 'In Stock';
                let stateClass = 'stock-good';
                if (stock === 0) { state = 'Out of Stock'; stateClass = 'stock-danger'; }
                else if (stock <= 5) { state = 'Low Threshold'; stateClass = 'stock-warn'; }

                return (
                  <tr key={p.id}>
                    <td><strong style={{ color: 'var(--primary-navy)' }}>{p.name}</strong></td>
                    <td><code>{p.sku || 'N/A'}</code></td>
                    <td><span className={`stock-pill ${stateClass}`}>{state}</span></td>
                    <td><strong>{stock}</strong> units</td>
                    <td>
                      <div className="quick-adjust-row">
                        <button 
                          className="stock-btn" 
                          onClick={() => handleStockUpdate(p.id, Math.max(0, stock - 10))}
                        >
                          -10
                        </button>
                        <button 
                          className="stock-btn" 
                          onClick={() => handleStockUpdate(p.id, stock + 10)}
                        >
                          +10
                        </button>
                        <button 
                          className="stock-btn" 
                          onClick={() => handleStockUpdate(p.id, stock + 50)}
                        >
                          +50
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .admin-page-container { max-width: 1240px; margin: 0 auto; width: 100%; }
        .view-head h1 { font-size: 1.85rem; font-weight: 900; color: var(--primary-navy); }
        .view-head p { color: var(--text-muted); font-size: 0.9rem; margin-top: 0.2rem; }
        .admin-card { background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; overflow: hidden; }
        .stock-pill { padding: 4px 10px; border-radius: 50px; font-size: 0.75rem; font-weight: 800; }
        .stock-pill.stock-good { background: #DCFCE7; color: #15803D; }
        .stock-pill.stock-warn { background: #FEF3C7; color: #B45309; }
        .stock-pill.stock-danger { background: #FEE2E2; color: #B91C1C; }
        .quick-adjust-row { display: flex; gap: 6px; }
        .stock-btn {
          border: 1px solid var(--border-light);
          padding: 5px 10px;
          border-radius: 6px;
          font-weight: 800;
          font-size: 0.8rem;
          background: #F8FAFC;
          cursor: pointer;
          transition: var(--transition);
        }
        .stock-btn:hover { background: var(--primary-navy); color: #fff; border-color: var(--primary-navy); }
      `}</style>
    </div>
  );
}