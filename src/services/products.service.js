import {
  collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

const productsRef = collection(db, 'products');

export async function getAll(category) {
  const consulta = category
    ? query(productsRef, where('category', '==', category))
    : productsRef;

  const snapshot = await getDocs(consulta);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getById(id) {
  const snap = await getDoc(doc(db, 'products', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function create(data) {
  const ref = await addDoc(productsRef, data);
  return { id: ref.id, ...data };
}

export async function update(id, data) {
  const ref = doc(db, 'products', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  await updateDoc(ref, data);
  return { id, ...snap.data(), ...data };
}

export async function remove(id) {
  const ref = doc(db, 'products', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;

  await deleteDoc(ref);
  return true;
}