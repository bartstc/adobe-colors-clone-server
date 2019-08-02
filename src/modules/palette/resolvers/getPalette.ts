import { Resolver } from '../../../types/resolver.types';
import { Palette } from '../../../entity/Palette';
import { PaletteNotFoundException } from '../../../exceptions/PaletteNotFoundException';

export const getPalette: Resolver = async (_, { id }) => {
  try {
    return await Palette.findOne({ where: { id } });
  } catch (err) {
    throw new PaletteNotFoundException(id);
  }
};
