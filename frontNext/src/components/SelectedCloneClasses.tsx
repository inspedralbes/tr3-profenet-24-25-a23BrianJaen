
import { useTheme } from "next-themes";

import { Classes } from "../types/types"

interface SelectedCloneClassesProps {
  classes: Classes
  selectedClasses: number[]
  handleClassesClick: (id: number) => void
}

export default function SelectedCloneClasses({ classes, selectedClasses, handleClassesClick }: SelectedCloneClassesProps) {
  const { theme } = useTheme();

  return (
    <div
      key={classes.id}
      onClick={() => handleClassesClick(classes.id)}
      className={`flex rounded-lg hover:scale-110 hover:cursor-pointer hover:m-2
      hover:border hover:border-primary transition-all duration-300 ease-in-out py-6 px-2
      ${selectedClasses.includes(classes.id) ? 'scale-105 border border-primary m-2' : ''} 
      ${selectedClasses.includes(classes.id) ? (theme === "dark" ? "bg-blue-950" : "bg-blue-100") : ""}`}
    >
      <p className="text-primary">
        {classes.name}
      </p>
    </div>


  )
}