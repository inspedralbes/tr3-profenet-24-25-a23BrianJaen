export interface Professor {
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