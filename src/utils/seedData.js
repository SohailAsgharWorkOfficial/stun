import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Background auto-seeding is disabled permanently
export async function checkAndSeedStore() {
  return false;
}

// Function to wipe all current demo/seeded products cleanly
export async function wipeAllProducts() {
  const snap = await getDocs(collection(db, 'products'));
  const deletePromises = snap.docs.map(d => deleteDoc(doc(db, 'products', d.id)));
  await Promise.all(deletePromises);
  return snap.size;
}