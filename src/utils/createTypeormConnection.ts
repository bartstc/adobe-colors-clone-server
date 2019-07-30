import { createConnection, getConnectionOptions } from 'typeorm';

export const createTypeormConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === 'production'
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        name: 'default'
      } as any)
    : createConnection({ ...connectionOptions, name: 'default' });
};
