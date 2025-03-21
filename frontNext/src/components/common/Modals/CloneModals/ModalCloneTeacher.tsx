import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { X } from "lucide-react";

import { TeacherMoodle, ClonePayload, TeacherInfo, Courses } from "../../../../types/types"

import SelectedCloneTeacher from "../../Clone/SelectedCloneTeacher";
import SelectedCloneClasses from "../../Clone/SelectedCloneClasses";
import ConfirmClone from "../../Clone/ConfirmClone";
import ModalTitle from "./ModalTitle";

import { cloneCoursesTeacher } from "@/src/services/communicationManager";

import { useTeachers } from "@/src/hooks/useTeachers";
import { useSearchAndPagination } from "@/src/hooks/useSearchAndPagination";

import { Toaster, toast } from "sonner"
import Browser from "../../Layout/Browser";


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
  const [countdown, setCountdown] = useState<number>(3);

  const { theme } = useTheme();

  // Estate to store the payload
  const [payload, setPayload] = useState<ClonePayload>({
    originTeacher: teacher,
    destinationTeacher: null,
    selectedClasses: selectedClasses,
  });

  // Get data from custom hook
  const { dataTeachers, isLoading, error } = useTeachers();

  const {
    setCurrentPage,
    searchTerm,
    handleSearch,
    currentItems: currentTeachers,
  } = useSearchAndPagination({
    items: dataTeachers,
    itemsPerPage: 8
  });

  // You can now use data, isLoading, and error in your component
  console.log(dataTeachers, isLoading, error);

  // Reset when the modal is open or closed
  useEffect(() => {
    if (isOpen) {
      // When modal is open
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

  useEffect(() => {
    if (isOpen) {
      setCountdown(3);
    }
  }, [isOpen]);

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

  const handleTeacherDestinationClick = (id: string, firstname: string, lastname: string, profileimageurlsmall: string) => {
    setSelectedTeacherDestination(prev => (prev?.id === id ? null : { id, firstname, lastname, profileimageurlsmall }));

    setPayload(prev => ({
      ...prev,
      destinationTeacher: prev.destinationTeacher?.id === id ? null : {
        id,
        firstname,
        lastname,
        profileimageurlsmall
      },
    }));

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

  const handleCloseModal = () => {
    setSelectedTeacherOrigin(teacher);
    setSelectedTeacherDestination(null);
    setSelectedClasses([]);
    setStep(1);
    setCountdown(3); // Reset countdown when closing
    onClose();
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };


  const checkTechers = () => {
    if (!selectedTeacherOrigin || !selectedTeacherDestination || selectedClasses.length === 0) return;

    if (selectedTeacherOrigin && selectedTeacherDestination && selectedClasses.length > 0) {
      if (selectedTeacherOrigin.id === selectedTeacherDestination.id) {
        console.log('El docent origen i el docent de destinació són el mateix.');
        return false;
      } else {
        console.log('Els docents origen i de destinació són diferents.');
        return true;
      }
    }

  };

  const handleSendRequestToBack = async () => {
    if (!selectedTeacherOrigin || !selectedTeacherDestination || selectedClasses.length === 0) return;

    const hasReadyBeenSelected = checkTechers();

    if (hasReadyBeenSelected == false) {
      toast("No pots seleccionar el mateix docent", {
        description: "Selecciona un docent diferent per continuar",
        duration: 3000,
        position: "top-right",
        style: {
          background: theme === "dark" ? "#1f2937" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          border: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
        },
      })
    } else {

      const coursesSelecteds = new Map();

      selectedClasses.forEach((course) => {
        coursesSelecteds.set(course.id, { id: parseInt(course.id) });
      });

      const response = await cloneCoursesTeacher(
        selectedTeacherDestination.id,
        Array.from(coursesSelecteds.values())
      );

      console.log(response);
      if (response == "success") {
        toast.success("Clonació completada", {
          description: (
            <div>
              <p>Les classes han estat clonades correctament</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700">
                <div
                  className="bg-green-600 h-1.5 rounded-full transition-all duration-1000"
                  style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                />
              </div>
              <p className="text-sm mt-1">Tancant en {countdown} segons...</p>
            </div>
          ),
          duration: 3000,
          position: "top-right",
          style: {
            background: theme === "dark" ? "#1f2937" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
            border: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
          },
        });

        // Replace setInterval with a countdown effect
        const timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(timer);
          handleCloseModal();
          setCountdown(3); // Reset countdown
        }, 3000);
      }

    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className={`p-6 rounded-lg shadow-lg max-w-xl w-full flex flex-col max-h-[80vh] ${theme === "dark" ? "bg-[#0f1214]" : "bg-white"}`}>
        {/* Header - remains fixed */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary p-2">
            {title || "Clonar professor"}
          </h2>
          <div className={`${step === 3 ? 'block' : 'hidden'}`}>
            <Browser
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              setCurrentPage={setCurrentPage} />
          </div>
          <button className="px-4 py-2">
            <X className="h-7 w-7 cursor-pointer text-primary" onClick={handleCloseModal} />
          </button>
        </div>

        {/* Content - This div will scroll */}
        <div className="lex-1 overflow-y-auto overflow-x-hidden min-h-0 w-full mb-2 px-6.5">
          <div className="relative pb-[20px]">
            {/* Steps content here */}
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
                <ModalTitle normalText="Selecciona les assignatures per clonar" classes={allClasses} selectedClasses={selectedClasses} />
                <SelectedCloneClasses
                  classes={allClasses}
                  selectedClasses={selectedClasses}
                  handleClassesClick={(classe) => handleClassesClick(classe.id, classe.name, classe.shortname)}
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <ModalTitle normalText="Selecciona un docent" highlightedText="destí" additionalText="per clonar" />
                {/* Placeholder for a destination teacher*/}
                {currentTeachers && currentTeachers?.map((teacher) => (
                  <SelectedCloneTeacher
                    key={teacher.id}
                    teacher={teacher}
                    selectedTeacher={selectedTeacherDestination}
                    handleTeacherClick={() => handleTeacherDestinationClick(teacher.id, teacher.firstname, teacher.lastname, teacher.profileimageurlsmall)}
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

            {/* Footer - remains fixed at bottom */}
            <div className="pt-6 flex mt-auto">
              {/* Button previous */}
              {step > 1 && (
                <button
                  className="cursor-pointer p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  onClick={handlePreviousStep}
                >
                  Enrera
                </button>
              )}

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
                    Clonar Classes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-right"
        theme={theme === "dark" ? "dark" : "light"} />
    </div>
  );
}
