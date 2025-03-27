import { CONFIG } from './config/config.js';
import express from 'express';
import cors from 'cors';
import authMiddleware from './middleware/authMiddleware.js';
import moodleRoutes from './routes/moodleroutes.js';  // Fixed case sensitivity
import { loggerMiddleware } from './middleware/loggerMiddleware.js';

const app = express();
const port = CONFIG.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(authMiddleware);

// Routes
app.use('/api/moodle', moodleRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API works' });
});

// Only start the server if this file is run directly
app.listen(port, () => {
  console.log(`Servidor Node.js ejecutándose en http://localhost:3010`);
});

export default app;
