import * as yup from 'yup';
import { nameNotLongEnough, toFewColors } from './utils/errorMessages';
import { Resolver } from '../../../types/resolver.types';
import { Palette } from '../../../entity/Palette';
import { formatError } from '../../../utils/formatError';
import { ValidationException } from '../../../exceptions/ValidationException';
import { CreatePaletteDTO } from './dto/createPalette';
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';
import { User } from '../../../entity/User';

const paletteSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, nameNotLongEnough)
    .max(100),
  colors: yup
    .array()
    .of(yup.string())
    .required()
    .min(5, toFewColors)
    .max(5),
  tags: yup.string()
});

export const createPalette: Resolver = async (
  _,
  { input }: CreatePaletteDTO,
  { userId }
) => {
  if (!userId) {
    throw new UnauthorizedException();
  }

  try {
    await paletteSchema.validate(input, { abortEarly: false });
  } catch (err) {
    const errors = formatError(err);
    throw new ValidationException(
      400,
      'process of creating palette failed',
      errors
    );
  }

  const user = await User.findOne({
    where: { id: userId },
    select: ['username']
  });

  if (user) {
    const palette = await Palette.create({
      ...input,
      ownerid: userId,
      ownerusername: user.username
    });
    await palette.save();

    return true;
  } else {
    throw new UnauthorizedException();
  }
};
