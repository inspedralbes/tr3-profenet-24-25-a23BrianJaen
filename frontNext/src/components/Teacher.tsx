"use client"

import { ClonePayload } from "../types/types";

interface TeacherDetailCardProps {
  payload: ClonePayload;
}

export default function TeacherDetailCard({ payload }: TeacherDetailCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-background">
      {/* Profesor de Origen */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-primary mb-2">Professor d&apos;origen</h3>
        <p className="text-secondary">
          {payload.originTeacher?.name} {payload.originTeacher?.firstName}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-primary mb-2">Clases</h3>
        <p className="text-secondary">
          {payload.selectedClasses.map((classItem) => (
            <li key={classItem.id}>{classItem.name}</li>
          ))}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-primary mb-2">Professor de destí</h3>
        <p className="text-secondary">
          {payload.destinationTeacher?.name} {payload.destinationTeacher?.firstName}
        </p>
      </div>
    </div>
  );
}
