import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './config'

const DOC_ID = 'main'
const COLLECTION_NAME = 'siteSettings'

export const getSiteSettings = async () => {
  const docRef = doc(db, COLLECTION_NAME, DOC_ID)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  }
  return null
}

export const updateSiteSettings = async (data) => {
  const docRef = doc(db, COLLECTION_NAME, DOC_ID)
  await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true })
}

export const initializeSiteSettings = async () => {
  const existing = await getSiteSettings()
  if (!existing) {
    const defaultSettings = {
      aboutUs: '',
      aboutUsImage: '',
      phone: '',
      email: '',
      address: '',
      whatsappNumber: '',
      instagramUrl: '',
      facebookUrl: '',
      twitterUrl: '',
      linkedinUrl: '',
      siteName: 'Temizlik Şirketi',
      metaTitle: '',
      metaDescription: '',
      logoUrl: '',
      faviconUrl: '',
      createdAt: serverTimestamp(),
    }
    await updateSiteSettings(defaultSettings)
    return defaultSettings
  }
  return existing
}
