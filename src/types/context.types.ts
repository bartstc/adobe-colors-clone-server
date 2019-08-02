import { Redis } from 'ioredis';

export interface Context {
  redis: Redis;
  userId: string;
}
