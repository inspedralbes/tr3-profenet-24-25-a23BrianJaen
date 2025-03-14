// Teacher interfaces

export interface Teacher {
  id: string,
  name: string,
  firstName: string,
  mail: string,
  imageUrl?: string
}

export interface TeacherInfo {
  id: string,
  name: string,
  firstName: string
}

interface TeacherDetailCloneProps {
  payload: TeacherInfo | null;
  text: string;
}

interface TeacherProfileInfoProps {
  dataTeacher: Teacher
  classes: Classes[]
}

// Classes interfaces

export interface Classes {
  id: string,
  name: string
}

export interface ClonePayload {
  originTeacher: TeacherInfo | null;
  destinationTeacher: TeacherInfo | null;
  selectedClasses: Classes[];
}

interface ClaseDetailClone {
  payload: Classes[],
  text: string
}