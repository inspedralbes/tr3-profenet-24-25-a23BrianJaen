import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { X } from "lucide-react";

import { TeacherMoodle, ClonePayload, TeacherInfo, Courses } from "../../../types/types"

import SelectedCloneTeacher from "../Clone/SelectedCloneTeacher";
import SelectedCloneClasses from "../Clone/SelectedCloneClasses";
import ConfirmClone from "../Clone/ConfirmClone";
import ModalTitle from "./ModalTitle";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  teacher: TeacherMoodle;
  courses: Courses[];
}

export default function ModalCloneTeacher({ isOpen, onClose, title, teacher, courses }: ModalProps) {
  const [selectedTeacherOrigin, setSelectedTeacherOrigin] = useState<TeacherInfo | null>(teacher);
  const [selectedTeacherDestination, setSelectedTeacherDestination] = useState<TeacherInfo | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<Courses[]>(courses);
  const [allClasses, setAllClasses] = useState<Courses[]>(courses);
  const [step, setStep] = useState(1);

  const { theme } = useTheme();

  // Estate to store the payload
  const [payload, setPayload] = useState<ClonePayload>({
    originTeacher: teacher,
    destinationTeacher: null,
    selectedClasses: selectedClasses,
  });

  // Reset cuando se abre o cierra el modal
  useEffect(() => {
    if (isOpen) {
      // Cuando se abre el modal
      setAllClasses(courses);
      setSelectedClasses(courses);
      setStep(1);
      setSelectedTeacherOrigin(teacher);
      setPayload({
        originTeacher: teacher,
        destinationTeacher: null,
        selectedClasses: courses
      });
    }
  }, [isOpen, courses, teacher]);

  if (!isOpen) return null;

  const handleTeacherClick = (id: string, firstname: string, lastname: string) => {

    setPayload(prev => ({
      ...prev,
      originTeacher: prev.originTeacher?.id === id ? null : {
        id,
        firstname,
        lastname,
        email: '',
        profileimageurlsmall: '',
        profileimageurl: '',
        courses: []
      },
    }));
  };

  const handleTeacherDestinationClick = (id: string, firstname: string, lastname: string) => {
    setSelectedTeacherDestination(prev => (prev?.id === id ? null : { id, firstname, lastname }));

    setPayload(prev => ({
      ...prev,
      destinationTeacher: prev.destinationTeacher?.id === id ? null : {
        id,
        firstname,
        lastname,
      },
    }));

    console.log(selectedTeacherDestination);
  };

  const handleClassesClick = (id: string, name: string, shortname: string) => {
    setSelectedClasses((prev) => {
      const isAlreadySelected = prev.some((item) => item.id === id);

      if (isAlreadySelected) {
        return prev.filter((item) => item.id !== id);
      } else {
        return [...prev, { id, name, shortname }];
      }
    });

    setPayload((prev) => ({
      ...prev,
      selectedClasses: prev.selectedClasses.some((item) => item.id === id)
        ? prev.selectedClasses.filter((item) => item.id !== id)
        : [...prev.selectedClasses, { id, name, shortname }],
    }));
  };

  // Function for loading more classes (initial page is 1 just loaded)
  const fetchMoreClasses = async (): Promise<Courses[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      return [];
    } catch (error) {
      console.error("Error fetching more classes:", error);
      return [];
    }
  };

  const handleCloseModal = () => {
    setSelectedTeacherOrigin(teacher);
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
            <SelectedCloneTeacher
              key={teacher.id}
              teacher={teacher}
              selectedTeacher={selectedTeacherOrigin}
              handleTeacherClick={() => handleTeacherClick(teacher.id, teacher.firstname, teacher.lastname)}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <ModalTitle normalText="Selecciona les assignatures per clonar" />
            <SelectedCloneClasses
              classes={allClasses}
              selectedClasses={selectedClasses}
              handleClassesClick={(classe) => handleClassesClick(classe.id, classe.name, classe.shortname)}
              fetchMoreClasses={fetchMoreClasses}
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <ModalTitle normalText="Selecciona un docent" highlightedText="destí" additionalText="per clonar" />
            {/* Placeholder for a destination teacher - replace with real data */}
            <SelectedCloneTeacher
              key={"1"}
              teacher={{ id: "1", firstname: "luis", lastname: "rodriguez" }}
              selectedTeacher={selectedTeacherDestination}
              handleTeacherClick={() => handleTeacherDestinationClick("1", "luis", "rodriguez")}
            />
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
