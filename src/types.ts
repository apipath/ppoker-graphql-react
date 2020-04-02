import { Role } from './generated/graphql';

export type Session = {
  username: string;
  role: Role;
};
