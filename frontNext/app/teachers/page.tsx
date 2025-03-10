import { getTeachers, getClasses } from "@/src/services/communicationManager";
import ClientTeachers from "../../src/components/ClientTeachers";

export default async function Teachers() {
  const dataTeachers = await getTeachers();
  const dataClasses = await getClasses();

  return (
    <ClientTeachers teachers={dataTeachers} classes={dataClasses} />
  );
}