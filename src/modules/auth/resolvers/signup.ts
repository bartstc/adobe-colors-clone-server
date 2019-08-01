import * as yup from 'yup';

import {
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough,
  usernameNotLongEnough,
  duplicateEmail
} from './errorMessages';
import { SignUpDTO } from './dto/signup';
import { Resolver } from '../../../types/resolver.types';
import { formatError } from '../../../utils/formatError';
import { User } from '../../../entity/User';
import { ValidationException } from '../../../exceptions/ValidationException';

const signupSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, usernameNotLongEnough)
    .max(255),
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail),
  password: yup
    .string()
    .min(6, passwordNotLongEnough)
    .max(255)
});

const alreadyExists = [
  {
    path: 'email',
    message: duplicateEmail
  }
];

export const signup: Resolver = async (_, args: SignUpDTO) => {
  try {
    await signupSchema.validate(args, { abortEarly: false });
  } catch (err) {
    const errors = formatError(err);
    throw new ValidationException(400, 'signup process faild', errors);
  }

  const { email, username, password } = args;

  const userAlreadyExists = await User.findOne({
    where: { email },
    select: ['id']
  });

  if (userAlreadyExists) {
    throw new ValidationException(400, 'signup process faild', alreadyExists);
  }

  const user = User.create({ username, email, password });
  await user.save();

  return { id: user.id, username: user.username };
};