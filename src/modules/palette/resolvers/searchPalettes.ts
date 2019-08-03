import { Resolver } from '../../../types/resolver.types';
import { HttpException } from '../../../exceptions/HttpException';
import { Palette } from '../../../entity/Palette';

export const searchPalettes: Resolver = (_, { query }) => {
  try {
    return Palette.createQueryBuilder('palette')
      .where('palette.tags ilike :tags', { tags: `%${query}%` })
      .getMany();
  } catch (err) {
    throw new HttpException(500, 'connection with database failed');
  }
};
