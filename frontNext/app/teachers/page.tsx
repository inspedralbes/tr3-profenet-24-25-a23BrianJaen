import { getTeachers } from "@/src/services/communicationManager";
import ClientTeachers from "../../src/components/ClientTeachers";

export default async function Teachers() {
  const data = await getTeachers();

  return (
    <ClientTeachers teachers={data} />
  );
}