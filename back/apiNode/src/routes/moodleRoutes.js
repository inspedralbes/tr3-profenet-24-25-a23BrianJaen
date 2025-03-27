import { Router } from 'express';
import { getTeachersByCourses, getTeacherCourses, getAllUsers, cloneCourses, manageCourses } from '../controllers/moodleController.js';

const router = Router();

router.get('/getTeachers', getTeachersByCourses);
router.get('/teacher/:teacherId/courses', getTeacherCourses);
router.get('/getUsers', getAllUsers);
router.post('/cloneCourses', cloneCourses);
router.post('/manageCourses', manageCourses);

export default router;