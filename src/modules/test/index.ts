import { gql } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { Module } from '../../types/module.types';

const typeDefs = gql`
  extend type Query {
    hello: String
  }
`;

export const test: Module = {
  typeDefs: [typeDefs],
  resolvers
};
