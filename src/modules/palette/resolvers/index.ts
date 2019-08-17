import { ResolverMap } from '../../../types/resolver.types';
import { createPalette } from './createPalette';
import { removePalette } from './removePalette';
import { getPalette } from './getPalette';
import { getUserPalettes } from './getUserPalettes';
import { getAllPalettes } from './getAllPalettes';
import { getSavedPalettes } from './getSavedPalettes';
import { savePalette } from './savePalette';
import { incrementViews } from './incrementViews';
import { incrementSaves } from './incrementSaves';
import { getBestPalettes } from './getBestPalettes';
import { getPicksPalettes } from './getPicksPalettes';
import { searchPalettes } from './searchPalettes';
import { removeSavedPalette } from './removeSavedPalette';

export const resolvers: ResolverMap = {
  Mutation: {
    createPalette,
    removePalette,
    savePalette,
    incrementViews,
    incrementSaves,
    removeSavedPalette
  },
  Query: {
    getPalette,
    getUserPalettes,
    getAllPalettes,
    getBestPalettes,
    getPicksPalettes,
    getSavedPalettes,
    searchPalettes
  }
};
