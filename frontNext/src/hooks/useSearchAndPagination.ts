import { useState } from 'react';
import { TeacherMoodle } from '../types/types';

interface UseSearchAndPaginationProps {
  items: TeacherMoodle[] | null;
  itemsPerPage?: number;
}

export const useSearchAndPagination = ({ items, itemsPerPage }: UseSearchAndPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Filter items
  const filteredItems = items?.filter((item) =>
    removeAccents(`${item.firstname} ${item.lastname}`)
      .toLowerCase()
      .includes(removeAccents(searchTerm).toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * (itemsPerPage ?? 8);
  const indexOfFirstItem = indexOfLastItem - (itemsPerPage ?? 8);
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((filteredItems?.length || 0) / (itemsPerPage ?? 8));

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return {
    currentPage,
    setCurrentPage,
    searchTerm,
    handleSearch,
    currentItems,
    totalPages,
    filteredItems
  };
};