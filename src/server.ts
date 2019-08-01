import { ApolloServer } from 'apollo-server-express';
import { redis } from './redis';
import { schema } from './modules';

export const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    req,
    redis
  })
});
