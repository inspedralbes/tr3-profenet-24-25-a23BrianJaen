import { getTeachersById, getClasses } from "@/src/services/communicationManager";
import ClientTeacherProfile from "../../../src/components/ClientTeacherProfile";

interface Props {
  params: { id: string };
}

export default async function TeacherProfile({ params }: Props) {
  //  Acces ID from the `params` object
  const { id } = params;

  const [data, dataClasses] = await Promise.all([getTeachersById(id), getClasses()]);

  return (
    <ClientTeacherProfile dataTeacher={data} classes={dataClasses} />
  );
}
