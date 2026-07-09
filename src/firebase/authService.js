import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { auth, db } from './config'

const USERS_COLLECTION = 'users'

export const loginAdmin = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  console.log('Auth başarılı, UID:', user.uid)

  // Token'ın Firestore'da geçerli olması için yenile
  await user.getIdToken(true)

  // Yeni rules: users koleksiyonunda role == 'admin' kontrolü
  const userDoc = await getDoc(doc(db, USERS_COLLECTION, user.uid))

  console.log('Firestore doc exists:', userDoc.exists())
  console.log('Firestore doc data:', userDoc.data())

  if (!userDoc.exists() || userDoc.data().role !== 'admin') {
    await signOut(auth)
    throw new Error('Bu hesabın yönetici erişimi yok.')
  }

  return user
}

export const logoutAdmin = async () => {
  await signOut(auth)
}

export const checkAdminAccess = async (uid) => {
  const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid))
  return userDoc.exists() && userDoc.data().role === 'admin'
}

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

export const getCurrentUser = () => {
  return auth.currentUser
}
