import { Resolver } from '../../../types/resolver.types';
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';
import { User } from '../../../entity/User';
import { PaletteNotFoundException } from '../../../exceptions/PaletteNotFoundException';

export const removeSavedPalette: Resolver = async (_, { id }, { userId }) => {
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

    const notSaved = (user.savedPalettes.filter(
      palette => palette === id
    ).length = 0);

    if (notSaved) {
      throw new Error('palette not found');
    }

    user.savedPalettes = user.savedPalettes.filter(palette => palette !== id);
    await User.save(user);

    return true;
  } catch (err) {
    if (err.message === 'unauthorized') {
      throw new UnauthorizedException();
    } else {
      throw new PaletteNotFoundException(id);
    }
  }
};
