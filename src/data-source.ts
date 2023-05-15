import 'reflect-metadata';
import 'dotenv/config';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const DataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, 'entities/**.{js,ts}');
  const migrationsPath: string = path.join(__dirname, 'migrations/**.{js,ts}');

  const nodeEnv: string | undefined = process.env.NODE_ENV;
  const dbUrl: string | undefined = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error('Missing env var: DATABASE_URL');
  }

  if (nodeEnv === 'test') {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  return {
    type: 'postgres',
    url: dbUrl,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

const AppDataSource: DataSource = new DataSource(DataSourceConfig());

export { AppDataSource };
