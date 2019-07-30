import { Redis } from 'ioredis';

export interface Context {
  redis: Redis;
  req: Express.Request;
}
