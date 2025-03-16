import { useState } from "react";
import { useTheme } from "next-themes";
import { X } from "lucide-react";

import { TeacherMoodle, Classes, ClonePayload, TeacherInfo } from "../../../types/types"

import SelectedCloneTeacher from "../Clone/SelectedCloneTeacher";
import SelectedCloneClasses from "../Clone/SelectedCloneClasses";
import ConfirmClone from "../Clone/ConfirmClone";
import ModalTitle from "./ModalTitle";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  teachers: TeacherMoodle[];
  classes: Classes[];
}

export default function ModalCloneTeacher({ isOpen, onClose, title, teachers, classes }: ModalProps) {
  const [selectedTeacherOrigin, setSelectedTeacherOrigin] = useState<TeacherInfo | null>(null);
  const [selectedTeacherDestination, setSelectedTeacherDestination] = useState<TeacherInfo | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<Classes[]>(classes);
  const [step, setStep] = useState(1);

  const { theme } = useTheme();

  // Estate to store the payload
  const [payload, setPayload] = useState<ClonePayload>({
    originTeacher: null,
    destinationTeacher: null,
    selectedClasses: selectedClasses,
  });

  if (!isOpen) return null;

  const handleTeacherClick = (id: string, firstname: string, lastname: string) => {
    setSelectedTeacherOrigin(prev => (prev?.id === id ? null : { id, firstname, lastname }));

    setPayload(prev => ({
      ...prev,
      originTeacher: prev.originTeacher?.id === id ? null : { id, firstname, lastname },
    }));
  };

  const handleTeacherDestinationClick = (id: string, firstname: string, lastname: string) => {
    setSelectedTeacherDestination(prev => (prev?.id === id ? null : { id, firstname, lastname }));

    setPayload(prev => ({
      ...prev,
      destinationTeacher: prev.destinationTeacher?.id === id ? null : { id, firstname, lastname },
    }));
  };

  const handleClassesClick = (id: string, name: string) => {
    setSelectedClasses((prev) => {
      const isAlreadySelected = prev.some((item) => item.id === id);

      if (isAlreadySelected) {
        return prev.filter((item) => item.id !== id);
      } else {
        return [...prev, { id, name }];
      }
    });

    setPayload((prev) => ({
      ...prev,
      selectedClasses: prev.selectedClasses.some((item) => item.id === id)
        ? prev.selectedClasses.filter((item) => item.id !== id)
        : [...prev.selectedClasses, { id, name }],
    }));
  };

  const handleCloseModal = () => {
    setSelectedTeacherOrigin(null);
    setSelectedTeacherDestination(null);
    setSelectedClasses(classes);
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
    if (!selectedTeacherOrigin || !selectedTeacherDestination || selectedClasses.length === 0) return;

    const payload = {
      destinationTeacherId: selectedTeacherDestination.id,
      selectedClasses: selectedClasses,
    };

    console.log(payload);

    handleCloseModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className={`p-6 rounded-lg shadow-lg max-w-xl min-h-96 w-full ${theme === "dark" ? "bg-[#0f1214]" : "bg-white"}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary p-2">
            {title || "Clonar professor"}
          </h2>
          <button className="px-4 py-2" >
            <X className="h-7 w-7 cursor-pointer text-primary" onClick={handleCloseModal} />
          </button>
        </div>

        {/* Steps */}
        {step === 1 && (
          <div>
            <ModalTitle normalText="Selecciona un docent" highlightedText="origen" additionalText="per clonar" />
            {teachers.map((teach) => (
              <SelectedCloneTeacher
                key={teach.id}
                teacher={teach}
                selectedTeacher={selectedTeacherOrigin}
                handleTeacherClick={() => handleTeacherClick(teach.id, teach.firstname, teach.lastname)}
              />
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <ModalTitle normalText="Selecciona les assignatures per clonar" />
            {classes.map((classe) => (
              <SelectedCloneClasses
                key={classe.id}
                classes={classe}
                selectedClasses={selectedClasses}
                handleClassesClick={() => handleClassesClick(classe.id, classe.name)}
              />
            ))}
          </div>
        )}

        {step === 3 && (
          <div>
            <ModalTitle normalText="Selecciona un docent" highlightedText="destí" additionalText="per clonar" />
            {teachers.map((teach) => (
              <SelectedCloneTeacher
                key={teach.id}
                teacher={teach}
                selectedTeacher={selectedTeacherDestination}
                handleTeacherClick={() => handleTeacherDestinationClick(teach.id, teach.firstname, teach.lastname)}
              />
            ))}
          </div>
        )}

        {step === 4 && (
          <div>
            <ModalTitle normalText="Selecció total de les dades del docent" />
            <ConfirmClone payload={payload} />
          </div>
        )}

        {/* Footer - Navigation Buttons */}
        <div className="mt-6 flex">
          {/* Button previous */}
          {step > 1 && (
            <button
              className="cursor-pointer p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              onClick={handlePreviousStep}
            >
              Enrera
            </button>
          )}

          {/* Button next or "Clone Classes" in the last step*/}
          <div className="ml-auto">
            {step < 4 ? (
              <button
                className="cursor-pointer p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 justify-end"
                onClick={handleNextStep}
                disabled={
                  (step === 1 && !selectedTeacherOrigin) ||
                  (step === 2 && selectedClasses.length === 0) ||
                  (step === 3 && !selectedTeacherDestination)
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