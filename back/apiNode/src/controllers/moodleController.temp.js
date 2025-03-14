// Configuración de Moodle
const MOODLE_CONFIG = {
  baseUrl: process.env.MOODLE_API_URL || 'http://localhost:8090',
  token: process.env.MOODLE_API_TOKEN || 'c5578c0a8d8fd93d4c70f16d2546a179',
  defaultFormat: 'json'
};

// Roles de Moodle
const MOODLE_ROLES = {
  TEACHER: '3',
  STUDENT: '5',
  MANAGER: '1'
};

/**
 * Generic function to make a petition to API moodle
 * @param {string} wsfunction - API funtion to call
 * @param {Object} params - Addition params for the request  
 * @returns {Promise<any>} - API response
 */
async function callMoodleApi(wsfunction, params = {}) {
  try {
    // Base params
    const baseParams = {
      wstoken: MOODLE_CONFIG.token,
      wsfunction,
      moodlewsrestformat: MOODLE_CONFIG.defaultFormat,
      ...params
    };

    // Build URL
    const urlParams = new URLSearchParams(baseParams);
    const url = `${MOODLE_CONFIG.baseUrl}/webservice/rest/server.php?${urlParams.toString()}`;

    console.log(`Llamando a la API de Moodle: ${wsfunction}`);
    console.log('URL:', url);

    // Make a request with timeout of 30 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Verify if Moodle return a error
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
 * Get enrolled teachers
 */
const getEnrolledTeachers = async (req, res) => {
  try {
    const courseId = req.params.courseId || 4;
    const params = {
      courseid: courseId,
      'options[0][name]': 'roleid',
      'options[0][value]': MOODLE_ROLES.TEACHER
    };

    const data = await callMoodleApi('core_enrol_get_enrolled_users', params);
    res.json({ status: 'success', data });

  } catch (error) {
    console.error('Error al obtener profesores:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Error al conectar con Moodle',
      details: error.message
    });
  }
};

/**
 * Get enrolled users by role
 */
const getEnrolledUsersByRole = async (req, res) => {
  try {
    const { courseId, roleId } = req.query;
    if (!courseId || !roleId) {
      return res.status(400).json({
        status: 'error',
        message: 'Se requieren courseId y roleId'
      });
    }

    const params = {
      courseid: courseId,
      'options[0][name]': 'roleid',
      'options[0][value]': roleId
    };

    const data = await callMoodleApi('core_enrol_get_enrolled_users', params);
    res.json({ status: 'success', data });

  } catch (error) {
    console.error('Error al obtener usuarios por rol:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Error al conectar con Moodle',
      details: error.message
    });
  }
};

export { getEnrolledTeachers, getEnrolledUsersByRole };
