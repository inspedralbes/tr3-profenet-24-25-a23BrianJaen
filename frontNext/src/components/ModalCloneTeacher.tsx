"use client"

import { Professor } from "../types/types";

import React from "react";
import { useState } from "react";

import { useTheme } from "next-themes";
import { X } from "lucide-react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  teachers: Professor[]
}

export default function ModalCloneTeacher({ isOpen, onClose, title, teachers }: ModalProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<number | []>([]);

  const { theme } = useTheme();

  if (!isOpen) return null; // Si no está abierto, no renderizar nada

  const handleTeacherClick = (id: number) => {
    setSelectedTeacher(id)

    if (selectedTeacher === id) {
      setSelectedTeacher([])
    }
  }

  const handleCloseModal = () => {
    setSelectedTeacher([])
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className={`p-6 rounded-lg shadow-lg max-w-xl min-h-96 w-full ${theme === "dark" ? "bg-[#0f1214]" : "bg-white"}`}>
        {/* Close button */}
        <div className="flex items-center justify-between mb-4">
          {/* Modal title (optional) */}
          <h2 className="text-xl font-semibold text-primary border border-primary p-2 rounded-lg">{title || "Clonar professor"}</h2>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleCloseModal}>
            <X className="h-5 w-5 cursor-pointer" />
          </button>
        </div>

        {/* Dinamic content of modal */}
        <div className="text-primary">
          <h2 className="text-primary text-center text-xl font-bold mb-1.5">
            Selecciona un docent <strong>origen</strong> per clonar
          </h2>
          {teachers && teachers?.map((teach) => (
            // TODO: make a component to renderize profesors
            <div
              key={teach.id}
              onClick={() => handleTeacherClick(teach.id)}
              className={`flex flex-row items-center rounded-lg hover:scale-110 hover:cursor-pointer 
              hover:border hover:border-primary transition-all duration-300 ease-in-out 
              ${selectedTeacher === teach.id ? 'scale-105 border border-primary' : ''} 
              ${selectedTeacher === teach.id ? (theme === "dark" ? "bg-blue-950" : "bg-blue-100") : ""}`}
            >
              <Image
                className="w-16 h-16 rounded-full object-cover m-1.5"
                src="/images/docent.png"
                alt={teach.name}
                width={100}
                height={100} />
              <p className="text-primary">
                {teach.name} {teach.firstname}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}