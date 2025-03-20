import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  currentTheme: string
  setTheme: (theme: string) => void
}

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme || 'light'
  }
  return 'dark'
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      currentTheme: getInitialTheme(),
      setTheme: (theme) => {
        localStorage.setItem('theme', theme)
        set({ currentTheme: theme })
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)