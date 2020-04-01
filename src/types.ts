import { Role } from './generated/graphql';

export type Session = {
  username: string;
  role: Role;
};

export type Participant = {
  id: number | string;
  username: string;
  voteLabel?: string | null;
};

export type Observer = {
  id: number | string;
  username: string;
};
