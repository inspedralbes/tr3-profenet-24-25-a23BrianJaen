import { useTheme } from "next-themes";
import { Courses } from "../../../types/types";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface SelectedCloneClassesProps {
  classes: Courses[];
  selectedClasses: Courses[];
  handleClassesClick: (classItem: Courses) => void;
}

export default function SelectedCloneClasses({
  classes: initialClasses,
  selectedClasses,
  handleClassesClick,
}: SelectedCloneClassesProps) {
  const { theme } = useTheme();

  // Estate for managing loaded classes
  const [classes] = useState<Courses[]>(initialClasses);

  useEffect(() => {
    console.log(selectedClasses);
  }, [selectedClasses]);

  return (
    <div className="max-h-[60vh] overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {classes.map((classItem) => {
          // Compares with the current class is selected
          const isSelected = selectedClasses.some(
            (selectedClass) => selectedClass.id === classItem.id
          );
          return (
            <div
              key={classItem.id}
              onClick={() => handleClassesClick(classItem)}
              className={`flex items-center justify-center rounded-lg hover:scale-110 hover:cursor-pointer
                hover:border hover:border-primary transition-transform duration-300 ease-in-out py-3 px-2 m-2
                origin-center
                ${isSelected ? 'scale-105 border border-primary' : ''} 
                ${isSelected ? (theme === "dark" ? "bg-blue-950" : "bg-blue-100") : ""}`}
            >
              <p className="text-primary">{classItem.name}</p>
              <span>{isSelected ? <Check /> : ''}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
