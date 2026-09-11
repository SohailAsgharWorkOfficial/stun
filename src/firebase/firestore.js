import { 
  collection, doc, getDocs, getDoc, setDoc, addDoc, updateDoc, 
  deleteDoc, query, where, orderBy, limit, serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

export const collections = {
  USERS: 'users',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  ORDERS: 'orders',
  REVIEWS: 'reviews',
  COUPONS: 'coupons',
  BANNERS: 'banners',
  NEWSLETTER: 'newsletter'
};

// --- Products API ---
export async function getStoreProducts(categorySlug = null, sortBy = 'featured') {
  let q = collection(db, collections.PRODUCTS);
  let constraints = [where('active', '==', true)];

  if (categorySlug) {
    constraints.push(where('categorySlug', '==', categorySlug));
  }

  if (sortBy === 'price-low') constraints.push(orderBy('price', 'asc'));
  else if (sortBy === 'price-high') constraints.push(orderBy('price', 'desc'));
  else if (sortBy === 'newest') constraints.push(orderBy('createdAt', 'desc'));

  const querySnapshot = await getDocs(query(q, ...constraints));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getProductBySlug(slug) {
  const q = query(collection(db, collections.PRODUCTS), where('slug', '==', slug), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

// --- Orders API ---
export async function createStoreOrder(orderData) {
  const orderRef = doc(collection(db, collections.ORDERS));
  const orderId = 'STUN-' + Math.floor(100000 + Math.random() * 900000);
  
  const payload = {
    ...orderData,
    orderCode: orderId,
    orderStatus: 'Pending',
    paymentStatus: 'Pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(orderRef, payload);
  return { id: orderRef.id, orderCode: orderId, ...payload };
}

// --- Coupons API ---
export async function validateCouponCode(code, subtotal) {
  const q = query(
    collection(db, collections.COUPONS), 
    where('code', '==', code.toUpperCase()),
    where('active', '==', true)
  );
  const snap = await getDocs(q);
  if (snap.empty) throw new Error('Invalid discount coupon.');
  
  const coupon = snap.docs[0].data();
  if (coupon.minOrder && subtotal < coupon.minOrder) {
    throw new Error(`Minimum order of PKR ${coupon.minOrder.toLocaleString()} required.`);
  }

  let discountAmount = 0;
  if (coupon.type === 'percentage') {
    discountAmount = (subtotal * coupon.value) / 100;
    if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
      discountAmount = coupon.maxDiscount;
    }
  } else {
    discountAmount = coupon.value;
  }

  return { code: coupon.code, discount: discountAmount };
}