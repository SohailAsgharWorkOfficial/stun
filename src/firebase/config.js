import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment12345678",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "stun-clean.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "stun-clean",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "stun-clean.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef"
};

let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
} catch (e) {
  console.warn("Firebase initialization skipped:", e);
}

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;