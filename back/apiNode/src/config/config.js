import { config } from 'dotenv';
config();

export const CONFIG = {
  PORT: process.env.PORT || 3010,
  MOODLE_API_URL: process.env.MOODLE_API_URL,
  MOODLE_API_TOKEN: process.env.MOODLE_API_TOKEN,
};