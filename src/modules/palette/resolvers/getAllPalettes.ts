import { Resolver } from '../../../types/resolver.types';
import { Palette } from '../../../entity/Palette';
import { HttpException } from '../../../exceptions/HttpException';

export const getAllPalettes: Resolver = async (_, { limit, offset }) => {
  try {
    return Palette.createQueryBuilder('palette')
      .addOrderBy('palette.createdAt', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();
  } catch (err) {
    throw new HttpException(500, 'connection with database failed');
  }
};
