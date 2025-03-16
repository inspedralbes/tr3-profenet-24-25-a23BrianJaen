"use client"

import { useTheme } from "next-themes";

import { TeacherInfo } from "../../../types/types"
import Avatar from "@mui/material/Avatar";

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
      <Avatar
        src={'/images/docent.png'}
        alt={`${teacher.firstname} ${teacher.lastname}`}
        sx={{ width: 80, height: 80 }}
        className='w-16 h-16 rounded-full object-cover m-1.5'
      >
        {teacher.firstname[0]}{teacher.lastname[0]}
      </Avatar>
      <p className="text-primary">
        {teacher.firstname} {teacher.lastname}
      </p>
    </div>

  )
}