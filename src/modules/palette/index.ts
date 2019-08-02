import { gql } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { Module } from '../../types/module.types';

const typeDefs = gql`
  input CreatePalette {
    name: String!
    colors: [String!]!
    tags: [String!]
  }

  type Palette {
    id: ID!
    name: String!
    saves: Int!
    views: Int!
    colors: [String!]!
    tags: [String!]
    ownerid: ID!
    ownerusername: String!
  }

  extend type Query {
    getPalette(id: ID!): Palette!
    getUserPalettes: [Palette]
    getAllPalettes: [Palette]
    getSavedPalettes: [Palette]
  }

  extend type Mutation {
    createPalette(input: CreatePalette): Boolean!
    removePalette(id: ID!): Boolean!
    savePalette(id: ID!): Boolean!
  }
`;

export const palette: Module = {
  typeDefs: [typeDefs],
  resolvers
};
