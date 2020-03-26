import { compose } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

declare module 'typesafe-actions' {
  import { StateType, ActionType } from 'typesafe-actions';

  export type Store = StateType<typeof import('./store/index').default>;

  export type RootState = StateType<
    ReturnType<typeof import('./store/root-reducer').default>
  >;

  export type RootAction = ActionType<
    typeof import('./store/root-action').default
  >;

  interface Types {
    RootAction: RootAction;
  }
}
