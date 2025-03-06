"use client";

import MediaCard from "@/src/components/MediaCard";
import { type Professor } from "../../src/types/types";

// Define props for the ClientTeachers component
interface ClientTeachersProps {
  teachers: Professor[];
}

export default function ClientTeachers({ teachers = [] }: ClientTeachersProps) {

  return (
    <div className="container">
      <h1>Professors</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 ">
        {teachers && teachers?.map((teach) => (
          <MediaCard key={teach.id} teacher={teach} />
        ))}
      </div>
    </div>
  );
}