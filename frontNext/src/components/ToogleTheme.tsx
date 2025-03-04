"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes";

export default function Sidebar() {
  const { theme, setTheme } = useTheme()

  console.log(theme);


  return (
    <button
      className="fixed cursor-pointer top-4 right-4 rounded-full w-8 h-8 sm:w-10 sm:h-10 border-primary/20 hover:bg-primary/10"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}