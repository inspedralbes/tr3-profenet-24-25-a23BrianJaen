"use client"

import { useState } from "react";
import { cn } from "@/src/services/utils";
import { LayoutDashboard, BookOpen, Calendar, Settings, User, Menu } from "lucide-react";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import Link from "next/link";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pathname = usePathname()

  const navigation = [
    { name: "Inici", href: "/", icon: LayoutDashboard },
    { name: "Porfessors", href: "/teachers", icon: User },
    { name: "Els meus cursos", href: "/courses", icon: BookOpen },
    { name: "Horari", href: "/schedule", icon: Calendar },
    { name: "Configuració", href: "/settings", icon: Settings },
  ];

  const user = null;

  const currentPath = pathname
  return (
    <div className="flex h-full">
      {/* Sidebar for large devices */}
      <div className="hidden md:flex flex-col w-56 bg-card bg-background">
        <Link href="/" className="text-2xl font-bold bg-background p-4">
          <h3>ProfeNet</h3>
        </Link>
        <aside className="flex-1 space-y-1 px-2 py-4 relative">
          {navigation &&
            navigation.map((item, id) => {
              const isActive = currentPath === item.href;
              const Icon = item.icon;
              return (
                <a
                  key={id}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </a>
              );
            })}
          <div className="flex fixed bottom-0 px-2 mb-1.5 py-4">
            <p className="place-self-end mr-3">Bernat Garcia</p>
            <Image
              className="w-16 h-16 cursor-pointer"
              src="/images/docent.png"
              alt={user || "Usuari"}
              width={100}
              height={100}
            />
          </div>
        </aside>
      </div>

      {/* Drop down menu for small screens */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="p-3 text-2xl bg-background text-primary hover:bg-accent"
        >
          {isMenuOpen ? "" : <Menu className="h-6 w-6" />}
        </button>

        {/* Dropdown */}
        {isMenuOpen && (
          <>
            {/* Fondo oscuro detrás de la sidebar */}
            <div
              className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300"
              onClick={toggleMenu} // Cerrar menú al hacer clic fuera
            ></div>

            {/* Sidebar */}
            <div
              className={`transition-all ease-in-out duration-500 
        fixed top-0 left-0 w-48 h-screen p-4 z-50 
        ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-[-100%] opacity-0"}
        ${localStorage.getItem("theme") === "dark" ? "bg-card bg-[#101315] border-r-1 border-blue-300" : "bg-card bg-amber-50 border-r-2 border-e-blue-400"}
        `}
            >
              <h1 className="text-primary font-bold">Profenet</h1>
              {navigation &&
                navigation.map((item, id) => {
                  const isActive = currentPath === item.href;
                  const Icon = item.icon;
                  return (
                    <a
                      key={id}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </a>
                  );
                })}
              <div className="flex fixed bottom-0 px-2 mb-1.5 py-4">
                <div className="grid grid-rows-2 mr-4">
                  <p className="place-self-end">Bernat</p>
                  <p className="place-self-start">Garcia</p>
                </div>
                <Image
                  className="w-16 h-16 cursor-pointer"
                  src="/images/docent.png"
                  alt={user || "Usuari"}
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}