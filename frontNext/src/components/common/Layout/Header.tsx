"use client"

import Link from "next/link";
import { useState } from "react";

import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";
import ToogleTheme from "./ToogleTheme";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mx-1 flex items-center justify-between md:px-3 md:py-2 sm:px-2 sm:py-1 border-b md:border-l border-primary`}>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="fixed top-0 z-50 pl-1 p-1 text-2xl bg-background text-primary hover:bg-accent border rounded-4xl"
        >
          {isOpen ? "" : <Menu className="h-6 w-6 " />}
        </button>
        <Sidebar isMenuOpen={isOpen} toggleMenu={toggleMenu} />
      </div>
      <Link href="/" className="font-bold text-2xl">
        <span className="">ProfeNet</span>
      </Link>
      <div className="mb-3">

        <ToogleTheme />
      </div>
    </div>
  );
}