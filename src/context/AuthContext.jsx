import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (!auth) return;
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        if (user && db) {
          try {
            const snap = await getDoc(doc(db, 'users', user.uid));
            if (snap.exists()) setUserData(snap.data());
            else setUserData({ role: 'customer' });
          } catch (e) {
            setUserData({ role: 'customer' });
          }
        } else {
          setUserData(null);
        }
      });
      return () => unsubscribe && unsubscribe();
    } catch (err) {
      console.warn("Firebase Auth bypassed for development:", err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      userData, 
      isAdmin: userData?.role === 'admin', 
      loading, 
      logout: () => auth && signOut(auth) 
    }}>
      {/* Yahan se !loading ki condition hata di gayi hai taake website turant render ho */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);