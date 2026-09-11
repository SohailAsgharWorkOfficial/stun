import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, db } from './config';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export async function registerUserAccount(email, password, fullName) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: fullName });

  const profile = {
    uid: user.uid,
    fullName,
    email,
    role: 'customer',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(doc(db, 'users', user.uid), profile);
  return { user, profile };
}

export async function loginUserAccount(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
  return {
    user: userCredential.user,
    profile: userDoc.exists() ? userDoc.data() : null
  };
}

export async function logoutUser() {
  return await signOut(auth);
}

export async function requestPasswordReset(email) {
  return await sendPasswordResetEmail(auth, email);
}