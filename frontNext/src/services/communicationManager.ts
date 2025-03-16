import { type Teacher, type Classes, type TeacherMoodle } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL_NODE = process.env.NEXT_PUBLIC_API_URL_NODE;

export const getClasses = async (): Promise<Classes[]> => {
  return fetch(`${API_URL}/getClasses`)
    .then(res => res.json() as Promise<Classes[]>);
}

export const getTeachersById = async (id: string): Promise<Teacher> => {
  return fetch(`${API_URL}/getTeacherById/${id}`)
    .then(res => res.json() as Promise<Teacher>);
};

export const getTeachers = async (): Promise<TeacherMoodle[]> => {
  return fetch(`${API_URL_NODE}/getTeachers`)
    .then(res => res.json())
    .then(response => response.data);
};

export const getTeacherCourses = async (teacherId: string): Promise<TeacherMoodle> => {
  return fetch(`${API_URL_NODE}/teacher/${teacherId}/courses`)
    .then(res => res.json())
    .then(response => response.data);
};

export const getTeacherCoursesById = async (teacherId: string): Promise<TeacherMoodle> => {
  return fetch(`${API_URL_NODE}/teacher/${teacherId}/courses`)
    .then(res => res.json())
    .then(response => response.data);
};
