
import type { ClaseDetailClone } from "../types/types"

export default function ClaseDetailClone({ payload, text }: ClaseDetailClone) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold text-primary mb-2">{text && text}</h3>
      <p className="text-secondary">
        {payload.map((classItem) => (
          <li className="list-none" key={classItem.id}>{classItem.name}</li>
        ))}
      </p>
    </div>
  )
}