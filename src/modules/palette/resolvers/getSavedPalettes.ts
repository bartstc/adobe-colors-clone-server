import { Resolver } from '../../../types/resolver.types';
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';
import { User } from '../../../entity/User';
import { In } from 'typeorm';
import { Palette } from '../../../entity/Palette';

export const getSavedPalettes: Resolver = async (_, __, { userId }) => {
  if (!userId) {
    throw new UnauthorizedException();
  }

  try {
    const user = await User.findOne({
      where: { id: userId },
      select: ['savedPalettes']
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return await Palette.find({
      where: { id: In(user.savedPalettes) }
    });
  } catch (err) {
    throw new UnauthorizedException();
  }
};
