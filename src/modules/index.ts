import { makeExecutableSchemaFromModules } from '../utils/makeExecutableSchema';
import { test } from './test';
import { auth } from './auth';
// import { shared } from './shared';

const modules = [test, auth];

export const schema = makeExecutableSchemaFromModules(modules);
