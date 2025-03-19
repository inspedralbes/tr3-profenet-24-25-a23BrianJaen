"use client"

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";

import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";
import ToogleTheme from "./ToogleTheme";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex items-center justify-between md:px-3 md:py-2 sm:px-2 sm:py-1 border-b border-primary ${isDark ? 'bg-[#000]' : ''}`}>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="p-3 text-2xl bg-background text-primary hover:bg-accent"
        >
          {isOpen ? "" : <Menu className="h-6 w-6" />}
        </button>
        <Sidebar isMenuOpen={isOpen} toggleMenu={toggleMenu} />
      </div>
      <Link href="/" className="font-bold text-2xl">
        <span>ProfeNet</span>
      </Link>
      <ToogleTheme />
    </div>
  );
}