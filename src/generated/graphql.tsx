import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateRoomInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom?: Maybe<Room>;
};

export type MutationCreateRoomArgs = {
  roomInput: CreateRoomInput;
  pointsInput: Array<PointInput>;
};

export type Observer = {
  __typename?: 'Observer';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type OnlineRoom = {
  __typename?: 'OnlineRoom';
  participants: Array<Participant>;
  observers: Array<Observer>;
};

export type Participant = {
  __typename?: 'Participant';
  id: Scalars['String'];
  name: Scalars['String'];
  votedPoint?: Maybe<Point>;
};

export type Point = {
  __typename?: 'Point';
  label: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type PointInput = {
  label: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  room?: Maybe<Room>;
};

export type QueryRoomArgs = {
  id: Scalars['ID'];
};

export enum Role {
  Participant = 'PARTICIPANT',
  Observer = 'OBSERVER',
}

export type Room = {
  __typename?: 'Room';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  points: Array<Point>;
};

export type Subscription = {
  __typename?: 'Subscription';
  joinRoom?: Maybe<OnlineRoom>;
};

export type SubscriptionJoinRoomArgs = {
  roomId: Scalars['ID'];
  username: Scalars['String'];
  role: Role;
};

export type CreateRoomMutationVariables = {
  roomInput: CreateRoomInput;
  pointsInput: Array<PointInput>;
};

export type CreateRoomMutation = { __typename?: 'Mutation' } & {
  createRoom?: Maybe<
    { __typename?: 'Room' } & Pick<Room, 'id' | 'name' | 'description'> & {
        points: Array<
          { __typename?: 'Point' } & Pick<Point, 'label' | 'description'>
        >;
      }
  >;
};

export type JoinRoomSubscriptionVariables = {
  roomId: Scalars['ID'];
  username: Scalars['String'];
  role: Role;
};

export type JoinRoomSubscription = { __typename?: 'Subscription' } & {
  joinRoom?: Maybe<
    { __typename?: 'OnlineRoom' } & {
      participants: Array<
        { __typename?: 'Participant' } & Pick<Participant, 'id' | 'name'> & {
            votedPoint?: Maybe<
              { __typename?: 'Point' } & Pick<Point, 'label' | 'description'>
            >;
          }
      >;
      observers: Array<
        { __typename?: 'Observer' } & Pick<Observer, 'id' | 'name'>
      >;
    }
  >;
};

export type GetRoomQueryVariables = {
  id: Scalars['ID'];
};

export type GetRoomQuery = { __typename?: 'Query' } & {
  room?: Maybe<
    { __typename?: 'Room' } & Pick<Room, 'id' | 'name' | 'description'> & {
        points: Array<
          { __typename?: 'Point' } & Pick<Point, 'label' | 'description'>
        >;
      }
  >;
};

export const CreateRoomDocument = gql`
  mutation CreateRoom(
    $roomInput: CreateRoomInput!
    $pointsInput: [PointInput!]!
  ) {
    createRoom(roomInput: $roomInput, pointsInput: $pointsInput) {
      id
      name
      description
      points {
        label
        description
      }
    }
  }
`;
export type CreateRoomMutationFn = ApolloReactCommon.MutationFunction<
  CreateRoomMutation,
  CreateRoomMutationVariables
>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      roomInput: // value for 'roomInput'
 *      pointsInput: // value for 'pointsInput'
 *   },
 * });
 */
export function useCreateRoomMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >(CreateRoomDocument, baseOptions);
}
export type CreateRoomMutationHookResult = ReturnType<
  typeof useCreateRoomMutation
>;
export type CreateRoomMutationResult = ApolloReactCommon.MutationResult<
  CreateRoomMutation
>;
export type CreateRoomMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateRoomMutation,
  CreateRoomMutationVariables
>;
export const JoinRoomDocument = gql`
  subscription JoinRoom($roomId: ID!, $username: String!, $role: Role!) {
    joinRoom(roomId: $roomId, username: $username, role: $role) {
      participants {
        id
        name
        votedPoint {
          label
          description
        }
      }
      observers {
        id
        name
      }
    }
  }
`;

/**
 * __useJoinRoomSubscription__
 *
 * To run a query within a React component, call `useJoinRoomSubscription` and pass it any options that fit your needs.
 * When your component renders, `useJoinRoomSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJoinRoomSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      username: // value for 'username'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useJoinRoomSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    JoinRoomSubscription,
    JoinRoomSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    JoinRoomSubscription,
    JoinRoomSubscriptionVariables
  >(JoinRoomDocument, baseOptions);
}
export type JoinRoomSubscriptionHookResult = ReturnType<
  typeof useJoinRoomSubscription
>;
export type JoinRoomSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  JoinRoomSubscription
>;
export const GetRoomDocument = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
      description
      points {
        label
        description
      }
    }
  }
`;

/**
 * __useGetRoomQuery__
 *
 * To run a query within a React component, call `useGetRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRoomQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetRoomQuery,
    GetRoomQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetRoomQuery, GetRoomQueryVariables>(
    GetRoomDocument,
    baseOptions,
  );
}
export function useGetRoomLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetRoomQuery,
    GetRoomQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetRoomQuery, GetRoomQueryVariables>(
    GetRoomDocument,
    baseOptions,
  );
}
export type GetRoomQueryHookResult = ReturnType<typeof useGetRoomQuery>;
export type GetRoomLazyQueryHookResult = ReturnType<typeof useGetRoomLazyQuery>;
export type GetRoomQueryResult = ApolloReactCommon.QueryResult<
  GetRoomQuery,
  GetRoomQueryVariables
>;
