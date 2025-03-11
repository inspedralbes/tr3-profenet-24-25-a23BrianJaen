"use client"

import Image from 'next/image';
import { type Teacher } from "../../../../types/types";

import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";


// Define props for the ClientTeachers component
interface MediaCardProps {
  teacher: Teacher;
}

export default function MediaCard({ teacher }: MediaCardProps) {

  const pathname = usePathname()

  const router = useRouter()

  const handleNavigationProfile = (id: string) => {
    console.log(id);
    router.push(`${pathname}/${id}`);
  }


  return (
    <div className="max-w-xs rounded-lg border border-gray-200 overflow-hidden shadow-lg mb-4">
      <div className="group">
        <Image
          className="w-16 h-16 rounded-full object-cover m-1.5"
          src="/images/docent.png"
          alt={teacher.name || "Usuari"}
          width={100}
          height={100}
        />

        <div className="p-4">
          <h5 className="text-xl font-semibold text-primary">{teacher.name} {teacher.firstName}</h5>
          <p className="text-primary text-sm mt-2">
            {teacher.mail}
          </p>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 flex justify-between">
        <button className="cursor-pointer text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors" onClick={() => handleNavigationProfile(teacher.id)}>
          Veure perfil
        </button>
      </div>
    </div>
  );
}