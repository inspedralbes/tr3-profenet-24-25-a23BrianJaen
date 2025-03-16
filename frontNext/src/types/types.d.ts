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
  firstname: string,
  lastname: string
}

interface TeacherDetailCloneProps {
  payload: TeacherInfo | null;
  text: string;
}

interface TeacherProfileInfoProps {
  dataTeacher: TeacherMoodle

}

interface Courses {
  id: string,
  name: string,
  shotname: string,
}

interface TeacherMoodle {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  profileimageurlsmall: string,
  profileimageurl: string,
  courses: Courses[]
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