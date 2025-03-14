"use client"

import { ClonePayload } from "../../../types/types"

import ClaseDetailClone from "./ClaseDetailClone"
import TeacherDetailClone from "./TeacherDetailClone"

interface RenderCloneDataProps {
  payload: ClonePayload
}

export default function RenderCloneData({ payload }: RenderCloneDataProps) {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-background">
      {payload.originTeacher ? (
        <TeacherDetailClone payload={payload.originTeacher} text="Professor d'origen" />
      ) :
        (
          <p>No hi ha informació del profesor disponible</p>
        )}
      <ClaseDetailClone payload={payload.selectedClasses} text="Classes" />
      {payload.originTeacher ? (
        <TeacherDetailClone payload={payload.destinationTeacher} text="Professor de destí" />
      ) :
        (
          <p>No hi ha informació del profesor disponible</p>
        )}
    </div>
  )
}