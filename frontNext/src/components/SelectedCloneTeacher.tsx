"use client"

import Image from "next/image";
import { useTheme } from "next-themes";

import { TeacherInfo } from "../types/types"

interface SelectedCloneTeacherProps {
  teacher: TeacherInfo
  selectedTeacher: TeacherInfo | null
  handleTeacherClick: (id: string) => void
}

export default function SelectedCloneTeacher({ teacher, selectedTeacher, handleTeacherClick }: SelectedCloneTeacherProps) {
  const { theme } = useTheme();

  return (
    <div
      key={teacher.id}
      onClick={() => handleTeacherClick(teacher.id)}
      className={`relative flex flex-row items-center rounded-lg hover:scale-110 
      hover:cursor-pointer hover:border hover:border-primary transition-transform duration-300 ease-in-out 
      origin-center m-2
      ${selectedTeacher?.id === teacher.id ? 'scale-105 border border-primary' : ''} 
      ${selectedTeacher?.id === teacher.id ? (theme === "dark" ? "bg-blue-950" : "bg-blue-100") : ""}`}
    >
      <Image
        className="w-16 h-16 rounded-full object-cover m-1.5"
        src="/images/docent.png"
        alt={teacher.name}
        width={100}
        height={100}
      />
      <p className="text-primary">
        {teacher.name} {teacher.firstName}
      </p>
    </div>

  )
}