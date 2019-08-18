import { Resolver } from '../../../types/resolver.types';
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';

export const logoutUser: Resolver = async (_, __, { userId, redis, req }) => {
  const { authorization } = req.headers;

  if (!userId || !authorization) {
    throw new UnauthorizedException();
  }

  redis.del(authorization);

  return true;
};
