"use client"

import { ClonePayload } from "../types/types"

import Teacher from "./Teacher"

interface RenderCloneDataProps {
  payload: ClonePayload
}

export default function RenderCloneData({ payload }: RenderCloneDataProps) {
  return (
    <div>
      <Teacher payload={payload} />
    </div>
  )
}