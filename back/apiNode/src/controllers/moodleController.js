import { CONFIG } from "../config/config.js";


/**
 * Get all courses available.
 * @returns {Promise<Array>} List of available courses.
 */
export async function getCourses() {
  try {
    const params = new URLSearchParams({
      wstoken: CONFIG.MOODLE_API_TOKEN,
      wsfunction: "core_course_get_courses",
      moodlewsrestformat: "json",
    });

    const url = `${CONFIG.MOODLE_API_URL}/webservice/rest/server.php?${params.toString()}`;

    const response = await fetch(url);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Ensure the response is parsed as JSON
    const data = await response.json();

    const filteredCourses = data.filter(course => course.id >= 10);

    return filteredCourses
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }
}

/**
 * Get users enrolled in a course by ID.
 * @param {number} courseId - ID of the course.
 * @returns {Promise<Array>} List of enrolled users.
 */
async function getEnrolledUsers(courseId) {
  try {

    const params = new URLSearchParams({
      wstoken: CONFIG.MOODLE_API_TOKEN,
      wsfunction: "core_enrol_get_enrolled_users",
      moodlewsrestformat: "json",
      courseid: courseId,
    });

    const url = `${CONFIG.MOODLE_API_URL}/webservice/rest/server.php?${params.toString()}`

    const response = await fetch(url);

    const data = await response.json()

    return data; // List of enrolled users
  } catch (error) {
    console.error(`Error getting users enrolled in course ${courseId}:`, error);
    throw error;
  }
}

/**
 * Filter users enrolled in a course who have the Teacher role.
 * @param {Array} users - List of enrolled users.
 * @returns {Array} List of users with Teacher role.
 */

function filterTeachers(users) {
  return users.filter((user) =>
    user.roles.some((role) => role.roleid === 3)
  );
}

/**
 * Map teachers with the courses they are enrolled in.
 * @returns {Promise<Object>} Map of teachers and related courses.
 */
export async function getTeachersByCourses(req, res) {
  const courses = await getCourses();
  const teacherCourseMap = new Map();

  for (const course of courses) {
    const users = await getEnrolledUsers(course.id);
    const teachers = filterTeachers(users);

    teachers.forEach((teacher) => {
      if (!teacherCourseMap.has(teacher.id)) {
        // If the teacher is not in the map, initialize it
        teacherCourseMap.set(teacher.id, {
          id: teacher.id,
          firstname: teacher.firstname,
          lastname: teacher.lastname,
          email: teacher.email,
          profileimageurlsmall: teacher.profileimageurlsmall,
          profileimageurl: teacher.profileimageurl,
          courses: [],
        });
      }

      // Add the course the teacher is enrolled in
      teacherCourseMap.get(teacher.id).courses.push({
        id: course.id,
        name: course.fullname,
        shortname: course.shortname,
      });
    });
  }

  // Convert the Map to an array of teachers
  const teachersArray = Array.from(teacherCourseMap.values());
  res.json({ status: 'success', data: teachersArray });
}

/**
 * Get courses for a specific teacher by their ID.
 * @param {Object} req - Express request object with teacherId parameter.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} Teacher's courses and information.
 */
export async function getTeacherCourses(req, res) {
  try {
    const { teacherId } = req.params;

    // First get all teachers and their courses
    const courses = await getCourses();
    const teacherCourseMap = new Map();

    for (const course of courses) {
      const users = await getEnrolledUsers(course.id);
      const teachers = filterTeachers(users);

      teachers.forEach((teacher) => {
        if (!teacherCourseMap.has(teacher.id)) {
          teacherCourseMap.set(teacher.id, {
            id: teacher.id,
            firstname: teacher.firstname,
            lastname: teacher.lastname,
            email: teacher.email,
            profileimageurlsmall: teacher.profileimageurlsmall,
            profileimageurl: teacher.profileimageurl,
            courses: [],
          });
        }

        teacherCourseMap.get(teacher.id).courses.push({
          id: course.id,
          name: course.fullname,
          shortname: course.shortname,
        });
      });
    }

    // Search the specific teacher
    const teacherData = teacherCourseMap.get(parseInt(teacherId));

    if (!teacherData) {
      return res.status(404).json({
        status: 'error',
        message: 'Teacher not found'
      });
    }

    res.json({
      status: 'success',
      data: teacherData
    });
  } catch (error) {
    console.error('Error getting teacher courses:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

async function getAllUsersMoodle() {
  try {

    const params = new URLSearchParams({
      wstoken: CONFIG.MOODLE_API_TOKEN,
      wsfunction: "core_user_get_users",
      moodlewsrestformat: "json",
      "criteria[0][key]": "",
      "criteria[0][value]": "",
    });

    const url = `${CONFIG.MOODLE_API_URL}/webservice/rest/server.php?${params.toString()}`

    const response = await fetch(url);

    const data = await response.json()

    return data.users; // List all users moodle
  } catch (error) {
    console.error("Error fetching all Moodle users:", error);
    throw new Error(`Failed to fetch Moodle users: ${error.message}`);
  }
}

/**
 * Get all users 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} Teacher's information.
 */
export async function getAllUsers(req, res) {
  const teachers = await getAllUsersMoodle();
  const teacherCourseMap = new Map();

  teachers.forEach((teacher) => {
    if (!teacherCourseMap.has(teacher.id)) {
      // If the teacher is not in the map, initialize it
      teacherCourseMap.set(teacher.id, {
        id: teacher.id,
        firstname: teacher.firstname,
        lastname: teacher.lastname,
        profileimageurlsmall: teacher.profileimageurlsmall,
      });
    }
  });

  // Convert the Map to an array of teachers
  const teachersArray = Array.from(teacherCourseMap.values());
  res.json({ status: 'success', data: teachersArray });
}

export async function cloneCourses(req, res) {
  try {
    const { teacherId, courses } = req.body;

    console.log('Teacher ID:', teacherId);
    console.log('Selected Classes:', courses);

    const params = new URLSearchParams();
    params.append("wstoken", CONFIG.MOODLE_API_TOKEN);
    params.append("wsfunction", "enrol_manual_enrol_users");
    params.append("moodlewsrestformat", "json");

    courses.forEach((course, index) => {
      params.append(`enrolments[${index}][roleid]`, "3");
      params.append(`enrolments[${index}][userid]`, teacherId);
      params.append(`enrolments[${index}][courseid]`, course.id.toString());
    });

    const url = `${CONFIG.MOODLE_API_URL}/webservice/rest/server.php?${params.toString()}`
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      return res.json({
        status: 'success',
        message: 'Courses cloned successfully',
        data: "success"
      });
    } else {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to clone courses',
        error: data
      });
    }

  } catch (error) {
    console.error('Error cloning courses:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function manageCourses(req, res) {
  try {
    const { teacherId, courses } = req.body;

    console.log('Teacher ID:', teacherId);
    console.log('Selected Classes:', courses);

    const params = new URLSearchParams();
    params.append("wstoken", CONFIG.MOODLE_API_TOKEN);
    params.append("wsfunction", "enrol_manual_unenrol_users");
    params.append("moodlewsrestformat", "json");

    courses.forEach((course, index) => {
      params.append(`enrolments[${index}][roleid]`, "3");
      params.append(`enrolments[${index}][userid]`, teacherId);
      params.append(`enrolments[${index}][courseid]`, course.id.toString());
    });

    const url = `${CONFIG.MOODLE_API_URL}/webservice/rest/server.php?${params.toString()}`
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      return res.json({
        status: 'success',
        message: 'Courses cloned successfully',
        data: "success"
      });
    } else {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to clone courses',
        error: data
      });
    }

  } catch (error) {
    console.error('Error cloning courses:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}