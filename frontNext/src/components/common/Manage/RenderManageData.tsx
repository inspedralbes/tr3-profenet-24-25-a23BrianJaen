"use client"

import { ManagePayload } from "../../../types/types"

import ClaseDetailManage from "./ClaseDetailManage"
import TeacherDetailManage from "./TeacherDetailManage"

interface RenderManageDataProps {
  payload: ManagePayload
}

export default function RenderManageData({ payload }: RenderManageDataProps) {
  console.log(payload.destinationTeacher, payload.selectedClasses);

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-background">

      {payload.destinationTeacher ? (
        <TeacherDetailManage payload={payload.destinationTeacher} text="Professor/a de destí" />
      ) :
        (
          <p>No hi ha informació del profesor disponible</p>
        )}
      <ClaseDetailManage payload={payload.selectedClasses} text="Classes" />
    </div>
  )
}