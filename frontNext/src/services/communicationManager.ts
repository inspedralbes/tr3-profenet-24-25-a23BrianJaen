import { type TeacherMoodle, type CourseId } from "../types/types";

const API_URL_NODE = process.env.NEXT_PUBLIC_API_URL_NODE;

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

export const getAllUsers = async (): Promise<TeacherMoodle[]> => {
  return fetch(`${API_URL_NODE}/getUsers`)
    .then(res => res.json())
    .then(response => {
      return response.data
    });
};

export const searchUsers = async (searchTerm: string): Promise<TeacherMoodle[]> => {
  return fetch(`${API_URL_NODE}/searchUsers?searchTerm=${searchTerm}`)
    .then(res => res.json())
    .then(response => response.data);
};

export const cloneCoursesTeacher = async (teacherId: string, courses: CourseId[]) => {

  return fetch(`${API_URL_NODE}/cloneCourses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      teacherId,
      courses: courses
    }),
  })
    .then(res => res.json())
    .then(response => response.data);
};

export const manageCoursesTeacher = async (teacherId: string, courses: CourseId[]) => {

  console.log(JSON.stringify({
    teacherId,
    courses: courses
  }));

  return fetch(`${API_URL_NODE}/manageCourses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      teacherId,
      courses: courses
    }),
  })
    .then(res => res.json())
    .then(response => response.data);
};