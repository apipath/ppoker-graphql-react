import { ApolloError } from '@apollo/client';

type ErrorCode = number;

export const NOT_FOUND_ERR_CODE: ErrorCode = 404;

export const hasError = (
  apolloError: ApolloError | Error,
  errorCode: ErrorCode,
) => {
  if (!('graphQLErrors' in apolloError)) return;

  return apolloError.graphQLErrors.some(
    (e) => e.extensions?.code === errorCode,
  );
};

export const isNotFoundError = (error: ApolloError | Error) => {
  return hasError(error, NOT_FOUND_ERR_CODE);
};
