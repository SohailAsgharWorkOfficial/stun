import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useToast } from '../../context/ToastContext';
import { Trash2, Layers, Plus } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const loadCategories = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'categories'));
      setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadCategories(); 
  }, []);

  const handleNameChange = (val) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'categories'), { 
        name: name.trim(), 
        slug: slug.trim(), 
        description: description.trim(), 
        active: true,
        createdAt: serverTimestamp()
      });
      showToast('Category created successfully!', 'success');
      setName('');
      setSlug('');
      setDescription('');
      loadCategories();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, catName) => {
    if (!window.confirm(`Delete "${catName}" category?`)) return;
    try {
      await deleteDoc(doc(db, 'categories', id));
      showToast('Category removed', 'info');
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="view-head">
        <div>
          <h1>Product Categories</h1>
          <p>Organize product taxonomy for storefront navigation and shop filters.</p>
        </div>
      </div>

      <div className="cat-layout-grid">
        {/* Create Category Form */}
        <div className="admin-card form-card">
          <div className="card-header">
            <h3><Plus size={18} /> Create Category</h3>
          </div>
          <form onSubmit={handleCreate} className="card-body">
            <div className="form-group">
              <label>Category Name</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Surface Cleaners"
                value={name} 
                onChange={e => handleNameChange(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Slug URL Identifier</label>
              <input 
                type="text" 
                required 
                placeholder="surface-cleaners"
                value={slug} 
                onChange={e => setSlug(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Description (Optional)</label>
              <textarea 
                rows={3} 
                placeholder="Brief category summary..."
                value={description} 
                onChange={e => setDescription(e.target.value)} 
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              {submitting ? 'Saving...' : 'Save Category'}
            </button>
          </form>
        </div>

        {/* Existing Categories Table */}
        <div className="admin-card table-card">
          <div className="card-header">
            <h3><Layers size={18} /> Existing Taxonomies ({categories.length})</h3>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {loading ? (
              <p style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading categories...</p>
            ) : categories.length === 0 ? (
              <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No categories created yet. Add your first category using the form.
              </p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Slug URL</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(c => (
                    <tr key={c.id}>
                      <td><strong style={{ color: 'var(--primary-navy)' }}>{c.name}</strong></td>
                      <td><code>{c.slug}</code></td>
                      <td>
                        <button 
                          onClick={() => handleDelete(c.id, c.name)} 
                          className="btn-del-action"
                          title="Delete Category"
                        >
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
        
        .cat-layout-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 2rem;
          align-items: start;
        }
        .admin-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 12px;
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }
        .card-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-light);
          background: #fafbfc;
        }
        .card-header h3 {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--primary-navy);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .card-body {
          padding: 1.5rem;
        }
        .btn-del-action {
          color: #94A3B8;
          display: flex;
          align-items: center;
          padding: 6px;
          border-radius: 4px;
          transition: var(--transition);
        }
        .btn-del-action:hover {
          color: var(--accent-red);
          background: #FEE2E2;
        }
        @media (max-width: 900px) {
          .cat-layout-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}