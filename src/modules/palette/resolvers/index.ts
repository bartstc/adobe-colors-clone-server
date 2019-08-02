import { ResolverMap } from '../../../types/resolver.types';
import { createPalette } from './createPalette';
import { removePalette } from './removePalette';
import { getPalette } from './getPalette';
import { getUserPalettes } from './getUserPalettes';
import { getAllPalettes } from './getAllPalettes';

export const resolvers: ResolverMap = {
  Mutation: {
    createPalette,
    removePalette
  },
  Query: {
    getPalette,
    getUserPalettes,
    getAllPalettes
  }
};
