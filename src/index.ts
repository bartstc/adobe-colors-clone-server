import 'reflect-metadata';
import 'dotenv/config';
import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { redis } from './redis';
import { createTypeormConnection } from './utils/createTypeormConnection';

// Dummy typeDefs
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Dummy resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      req,
      redis
    })
  });

  const typeormConnection = await createTypeormConnection();
  await typeormConnection.runMigrations();

  server.applyMiddleware({ app });

  app.listen({
    port: process.env.PORT || 4000
  });
  console.log(`Server is running on port 4000`);
};

startServer();
