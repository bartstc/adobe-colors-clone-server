import { ResolverMap } from '../../../types/resolver.types';
import { createPalette } from './createPalette';
import { removePalette } from './removePalette';
import { getPalette } from './getPalette';
import { getUserPalettes } from './getUserPalettes';
import { getAllPalettes } from './getAllPalettes';
import { getSavedPalettes } from './getSavedPalettes';
import { savePalette } from './savePalette';

export const resolvers: ResolverMap = {
  Mutation: {
    createPalette,
    removePalette,
    savePalette
  },
  Query: {
    getPalette,
    getUserPalettes,
    getAllPalettes,
    getSavedPalettes
  }
};
