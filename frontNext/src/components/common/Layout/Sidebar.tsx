"use client"

import { usePathname } from 'next/navigation'

import { cn } from "@/src/services/utils";
import { navigation } from "@/src/constants/navigation";

// import Avatar from "@mui/material/Avatar/Avatar";

interface sidebarProps {
  isMenuOpen?: boolean;
  toggleMenu?: () => void
}

export default function Sidebar({ isMenuOpen, toggleMenu }: sidebarProps) {
  const pathname = usePathname()

  const currentPath = pathname

  return (
    <div className="flex h-full">
      {/* Sidebar for large devices */}
      <div className="hidden md:flex flex-col w-56 bg-card bg-background">
        <aside className="flex-1 space-y-1 mt-10 px-2 py-4 relative">
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
          {/* <div className="flex fixed bottom-0 px-2 mb-1.5 py-4">
            <p className="place-self-end mr-3">Bernat Garcia</p>
            <Avatar
              src={'/images/docent.png'}
              alt={`Bernat`}
              sx={{ width: 80, height: 80 }}
              className='w-16 h-16 rounded-full object-cover m-1.5'
            >
              {teacher.firstname[0]}{teacher.lastname[0]}
            </Avatar>
          </div> */}
        </aside>
      </div>

      {/* Drop down menu for small screens */}
      <div className="md:hidden">

        {/* Dropdown */}
        {isMenuOpen && (
          <>
            {/* Fondo oscuro detrás de la sidebar */}
            <div
              className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300"
              onClick={toggleMenu} // Close menu when clicking outside
            ></div>

            {/* Sidebar */}
            <div
              className={`transition-all ease-in-out duration-500 
              fixed top-0 left-0 w-76 h-full px-4 py-14 z-50
              ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-[-100%] opacity-0"}
              ${localStorage.getItem("theme") === "dark" ? "bg-card bg-[#101315] border-r-1 border-blue-300" : "bg-card bg-amber-50 border-r-2 border-e-blue-400"}
              `}
            >
              {navigation &&
                navigation.map((item, id) => {
                  const isActive = currentPath === item.href;
                  const Icon = item.icon;
                  return (
                    <a
                      key={id}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-x-3 rounded-md px-3 py-2 text-xl font-medium",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Icon className="h-7 w-7" />
                      {item.name}
                    </a>
                  );
                })}
              {/* <div className="flex fixed bottom-0 px-2 mb-1.5 py-4">
                <div className="grid grid-rows-2 mr-4">
                  <p className="place-self-end">Bernat</p>
                  <p className="place-self-start">Garcia</p>
                </div>
                <Avatar
                  src={'/images/docent.png'}
                  alt={`Bernat`}
                  sx={{ width: 80, height: 80 }}
                  className='w-16 h-16 rounded-full object-cover m-1.5'
                >
                  {teacher.firstname[0]}{teacher.lastname[0]}
                </Avatar>
              </div> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}