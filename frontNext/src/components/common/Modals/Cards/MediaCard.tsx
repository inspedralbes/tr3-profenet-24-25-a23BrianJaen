"use client"

import { type TeacherMoodle } from "../../../../types/types";

import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";

import { Avatar } from '@mui/material'


// Define props for the ClientTeachers component
interface MediaCardProps {
  teacher: TeacherMoodle;
}

export default function MediaCard({ teacher }: MediaCardProps) {

  const pathname = usePathname()

  const router = useRouter()

  const handleNavigationProfile = (id: string) => {
    router.push(`${pathname}/${id}`);
  }

  return (
    <div className="max-w-xs rounded-lg border border-gray-200 overflow-hidden shadow-lg mb-4">
      <div className="group">
        <Avatar
          src={teacher.profileimageurl || '/images/docent.png'}
          alt={`${teacher.firstname} ${teacher.lastname}`}
          sx={{ width: 80, height: 80 }}
          className='w-16 h-16 rounded-full object-cover m-1.5'
        >
          {teacher.firstname[0]}{teacher.lastname[0]}
        </Avatar>

        <div className="p-4">
          <h5 className="text-xl font-semibold text-primary">{teacher.firstname} {teacher.lastname}</h5>
          <p className="text-primary text-sm mt-2">
            {teacher.email}
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