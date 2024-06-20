import { registerAs } from '@nestjs/config';

export const CONFIG_DATABASE = 'database';

export default registerAs(CONFIG_DATABASE, () => ({
  insight: {
    uri: process.env.INSIGHT_DB_URI,
    connectionName: 'insight',
  },
  patients: {
    uri: process.env.PATIENTS_DB_URI,
    connectionName: 'patients',
  },
  health: {
    uri: process.env.HEALTH_DB_URI,
    connectionName: 'health',
  },
}));
