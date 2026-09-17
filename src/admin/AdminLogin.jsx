import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (isSignup = false) => {
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      if (!auth) {
        navigate('/admin');
        return;
      }

      if (isSignup) {
        // 1. Create User in Firebase Auth
        const res = await createUserWithEmailAndPassword(auth, email.trim(), password);
        
        // 2. Set Admin role in Firestore
        if (db) {
          await setDoc(doc(db, 'users', res.user.uid), {
            email: email.trim(),
            role: 'admin',
            createdAt: new Date().toISOString()
          }, { merge: true });
        }
      } else {
        // Sign In
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }

      // Smooth transition to dashboard
      setTimeout(() => {
        navigate('/admin');
      }, 300);

    } catch (err) {
      console.error("Auth Error details:", err.code, err.message);
      
      // User friendly Firebase error mappings
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setErrorMsg('Invalid email or password. If this is your first time, click "Register".');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('Email is already registered. Please click "Sign In".');
      } else if (err.code === 'auth/weak-password') {
        setErrorMsg('Password should be at least 6 characters.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setErrorMsg('Email/Password provider is disabled in Firebase Console.');
      } else {
        setErrorMsg(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: '#FAF9F6'
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        background: '#FFFFFF',
        padding: '40px',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        boxShadow: '0 4px 25px rgba(0,0,0,0.06)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Logo />
          <h2 style={{ 
            fontSize: '1.4rem', 
            marginTop: '16px', 
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700 
          }}>
            Admin Portal
          </h2>
          <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '4px' }}>
            Store & Inventory Management
          </p>
        </div>

        {errorMsg && (
          <div style={{
            background: '#FEE2E2',
            color: '#DC2626',
            padding: '12px 14px',
            fontSize: '0.85rem',
            marginBottom: '18px',
            borderRadius: '4px',
            border: '1px solid #FCA5A5'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleAuth(false); }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />

            <input
              type="password"
              placeholder="Password (min. 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleAuth(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Processing...' : 'Sign In'}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => handleAuth(true)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#4B5563',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}