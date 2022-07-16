import { DataSource } from 'typeorm';
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'testdb',
  entities: ['dist/**/*.entity{.ts,.js}'],
  logging: 'all',
  migrations: ['dist/database/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false,
  dropSchema: false,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});
