import { Resolver } from '../../../types/resolver.types';
import { Palette } from '../../../entity/Palette';
import { PaletteNotFoundException } from '../../../exceptions/PaletteNotFoundException';

export const getPalette: Resolver = async (_, { id }) => {
  try {
    const palette = await Palette.findOne({ where: { id } });

    if (!palette) {
      throw new PaletteNotFoundException(id);
    }

    return palette;
  } catch (err) {
    throw new PaletteNotFoundException(id);
  }
};
