import { ApolloServer } from 'apollo-server-lambda';
import schema from './schema.graphql';
import { resolvers } from './resolvers';

const server = new ApolloServer({ typeDefs: schema, resolvers });

exports.graphqlHandler = server.createHandler();