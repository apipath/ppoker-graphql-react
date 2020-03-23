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

export type Point = {
  label: string;
  description?: string;
  order: number;
};

export type Room = {
  id: string;
  name: string;
  description?: string;
  points: Array<Point>;
};
