import { gql } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { Module } from '../../types/module.types';

const typeDefs = gql`
  type UserData {
    id: ID!
    username: String!
  }

  type SignInData {
    id: String!
    username: String!
    token: String!
  }

  extend type Query {
    currentUser: UserData
  }

  extend type Mutation {
    signup(username: String!, email: String!, password: String!): UserData
    signin(email: String!, password: String!): SignInData
    logoutUser: Boolean!
    deleteUser: Boolean!
  }
`;

export const auth: Module = {
  typeDefs: [typeDefs],
  resolvers
};
