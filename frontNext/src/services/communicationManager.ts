import { type Teacher, type Classes } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTeachers = async (): Promise<Teacher[]> => {
  return fetch(`${API_URL}/getTeachers`)
    .then(res => res.json() as Promise<Teacher[]>);
};

export const getClasses = async (): Promise<Classes[]> => {
  return fetch(`${API_URL}/getClasses`)
    .then(res => res.json() as Promise<Classes[]>);
}

export const getTeachersById = async (id: string): Promise<Teacher> => {
  console.log(id);
  return fetch(`${API_URL}/getTeacherById/${id}`)
    .then(res => res.json() as Promise<Teacher>);
};
