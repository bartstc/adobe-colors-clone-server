import { makeExecutableSchemaFromModules } from '../utils/makeExecutableSchema';
import { auth } from './auth';
import { palette } from './palette';

const modules = [auth, palette];

export const schema = makeExecutableSchemaFromModules(modules);
