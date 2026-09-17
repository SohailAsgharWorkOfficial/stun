import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Trash2, Plus } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', category: 'floor', thumbnail: '', description: '' });

  const loadProducts = async () => {
    const snap = await getDocs(collection(db, 'products'));
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { loadProducts(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'products'), {
      ...form,
      price: Number(form.price),
      createdAt: serverTimestamp()
    });
    setForm({ name: '', price: '', category: 'floor', thumbnail: '', description: '' });
    setShowAdd(false);
    loadProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently remove this product?")) {
      await deleteDoc(doc(db, 'products', id));
      loadProducts();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 className="editorial-title" style={{ fontSize: '2rem' }}>Product Catalogue</h1>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-stun">
          <Plus size={16} /> Add Formulation
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} style={{ background: '#FFF', padding: '24px', border: '1px solid #E5E7EB', marginBottom: '32px', display: 'grid', gap: '14px' }}>
          <input required placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inp} />
          <input required type="number" placeholder="Price (PKR)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} style={inp} />
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={inp}>
            <option value="floor">Floor Care</option>
            <option value="surface">Surfaces</option>
            <option value="glass">Glass Sparkle</option>
            <option value="bathroom">Bathroom</option>
          </select>
          <input placeholder="Thumbnail Image URL" value={form.thumbnail} onChange={e => setForm({...form, thumbnail: e.target.value})} style={inp} />
          <textarea rows={2} placeholder="Short Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={inp} />
          <button type="submit" className="btn-stun" style={{ width: 'fit-content' }}>Save Product</button>
        </form>
      )}

      <table style={{ width: '100%', background: '#FFF', borderCollapse: 'collapse', border: '1px solid #E5E7EB' }}>
        <thead>
          <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
            <th style={th}>Item</th>
            <th style={th}>Category</th>
            <th style={th}>Price</th>
            <th style={th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
              <td style={td}><strong>{p.name}</strong></td>
              <td style={td}>{p.category}</td>
              <td style={td}>₨ {p.price}</td>
              <td style={td}>
                <button onClick={() => handleDelete(p.id)} style={{ color: '#EF4444' }}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const inp = { width: '100%', padding: '10px', border: '1px solid #DDD', fontSize: '0.85rem' };
const th = { padding: '12px 16px', fontSize: '0.8rem', textTransform: 'uppercase', color: '#666' };
const td = { padding: '14px 16px', fontSize: '0.85rem' };