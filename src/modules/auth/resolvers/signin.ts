import * as yup from 'yup';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { Resolver } from '../../../types/resolver.types';
import { SignInDTO } from './dto/signin';
import {
  emailEmpty,
  passwordEmpty,
  invalidCredentials
} from './utils/errorMessages';
import { formatError } from '../../../utils/formatError';
import { User } from '../../../entity/User';
import { DataStoredInToken, TokenData } from '../../../types/auth.types';
import { redis } from '../../../redis';
import { ValidationException } from '../../../exceptions/ValidationException';

const signinSchema = yup.object().shape({
  email: yup.string().min(1, emailEmpty),
  password: yup.string().min(1, passwordEmpty)
});

const invalidCreds = [
  {
    path: 'email',
    message: invalidCredentials
  },
  {
    path: 'password',
    message: invalidCredentials
  }
];

export const signin: Resolver = async (_, args: SignInDTO) => {
  try {
    await signinSchema.validate(args, { abortEarly: false });
  } catch (err) {
    const errors = formatError(err);
    throw new ValidationException(400, 'signin process faild', errors);
  }

  const { email, password } = args;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ValidationException(400, 'signin process faild', invalidCreds);
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ValidationException(400, 'signin process faild', invalidCreds);
  }

  const { id, username } = user;
  const jwtPayload = { id, username };

  const { token } = signToken(jwtPayload);
  await setToken(token, id);

  return { id, username, token };
};

const signToken = (data: DataStoredInToken): TokenData => {
  const expiresIn = 60 * 60 * 24; // an hour
  const secret = process.env.JWT_SECRET_KEY as string;

  const token = jwt.sign(data, secret, { expiresIn });
  return { token };
};

const setToken = async (key: any, value: any) => {
  const expiresIn = 60 * 60 * 24;

  if (process.env.NODE_ENV === 'production') {
    // redis server older than 2.6.12 doesn't support the options of the SET command
    await redis.set(key, value, 'EX', expiresIn);
  } else {
    await redis.setex(key, expiresIn, value);
  }
};
