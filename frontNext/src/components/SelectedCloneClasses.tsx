import { useTheme } from "next-themes";

import { Classes } from "../types/types"
import { useEffect } from "react";

interface SelectedCloneClassesProps {
  classes: Classes;
  selectedClasses: Classes[];
  handleClassesClick: (id: string) => void;
}

export default function SelectedCloneClasses({ classes, selectedClasses, handleClassesClick }: SelectedCloneClassesProps) {
  const { theme } = useTheme();

  // Comprobamos si la clase actual está seleccionada
  const isSelected = selectedClasses.some((selectedClass) => selectedClass.id === classes.id);

  useEffect(() => {
    console.log(selectedClasses);
  }, [selectedClasses]);

  return (
    <div
      key={classes.id}
      onClick={() => handleClassesClick(classes.id)}
      className={`flex items-center justify-center rounded-lg hover:scale-110 hover:cursor-pointer
      hover:border hover:border-primary transition-transform duration-300 ease-in-out py-6 px-2 m-2
      origin-center
      ${isSelected ? 'scale-105 border border-primary' : ''} 
      ${isSelected ? (theme === "dark" ? "bg-blue-950" : "bg-blue-100") : ""}`}
    >
      <p className="text-primary">{classes.name}</p>
    </div>
  );
}
