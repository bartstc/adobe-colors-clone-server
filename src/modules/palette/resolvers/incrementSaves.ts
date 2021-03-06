import { Resolver } from '../../../types/resolver.types';
import { Palette } from '../../../entity/Palette';
import { PaletteNotFoundException } from '../../../exceptions/PaletteNotFoundException';

export const incrementSaves: Resolver = async (_, { id }) => {
  try {
    const palette = await Palette.findOne({ where: { id } });

    if (!palette) {
      throw new PaletteNotFoundException(id);
    }

    palette.saves++;
    await Palette.save(palette);

    return true;
  } catch (err) {
    throw new PaletteNotFoundException(id);
  }
};
