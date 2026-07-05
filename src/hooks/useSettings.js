import { useState, useEffect } from 'react'
import { getSiteSettings } from '../firebase/settingsService'

export const useSettings = () => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings()
        setSettings(data)
      } catch (error) {
        console.error('Error fetching settings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  return { settings, loading, refetch: () => fetchSettings() }
}
