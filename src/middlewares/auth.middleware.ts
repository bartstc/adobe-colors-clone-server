import { Request } from 'express';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { redis } from '../redis';

export const AuthMiddleware = async (req: Request) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedException();
  }

  const result = await redis.get(authorization);
  if (!result) {
    throw new UnauthorizedException();
  }
};
