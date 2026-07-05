import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './config'

export const uploadFile = (file, path, onProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        if (onProgress) {
          onProgress(progress)
        }
      },
      (error) => {
        reject(error)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(downloadURL)
      }
    )
  })
}

export const uploadMultipleFiles = async (files, path, onProgress) => {
  const urls = []
  let completed = 0

  for (const file of files) {
    const url = await uploadFile(file, path, (progress) => {
      if (onProgress) {
        const totalProgress = ((completed + progress / 100) / files.length) * 100
        onProgress(totalProgress)
      }
    })
    urls.push(url)
    completed++
  }

  return urls
}

export const deleteFile = async (url) => {
  try {
    const storageRef = ref(storage, url)
    await deleteObject(storageRef)
  } catch (error) {
    console.error('Error deleting file:', error)
  }
}
