import { ApolloServer } from 'apollo-server-express';
import { redis } from './redis';
import { schema } from './modules';

const getUserId = async (token: string) => {
  try {
    if (token) {
      return await redis.get(token);
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const { authorization } = req.headers;
    const userId = await getUserId(authorization);

    return { userId, redis };
  }
});
