import { Resolver } from '../../../types/resolver.types';
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';
import { User } from '../../../entity/User';

export const deleteUser: Resolver = async (_, __, { userId, redis, req }) => {
  const { authorization } = req.headers;
  console.log(userId);
  console.log(authorization);

  if (!userId || !authorization) {
    throw new UnauthorizedException();
  }

  try {
    const user = await User.findOne({
      where: { id: userId }
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    await User.remove(user);

    redis.del(authorization);

    return true;
  } catch (err) {
    throw new UnauthorizedException();
  }
};
