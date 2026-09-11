import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1.5 seconds safety timeout taake Firebase connect na hone par screen blank na rahe
    const timeoutTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    let unsubscribe = () => {};

    try {
      unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        clearTimeout(timeoutTimer);
        setUser(currentUser);
        if (currentUser) {
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists()) {
              setProfile(userDoc.data());
            } else {
              const defaultProfile = {
                email: currentUser.email,
                role: 'customer',
                createdAt: serverTimestamp()
              };
              await setDoc(doc(db, 'users', currentUser.uid), defaultProfile);
              setProfile(defaultProfile);
            }
          } catch (err) {
            console.warn("User profile fetch failed:", err);
          }
        } else {
          setProfile(null);
        }
        setLoading(false);
      }, (error) => {
        console.warn("Auth state change error:", error);
        setLoading(false);
      });
    } catch (e) {
      console.warn("Firebase Auth init error:", e);
      setLoading(false);
    }

    return () => {
      clearTimeout(timeoutTimer);
      unsubscribe();
    };
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  
  const signup = async (email, password, fullName) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const userProfile = {
      fullName,
      email,
      role: 'customer',
      createdAt: serverTimestamp()
    };
    await setDoc(doc(db, 'users', res.user.uid), userProfile);
    setProfile(userProfile);
    return res;
  };

  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);
  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';

  return (
    <AuthContext.Provider value={{ user, profile, isAdmin, login, signup, logout, resetPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
}