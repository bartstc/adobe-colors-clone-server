import { Resolver } from '../../../types/resolver.types';
import { Palette } from '../../../entity/Palette';
import { HttpException } from '../../../exceptions/HttpException';

export const getAllPalettes: Resolver = async () => {
  try {
    return Palette.find();
  } catch (err) {
    throw new HttpException(500, 'connection with database failed');
  }
};
