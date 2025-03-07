"use client";

import MediaCard from "@/src/components/MediaCard";
import { type Professor } from "../../src/types/types";
import { useState } from "react";

// Define props for the ClientTeachers component
interface ClientTeachersProps {
  teachers: Professor[];
}

export default function ClientTeachers({ teachers = [] }: ClientTeachersProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="container">
      <div className="grid md:grid-cols-2 p-2 items-center md:mb-6 sm:mb-2">
        <div className="inline-block border border-gray-300 p-2 rounded-lg">
          <span className="text-4xl font-bold">Professors</span>
        </div>
        <div className="hidden md:flex justify-end">
          <button className="border border-gray-300 px-4 py-2 rounded-lg cursor-pointer"
            onClick={() => setIsOpenModal(true)}>
            Clona
          </button>
        </div>
      </div>
      <div className="flex sm:hidden p-2 justify-end mb-4">
        <button className="border border-gray-300 px-4 py-2 rounded-lg cursor-pointer"
          onClick={() => setIsOpenModal(true)}>
          Clona
        </button>
      </div>
      {/* Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Título del Modal</h2>
            <p className="text-gray-600 dark:text-gray-300">Este es el contenido del modal.</p>

            {/* Botón para cerrar */}
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setIsOpenModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 ">
        {teachers && teachers?.map((teach) => (
          <MediaCard key={teach.id} teacher={teach} />
        ))}
      </div>
    </div>
  );
}