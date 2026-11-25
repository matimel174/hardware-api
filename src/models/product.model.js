import {
  collection, getDocs, getDoc, addDoc, deleteDoc, doc
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

const productsRef = collection(db, 'products');

export async function findAll() {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function findById(id) {
  const snap = await getDoc(doc(db, 'products', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function insert(data) {
  const ref = await addDoc(productsRef, data);
  return { id: ref.id, ...data };
}

export async function deleteById(id) {
  const ref = doc(db, 'products', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;

  await deleteDoc(ref);
  return true;
}