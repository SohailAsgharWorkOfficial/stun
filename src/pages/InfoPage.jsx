import React from 'react';
import { useLocation } from 'react-router-dom';

export default function InfoPage() {
  const { pathname } = useLocation();
  const slug = pathname.replace('/', '');

  const dataMap = {
    about: {
      title: 'Our Story',
      sub: 'Botanical Precision',
      content: 'STUN was established to redefine cleanliness in modern living spaces. Using scientifically proven plant chelators, our products leave your surfaces sparkling without leaving toxic chemical residues behind.'
    },
    contact: {
      title: 'Contact Us',
      sub: 'Customer Support',
      content: 'Have questions about bulk orders or trade partnerships? Reach our logistics desk at care@stun.pk or call +92 (0) 42 111-STUN-PK.'
    },
    shipping: {
      title: 'Shipping & Delivery',
      sub: 'Nationwide Logistics',
      content: 'We deliver nationwide across Pakistan via standard surface courier. Orders placed before 3:00 PM are dispatched same-day. Standard COD shipping takes 2 to 4 business days.'
    },
    returns: {
      title: 'Returns Policy',
      sub: 'Peace of Mind',
      content: 'If any bottle leaks during transit or fails to deliver satisfaction, return it within 7 days for a hassle-free replacement or complete refund.'
    },
    privacy: {
      title: 'Privacy Policy',
      sub: 'Your Security',
      content: 'STUN strictly protects all customer contact numbers and addresses provided during Cash on Delivery checkout. We never share customer data with third-party advertising brokers.'
    },
    terms: {
      title: 'Terms of Service',
      sub: 'Official Conditions',
      content: 'All STUN product formulations are trademarked. Resale or unapproved refilling under the STUN brand name is strictly governed by Pakistan trade laws.'
    }
  };

  const item = dataMap[slug] || { title: 'STUN Clean Care', sub: 'Information', content: 'Details coming soon.' };

  return (
    <div style={{ maxWidth: '800px', margin: '80px auto', padding: '0 24px' }}>
      <span className="editorial-sub" style={{ color: '#888' }}>{item.sub}</span>
      <h1 className="editorial-title" style={{ fontSize: '2.5rem', margin: '12px 0 24px 0' }}>{item.title}</h1>
      <p style={{ lineHeight: 1.8, color: '#444', fontSize: '1rem' }}>{item.content}</p>
    </div>
  );
}