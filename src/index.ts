import 'reflect-metadata';
import 'dotenv/config';
import * as express from 'express';
import * as path from 'path';

import { server } from './server';
import { app } from './app';
import { createConnection } from 'typeorm';
import { config } from './ormconfig';

const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_HOST as string
};

const startServer = async () => {
  const typeormConnection = await createConnection(config);
  await typeormConnection.runMigrations();

  server.applyMiddleware({ app, path: '/graphql', cors: corsOptions });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (_, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  const port = process.env.PORT || 4000;
  app.listen(
    {
      port
    },
    () => console.log(`Server is running on port ${port}`)
  );
};

startServer();
