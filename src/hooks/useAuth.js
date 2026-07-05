import { useState, useEffect } from 'react'
import { onAuthChange, checkAdminAccess } from '../firebase/authService'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser) => {
      if (authUser) {
        const hasAdminAccess = await checkAdminAccess(authUser.uid)
        setUser(authUser)
        setIsAdmin(hasAdminAccess)
      } else {
        setUser(null)
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, isAdmin, loading }
}
