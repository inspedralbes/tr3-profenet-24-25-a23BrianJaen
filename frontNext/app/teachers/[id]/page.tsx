import { getTeachersById } from "@/src/services/communicationManager";

interface Props {
  params: { id: string }; // Definimos explícitamente el tipo de `params` Define 
}

export default async function TeacherProfile({ params }: Props) {
  //  Acces ID from the `params` object
  const { id } = params;

  const data = await getTeachersById(id);

  return (
    <div>
      <h1>Perfil del Profesor</h1>
      <p>ID del Profesor: {id}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
