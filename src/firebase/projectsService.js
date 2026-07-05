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
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'

const COLLECTION_NAME = 'projects'

export const getProjects = async (onlyActive = false) => {
  let q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'))
  if (onlyActive) {
    q = query(collection(db, COLLECTION_NAME), where('isActive', '==', true), orderBy('order', 'asc'))
  }
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const getProjectById = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  }
  return null
}

export const getProjectBySlug = async (slug) => {
  const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug))
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() }
  }
  return null
}

export const addProject = async (data) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export const updateProject = async (id, data) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() })
}

export const deleteProject = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  await deleteDoc(docRef)
}
