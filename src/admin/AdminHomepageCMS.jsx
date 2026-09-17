import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminHomepageCMS() {
  const [data, setData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    wellnessTitle: '',
    brandStoryTitle: '',
    whitespaceHeadline: '',
    ctaHeadline: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, 'homepage', 'content'));
      if (snap.exists()) setData(snap.data());
    }
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      await setDoc(doc(db, 'homepage', 'content'), data, { merge: true });
      setStatus('Successfully synced with live storefront!');
    } catch (err) {
      setStatus('Error updating content.');
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 className="editorial-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Homepage Visual CMS</h1>
      <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '32px' }}>Update any section headline without code deployment.</p>

      {status && <div style={{ padding: '12px', background: '#E0F2FE', color: '#0369A1', marginBottom: '20px', fontSize: '0.85rem' }}>{status}</div>}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: '#FFF', padding: '32px', border: '1px solid #E5E7EB' }}>
        <div>
          <label style={labelStyle}>Hero Main Heading</label>
          <input value={data.heroTitle} onChange={e => setData({ ...data, heroTitle: e.target.value })} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Hero Upper Subtitle</label>
          <input value={data.heroSubtitle} onChange={e => setData({ ...data, heroSubtitle: e.target.value })} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Full-Width Wellness Banner Text</label>
          <input value={data.wellnessTitle} onChange={e => setData({ ...data, wellnessTitle: e.target.value })} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Brand Story Heading</label>
          <input value={data.brandStoryTitle} onChange={e => setData({ ...data, brandStoryTitle: e.target.value })} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Whitespace Section Large Headline</label>
          <textarea rows={3} value={data.whitespaceHeadline} onChange={e => setData({ ...data, whitespaceHeadline: e.target.value })} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Final Water CTA Heading</label>
          <input value={data.ctaHeadline} onChange={e => setData({ ...data, ctaHeadline: e.target.value })} style={inputStyle} />
        </div>

        <button type="submit" className="btn-stun" style={{ alignSelf: 'flex-start' }}>Save Live Changes</button>
      </form>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' };
const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #DDD', fontSize: '0.85rem' };