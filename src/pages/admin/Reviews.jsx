import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useToast } from '../../context/ToastContext';
import { Star, Check, Trash2, XCircle, Plus, MessageSquare } from 'lucide-react';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const loadReviews = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'reviews'));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setReviews(list);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadReviews(); 
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'reviews', id), { status: newStatus });
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      showToast(`Review marked as ${newStatus}`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this customer review permanently?')) return;
    try {
      await deleteDoc(doc(db, 'reviews', id));
      setReviews(prev => prev.filter(r => r.id !== id));
      showToast('Review purged', 'info');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        customerName: customerName.trim(),
        productName: productName.trim() || 'STUN Cleaning Kit',
        rating: Number(rating),
        comment: comment.trim(),
        status: 'approved',
        createdAt: serverTimestamp()
      });
      showToast('Review posted and approved!', 'success');
      setCustomerName('');
      setProductName('');
      setComment('');
      setShowAddForm(false);
      loadReviews();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-page-container">
      <div className="view-head">
        <div>
          <h1>Product Reviews & Moderation</h1>
          <p>Verify, approve, or reject customer feedback for the storefront.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={16} /> {showAddForm ? 'Close Form' : 'Add Testimonial'}
        </button>
      </div>

      {showAddForm && (
        <div className="admin-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.25rem', color: 'var(--primary-navy)' }}>Submit Verified Review</h3>
          <form onSubmit={handleCreateReview}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '1rem' }}>
              <div className="form-group">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Ayesha Khan" 
                  value={customerName} 
                  onChange={e => setCustomerName(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Product Reference</label>
                <input 
                  type="text" 
                  placeholder="STUN Miracle Stain Spray" 
                  value={productName} 
                  onChange={e => setProductName(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <select value={rating} onChange={e => setRating(e.target.value)}>
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Customer Experience Comment</label>
              <textarea 
                rows={3} 
                required 
                placeholder="Write genuine feedback..." 
                value={comment} 
                onChange={e => setComment(e.target.value)} 
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary" style={{ marginTop: '0.5rem' }}>
              {submitting ? 'Saving...' : 'Post Approved Review'}
            </button>
          </form>
        </div>
      )}

      <div className="admin-card">
        <div className="card-header">
          <h3><MessageSquare size={18} /> Submissions Queue ({reviews.length})</h3>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {loading ? (
            <p style={{ padding: '2rem', color: 'var(--text-muted)' }}>Scanning reviews...</p>
          ) : reviews.length === 0 ? (
            <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No customer reviews recorded yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Rating</th>
                  <th>Feedback Text</th>
                  <th>Status</th>
                  <th>Moderate</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(r => (
                  <tr key={r.id}>
                    <td><strong style={{ color: 'var(--primary-navy)' }}>{r.customerName || 'Anonymous'}</strong></td>
                    <td><span className="product-tag">{r.productName || 'General Store'}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < (r.rating || 5) ? "#F59E0B" : "#E2E8F0"} stroke="none" />
                        ))}
                      </div>
                    </td>
                    <td>
                      <p style={{ maxWidth: 380, fontSize: '0.85rem', color: '#475569', lineHeight: 1.4 }}>
                        "{r.comment}"
                      </p>
                    </td>
                    <td>
                      <span className={`status-badge ${r.status === 'approved' ? 'delivered' : r.status === 'rejected' ? 'cancelled' : 'pending'}`}>
                        {r.status || 'pending'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {r.status !== 'approved' && (
                          <button 
                            onClick={() => handleStatusUpdate(r.id, 'approved')} 
                            className="btn-approve" 
                            title="Approve Review"
                          >
                            <Check size={16} /> Approve
                          </button>
                        )}
                        {r.status !== 'rejected' && (
                          <button 
                            onClick={() => handleStatusUpdate(r.id, 'rejected')} 
                            className="btn-reject" 
                            title="Reject Review"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(r.id)} className="btn-del-action" title="Delete Review">
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

      <style>{`
        .admin-page-container { max-width: 1240px; margin: 0 auto; width: 100%; }
        .view-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .view-head h1 { font-size: 1.85rem; font-weight: 900; color: var(--primary-navy); }
        .view-head p { color: var(--text-muted); font-size: 0.9rem; margin-top: 0.2rem; }
        .product-tag { background: #F1F5F9; color: #475569; padding: 3px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; }
        .btn-approve {
          background: #DCFCE7;
          color: #15803D;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .btn-approve:hover { background: #BBF7D0; }
        .btn-reject { color: #94A3B8; display: flex; align-items: center; padding: 4px; border-radius: 4px; }
        .btn-reject:hover { color: var(--accent-red); background: #FEE2E2; }
      `}</style>
    </div>
  );
}