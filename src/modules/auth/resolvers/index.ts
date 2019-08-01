import { ResolverMap } from '../../../types/resolver.types';
import { signup } from './signup';
import { signin } from './signin';
import { currentUser } from './currentUser';

export const resolvers: ResolverMap = {
  Mutation: {
    signup,
    signin
  },
  Query: {
    currentUser
  }
};
