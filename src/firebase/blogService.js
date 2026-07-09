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
  limit,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'

const COLLECTION_NAME = 'blogPosts'

export const getBlogPosts = async (onlyPublished = false) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('publishedAt', 'desc'))
  const snapshot = await getDocs(q)
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  if (onlyPublished) {
    return docs.filter(d => d.isPublished === true)
  }
  return docs
}

export const getBlogPostById = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  }
  return null
}

export const getBlogPostBySlug = async (slug) => {
  const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug))
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() }
  }
  return null
}

export const getRecentBlogPosts = async (excludeId, count = 3) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('publishedAt', 'desc'))
  const snapshot = await getDocs(q)
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  
  return docs
    .filter(d => d.isPublished === true && d.id !== excludeId)
    .slice(0, count)
}

export const addBlogPost = async (data) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export const updateBlogPost = async (id, data) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() })
}

export const deleteBlogPost = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  await deleteDoc(docRef)
}
