import { ResolverMap } from './resolver.types';

export interface Module {
  typeDefs: any[];
  resolvers?: ResolverMap;
}
