import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(email, password, fullName);
      showToast('Registration successful! Welcome to STUN.', 'success');
      navigate('/account');
    } catch (err) {
      showToast(err.message.replace('Firebase: ', ''), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-page-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create STUN Account</h2>
            <p>Get member pricing, instant COD tracking, and express support.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-with-icon">
                <User size={18} />
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Sohail Asghar"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)} 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} />
                <input 
                  type="email" 
                  required 
                  placeholder="e.g. yourname@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password (Min. 6 Characters)</label>
              <div className="input-with-icon">
                <Lock size={18} />
                <input 
                  type="password" 
                  required 
                  minLength={6}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={e => setPassword(e.target.value)} 
                />
              </div>
            </div>

            <button type="submit" className="auth-btn-submit" disabled={loading}>
              {loading ? 'Creating Account...' : (
                <>
                  <UserPlus size={18} /> Register Now
                </>
              )}
            </button>
          </form>

          <div className="auth-switch-text">
            Already have an account? <Link to="/login">Sign In <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}