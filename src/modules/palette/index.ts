import { gql } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { Module } from '../../types/module.types';

const typeDefs = gql`
  input CreatePalette {
    name: String!
    colors: [String!]!
    tags: String!
  }

  type Palette {
    id: ID!
    name: String!
    saves: Int!
    views: Int!
    colors: [String!]!
    ownerid: ID!
    ownerusername: String!
    tags: String!
  }

  extend type Query {
    getPalette(id: ID!): Palette!
    getUserPalettes: [Palette!]
    getAllPalettes(limit: Int!, offset: Int!): [Palette!]
    getBestPalettes(limit: Int!, offset: Int!): [Palette!]
    getPicksPalettes(limit: Int!, offset: Int!): [Palette!]
    getSavedPalettes: [Palette]
    searchPalettes(query: String!): [Palette!]
  }

  extend type Mutation {
    createPalette(input: CreatePalette): Boolean!
    removePalette(id: ID!): Boolean!
    savePalette(id: ID!): Boolean!
    incrementViews(id: ID!): Boolean!
    incrementSaves(id: ID!): Boolean!
  }
`;

export const palette: Module = {
  typeDefs: [typeDefs],
  resolvers
};
