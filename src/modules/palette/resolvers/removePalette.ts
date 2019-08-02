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

    if (!palette || palette.ownerid !== userId) {
      throw new PaletteNotFoundException(id);
    }

    await Palette.remove(palette);

    return true;
  } catch (err) {
    throw new PaletteNotFoundException(id);
  }
};
