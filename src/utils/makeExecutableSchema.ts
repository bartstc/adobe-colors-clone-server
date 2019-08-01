import { gql, makeExecutableSchema } from 'apollo-server-express';
import { Module } from '../types/module.types';

const globalTypeDefs = gql`
  type Query
  type Mutation
`;
export const makeExecutableSchemaFromModules = (modules: Module[]) => {
  let typeDefs = [globalTypeDefs];
  let resolvers = {};

  modules.forEach(module => {
    typeDefs = [...typeDefs, ...module.typeDefs];
    if (module.resolvers) {
      resolvers = { ...resolvers, ...module.resolvers };
    }
  });

  return makeExecutableSchema({ typeDefs, resolvers });
};
