import { Resolver } from '../../../types/resolver.types';
import { HttpException } from '../../../exceptions/HttpException';
import { Palette } from '../../../entity/Palette';

export const searchPalettes: Resolver = (_, { query, limit, offset }) => {
  try {
    return Palette.createQueryBuilder('palette')
      .where('palette.tags ilike :tags', { tags: `%${query}%` })
      .addOrderBy('palette.createdAt', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();
  } catch (err) {
    throw new HttpException(500, 'connection with database failed');
  }
};
