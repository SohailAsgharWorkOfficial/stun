import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createStoreOrder, validateCouponCode } from '../firebase/firestore';

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: '',
    instructions: ''
  });

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [loading, setLoading] = useState(false);

  const shippingFee = subtotal > 3000 ? 0 : 250;
  const grandTotal = subtotal + shippingFee - discount;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponError('');
    try {
      const res = await validateCouponCode(couponCode, subtotal);
      setDiscount(res.discount);
      setCouponApplied(true);
    } catch (err) {
      setCouponError(err.message);
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    try {
      const orderPayload = {
        customerId: user?.uid || 'GUEST',
        customer: formData,
        items: cart,
        subtotal,
        discount,
        shippingFee,
        total: grandTotal,
        paymentMethod: 'Cash On Delivery'
      };

      const completed = await createStoreOrder(orderPayload);
      clearCart();
      navigate(`/account/orders/${completed.id}`, { state: { order: completed } });
    } catch (err) {
      alert('Failed to place order: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page container">
      <div className="checkout-grid">
        {/* FORM */}
        <form onSubmit={handleSubmitOrder} className="checkout-form">
          <h2>Shipping Information</h2>
          <div className="form-group">
            <label>Full Name *</label>
            <input 
              type="text" 
              required 
              value={formData.fullName} 
              onChange={e => setFormData({...formData, fullName: e.target.value})} 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input 
                type="email" 
                required 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input 
                type="tel" 
                required 
                placeholder="03001234567" 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Delivery Street Address *</label>
            <input 
              type="text" 
              required 
              value={formData.address} 
              onChange={e => setFormData({...formData, address: e.target.value})} 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input 
                type="text" 
                required 
                value={formData.city} 
                onChange={e => setFormData({...formData, city: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label>Province *</label>
              <select 
                value={formData.province} 
                onChange={e => setFormData({...formData, province: e.target.value})}
              >
                <option value="Sindh">Sindh</option>
                <option value="Punjab">Punjab</option>
                <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                <option value="Balochistan">Balochistan</option>
                <option value="Islamabad Capital Territory">Islamabad</option>
              </select>
            </div>
          </div>

          <h2>Payment Method</h2>
          <div className="payment-box">
            <input type="radio" checked readOnly id="cod" />
            <label htmlFor="cod">
              <strong>Cash on Delivery (COD)</strong>
              <p>Pay upon delivery at your doorstep anywhere in Pakistan.</p>
            </label>
          </div>

          <button type="submit" disabled={loading} className="btn-primary btn-submit-order">
            {loading ? 'Processing Order...' : `Complete Order — Rs. ${grandTotal.toLocaleString()} PKR`}
          </button>
        </form>

        {/* ORDER SUMMARY */}
        <div className="order-summary-card">
          <h3>Order Summary ({cart.length} items)</h3>
          <div className="cart-items-preview">
            {cart.map(item => (
              <div key={item.itemKey} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="item-meta">
                  <h4>{item.name}</h4>
                  {item.variantName && <span>Size: {item.variantName}</span>}
                  <p>Qty: {item.quantity}</p>
                </div>
                <strong>Rs. {(item.price * item.quantity).toLocaleString()}</strong>
              </div>
            ))}
          </div>

          <form onSubmit={handleApplyCoupon} className="coupon-form">
            <input 
              type="text" 
              placeholder="Discount Code" 
              value={couponCode} 
              onChange={e => setCouponCode(e.target.value)} 
            />
            <button type="submit">Apply</button>
          </form>
          {couponError && <p className="error-msg">{couponError}</p>}
          {couponApplied && <p className="success-msg">Discount applied!</p>}

          <div className="totals-ledger">
            <div className="ledger-row">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()} PKR</span>
            </div>
            <div className="ledger-row">
              <span>Shipping Fee</span>
              <span>{shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee} PKR`}</span>
            </div>
            {discount > 0 && (
              <div className="ledger-row discount">
                <span>Discount</span>
                <span>- Rs. {discount.toLocaleString()} PKR</span>
              </div>
            )}
            <div className="ledger-row grand-total">
              <span>Total</span>
              <span>Rs. {grandTotal.toLocaleString()} PKR</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-page { padding: 4rem 1.5rem; }
        .checkout-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 3rem;
        }
        .checkout-form h2 {
          font-size: 1.25rem;
          margin: 1.5rem 0 1rem 0;
          color: var(--primary-navy);
        }
        .checkout-form h2:first-of-type { margin-top: 0; }
        .form-group { margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.35rem; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: #475569; }
        .form-group input, .form-group select {
          padding: 0.75rem;
          border: 1px solid var(--border-light);
          border-radius: 6px;
          outline: none;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .payment-box {
          border: 2px solid var(--electric-cyan);
          background: #F0FDFA;
          padding: 1rem;
          border-radius: 6px;
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .btn-submit-order { width: 100%; padding: 1.1rem; font-size: 1rem; }
        .order-summary-card {
          background: #fff;
          border: 1px solid var(--border-light);
          padding: 2rem;
          border-radius: 8px;
          height: fit-content;
        }
        .summary-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 1rem;
        }
        .summary-item img { width: 50px; height: 50px; object-fit: contain; }
        .item-meta { flex-grow: 1; }
        .item-meta h4 { font-size: 0.85rem; }
        .item-meta span, .item-meta p { font-size: 0.75rem; color: var(--text-muted); }
        .coupon-form { display: flex; gap: 0.5rem; margin: 1.5rem 0; }
        .coupon-form input {
          flex-grow: 1;
          padding: 0.6rem;
          border: 1px solid var(--border-light);
          border-radius: 4px;
        }
        .coupon-form button {
          background: var(--primary-navy);
          color: white;
          padding: 0 1.2rem;
          border-radius: 4px;
          font-weight: 600;
        }
        .totals-ledger { border-top: 2px dashed var(--border-light); padding-top: 1rem; }
        .ledger-row { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
        .ledger-row.grand-total {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--primary-navy);
          border-top: 1px solid var(--border-light);
          padding-top: 0.75rem;
        }
        .error-msg { color: var(--accent-red); font-size: 0.8rem; }
        .success-msg { color: var(--success); font-size: 0.8rem; }
        @media (max-width: 900px) { .checkout-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}