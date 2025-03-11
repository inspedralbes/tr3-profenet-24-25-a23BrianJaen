import { getTeachersById } from "@/src/services/communicationManager";
import ClientTeacherProfile from "../../../src/components/ClientTeacherProfile";

interface Props {
  params: { id: string };
}

export default async function TeacherProfile({ params }: Props) {
  //  Acces ID from the `params` object
  const { id } = params;

  const data = await getTeachersById(id);

  return (
    <ClientTeacherProfile dataTeacher={data} />
  );
}
