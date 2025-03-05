"use client"

import { cn } from "@/src/services/utils";
import { LayoutDashboard, BookOpen, Calendar, Settings } from "lucide-react";
import Image from "next/image";
import { usePathname } from 'next/navigation'


export default function Sidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Inici", href: "/", icon: LayoutDashboard },
    { name: "Els meus cursos", href: "/courses", icon: BookOpen },
    { name: "Horari", href: "/schedule", icon: Calendar },
    { name: "Configuració", href: "/settings", icon: Settings },
  ];

  const user = null;

  const currentPath = pathname
  return (
    <div className="flex h-full w-56 flex-col bg-card bg-background">
      <h3 className="text-2xl font-bold bg-background p-4">ProfeNet</h3>
      <aside className="flex-1 space-y-1 px-2 py-4 relative">
        {
          navigation &&
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
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </a>
            );
          })
        }
        <div className="flex fixed bottom-0 px-2 mb-1.5 py-4 border border-amber-600">
          <p className="place-self-end mr-3">Name Firstname</p>
          <Image
            className="w-16 h-16 cursor-pointer"
            src="/images/profe.png"
            alt={user || "Usuari"}
            width={100}
            height={100}
          />
        </div>
      </aside>
    </div>
  )
}