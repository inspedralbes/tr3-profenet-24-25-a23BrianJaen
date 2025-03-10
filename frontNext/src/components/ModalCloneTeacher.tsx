import { useState } from "react";
import { useTheme } from "next-themes";
import { X } from "lucide-react";

import { Professor, Classes } from "../types/types"

import SelectedCloneTeacher from "./SelectedCloneTeacher";
import SelectedCloneClasses from "./SelectedCloneClasses";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  teachers: Professor[];
  classes: Classes[];
}

export default function ModalCloneTeacher({ isOpen, onClose, title, teachers, classes }: ModalProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
  const [selectedTeacherDestination, setSelectedTeacherDestination] = useState<number | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [step, setStep] = useState(1);

  const { theme } = useTheme();

  if (!isOpen) return null;

  const handleTeacherClick = (id: number) => {
    setSelectedTeacher(prev => prev === id ? null : id);
  };

  const handleTeacherDestinationClick = (id: number) => {
    setSelectedTeacherDestination(prev => prev === id ? null : id);
  };

  const handleClassesClick = (id: number) => {
    setSelectedClasses(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleCloseModal = () => {
    setSelectedTeacher(null);
    setSelectedTeacherDestination(null);
    setSelectedClasses([]);
    setStep(1);
    onClose();
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSendRequestToBack = () => {
    if (!selectedTeacher || !selectedTeacherDestination || selectedClasses.length === 0) return;

    const payload = {
      originTeacherId: selectedTeacher,
      destinationTeacherId: selectedTeacherDestination,
      selectedClasses
    };
    console.log(payload);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className={`p-6 rounded-lg shadow-lg max-w-xl min-h-96 w-full ${theme === "dark" ? "bg-[#0f1214]" : "bg-white"}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary border border-primary p-2 rounded-lg">
            {title || "Clonar professor"}
          </h2>
          <button className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleCloseModal}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Steps */}
        {step === 1 && (
          <div>
            <h2 className="text-primary text-center text-xl font-bold mb-1.5">
              Selecciona un docent <strong>origen</strong> per clonar
            </h2>
            {teachers.map((teach) => (
              <SelectedCloneTeacher
                key={teach.id}
                teacher={teach}
                selectedTeacher={selectedTeacher}
                handleTeacherClick={handleTeacherClick}
              />
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-primary text-center text-xl font-bold mb-1.5">
              Selecciona les assigantures per clonar
            </h2>
            {classes.map((classe) => (
              <SelectedCloneClasses
                key={classe.id}
                classes={classe}
                selectedClasses={selectedClasses}
                handleClassesClick={handleClassesClick}
              />
            ))}
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-primary text-center text-xl font-bold mb-1.5">
              Selecciona un docent <strong>destí</strong> per clonar
            </h2>
            {teachers.map((teach) => (
              <SelectedCloneTeacher
                key={teach.id}
                teacher={teach}
                selectedTeacher={selectedTeacherDestination}
                handleTeacherClick={handleTeacherDestinationClick}
              />
            ))}
          </div>
        )}

        {/* Footer - Navigation Buttons */}
        <div className="mt-6 flex">
          {/* Botón "Enrera" (se oculta en el primer paso) */}
          {step > 1 && (
            <button
              className="cursor-pointer p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              onClick={handlePreviousStep}
            >
              Enrera
            </button>
          )}

          {/* Botón "Siguiente" o "Clonar Clases" en el último paso */}
          <div className="ml-auto">
            {step < 3 ? (
              <button
                className="cursor-pointer p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 justify-end"
                onClick={handleNextStep}
                disabled={
                  (step === 1 && !selectedTeacher) ||
                  (step === 2 && selectedClasses.length === 0)
                }
              >
                Següent
              </button>
            ) : (
              <button
                className="cursor-pointer p-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                onClick={handleSendRequestToBack}
                disabled={!selectedTeacherDestination}
              >
                Clonar Clases
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}