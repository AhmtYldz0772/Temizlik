import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { auth, db } from './config'

const ADMINS_COLLECTION = 'admins'

export const loginAdmin = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  const adminDoc = await getDoc(doc(db, ADMINS_COLLECTION, user.uid))
  if (!adminDoc.exists()) {
    await signOut(auth)
    throw new Error('Bu hesabın yönetici erişimi yok.')
  }

  return user
}

export const logoutAdmin = async () => {
  await signOut(auth)
}

export const checkAdminAccess = async (uid) => {
  const adminDoc = await getDoc(doc(db, ADMINS_COLLECTION, uid))
  return adminDoc.exists()
}

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

export const getCurrentUser = () => {
  return auth.currentUser
}
