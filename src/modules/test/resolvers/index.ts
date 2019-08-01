import { ResolverMap } from '../../../types/resolver.types';
import { hello } from './hello';

export const resolvers: ResolverMap = {
  Query: {
    hello
  }
};
