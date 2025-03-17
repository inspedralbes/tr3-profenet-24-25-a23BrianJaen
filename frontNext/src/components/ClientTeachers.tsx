"use client";

import MediaCard from "@/src/components/common/Modals/Cards/MediaCard";
import { type TeacherMoodle } from "../types/types";
import TitlePage from "./common/Layout/TitlePage";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClientTeachersProps {
  teachers: TeacherMoodle[];
}

export default function ClientTeachers({ teachers }: ClientTeachersProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isChangingPage, setIsChangingPage] = useState(false);
  const teachersPerPage = 8;

  // Calculate the teachers to display for the current page
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  // Calculate total pages
  const totalPages = Math.ceil(teachers.length / teachersPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) return;

    setIsChangingPage(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setIsChangingPage(false);
    }, 300); // Duration animation exit 
  };

  // Scroll to top when changing page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [currentPage]);

  return (
    <div className="container">
      <div className="grid md:grid-cols-2 p-2 items-center md:mb-6 sm:mb-2">
        <TitlePage text="Professors" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {currentTeachers.map((teach, index) => (
            <motion.div
              key={teach.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05, // Card staggering
              }}
            >
              <MediaCard teacher={teach} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination controls */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isChangingPage}
          className="px-4 py-2 rounded-lg bg-primary hover:cursor-pointer text-primary 
                    disabled:cursor-auto disabled:opacity-50 transition-all duration-200"
        >
          Enrera
        </motion.button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <motion.button
            key={pageNum}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(pageNum)}
            disabled={isChangingPage}
            className={`px-4 py-2 rounded-lg hover:cursor-pointer transition-all duration-200
              ${currentPage === pageNum
                ? 'bg-primary text-primary font-bold shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {pageNum}
          </motion.button>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isChangingPage}
          className="px-4 py-2 hover:cursor-pointer rounded-lg bg-primary text-primary
                    disabled:cursor-auto disabled:opacity-50 transition-all duration-200"
        >
          Següent
        </motion.button>
      </div>

      {/* Indication current page */}
      <motion.p
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-4 text-primary"
      >
        Página {currentPage} de {totalPages}
      </motion.p>
    </div>
  );
}
