import request from 'supertest';
import app from '../index.js';
import * as moodleController from '../controllers/moodleController.js';
import { mockTeachersResponse } from './mocks/moodleMocks.js';

jest.mock('../controllers/moodleController.js');

describe('API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Moodle API Endpoints', () => {
    describe('GET /api/moodle/getTeachers', () => {
      it('should return teachers by courses', async () => {
        moodleController.getTeachersByCourses.mockImplementation((req, res) => {
          res.json(mockTeachersResponse);
        });

        const response = await request(app)
          .get('/api/moodle/getTeachers')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toEqual(mockTeachersResponse);
      });
    });
  });
});