import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  theme: string
  setTheme: (theme: string) => void
}

const getInitialTheme = () => {
  return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: getInitialTheme(),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
)