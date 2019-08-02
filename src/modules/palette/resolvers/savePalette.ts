import { Resolver } from '../../../types/resolver.types';
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';
import { User } from '../../../entity/User';
import { AlreadySavedException } from '../../../exceptions/AlreadySavedException';
import { PaletteNotFoundException } from '../../../exceptions/PaletteNotFoundException';

export const savePalette: Resolver = async (_, { id }, { userId }) => {
  if (!userId) {
    throw new UnauthorizedException();
  }

  try {
    const user = await User.findOne({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('unauthorized');
    }

    const alreadySaved =
      user.savedPalettes.filter(palette => palette === id).length > 0;
    if (alreadySaved) {
      throw new Error('already saved');
    }

    user.savedPalettes = [...user.savedPalettes, id];
    await User.save(user);

    return true;
  } catch (err) {
    if (err.message === 'unauthorized') {
      throw new UnauthorizedException();
    }

    if (err.message === 'already saved') {
      throw new AlreadySavedException();
    }

    throw new PaletteNotFoundException(id);
  }
};
