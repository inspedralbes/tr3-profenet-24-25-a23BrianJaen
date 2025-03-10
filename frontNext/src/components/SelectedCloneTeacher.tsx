"use client"

import Image from "next/image";
import { useTheme } from "next-themes";

import { Professor } from "../types/types"

interface SelectedCloneTeacherProps {
  teacher: Professor
  selectedTeacher: number | null
  handleTeacherClick: (id: number) => void
}

export default function SelectedCloneTeacher({ teacher, selectedTeacher, handleTeacherClick }: SelectedCloneTeacherProps) {
  const { theme } = useTheme();

  return (
    <div
      key={teacher.id}
      onClick={() => handleTeacherClick(teacher.id)}
      className={`flex flex-row items-center rounded-lg hover:scale-110 hover:cursor-pointer 
      hover:border hover:border-primary transition-all duration-300 ease-in-out
      ${selectedTeacher === teacher.id ? 'scale-105 border border-primary m-2' : ''} 
      ${selectedTeacher === teacher.id ? (theme === "dark" ? "bg-blue-950" : "bg-blue-100") : ""}`}
    >
      <Image
        className="w-16 h-16 rounded-full object-cover m-1.5"
        src="/images/docent.png"
        alt={teacher.name}
        width={100}
        height={100} />
      <p className="text-primary">
        {teacher.name} {teacher.firstname}
      </p>
    </div>
  )
}