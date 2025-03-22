import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, '..', 'logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

export const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();
  const requestLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    params: req.params
  };

  const originalJson = res.json;
  res.json = function(data) {
    const responseTime = Date.now() - startTime;
    const responseLog = {
      ...requestLog,
      responseTime: `${responseTime}ms`,
      statusCode: res.statusCode,
      response: data
    };
    
    // Log to console
    console.log('API Log:', JSON.stringify(responseLog, null, 2));
    
    // Write to file
    const logFile = path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`);
    fs.appendFileSync(
      logFile,
      JSON.stringify(responseLog, null, 2) + '\n---\n',
      'utf8'
    );

    return originalJson.call(this, data);
  };

  next();
};