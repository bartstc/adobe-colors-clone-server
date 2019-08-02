import { Resolver } from '../../../types/resolver.types';
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';
import { Palette } from '../../../entity/Palette';
import { PaletteNotFoundException } from '../../../exceptions/PaletteNotFoundException';

export const removePalette: Resolver = async (_, { id }, { userId }) => {
  if (!userId) {
    throw new UnauthorizedException();
  }

  try {
    const palette = await Palette.findOne({
      where: { id },
      select: ['ownerid', 'id']
    });

    if (!palette) {
      throw new Error('not found');
    }

    if (palette.ownerid !== userId) {
      throw new Error('unauthorized');
    }

    await Palette.remove(palette);

    return true;
  } catch (err) {
    if (err.message === 'not found') {
      throw new PaletteNotFoundException(id);
    }

    if (err.message === 'unauthorized') {
      throw new UnauthorizedException();
    }

    throw new PaletteNotFoundException(id);
  }
};
