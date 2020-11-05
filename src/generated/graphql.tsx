import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Point = {
  __typename?: 'Point';
  label: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type Observer = {
  __typename?: 'Observer';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ExitRoomInput = {
  roomId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  room?: Maybe<Room>;
};

export type QueryRoomArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom?: Maybe<Room>;
  editRoom?: Maybe<Room>;
  vote: Scalars['Boolean'];
  showVotes: Scalars['Boolean'];
  clearVotes: Scalars['Boolean'];
  createUser: User;
  exitRoom: Scalars['Boolean'];
};

export type MutationCreateRoomArgs = {
  roomInput: CreateRoomInput;
  pointsInput: Array<PointInput>;
};

export type MutationEditRoomArgs = {
  roomInput: EditRoomInput;
  pointsInput: Array<PointInput>;
};

export type MutationVoteArgs = {
  voteInput: VoteInput;
};

export type MutationShowVotesArgs = {
  showVotesInput: ShowVotesInput;
};

export type MutationClearVotesArgs = {
  clearVotesInput: ClearVotesInput;
};

export type MutationCreateUserArgs = {
  createUserInput?: Maybe<CreateUserInput>;
};

export type MutationExitRoomArgs = {
  exitRoomInput: ExitRoomInput;
};

export type Subscription = {
  __typename?: 'Subscription';
  joinRoom?: Maybe<OnlineRoom>;
};

export type SubscriptionJoinRoomArgs = {
  roomId: Scalars['ID'];
  userId: Scalars['ID'];
  userName: Scalars['String'];
  role: Role;
};

export type OnlineRoom = {
  __typename?: 'OnlineRoom';
  showVotes: Scalars['Boolean'];
  participants: Array<Participant>;
  observers: Array<Observer>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  role: Role;
};

export type EditRoomInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ShowVotesInput = {
  roomId: Scalars['ID'];
};

export type ClearVotesInput = {
  roomId: Scalars['ID'];
};

export type CreateRoomInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type VoteInput = {
  roomId: Scalars['ID'];
  pointLabel: Scalars['String'];
  userId: Scalars['ID'];
};

export enum Role {
  Participant = 'PARTICIPANT',
  Observer = 'OBSERVER',
}

export type Participant = {
  __typename?: 'Participant';
  id: Scalars['String'];
  name: Scalars['String'];
  votedPoint?: Maybe<Point>;
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  points: Array<Point>;
};

export type PointInput = {
  label: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  userName: Scalars['String'];
  role: Role;
};

export type CreateRoomMutationVariables = Exact<{
  roomInput: CreateRoomInput;
  pointsInput: Array<PointInput>;
}>;

export type CreateRoomMutation = { __typename?: 'Mutation' } & {
  createRoom?: Maybe<
    { __typename?: 'Room' } & Pick<Room, 'id' | 'name' | 'description'> & {
        points: Array<
          { __typename?: 'Point' } & Pick<Point, 'label' | 'description'>
        >;
      }
  >;
};

export type EditRoomMutationVariables = Exact<{
  roomInput: EditRoomInput;
  pointsInput: Array<PointInput>;
}>;

export type EditRoomMutation = { __typename?: 'Mutation' } & {
  editRoom?: Maybe<
    { __typename?: 'Room' } & Pick<Room, 'id' | 'name'> & {
        points: Array<
          { __typename?: 'Point' } & Pick<Point, 'label' | 'description'>
        >;
      }
  >;
};

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'role'>;
};

export type VoteMutationVariables = Exact<{
  voteInput: VoteInput;
}>;

export type VoteMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'vote'>;

export type ShowVotesMutationVariables = Exact<{
  showVotesInput: ShowVotesInput;
}>;

export type ShowVotesMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'showVotes'
>;

export type ClearVotesMutationVariables = Exact<{
  clearVotesInput: ClearVotesInput;
}>;

export type ClearVotesMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'clearVotes'
>;

export type KickUserMutationVariables = Exact<{
  exitRoomInput: ExitRoomInput;
}>;

export type KickUserMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'exitRoom'
>;

export type JoinRoomSubscriptionVariables = Exact<{
  roomId: Scalars['ID'];
  userId: Scalars['ID'];
  userName: Scalars['String'];
  role: Role;
}>;

export type JoinRoomSubscription = { __typename?: 'Subscription' } & {
  joinRoom?: Maybe<
    { __typename?: 'OnlineRoom' } & Pick<OnlineRoom, 'showVotes'> & {
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

export type GetRoomQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetRoomQuery = { __typename?: 'Query' } & {
  room?: Maybe<
    { __typename?: 'Room' } & Pick<Room, 'id' | 'name'> & {
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
export type CreateRoomMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >,
) {
  return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(
    CreateRoomDocument,
    baseOptions,
  );
}
export type CreateRoomMutationHookResult = ReturnType<
  typeof useCreateRoomMutation
>;
export type CreateRoomMutationResult = Apollo.MutationResult<
  CreateRoomMutation
>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<
  CreateRoomMutation,
  CreateRoomMutationVariables
>;
export const EditRoomDocument = gql`
  mutation EditRoom($roomInput: EditRoomInput!, $pointsInput: [PointInput!]!) {
    editRoom(roomInput: $roomInput, pointsInput: $pointsInput) {
      id
      name
      points {
        label
        description
      }
    }
  }
`;
export type EditRoomMutationFn = Apollo.MutationFunction<
  EditRoomMutation,
  EditRoomMutationVariables
>;

/**
 * __useEditRoomMutation__
 *
 * To run a mutation, you first call `useEditRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editRoomMutation, { data, loading, error }] = useEditRoomMutation({
 *   variables: {
 *      roomInput: // value for 'roomInput'
 *      pointsInput: // value for 'pointsInput'
 *   },
 * });
 */
export function useEditRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditRoomMutation,
    EditRoomMutationVariables
  >,
) {
  return Apollo.useMutation<EditRoomMutation, EditRoomMutationVariables>(
    EditRoomDocument,
    baseOptions,
  );
}
export type EditRoomMutationHookResult = ReturnType<typeof useEditRoomMutation>;
export type EditRoomMutationResult = Apollo.MutationResult<EditRoomMutation>;
export type EditRoomMutationOptions = Apollo.BaseMutationOptions<
  EditRoomMutation,
  EditRoomMutationVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      role
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    baseOptions,
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult = Apollo.MutationResult<
  CreateUserMutation
>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const VoteDocument = gql`
  mutation Vote($voteInput: VoteInput!) {
    vote(voteInput: $voteInput)
  }
`;
export type VoteMutationFn = Apollo.MutationFunction<
  VoteMutation,
  VoteMutationVariables
>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      voteInput: // value for 'voteInput'
 *   },
 * });
 */
export function useVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>,
) {
  return Apollo.useMutation<VoteMutation, VoteMutationVariables>(
    VoteDocument,
    baseOptions,
  );
}
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<
  VoteMutation,
  VoteMutationVariables
>;
export const ShowVotesDocument = gql`
  mutation ShowVotes($showVotesInput: ShowVotesInput!) {
    showVotes(showVotesInput: $showVotesInput)
  }
`;
export type ShowVotesMutationFn = Apollo.MutationFunction<
  ShowVotesMutation,
  ShowVotesMutationVariables
>;

/**
 * __useShowVotesMutation__
 *
 * To run a mutation, you first call `useShowVotesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShowVotesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [showVotesMutation, { data, loading, error }] = useShowVotesMutation({
 *   variables: {
 *      showVotesInput: // value for 'showVotesInput'
 *   },
 * });
 */
export function useShowVotesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ShowVotesMutation,
    ShowVotesMutationVariables
  >,
) {
  return Apollo.useMutation<ShowVotesMutation, ShowVotesMutationVariables>(
    ShowVotesDocument,
    baseOptions,
  );
}
export type ShowVotesMutationHookResult = ReturnType<
  typeof useShowVotesMutation
>;
export type ShowVotesMutationResult = Apollo.MutationResult<ShowVotesMutation>;
export type ShowVotesMutationOptions = Apollo.BaseMutationOptions<
  ShowVotesMutation,
  ShowVotesMutationVariables
>;
export const ClearVotesDocument = gql`
  mutation ClearVotes($clearVotesInput: ClearVotesInput!) {
    clearVotes(clearVotesInput: $clearVotesInput)
  }
`;
export type ClearVotesMutationFn = Apollo.MutationFunction<
  ClearVotesMutation,
  ClearVotesMutationVariables
>;

/**
 * __useClearVotesMutation__
 *
 * To run a mutation, you first call `useClearVotesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearVotesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearVotesMutation, { data, loading, error }] = useClearVotesMutation({
 *   variables: {
 *      clearVotesInput: // value for 'clearVotesInput'
 *   },
 * });
 */
export function useClearVotesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ClearVotesMutation,
    ClearVotesMutationVariables
  >,
) {
  return Apollo.useMutation<ClearVotesMutation, ClearVotesMutationVariables>(
    ClearVotesDocument,
    baseOptions,
  );
}
export type ClearVotesMutationHookResult = ReturnType<
  typeof useClearVotesMutation
>;
export type ClearVotesMutationResult = Apollo.MutationResult<
  ClearVotesMutation
>;
export type ClearVotesMutationOptions = Apollo.BaseMutationOptions<
  ClearVotesMutation,
  ClearVotesMutationVariables
>;
export const KickUserDocument = gql`
  mutation KickUser($exitRoomInput: ExitRoomInput!) {
    exitRoom(exitRoomInput: $exitRoomInput)
  }
`;
export type KickUserMutationFn = Apollo.MutationFunction<
  KickUserMutation,
  KickUserMutationVariables
>;

/**
 * __useKickUserMutation__
 *
 * To run a mutation, you first call `useKickUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKickUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [kickUserMutation, { data, loading, error }] = useKickUserMutation({
 *   variables: {
 *      exitRoomInput: // value for 'exitRoomInput'
 *   },
 * });
 */
export function useKickUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    KickUserMutation,
    KickUserMutationVariables
  >,
) {
  return Apollo.useMutation<KickUserMutation, KickUserMutationVariables>(
    KickUserDocument,
    baseOptions,
  );
}
export type KickUserMutationHookResult = ReturnType<typeof useKickUserMutation>;
export type KickUserMutationResult = Apollo.MutationResult<KickUserMutation>;
export type KickUserMutationOptions = Apollo.BaseMutationOptions<
  KickUserMutation,
  KickUserMutationVariables
>;
export const JoinRoomDocument = gql`
  subscription JoinRoom(
    $roomId: ID!
    $userId: ID!
    $userName: String!
    $role: Role!
  ) {
    joinRoom(
      roomId: $roomId
      userId: $userId
      userName: $userName
      role: $role
    ) {
      showVotes
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
 *      userId: // value for 'userId'
 *      userName: // value for 'userName'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useJoinRoomSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    JoinRoomSubscription,
    JoinRoomSubscriptionVariables
  >,
) {
  return Apollo.useSubscription<
    JoinRoomSubscription,
    JoinRoomSubscriptionVariables
  >(JoinRoomDocument, baseOptions);
}
export type JoinRoomSubscriptionHookResult = ReturnType<
  typeof useJoinRoomSubscription
>;
export type JoinRoomSubscriptionResult = Apollo.SubscriptionResult<
  JoinRoomSubscription
>;
export const GetRoomDocument = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
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
  baseOptions: Apollo.QueryHookOptions<GetRoomQuery, GetRoomQueryVariables>,
) {
  return Apollo.useQuery<GetRoomQuery, GetRoomQueryVariables>(
    GetRoomDocument,
    baseOptions,
  );
}
export function useGetRoomLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRoomQuery,
    GetRoomQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetRoomQuery, GetRoomQueryVariables>(
    GetRoomDocument,
    baseOptions,
  );
}
export type GetRoomQueryHookResult = ReturnType<typeof useGetRoomQuery>;
export type GetRoomLazyQueryHookResult = ReturnType<typeof useGetRoomLazyQuery>;
export type GetRoomQueryResult = Apollo.QueryResult<
  GetRoomQuery,
  GetRoomQueryVariables
>;
