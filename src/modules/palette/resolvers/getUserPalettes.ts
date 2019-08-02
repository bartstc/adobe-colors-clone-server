import { Resolver } from '../../../types/resolver.types';
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';
import { Palette } from '../../../entity/Palette';

export const getUserPalettes: Resolver = async (_, __, { userId }) => {
  if (!userId) {
    throw new UnauthorizedException();
  }

  const palettes = await Palette.createQueryBuilder()
    .where('ownerid = :ownerid', { ownerid: userId })
    .getMany();

  return palettes;
};
