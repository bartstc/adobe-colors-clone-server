import { ResolverMap } from '../../../types/resolver.types';
import { signup } from './signup';
import { signin } from './signin';
import { currentUser } from './currentUser';
import { logoutUser } from './logoutUser';
import { deleteUser } from './deleteUser';

export const resolvers: ResolverMap = {
  Mutation: {
    signup,
    signin,
    logoutUser,
    deleteUser
  },
  Query: {
    currentUser
  }
};
