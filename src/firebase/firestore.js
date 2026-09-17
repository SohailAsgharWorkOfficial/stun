import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

export const getProducts = async (categoryFilter = null) => {
  const prodRef = collection(db, 'products');
  const q = categoryFilter && categoryFilter !== 'all'
    ? query(prodRef, where('category', '==', categoryFilter))
    : query(prodRef, orderBy('createdAt', 'desc'));
  
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getProductById = async (id) => {
  const snap = await getDoc(doc(db, 'products', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const createOrder = async (orderPayload) => {
  return await addDoc(collection(db, 'orders'), {
    ...orderPayload,
    status: 'Pending',
    createdAt: serverTimestamp()
  });
};

export const getOrders = async () => {
  const snap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateOrderStatus = async (id, status) => {
  await updateDoc(doc(db, 'orders', id), { status, updatedAt: serverTimestamp() });
};