import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useToast } from '../../context/ToastContext';
import { Image as ImageIcon, Plus, Trash2, Power } from 'lucide-react';

export default function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [headline, setHeadline] = useState('');
  const [subheading, setSubheading] = useState('');
  const [ctaText, setCtaText] = useState('Order Now');
  const [ctaLink, setCtaLink] = useState('/shop');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const loadBanners = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'banners'));
      setBanners(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadBanners(); 
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!headline.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'banners'), {
        headline: headline.trim(),
        subheading: subheading.trim(),
        ctaText: ctaText.trim(),
        ctaLink: ctaLink.trim(),
        active: true,
        createdAt: serverTimestamp()
      });
      showToast('Banner promotion deployed!', 'success');
      setHeadline('');
      setSubheading('');
      setCtaText('Order Now');
      setCtaLink('/shop');
      loadBanners();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleBanner = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, 'banners', id), { active: !currentStatus });
      setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !currentStatus } : b));
      showToast(`Banner ${!currentStatus ? 'activated' : 'deactivated'}`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this banner promotion?')) return;
    try {
      await deleteDoc(doc(db, 'banners', id));
      setBanners(prev => prev.filter(b => b.id !== id));
      showToast('Banner deleted', 'info');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="view-head">
        <div>
          <h1>Homepage CMS & Banners</h1>
          <p>Deploy headline hero offers, promotional text, and call-to-action buttons dynamically.</p>
        </div>
      </div>

      <div className="cat-layout-grid">
        {/* Banner Creator Form */}
        <div className="admin-card form-card">
          <div className="card-header">
            <h3><Plus size={18} /> New Hero Promotion</h3>
          </div>
          <form onSubmit={handleSave} className="card-body">
            <div className="form-group">
              <label>Headline Title</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Har Ghar Ki Pehli Pasand."
                value={headline} 
                onChange={e => setHeadline(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Subheading Copy</label>
              <textarea 
                rows={3} 
                placeholder="High-performance laboratory cleaning formulas..."
                value={subheading} 
                onChange={e => setSubheading(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>CTA Button Label</label>
              <input 
                type="text" 
                required 
                placeholder="Order Now"
                value={ctaText} 
                onChange={e => setCtaText(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Destination Route</label>
              <input 
                type="text" 
                required 
                placeholder="/shop?category=bundles"
                value={ctaLink} 
                onChange={e => setCtaLink(e.target.value)} 
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              {submitting ? 'Deploying...' : 'Deploy Banner'}
            </button>
          </form>
        </div>

        {/* Existing Banners List */}
        <div className="admin-card table-card">
          <div className="card-header">
            <h3><ImageIcon size={18} /> Configured Storefront Banners ({banners.length})</h3>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {loading ? (
              <p style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading promotional banners...</p>
            ) : banners.length === 0 ? (
              <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No dynamic banners published yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Headline</th>
                    <th>Subheading</th>
                    <th>Button</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map(b => (
                    <tr key={b.id}>
                      <td><strong style={{ color: 'var(--primary-navy)' }}>{b.headline}</strong></td>
                      <td>
                        <small style={{ color: 'var(--text-muted)', display: 'block', maxWidth: 220 }}>
                          {b.subheading || '—'}
                        </small>
                      </td>
                      <td>
                        <span className="banner-link-pill">{b.ctaText} ({b.ctaLink})</span>
                      </td>
                      <td>
                        <button 
                          onClick={() => toggleBanner(b.id, b.active)}
                          className={`status-toggle-btn ${b.active ? 'active' : 'inactive'}`}
                          title="Toggle visibility"
                        >
                          <Power size={13} /> {b.active ? 'Live' : 'Hidden'}
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(b.id)} className="btn-del-action" title="Delete Banner">
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
        .banner-link-pill {
          background: #EFF6FF;
          color: var(--primary-blue);
          font-weight: 700;
          font-size: 0.75rem;
          padding: 3px 8px;
          border-radius: 4px;
        }
        .status-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 800;
          cursor: pointer;
          transition: var(--transition);
        }
        .status-toggle-btn.active { background: #DCFCE7; color: #15803D; }
        .status-toggle-btn.inactive { background: #F1F5F9; color: #94A3B8; }
      `}</style>
    </div>
  );
}