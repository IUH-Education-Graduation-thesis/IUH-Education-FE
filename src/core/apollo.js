import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { from } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

import { clientCache } from 'helpers';
import config from 'config';
import { createHttpLink } from '@apollo/client/core';

const getAccessToken = () => {
  // get the authentication token from local storage if it exists
  const token = clientCache.getAuthenTokenWithCookie();

  return token;
};

const httpLink = createHttpLink({
  uri: config.GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAccessToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  // eslint-disable-next-line
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default client;
