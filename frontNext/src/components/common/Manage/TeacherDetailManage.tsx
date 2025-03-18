"use client"

import { TeacherDetailManageProps } from "../../../types/types";

export default function TeacherDetailManage({ payload, text }: TeacherDetailManageProps) {
  console.log(payload);

  return (
    <>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-primary mb-2">
          {text && text}
        </h3>
        <p className="text-secondary">
          {payload && payload?.firstname} {payload && payload?.lastname}
        </p>
      </div>
    </>
  );
}
