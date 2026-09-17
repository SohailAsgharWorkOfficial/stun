import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [orderSnap, prodSnap, userSnap] = await Promise.all([
          getDocs(collection(db, 'orders')),
          getDocs(collection(db, 'products')),
          getDocs(collection(db, 'users'))
        ]);

        setOrders(orderSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setProducts(prodSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setUsersCount(userSnap.size);
      } catch (err) {
        console.error("Dashboard fetch err:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const pendingOrders = orders.filter(o => !o.status || o.status === 'Pending').length;
  const completedOrders = orders.filter(o => o.status === 'Delivered').length;
  const lowStock = products.filter(p => Number(p.stock) > 0 && Number(p.stock) <= 5);

  const kpis = [
    { label: 'Total Revenue', value: `₨ ${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: '#00D1D1' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: '#3B82F6' },
    { label: 'Pending Processing', value: pendingOrders, icon: Clock, color: '#F59E0B' },
    { label: 'Delivered', value: completedOrders, icon: CheckCircle, color: '#10B981' },
    { label: 'Total Products', value: products.length, icon: Package, color: '#8B5CF6' },
    { label: 'Total Customers', value: usersCount || orders.length, icon: Users, color: '#EC4899' }
  ];

  if (loading) {
    return <div style={{ padding: '40px', color: '#666' }}>Analyzing store records...</div>;
  }

  return (
    <div style={{ maxWidth: '1440px' }}>
      <div style={{ marginBottom: '36px' }}>
        <h1 className="editorial-title" style={{ fontSize: '2rem' }}>Store Executive Overview</h1>
        <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '4px' }}>
          Real-time metrics for inventory and Cash on Delivery logistics.
        </p>
      </div>

      {/* 6 High-Impact Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} style={{ background: '#FFF', padding: '24px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666' }}>
                  {k.label}
                </span>
                <Icon size={20} color={k.color} />
              </div>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                {k.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Grid: Recent Orders & Stock Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        
        {/* Recent Orders Overview */}
        <div style={{ background: '#FFF', padding: '28px', border: '1px solid #E5E7EB' }}>
          <h3 className="editorial-title" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Recent Dispatches</h3>
          {orders.length === 0 ? (
            <p style={{ color: '#888', fontSize: '0.85rem' }}>No incoming orders recorded yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.slice(0, 6).map((order) => (
                <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px' }}>
                  <div>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 600 }}>{order.customer?.fullName || order.customer?.name || 'Guest'}</h5>
                    <span style={{ fontSize: '0.75rem', color: '#888' }}>{order.customer?.city || 'Pakistan'}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>₨ {Number(order.total || 0).toLocaleString()}</div>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      background: order.status === 'Delivered' ? '#D1FAE5' : '#FEF3C7',
                      color: order.status === 'Delivered' ? '#065F46' : '#92400E',
                      fontWeight: 600,
                      borderRadius: '2px'
                    }}>
                      {order.status || 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Inventory & Stock Alerts */}
        <div style={{ background: '#FFF', padding: '28px', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <AlertTriangle size={20} color="#EF4444" />
            <h3 className="editorial-title" style={{ fontSize: '1.2rem' }}>Inventory Status</h3>
          </div>
          {lowStock.length === 0 ? (
            <p style={{ color: '#888', fontSize: '0.85rem' }}>All warehouse inventories are currently above threshold.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {lowStock.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem' }}>{p.name}</span>
                  <span style={{ color: '#EF4444', fontWeight: 700, fontSize: '0.8rem' }}>{p.stock} units remaining</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}