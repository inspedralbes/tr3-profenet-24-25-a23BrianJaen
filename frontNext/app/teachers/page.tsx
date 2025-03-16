import { getTeachers, getTeacherCourses, getClasses } from "@/src/services/communicationManager";
import ClientTeachers from "../../src/components/ClientTeachers";

export default async function Teachers() {
  const [dataTeachers, dataClasses, dataTeacherCourses] = await Promise.all([getTeachers(), getClasses(), getTeacherCourses("4")]);

  console.log(dataTeacherCourses);

  return (
    <ClientTeachers teachers={dataTeachers} classes={dataClasses} />
  );
}