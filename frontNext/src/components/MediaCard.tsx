import Image from 'next/image';
import { type Professor } from "../../src/types/types";

// Define props for the ClientTeachers component
interface MediaCardProps {
  teacher: Professor;
}

export default function MediaCard({ teacher }: MediaCardProps) {

  return (
    <div className="max-w-xs rounded-lg border border-gray-200 overflow-hidden shadow-lg mb-4">
      <div className="group">
        <Image
          className="w-16 h-16 rounded-full object-cover m-1.5"
          src="/images/docent.png"
          alt={teacher.name || "Usuari"}
          width={100}
          height={100}
        />

        <div className="p-4">
          <h5 className="text-xl font-semibold text-primary">{teacher.name} {teacher.firstname}</h5>
          <p className="text-primary text-sm mt-2">
            {teacher.mail}
          </p>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 flex justify-between">
        <button className="cursor-pointer text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors">
          Veure perfil
        </button>
      </div>
    </div>
  );
}