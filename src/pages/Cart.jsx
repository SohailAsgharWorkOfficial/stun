import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/formatters';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();

  return (
    <div>
      <Header />
      <main className="container cart-page">
        <h1>Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart-view">
            <ShoppingBag size={64} strokeWidth={1.5} color="var(--text-muted)" />
            <h2>Your cart is currently empty</h2>
            <p>Experience the ultimate clean with our specialized kits.</p>
            <Link to="/shop" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-table-wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.itemKey}>
                      <td className="item-cell">
                        <img src={item.image} alt={item.name} />
                        <div>
                          <strong>{item.name}</strong>
                          {item.variantName && <span>Size: {item.variantName}</span>}
                        </div>
                      </td>
                      <td>{formatPKR(item.price)}</td>
                      <td>
                        <div className="cart-qty-toggle">
                          <button onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}>+</button>
                        </div>
                      </td>
                      <td><strong>{formatPKR(item.price * item.quantity)}</strong></td>
                      <td>
                        <button className="btn-remove" onClick={() => removeFromCart(item.itemKey)}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-checkout-card">
              <h3>Cart Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPKR(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{subtotal > 3000 ? 'FREE' : formatPKR(250)}</span>
              </div>
              <p className="shipping-note">Taxes & shipping verified during checkout.</p>
              <Link to="/checkout" className="btn-primary btn-checkout-link">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />

      <style>{`
        .cart-page { padding: 4rem 1.5rem; min-height: 60vh; }
        .cart-page h1 { font-size: 2rem; font-weight: 900; margin-bottom: 2rem; color: var(--primary-navy); }
        .empty-cart-view { text-align: center; padding: 4rem 0; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        .cart-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; }
        .cart-table { width: 100%; border-collapse: collapse; }
        .cart-table th { text-align: left; padding-bottom: 1rem; border-bottom: 2px solid var(--border-light); font-size: 0.85rem; color: var(--text-muted); }
        .cart-table td { padding: 1.5rem 0; border-bottom: 1px solid var(--border-light); }
        .item-cell { display: flex; align-items: center; gap: 1.25rem; }
        .item-cell img { width: 60px; height: 60px; object-fit: contain; }
        .item-cell div { display: flex; flex-direction: column; }
        .item-cell strong { font-size: 0.95rem; color: var(--primary-navy); }
        .item-cell span { font-size: 0.8rem; color: var(--text-muted); }
        .cart-qty-toggle { display: inline-flex; border: 1px solid var(--border-light); border-radius: 4px; }
        .cart-qty-toggle button { padding: 0.25rem 0.6rem; font-weight: bold; }
        .cart-qty-toggle span { padding: 0.25rem 0.6rem; }
        .btn-remove { color: #94A3B8; }
        .btn-remove:hover { color: var(--accent-red); }
        .cart-checkout-card { background: white; border: 1px solid var(--border-light); padding: 2rem; border-radius: 8px; height: fit-content; }
        .cart-checkout-card h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 1.5rem; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 1rem; font-weight: 600; }
        .shipping-note { font-size: 0.8rem; color: var(--text-muted); margin: 1.5rem 0; }
        .btn-checkout-link { width: 100%; }
        @media (max-width: 900px) { .cart-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}