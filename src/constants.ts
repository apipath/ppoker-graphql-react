export const HTTP_GRAPHQL_URI =
  process.env.REACT_APP_HTTP_GRAPHQL_URI || 'http://localhost:8080/query';
export const WS_GRAPHQL_URI =
  process.env.REACT_APP_WS_GRAPHQL_URI || 'ws://localhost:8080/query';
export const GOOGLE_ANALYTICS = process.env.REACT_APP_GOOGLE_ANALYTICS || '';
export const IS_DEV_ENV =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export const FEEDBACK_FISH = process.env.REACT_APP_FEEDBACK_FISH || '';
