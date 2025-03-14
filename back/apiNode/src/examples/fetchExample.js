// Configuración de Moodle
const MOODLE_CONFIG = {
  baseUrl: process.env.MOODLE_API_URL || 'http://localhost:8090',
  token: process.env.MOODLE_API_TOKEN || 'c5578c0a8d8fd93d4c70f16d2546a179',
  defaultFormat: 'json'
};

// Moodle roles
const MOODLE_ROLES = {
  TEACHER: '3',
  STUDENT: '5',
  MANAGER: '1'
};

/**
 * Generic function to make requests to the Moodle API
 * @param {string} wsfunction - Moodle API function to call
 * @param {Object} params - Additional parameters for the request
 * @returns {Promise<any>} - API response
 */
async function callMoodleApi(wsfunction, params = {}) {
  try {
    // Base parameters
    const baseParams = {
      wstoken: MOODLE_CONFIG.token,
      wsfunction,
      moodlewsrestformat: MOODLE_CONFIG.defaultFormat,
      ...params
    };

    // Build the URL
    const urlParams = new URLSearchParams(baseParams);
    const url = `${MOODLE_CONFIG.baseUrl}/webservice/rest/server.php?${urlParams.toString()}`;

    console.log(`Llamando a la API de Moodle: ${wsfunction}`);
    console.log('URL:', url);

    // Make the request with a 30-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    console.log('Iniciando petición...');

    try {
      console.log('Enviando petición a Moodle...');
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      console.log('Respuesta recibida:', response.status, response.statusText);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Verify if Moodle returns an error
      if (data && data.exception) {
        throw new Error(`Error de Moodle: ${data.message}`);
      }

      return data;

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('La petición excedió el tiempo límite de 30 segundos');
      }
      throw error;
    }

  } catch (error) {
    console.error(`Error en callMoodleApi (${wsfunction}):`, error.message);
    throw error;
  }
}

/**
 * Gets the teachers of a course
 * @param {number} courseId - Course ID
 * @returns {Promise<Array>} - List of teachers
 */
async function getMoodleTeachers(courseId = 4) {
  try {
    const params = {
      courseid: courseId,
      'options[0][name]': 'roleid',
      'options[0][value]': MOODLE_ROLES.TEACHER
    };

    const data = await callMoodleApi('core_enrol_get_enrolled_users', params);
    console.log(`Encontrados ${data.length} profesores para el curso ${courseId}`);
    return data;

  } catch (error) {
    console.error('Error al obtener profesores:', error.message);
    throw error;
  }
}

/**
 * Gets users by role
 * @param {number} courseId - Course ID
 * @param {string} roleId - Role ID
 * @returns {Promise<Array>} - List of users
 */
async function getMoodleUsersByRole(courseId, roleId) {
  if (!courseId || !roleId) {
    throw new Error('Se requieren courseId y roleId');
  }

  try {
    const params = {
      courseid: courseId,
      'options[0][name]': 'roleid',
      'options[0][value]': roleId
    };

    const data = await callMoodleApi('core_enrol_get_enrolled_users', params);
    console.log(`Encontrados ${data.length} usuarios con rol ${roleId} en el curso ${courseId}`);
    return data;

  } catch (error) {
    console.error('Error al obtener usuarios por rol:', error.message);
    throw error;
  }
}

// Example usage
async function main() {
  try {
    // Get teachers from course 4
    console.log('\n1. Obteniendo profesores del curso 4:');
    const teachers = await getMoodleTeachers(4);
    console.log('Profesores:', teachers.map(t => t.fullname));

    // Get students from course 4
    console.log('\n2. Obteniendo estudiantes del curso 4:');
    const students = await getMoodleUsersByRole(4, MOODLE_ROLES.STUDENT);
    console.log('Estudiantes:', students.map(s => s.fullname));

  } catch (error) {
    console.error('Error en la ejecución:', error.message);
  }
}

// Execute the example
main();
