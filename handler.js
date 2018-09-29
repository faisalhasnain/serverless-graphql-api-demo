import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';

import schema from './schema.graphql';
import { resolvers } from './resolvers';

const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
  logger: console,
});

export function graphqlHandler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log('Executing GraphQL handler...');
  function callbackFilter(error, output) {
    if (!output.headers) {
      output.headers = {};
    }
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  }
  const handler = graphqlLambda({ schema: myGraphQLSchema });
  return handler(event, context, callbackFilter);
};

export function graphiqlHandler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  const endpointURL = 'graphql';
  return graphiqlLambda({ endpointURL })(event, context, callback);
};