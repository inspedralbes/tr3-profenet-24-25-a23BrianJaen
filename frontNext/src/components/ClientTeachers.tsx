"use client";

import MediaCard from "@/src/components/common/Modals/Cards/MediaCard";
import { type TeacherMoodle } from "../types/types";
import TitlePage from "./common/Layout/TitlePage";

// Define props for the ClientTeachers component
interface ClientTeachersProps {
  teachers: TeacherMoodle[];
}

export default function ClientTeachers({ teachers = [] }: ClientTeachersProps) {

  return (
    <div className="container">
      <div className="grid md:grid-cols-2 p-2 items-center md:mb-6 sm:mb-2">
        <TitlePage text="Professors" />
      </div>

      {/* Modal */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {teachers && teachers.map((teach) => (
          <MediaCard key={teach.id} teacher={teach} />
        ))}
      </div>
    </div>
  );
}