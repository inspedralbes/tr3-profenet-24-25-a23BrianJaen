// Teacher interfaces

export interface TeacherInfo {
  id: string,
  firstname: string,
  lastname: string
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

interface TeacherMoodleClone {
  id: string,
  firstname: string,
  lastname: string,
}

// Classes interfaces

interface Courses {
  id: string,
  name: string,
  shortname: string,
}

// Props

interface TeacherDetailCloneProps {
  payload: TeacherInfo | null;
  text: string;
}

interface TeacherProfileInfoProps {
  dataTeacher: TeacherMoodle
}
export interface ClonePayload {
  originTeacher: TeacherMoodleClone | null;
  destinationTeacher: TeacherMoodleClone | null;
  selectedClasses: Courses[];
}

interface ClaseDetailClone {
  payload: Classes[],
  text: string
}