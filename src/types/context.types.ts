import { Redis } from 'ioredis';
import { Request } from 'express';

export interface Context {
  redis: Redis;
  req: Request;
}
