'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      className="p-2 rounded-md hover:ring-2 hover:ring-gray-300"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
