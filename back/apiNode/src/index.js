import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import authMiddleware from './middleware/authMiddleware.js';
import { getTeachersByCourses, getTeacherCourses, getAllUsers, cloneCourses, manageCourses } from './controllers/moodleController.js';

// Loading env vars
config();

const app = express();
const port = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// Routes
app.get('/api/moodle/getTeachers', getTeachersByCourses);
app.get('/api/moodle/teacher/:teacherId/courses', getTeacherCourses);
app.get('/api/moodle/getUsers', getAllUsers);
app.post('/api/moodle/cloneCourses', cloneCourses)
app.post('/api/moodle/manageCourses', manageCourses)

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

app.listen(port, () => {
  console.log(`Servidor Node.js ejecutándose en http://localhost:${port}`);
});
