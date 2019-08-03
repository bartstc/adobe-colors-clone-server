import { Resolver } from '../../../types/resolver.types';
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';
import { Palette } from '../../../entity/Palette';

export const getUserPalettes: Resolver = (_, __, { userId }) => {
  if (!userId) {
    throw new UnauthorizedException();
  }

  return Palette.createQueryBuilder()
    .where('ownerid = :ownerid', { ownerid: userId })
    .getMany();
};
