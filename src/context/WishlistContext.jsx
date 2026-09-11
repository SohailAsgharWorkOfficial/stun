import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [wishlist, setWishlist] = useState(() => {
    const local = localStorage.getItem('stun_wishlist');
    return local ? JSON.parse(local) : [];
  });

  useEffect(() => {
    async function syncCloudWishlist() {
      if (user) {
        const docRef = doc(db, 'wishlists', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWishlist(docSnap.data().items || []);
        } else {
          await setDoc(docRef, { items: wishlist });
        }
      }
    }
    syncCloudWishlist();
  }, [user]);

  useEffect(() => {
    localStorage.setItem('stun_wishlist', JSON.stringify(wishlist));
    if (user) {
      setDoc(doc(db, 'wishlists', user.uid), { items: wishlist }, { merge: true });
    }
  }, [wishlist, user]);

  const toggleWishlist = (product) => {
    const exists = wishlist.some(i => i.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(i => i.id !== product.id));
      showToast('Removed from wishlist');
    } else {
      setWishlist(prev => [...prev, {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images?.[0] || ''
      }]);
      showToast('Added to wishlist');
    }
  };

  const isInWishlist = (productId) => wishlist.some(i => i.id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}