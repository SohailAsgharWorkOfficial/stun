import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { formatPKR } from '../../utils/formatters';
import { Plus, Trash2, Star, Search, AlertOctagon, Package } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { wipeAllProducts } from '../../utils/seedData';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [deletingAll, setDeletingAll] = useState(false);
  const { showToast } = useToast();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'products'));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setProducts(list);
      setFiltered(list);
    } catch (err) {
      showToast('Error loading products: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let res = products;
    if (categoryFilter !== 'all') {
      res = res.filter(p => p.categorySlug === categoryFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(p => 
        p.name?.toLowerCase().includes(q) || 
        p.sku?.toLowerCase().includes(q)
      );
    }
    setFiltered(res);
  }, [search, categoryFilter, products]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}" permanently?`)) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('Product removed', 'info');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleWipeAll = async () => {
    const confirmation = window.prompt('Type "DELETE" to clear all current products from Firestore:');
    if (confirmation !== 'DELETE') return;

    setDeletingAll(true);
    try {
      const count = await wipeAllProducts();
      setProducts([]);
      setFiltered([]);
      showToast(`Successfully wiped all ${count} products.`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setDeletingAll(false);
    }
  };

  const toggleBestSeller = async (id, currentVal) => {
    try {
      await updateDoc(doc(db, 'products', id), { isBestSeller: !currentVal });
      setProducts(prev => prev.map(p => p.id === id ? { ...p, isBestSeller: !currentVal } : p));
      showToast('Status updated', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="admin-page-container">
      {/* View Header */}
      <div className="view-head">
        <div>
          <h1>Product Catalog</h1>
          <p>Total Products Active: <strong>{products.length}</strong> items in database.</p>
        </div>
        <div className="view-head-actions">
          {products.length > 0 && (
            <button 
              onClick={handleWipeAll} 
              disabled={deletingAll}
              className="btn-danger-outline"
              title="Clean all repeated/seed products"
            >
              <AlertOctagon size={16} />
              {deletingAll ? 'Wiping...' : 'Clear All Products'}
            </button>
          )}
          <Link to="/admin/products/new" className="btn-primary">
            <Plus size={16} /> New Product
          </Link>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="admin-toolbar">
        <div className="toolbar-search">
          <Search size={17} color="#64748B" />
          <input 
            type="text" 
            placeholder="Search by product title or SKU..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select 
          className="toolbar-select"
          value={categoryFilter} 
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="cleaners">Cleaners</option>
          <option value="bundles">Bundles</option>
          <option value="disinfectants">Disinfectants</option>
        </select>
      </div>

      {/* Styled Card Table */}
      <div className="admin-card-container">
        {loading ? (
          <div className="catalog-loading">
            <p>Loading database items...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="catalog-empty">
            <Package size={48} color="#94A3B8" />
            <h3>No products found</h3>
            <p>Your database is clean. Click "+ New Product" to add your real cleaning products.</p>
            <Link to="/admin/products/new" className="btn-primary" style={{ marginTop: '1rem' }}>
              Add First Product
            </Link>
          </div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Media</th>
                <th>Title & SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Inventory</th>
                <th>Featured</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="img-box">
                      <img 
                        src={p.images?.[0] || 'https://via.placeholder.com/60'} 
                        alt={p.name} 
                      />
                    </div>
                  </td>
                  <td>
                    <div className="title-cell">
                      <span className="prod-name">{p.name}</span>
                      <span className="prod-sku">SKU: {p.sku || 'N/A'}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge-cat">{p.categorySlug || 'general'}</span>
                  </td>
                  <td>
                    <div className="price-cell">
                      <span className="main-price">{formatPKR(p.price)}</span>
                      {p.regularPrice && <del className="strike-price">{formatPKR(p.regularPrice)}</del>}
                    </div>
                  </td>
                  <td>
                    <span className={`stock-indicator ${Number(p.stock || 0) <= 5 ? 'low' : 'ok'}`}>
                      {p.stock || 0} Units
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => toggleBestSeller(p.id, p.isBestSeller)}
                      className={`star-toggle ${p.isBestSeller ? 'active' : ''}`}
                      title={p.isBestSeller ? 'Featured on homepage' : 'Not featured'}
                    >
                      <Star size={16} fill={p.isBestSeller ? "#F59E0B" : "none"} color={p.isBestSeller ? "#F59E0B" : "#94A3B8"} />
                      <span>{p.isBestSeller ? 'Best Seller' : 'Regular'}</span>
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(p.id, p.name)} 
                      className="table-del-btn"
                      title="Delete Product"
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

      <style>{`
        .admin-page-container {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }
        .view-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.75rem;
        }
        .view-head h1 {
          font-size: 1.85rem;
          font-weight: 900;
          color: var(--primary-navy);
          letter-spacing: -0.02em;
        }
        .view-head p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }
        .view-head-actions {
          display: flex;
          gap: 0.75rem;
        }
        .btn-danger-outline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0.75rem 1.25rem;
          border: 1.5px solid #FECACA;
          background: #FEF2F2;
          color: var(--accent-red);
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition);
        }
        .btn-danger-outline:hover:not(:disabled) {
          background: #FEE2E2;
          border-color: #FCA5A5;
        }
        .admin-toolbar {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .toolbar-search {
          flex: 1;
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 0.65rem 1rem;
          border-radius: 8px;
          gap: 0.65rem;
        }
        .toolbar-search input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.9rem;
        }
        .toolbar-select {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          outline: none;
          font-weight: 600;
          font-size: 0.9rem;
          color: #334155;
        }
        .admin-card-container {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 12px;
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }
        .products-table {
          width: 100%;
          border-collapse: collapse;
        }
        .products-table th {
          background: #F8FAFC;
          color: #64748B;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 1rem 1.25rem;
          border-bottom: 2px solid var(--border-light);
          text-align: left;
        }
        .products-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-light);
          vertical-align: middle;
        }
        .products-table tr:hover {
          background: #FAFCFE;
        }
        .img-box {
          width: 52px;
          height: 52px;
          background: #F1F5F9;
          border-radius: 8px;
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .img-box img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }
        .title-cell {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .prod-name {
          font-weight: 700;
          color: var(--primary-navy);
          font-size: 0.95rem;
        }
        .prod-sku {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-family: monospace;
        }
        .badge-cat {
          background: #EFF6FF;
          color: var(--primary-blue);
          padding: 4px 10px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
        }
        .price-cell {
          display: flex;
          flex-direction: column;
        }
        .main-price {
          font-weight: 800;
          color: var(--primary-navy);
          font-size: 0.95rem;
        }
        .strike-price {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .stock-indicator {
          display: inline-block;
          font-weight: 800;
          font-size: 0.85rem;
          padding: 3px 8px;
          border-radius: 4px;
        }
        .stock-indicator.ok {
          color: #047857;
          background: #ECFDF5;
        }
        .stock-indicator.low {
          color: #B91C1C;
          background: #FEF2F2;
        }
        .star-toggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          border: 1px solid var(--border-light);
          background: #ffffff;
          cursor: pointer;
          color: var(--text-muted);
        }
        .star-toggle.active {
          border-color: #FCD34D;
          background: #FEF3C7;
          color: #92400E;
        }
        .table-del-btn {
          color: #94A3B8;
          padding: 6px;
          border-radius: 6px;
          transition: var(--transition);
        }
        .table-del-btn:hover {
          color: var(--accent-red);
          background: #FEE2E2;
        }
        .catalog-loading, .catalog-empty {
          padding: 4rem 2rem;
          text-align: center;
          color: var(--text-muted);
        }
        .catalog-empty h3 {
          color: var(--primary-navy);
          margin: 0.75rem 0 0.25rem;
          font-size: 1.25rem;
        }
      `}</style>
    </div>
  );
}