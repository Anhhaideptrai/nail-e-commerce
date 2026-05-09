import type {
  DatabaseConnectionOptions,
  DatabaseProvider,
} from './database.types';

const DEFAULT_PORT_BY_PROVIDER: Record<DatabaseProvider, number> = {
  mongodb: 27017,
  mysql: 3306,
  postgres: 5432,
};

export function getDatabaseConfig(): DatabaseConnectionOptions {
  const provider = getDatabaseProvider(process.env.DB_PROVIDER);
  const configuredPort = Number(process.env.DB_PORT);

  return {
    database: process.env.DB_NAME ?? '',
    host: process.env.DB_HOST ?? '',
    password: process.env.DB_PASSWORD ?? '',
    port: Number.isFinite(configuredPort)
      ? configuredPort
      : DEFAULT_PORT_BY_PROVIDER[provider],
    provider,
    ssl: process.env.DB_SSL === 'true',
    username: process.env.DB_USERNAME ?? '',
  };
}

function getDatabaseProvider(value: string | undefined): DatabaseProvider {
  if (value === 'mysql' || value === 'mongodb') {
    return value;
  }

  return 'postgres';
}
