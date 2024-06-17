// src/config/database.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  insight: {
    uri: process.env.INSIGHT_DB_URI,
  },
  patients: {
    uri: process.env.PATIENTS_DB_URI,
  },
  health: {
    uri: process.env.HEALTH_DB_URI,
  },
}));
