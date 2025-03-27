import { getTeacherCoursesById } from "@/src/services/communicationManager";
import ClientTeacherProfile from "../../../src/components/ClientTeacherProfile";

export default async function TeacherProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const dataCourses = await getTeacherCoursesById(id);

  return (
    <ClientTeacherProfile dataTeacher={dataCourses} />
  );
}