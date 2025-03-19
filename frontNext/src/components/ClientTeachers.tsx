"use client";

import MediaCard from "@/src/components/common/Modals/Cards/MediaCard";
import { type TeacherMoodle } from "../types/types";
import TitlePage from "./common/Layout/TitlePage";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useSearchAndPagination } from '../hooks/useSearchAndPagination';

interface ClientTeachersProps {
  teachers: TeacherMoodle[];
}

export default function ClientTeachers({ teachers }: ClientTeachersProps) {
  const [isChangingPage, setIsChangingPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    currentPage,
    setCurrentPage,
    searchTerm,
    handleSearch,
    currentItems: currentTeachers,
    totalPages
  } = useSearchAndPagination({
    items: teachers,
    itemsPerPage: 8
  });

  // const teachersPerPage = 8;

  // Calculate the teachers to display for the current page
  // const indexOfLastTeacher = currentPage * teachersPerPage;
  // const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  // Add this state near your other useState declarations
  // const [searchTerm, setSearchTerm] = useState("");

  // Filter teachers
  // const filteredTeachers = teachers.filter((teacher) =>
  //   `${teacher.firstname} ${teacher.lastname}`
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase())
  // );

  // Update the currentTeachers calculation
  // const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  // Update the totalPages calculation to use filtered results
  // const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

  // Update the input element
  // <input
  //   className="border border-gray-300 rounded-md p-2"
  //   type="text"
  //   placeholder="Introdueix un nom"
  //   value={searchTerm}
  //   onChange={(e) => {
  //     setSearchTerm(e.target.value);
  //     setCurrentPage(1); // Reset to first page when searching
  //   }}
  // />

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

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const SkeletonCard = () => (
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3 mt-4">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
      </div>
    </div>
  );

  return (
    <div className="container flex flex-col">
      <div className="flex gap-2 p-2 items-center md:mb-6 sm:mb-2 justify-between">
        <TitlePage text="Professors" />
        <div className="relative group">
          <input
            className="border border-gray-300 rounded-md p-2"
            type="text"
            placeholder="Introdueix un nom"
            value={searchTerm}
            onChange={(e) => {
              handleSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-md px-2 py-1 -bottom-8 right-0 whitespace-nowrap">
            Cerca un professor pel seu nom
          </div>
        </div>
      </div>

      {/* Content area with flex-grow to push pagination to bottom */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-4"
          >
            {isLoading ? (
              // Skeleton loading state
              [...Array(8)].map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))
            ) : (
              // Actual content
              currentTeachers.map((teach, index) => (
                <motion.div
                  key={teach.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <MediaCard teacher={teach} />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
        <div className=" pt-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isChangingPage}
              className="px-4 py-2 rounded-lg bg-primary hover:cursor-pointer text-primary 
              disabled:cursor-auto disabled:opacity-50 transition-all duration-200"
            >
              {/* Enrera */}
              <ArrowBigLeft />
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
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-primary text-primary font-bold shadow-lg'
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
              {/* Següent */}
              <ArrowBigRight />
            </motion.button>
          </div>

          <motion.p
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4 text-primary"
          >
            Página {currentPage} de {totalPages}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
