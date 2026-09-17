import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

export const uploadAsset = async (file, folder = 'products') => {
  if (!file) return null;
  const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};