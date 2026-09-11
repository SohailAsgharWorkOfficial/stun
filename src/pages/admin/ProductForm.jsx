import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useToast } from '../../context/ToastContext';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    categorySlug: 'cleaners',
    price: '',
    regularPrice: '',
    stock: 50,
    sku: '',
    imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&q=80&w=600',
    description: '',
    isBestSeller: false,
    active: true
  });

  const handleNameChange = (val) => {
    setForm({
      ...form,
      name: val,
      slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        categorySlug: form.categorySlug,
        price: Number(form.price),
        regularPrice: form.regularPrice ? Number(form.regularPrice) : null,
        stock: Number(form.stock),
        sku: form.sku,
        images: [form.imageUrl],
        description: form.description,
        isBestSeller: Boolean(form.isBestSeller),
        active: true,
        rating: 5,
        reviewCount: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'products'), payload);
      showToast('Product successfully published to store!', 'success');
      navigate('/admin/products');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page-container" style={{ maxWidth: 840 }}>
      <div className="view-head">
        <div>
          <Link to="/admin/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', marginBottom: 8, fontSize: '0.85rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Products
          </Link>
          <h1>Publish New Solution</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-card" style={{ padding: '2rem', marginTop: '1.5rem' }}>
        <div className="form-group">
          <label>Product Name</label>
          <input 
            type="text" 
            required 
            placeholder="e.g. STUN Multi-Surface Cleaner" 
            value={form.name} 
            onChange={e => handleNameChange(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label>Slug Identifier</label>
          <input 
            type="text" 
            required 
            value={form.slug} 
            onChange={e => setForm({...form, slug: e.target.value})} 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Category</label>
            <select value={form.categorySlug} onChange={e => setForm({...form, categorySlug: e.target.value})}>
              <option value="cleaners">Surface Cleaners</option>
              <option value="bundles">Bundles & Packs</option>
              <option value="disinfectants">Disinfectants</option>
            </select>
          </div>
          <div className="form-group">
            <label>SKU Number</label>
            <input 
              type="text" 
              required 
              placeholder="STUN-MS-500" 
              value={form.sku} 
              onChange={e => setForm({...form, sku: e.target.value})} 
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Price (PKR)</label>
            <input 
              type="number" 
              required 
              placeholder="1500" 
              value={form.price} 
              onChange={e => setForm({...form, price: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Regular Price (Strike Cut)</label>
            <input 
              type="number" 
              placeholder="2000" 
              value={form.regularPrice} 
              onChange={e => setForm({...form, regularPrice: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Initial Stock Count</label>
            <input 
              type="number" 
              required 
              value={form.stock} 
              onChange={e => setForm({...form, stock: e.target.value})} 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Image Direct Web URL</label>
          <input 
            type="url" 
            required 
            value={form.imageUrl} 
            onChange={e => setForm({...form, imageUrl: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <label>Product Formula Description</label>
          <textarea 
            rows={4} 
            required 
            placeholder="Key ingredients, application methods, safety guidelines..." 
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '1.25rem 0' }}>
          <input 
            type="checkbox" 
            id="bs" 
            checked={form.isBestSeller} 
            onChange={e => setForm({...form, isBestSeller: e.target.checked})} 
            style={{ width: 18, height: 18 }}
          />
          <label htmlFor="bs" style={{ fontWeight: 700, fontSize: '0.9rem' }}>Feature in "Best Selling Products" section on Homepage</label>
        </div>

        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%' }}>
          <Save size={18} /> {loading ? 'Committing to Store...' : 'Save and Publish Solution'}
        </button>
      </form>
    </div>
  );
}