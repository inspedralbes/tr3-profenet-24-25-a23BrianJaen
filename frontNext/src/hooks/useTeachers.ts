import { useState, useEffect } from 'react';
import { TeacherMoodle } from '../types/types';
import { getAllUsers as commGetAllUsers } from '@/src/services/communicationManager';

export const useTeachers = () => {
  const [dataTeachers, setData] = useState<TeacherMoodle[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await commGetAllUsers();
        setData(response);
        setIsLoading(false);
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  return { dataTeachers, isLoading, error };
};