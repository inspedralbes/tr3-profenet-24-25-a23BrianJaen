import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import { useTheme } from "next-themes";
import { X } from "lucide-react";

import { ManagePayload, TeacherInfo, Courses, ModalProps } from "../../../../types/types"

import SelectedManageClasses from "../../Manage/SelectedManageClasses";
import ConfirmManage from "../../Manage/ConfirmManage";
import ModalTitle from "../CloneModals/ModalTitle";

import { manageCoursesTeacher } from "@/src/services/communicationManager";

import { Toaster, toast } from "sonner"


export default function ModalManageCoursesTeacher({ isOpen, onClose, title, teacher, courses }: ModalProps) {
  const [selectedTeacherDestination, setSelectedTeacherDestination] = useState<TeacherInfo>(teacher);
  const [selectedClasses, setSelectedClasses] = useState<Courses[]>(courses);
  const [allClasses, setAllClasses] = useState<Courses[]>(courses);
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState<number>(3);

  const { theme } = useTheme();
  const router = useRouter();

  // Estate to store the payload
  const [payload, setPayload] = useState<ManagePayload>({
    destinationTeacher: teacher,
    selectedClasses: selectedClasses,
  });

  // Reset when the modal is open or closed
  useEffect(() => {
    if (isOpen) {
      // When modal is open
      setSelectedTeacherDestination(teacher)
      setAllClasses(courses);
      setSelectedClasses(courses);
      setStep(1);
      setPayload({
        destinationTeacher: teacher,
        selectedClasses: courses
      });
    }
  }, [teacher, isOpen, courses]);

  useEffect(() => {
    if (isOpen) {
      setCountdown(4);
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
    setSelectedClasses([]);
    setStep(1);
    setCountdown(4); // Reset countdown when closing
    onClose();
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSendRequestToBack = async () => {

    console.log(selectedTeacherDestination);

    if (!selectedTeacherDestination || selectedClasses.length === 0) return;

    const coursesSelecteds = new Map();

    selectedClasses.forEach((course) => {
      coursesSelecteds.set(course.id, { id: parseInt(course.id) });
    });

    const response = await manageCoursesTeacher(
      selectedTeacherDestination.id,
      Array.from(coursesSelecteds.values())
    );

    console.log(response);
    if (response == "success") {
      toast.success("Desuscrit correctamente", {
        description: (
          <div>
            <p>S&apos;ha desuscrit correctament de les classes</p>
            <p>Se&apos;t tornarà a la vista de professors</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700">
              <div
                className="bg-green-600 h-1.5 rounded-full transition-all duration-1000"
                style={{ width: `${((4 - countdown) / 4) * 100}%` }}
              />
            </div>
            <p className="text-sm mt-1">Tancant en {countdown} segons...</p>
          </div>
        ),
        duration: 4000,
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
        setCountdown(4); // Reset countdown
        router.replace('/teachers');
      }, 4000);
    }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className={`p-6 rounded-lg shadow-lg max-w-xl w-full flex flex-col max-h-[80vh] ${theme === "dark" ? "bg-[#0f1214]" : "bg-white"}`}>
        {/* Header - remains fixed */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary p-2">
            {title || `Gestionar clases de ${teacher?.firstname} ${teacher?.lastname}`}
          </h2>
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
                <ModalTitle normalText="Selecciona les assignatures per gestionar" classes={allClasses} selectedClasses={selectedClasses} />
                <SelectedManageClasses
                  classes={allClasses}
                  selectedClasses={selectedClasses}
                  handleClassesClick={(classe) => handleClassesClick(classe.id, classe.name, classe.shortname)}
                />
              </div>
            )}

            {step === 2 && (
              <div>
                <ModalTitle normalText="Selecció total de les dades del docent" />
                <ConfirmManage payload={payload} />
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
                {step < 2 ? (
                  <button
                    className="cursor-pointer p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 justify-end"
                    onClick={handleNextStep}
                    disabled={
                      (step === 1 && selectedClasses.length === 0) ||
                      (step === 2 && selectedClasses.length === 0)
                    }
                  >
                    Següent
                  </button>
                ) : (
                  <button
                    className="cursor-pointer p-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                    onClick={handleSendRequestToBack}
                  >
                    Desubscriure&apos;s de les Classes
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
