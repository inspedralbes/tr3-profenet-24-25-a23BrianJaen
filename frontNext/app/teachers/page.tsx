import { getTeachers, getClasses } from "@/src/services/communicationManager";
import ClientTeachers from "../../src/components/ClientTeachers";

export default async function Teachers() {
  const [dataTeachers, dataClasses] = await Promise.all([getTeachers(), getClasses()]);

  return (
    <ClientTeachers teachers={dataTeachers} classes={dataClasses} />
  );
}