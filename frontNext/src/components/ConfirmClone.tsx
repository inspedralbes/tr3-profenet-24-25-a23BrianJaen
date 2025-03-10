"use client"

import { ClonePayload } from "../types/types"
import RenderCloneData from "./RenderCloneData";

interface ConfirmCloneProps {
  payload: ClonePayload
}

export default function ConfirmClone({ payload }: ConfirmCloneProps) {

  console.log(payload);

  return (
    <div>
      <RenderCloneData payload={payload} />
    </div>
  )
}