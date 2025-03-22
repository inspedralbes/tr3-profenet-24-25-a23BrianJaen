import { CONFIG } from './config/config.js';
import express from 'express';
import cors from 'cors';
import authMiddleware from './middleware/authMiddleware.js';
import moodleRoutes from './routes/moodleRoutes.js';

const app = express();
const port = CONFIG.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// Routes
app.use('/api/moodle', moodleRoutes);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

app.listen(port, () => {
  console.log(`Servidor Node.js ejecutándose en http://localhost:${port}`);
});
