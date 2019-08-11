import 'reflect-metadata';
import 'dotenv/config';

import { createTypeormConnection } from './utils/createTypeormConnection';
import { server } from './server';
import { app } from './app';

const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_HOST as string
};

const startServer = async () => {
  const typeormConnection = await createTypeormConnection();
  await typeormConnection.runMigrations();

  server.applyMiddleware({ app, path: '/graphql', cors: corsOptions });

  app.listen({
    port: process.env.PORT || 4000
  });
  console.log(`Server is running on port 4000`);
};

startServer();
