"use client"

import { ManagePayload } from "@/src/types/types";
// import RenderCloneData from "./RenderCloneData";
import RenderManageData from "./RenderManageData";

interface ConfirmManageProps {
  payload: ManagePayload
}

export default function ConfirmManage({ payload }: ConfirmManageProps) {

  return (
    <div>
      <RenderManageData payload={payload} />
    </div>
  )
}