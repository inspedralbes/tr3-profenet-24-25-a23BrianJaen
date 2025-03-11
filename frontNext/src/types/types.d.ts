export interface Teacher {
  id: string,
  name: string,
  firstName: string,
  mail: string
}

export interface Classes {
  id: string,
  name: string
}

export interface TeacherInfo {
  id: string,
  name: string,
  firstName: string
}

export interface ClonePayload {
  originTeacher: TeacherInfo | null;
  destinationTeacher: TeacherInfo | null;
  selectedClasses: Classes[];
}

interface TeacherDetailCloneProps {
  payload: TeacherInfo | null;
  text: string;
}

interface ClaseDetailClone {
  payload: Classes[],
  text: string
}