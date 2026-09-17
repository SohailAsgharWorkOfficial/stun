import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const shippingFee = 250;
  const grandTotal = subtotal + shippingFee;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    province: 'Punjab',
    city: '',
    address: '',
    postalCode: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setSubmitting(true);

    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        customer: form,
        items: cart,
        subtotal,
        shippingFee,
        total: grandTotal,
        paymentMethod: 'Cash on Delivery',
        status: 'Pending',
        createdAt: serverTimestamp()
      });

      clearCart();
      navigate('/order-success', { state: { orderId: orderRef.id, total: grandTotal } });
    } catch (err) {
      console.error("Order creation failed:", err);
      alert("Failed to submit order. Please check network connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 24px' }}>
      <h1 className="editorial-title" style={{ fontSize: '2rem', marginBottom: '32px' }}>Checkout</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
        {/* Shipping Form */}
        <form onSubmit={handleOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="editorial-sub" style={{ marginBottom: '12px' }}>1. Customer Details</h3>
          <input required placeholder="Full Name" name="fullName" value={form.fullName} onChange={handleChange} style={inputStyle} />
          <input required type="email" placeholder="Email Address" name="email" value={form.email} onChange={handleChange} style={inputStyle} />
          <div style={{ display: 'flex', gap: '12px' }}>
            <input required placeholder="Phone Number" name="phone" value={form.phone} onChange={handleChange} style={inputStyle} />
            <input placeholder="WhatsApp (Optional)" name="whatsapp" value={form.whatsapp} onChange={handleChange} style={inputStyle} />
          </div>

          <h3 className="editorial-sub" style={{ margin: '16px 0 8px 0' }}>2. Delivery Address</h3>
          <select name="province" value={form.province} onChange={handleChange} style={inputStyle}>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
            <option value="Balochistan">Balochistan</option>
            <option value="Islamabad Capital Territory">Islamabad</option>
          </select>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input required placeholder="City (e.g., Karachi, Lahore)" name="city" value={form.city} onChange={handleChange} style={inputStyle} />
            <input placeholder="Postal Code" name="postalCode" value={form.postalCode} onChange={handleChange} style={inputStyle} />
          </div>
          <textarea required rows={3} placeholder="Complete Street Address, House/Apartment No." name="address" value={form.address} onChange={handleChange} style={inputStyle} />

          <h3 className="editorial-sub" style={{ margin: '16px 0 8px 0' }}>3. Payment Method</h3>
          <div style={{ border: '1px solid #111', padding: '16px', background: '#FAFAFA' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
              <input type="radio" checked readOnly /> Cash on Delivery (COD)
            </label>
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '6px' }}>Pay cash upon door-to-door delivery across Pakistan.</p>
          </div>

          <button type="submit" disabled={submitting} className="btn-stun" style={{ marginTop: '20px', width: '100%' }}>
            {submitting ? "Placing Order..." : `Confirm Order — ₨ ${grandTotal.toLocaleString()}`}
          </button>
        </form>

        {/* Order Summary */}
        <div style={{ background: '#FAF9F6', padding: '32px', border: '1px solid var(--color-border)', height: 'fit-content' }}>
          <h3 className="editorial-sub" style={{ marginBottom: '20px' }}>Order Overview</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span>{item.name} × {item.quantity}</span>
                <span style={{ fontWeight: 600 }}>₨ {((item.salePrice || item.price) * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span>₨ {subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Flat Shipping</span>
              <span>₨ {shippingFee}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 700, borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '6px' }}>
              <span>Total</span>
              <span>₨ {grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid #CCC',
  fontSize: '0.85rem',
  fontFamily: 'inherit',
  boxSizing: 'border-box'
};