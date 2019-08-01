import { gql } from 'apollo-server-express';
import { Module } from '../../types/module.types';

const typeDefs = gql`
  type Error {
    path: String!
    message: String!
  }
`;

export const shared: Module = {
  typeDefs: [typeDefs]
};
