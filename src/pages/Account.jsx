import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { registerUser, loginUser } from '../firebase/auth';

export default function Account() {
  const { currentUser, userData, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await loginUser(email, password);
      } else {
        await registerUser(email, password, name, 'customer');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (currentUser) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 24px' }}>
        <h1 className="editorial-title" style={{ fontSize: '2rem', marginBottom: '16px' }}>My Account</h1>
        <div style={{ background: '#FFF', padding: '24px', border: '1px solid var(--color-border)', marginBottom: '24px' }}>
          <p style={{ marginBottom: '8px' }}><strong>Email:</strong> {currentUser.email}</p>
          <p style={{ marginBottom: '8px' }}><strong>Account Type:</strong> {userData?.role || 'Customer'}</p>
        </div>
        <button onClick={logout} className="btn-stun">Sign Out</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '440px', margin: '80px auto', padding: '0 24px' }}>
      <h1 className="editorial-title" style={{ fontSize: '2rem', marginBottom: '24px', textAlign: 'center' }}>
        {isLogin ? 'Customer Login' : 'Create Account'}
      </h1>

      {error && <p style={{ color: '#EF4444', fontSize: '0.85rem', marginBottom: '16px' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {!isLogin && (
          <input required placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} style={inputBox} />
        )}
        <input required type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={inputBox} />
        <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputBox} />
        <button type="submit" className="btn-stun" style={{ width: '100%', marginTop: '10px' }}>
          {isLogin ? 'Sign In' : 'Register'}
        </button>
      </form>

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button onClick={() => setIsLogin(!isLogin)} style={{ fontSize: '0.85rem', color: '#666', textDecoration: 'underline' }}>
          {isLogin ? "Don't have an account? Register" : "Already registered? Login"}
        </button>
      </div>
    </div>
  );
}

const inputBox = { width: '100%', padding: '12px', border: '1px solid #CCC', fontSize: '0.85rem' };