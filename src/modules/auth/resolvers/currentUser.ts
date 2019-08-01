import { Resolver } from '../../../types/resolver.types';
import { AuthMiddleware } from '../../../middlewares/auth.middleware';
import { User } from '../../../entity/User';
import { HttpException } from '../../../exceptions/HttpException';

export const currentUser: Resolver = async (_, __, { req, redis }) => {
  await AuthMiddleware(req);

  const id = await redis.get(req.headers.authorization as string);
  const user = await User.findOne({
    where: { id },
    select: ['username']
  });

  if (user) {
    return { id, username: user.username };
  } else {
    throw new HttpException(500, 'something goes wrong');
  }
};
