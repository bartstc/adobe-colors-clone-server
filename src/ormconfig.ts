import { ConnectionOptions } from 'typeorm';

const developmentConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  synchronize: true,
  logging: true
};

const productionConfig: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL, // heroku db as addons
  entities: ['src/entity/**/*.ts'],
  synchronize: false
};

export const config =
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
