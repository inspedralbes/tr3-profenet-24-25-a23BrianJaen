"use client"

import Image from 'next/image';
import { useTheme } from 'next-themes';

import { TeacherProfileInfoProps } from "../types/types";

import { Mail, IdCard } from 'lucide-react';

export default function ClientTeacherProfileProp({ dataTeacher }: TeacherProfileInfoProps) {
  const { theme } = useTheme();

  return (
    <div>
      <div className={`max-w-2xl mx-auto p-6 bg-background rounded-lg shadow-lg mt-8
        ${theme === 'dark' ? 'border border-primary' : 'bg-background'}`}>
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <Image
              src={dataTeacher.imageUrl || '/images/docent.png'}
              alt={`${dataTeacher.name} ${dataTeacher.firstName}`}
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {dataTeacher.name} {dataTeacher.firstName}
            </h1>
            <p className="text-lg text-primary mt-2">
              Profesor/a
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold text-primary mb-3">Información de Contacto</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href={`mailto:${dataTeacher.mail}`} className="text-primary relative inline-block group transition-all duration-300 ease-in-out hover:scale-105">
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-out"></span>
                  {dataTeacher.mail}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <IdCard className="w-4 h-4 text-primary" />
                <span className="text-primary">ID: {dataTeacher.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}