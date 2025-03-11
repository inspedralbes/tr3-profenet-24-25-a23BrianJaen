"use client";

import MediaCard from "@/src/components/MediaCard";
import { type Teacher, type Classes } from "../types/types";
import { useState } from "react";
import ModalCloneTeacher from "./ModalCloneTeacher";
import TitlePage from "./TitlePage";

// Define props for the ClientTeachers component
interface ClientTeachersProps {
  teachers: Teacher[];
  classes: Classes[]
}

export default function ClientTeachers({ teachers = [], classes = [] }: ClientTeachersProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="container">
      <div className="grid md:grid-cols-2 p-2 items-center md:mb-6 sm:mb-2">
        <TitlePage text="Professors" />
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
      <ModalCloneTeacher isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} teachers={teachers} classes={classes} />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {teachers && teachers?.map((teach) => (
          <MediaCard key={teach.id} teacher={teach} />
        ))}
      </div>
    </div>
  );
}