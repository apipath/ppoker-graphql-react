export type Role = 'participant' | 'observer';

export type Session = {
  id: string;
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
