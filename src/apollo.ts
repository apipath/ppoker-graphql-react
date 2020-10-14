import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  split,
  HttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

export default (httpUri: string, wsUri: string) => {
  const httpLink = new HttpLink({
    uri: httpUri,
    credentials: 'same-origin',
  });

  const wsLink = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true,
    },
  });

  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      link,
    ]),
    cache: new InMemoryCache(),
  });
};
