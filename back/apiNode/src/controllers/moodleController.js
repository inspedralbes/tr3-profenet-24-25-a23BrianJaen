export const getEnrolledTeachers = async (req, res) => {
  try {
    const courseId = req.params.courseId || 0;
    const baseUrl = process.env.MOODLE_API_URL;
    const wstoken = process.env.MOODLE_API_TOKEN;

    const params = new URLSearchParams({
      wstoken: wstoken,
      wsfunction: 'core_enrol_get_enrolled_users',
      moodlewsrestformat: 'json',
      courseid: courseId
    });

    // Establish Teacher role
    params.append('options[0][name]', 'roleid');
    params.append('options[0][value]', '3');

    console.log('courseId:', courseId);

    const url = `${baseUrl}/webservice/rest/server.php?${params.toString()}`;
    console.log('Requesting URL:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error:', error);

    res.status(500).json({
      status: 'error',
      message: 'Error al conectar con Moodle',
      details: error.message
    });
  }
};

export const getEnrolledUsersByRole = async (req, res) => {
  try {

    const { courseId, roleId } = req.query;

    if (!courseId || !roleId) {
      return res.status(400).json({
        status: 'error',
        message: 'Se requieren courseId y roleId'
      });
    }

    const baseUrl = process.env.MOODLE_API_URL;
    const wstoken = process.env.MOODLE_API_TOKEN;

    const params = new URLSearchParams({
      wstoken: wstoken,
      wsfunction: 'core_enrol_get_enrolled_users',
      moodlewsrestformat: 'json',
      courseid: courseId
    });

    // Establish role
    params.append('options[0][name]', 'roleid');
    params.append('options[0][value]', roleId);

    const url = `${baseUrl}/webservice/rest/server.php?${params.toString()}`;
    console.log('Requesting URL:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error:', error);

    res.status(500).json({
      status: 'error',
      message: 'Error al conectar con Moodle',
      details: error.message
    });

  }
};
