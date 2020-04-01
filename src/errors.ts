import { ApolloError } from 'apollo-boost';

type ErrorCode = number;

export const NOT_FOUND_ERR_CODE: ErrorCode = 404;

export const hasError = (apolloError: ApolloError, errorCode: ErrorCode) => {
  return apolloError.graphQLErrors.some(
    (e) => e.extensions?.code === errorCode,
  );
};
