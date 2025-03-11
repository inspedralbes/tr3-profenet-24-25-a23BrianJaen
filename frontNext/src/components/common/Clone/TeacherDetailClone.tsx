"use client"

import { TeacherDetailCloneProps } from "../../../types/types";

// interface TeacherDetailCloneProps {
//   payload: ClonePayload | null;
//   text: string;
// }

export default function TeacherDetailClone({ payload, text }: TeacherDetailCloneProps) {
  return (
    <>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-primary mb-2">
          {text && text}
        </h3>
        <p className="text-secondary">
          {payload && payload?.name} {payload && payload?.firstName}
        </p>
      </div>
    </>
  );
}
