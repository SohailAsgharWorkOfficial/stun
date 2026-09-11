import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useToast } from '../../context/ToastContext';
import { Tag, Plus, Trash2 } from 'lucide-react';
import { formatPKR } from '../../utils/formatters';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('fixed');
  const [minOrder, setMinOrder] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const loadCoupons = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'coupons'));
      setCoupons(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCoupons(); }, []);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!code.trim() || !value) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'coupons'), {
        code: code.trim().toUpperCase(),
        value: Number(value),
        type,
        minOrder: minOrder ? Number(minOrder) : 0,
        active: true,
        createdAt: serverTimestamp()
      });
      showToast('Coupon issued successfully!', 'success');
      setCode('');
      setValue('');
      setMinOrder('');
      loadCoupons();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, couponCode) => {
    if (!window.confirm(`Delete coupon "${couponCode}"?`)) return;
    try {
      await deleteDoc(doc(db, 'coupons', id));
      showToast('Coupon removed', 'info');
      setCoupons(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="view-head">
        <div>
          <h1>Discount Promotions & Coupons</h1>
          <p>Create fixed or percentage based discount codes for checkout promotions.</p>
        </div>
      </div>
      
      <div className="cat-layout-grid">
        <div className="admin-card form-card">
          <div className="card-header">
            <h3><Plus size={18} /> Issue New Coupon</h3>
          </div>
          <form onSubmit={handleCreateCoupon} className="card-body">
            <div className="form-group">
              <label>Coupon Code (e.g. STUN1000)</label>
              <input 
                type="text" 
                required 
                placeholder="STUN20"
                value={code} 
                onChange={e => setCode(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Discount Type</label>
              <select value={type} onChange={e => setType(e.target.value)}>
                <option value="fixed">Fixed PKR Amount Off</option>
                <option value="percentage">Percentage (%) Off</option>
              </select>
            </div>

            <div className="form-group">
              <label>Discount Value ({type === 'fixed' ? 'PKR' : '%'})</label>
              <input 
                type="number" 
                required 
                placeholder={type === 'fixed' ? '500' : '15'}
                value={value} 
                onChange={e => setValue(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Minimum Order Required (PKR)</label>
              <input 
                type="number" 
                placeholder="2000"
                value={minOrder} 
                onChange={e => setMinOrder(e.target.value)} 
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              {submitting ? 'Creating...' : 'Activate Coupon'}
            </button>
          </form>
        </div>

        <div className="admin-card table-card">
          <div className="card-header">
            <h3><Tag size={18} /> Active Promo Codes ({coupons.length})</h3>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {loading ? (
              <p style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading coupons...</p>
            ) : coupons.length === 0 ? (
              <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No coupons created yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Min. Order</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map(c => (
                    <tr key={c.id}>
                      <td><strong style={{ color: 'var(--primary-navy)' }}>{c.code}</strong></td>
                      <td>{c.type === 'fixed' ? formatPKR(c.value) : `${c.value}% OFF`}</td>
                      <td>{c.minOrder ? formatPKR(c.minOrder) : 'No Minimum'}</td>
                      <td>
                        <button onClick={() => handleDelete(c.id, c.code)} className="btn-del-action" title="Delete Coupon">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .admin-page-container { max-width: 1240px; margin: 0 auto; width: 100%; }
        .view-head { margin-bottom: 2rem; }
        .view-head h1 { font-size: 1.85rem; font-weight: 900; color: var(--primary-navy); }
        .view-head p { color: var(--text-muted); font-size: 0.9rem; margin-top: 0.2rem; }
        .cat-layout-grid { display: grid; grid-template-columns: 360px 1fr; gap: 2rem; align-items: start; }
        .admin-card { background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; box-shadow: var(--shadow-sm); overflow: hidden; }
        .card-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-light); background: #fafbfc; }
        .card-header h3 { font-size: 1.05rem; font-weight: 800; color: var(--primary-navy); display: flex; align-items: center; gap: 8px; }
        .card-body { padding: 1.5rem; }
        .btn-del-action { color: #94A3B8; display: flex; align-items: center; padding: 6px; border-radius: 4px; transition: var(--transition); }
        .btn-del-action:hover { color: var(--accent-red); background: #FEE2E2; }
        @media (max-width: 900px) { .cat-layout-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}