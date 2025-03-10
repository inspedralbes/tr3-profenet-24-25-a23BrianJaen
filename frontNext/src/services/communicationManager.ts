import { type Professor, type Classes } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTeachers = async (): Promise<Professor[]> => {
  return fetch(`${API_URL}/getTeachers`)
    .then(res => res.json() as Promise<Professor[]>);
};

export const getClasses = async (): Promise<Classes[]> => {
  return fetch(`${API_URL}/getClasses`)
    .then(res => res.json() as Promise<Classes[]>);
}