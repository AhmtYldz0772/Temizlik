import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'

const COLLECTION_NAME = 'contactMessages'

export const getContactMessages = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const getRecentContactMessages = async (count = 5) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'), limit(count))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const getContactMessageById = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  }
  return null
}

export const addContactMessage = async (data) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    isRead: false,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export const markMessageAsRead = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  await updateDoc(docRef, { isRead: true, readAt: serverTimestamp() })
}

export const markAllMessagesAsRead = async () => {
  const messages = await getContactMessages()
  const updates = messages
    .filter((m) => !m.isRead)
    .map((m) => markMessageAsRead(m.id))
  await Promise.all(updates)
}

export const deleteContactMessage = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  await deleteDoc(docRef)
}

export const getUnreadCount = async () => {
  const messages = await getContactMessages()
  return messages.filter((m) => !m.isRead).length
}
