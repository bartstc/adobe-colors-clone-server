import { Resolver } from '../../../types/resolver.types';
import { User } from '../../../entity/User';
import { HttpException } from '../../../exceptions/HttpException';
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';

export const currentUser: Resolver = async (_, __, { userId }) => {
  if (!userId) {
    throw new UnauthorizedException();
  }

  const user = await User.findOne({
    where: { id: userId },
    select: ['username', 'id']
  });

  if (user) {
    return { id: user.id, username: user.username };
  } else {
    throw new HttpException(500, 'something goes wrong');
  }
};
