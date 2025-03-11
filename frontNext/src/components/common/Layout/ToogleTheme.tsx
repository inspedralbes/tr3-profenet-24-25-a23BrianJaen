"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Sidebar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Secure the component is mounted before accessing the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // If the component isn't mounted yet, avoid incorrect rendering
  if (!mounted) return null

  return (
    <button
      className="cursor-pointer fixed top-1.5 right-4 rounded-full w-8 h-8 sm:w-10 sm:h-10 border border-primary/20 flex items-center justify-center hover:bg-primary/10"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Sun className="h-5 w-5 text-background" /> : <Moon className="h-5 w-5 text-background" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}