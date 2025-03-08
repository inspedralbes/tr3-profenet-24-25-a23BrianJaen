"use client"

import { Professor } from "../types/types";

import React from "react";
import { useState } from "react";
import { useTheme } from "next-themes";


import { X } from "lucide-react";
import SelectedCloneTeacher from "./SelectedCloneTeacher";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  teachers: Professor[]
}

export default function ModalCloneTeacher({ isOpen, onClose, title, teachers }: ModalProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);

  const { theme } = useTheme();

  if (!isOpen) return null; // If not open, don't render anything 

  const handleTeacherClick = (id: number) => {
    setSelectedTeacher(prev => prev === id ? null : id);

    if (selectedTeacher === id) {
      setSelectedTeacher(null)
    }
  }

  const handleCloseModal = () => {
    setSelectedTeacher(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50" >
      <div className={`p-6 rounded-lg shadow-lg max-w-xl min-h-96 w-full ${theme === "dark" ? "bg-[#0f1214]" : "bg-white"}`}>
        {/* Close button */}
        <div className="flex items-center justify-between mb-4">
          {/* Modal title (optional) */}
          <h2 className="text-xl font-semibold text-primary border border-primary p-2 rounded-lg">{title || "Clonar professor"}</h2>
          <button className={`p-2 cursor-pointer hover:scale-105 border border-primary rounded-lg 
            ${theme === "dark" ? "bg-[#0f1214]" : "bg-white"}
            ${selectedTeacher !== null ? "" : "hidden"}`}
          >
            Següent
          </button>

          <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleCloseModal}>
            <X className="h-5 w-5 cursor-pointer" />
          </button>
        </div>

        {/* Dinamic content of modal */}
        {/* Selector teacher clone */}
        <div className="text-primary">
          <h2 className="text-primary text-center text-xl font-bold mb-1.5">
            Selecciona un docent <strong>origen</strong> per clonar
          </h2>
          {teachers && teachers?.map((teach) => (
            // TODO: make a component to renderize teachers
            <SelectedCloneTeacher key={teach.id} teacher={teach} selectedTeacher={selectedTeacher} handleTeacherClick={handleTeacherClick} />
          ))}
        </div>

      </div>
    </div >
  );
}