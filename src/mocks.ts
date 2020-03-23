import { Room, Observer } from './types';

export const mockedRoom: Room = {
  id: '12345',
  name: 'Impact',
  points: [
    { label: '0', description: '#its-free', order: 1 },
    { label: '0.5', description: '#switch-it-on', order: 2 },
    { label: '1', description: '#eating-cookie', order: 3 },
    { label: '2', description: '#push-up', order: 4 },
    { label: '3', description: '#mix-bake-eat', order: 5 },
    { label: '5', description: '#its-onto-something', order: 6 },
    { label: '8', description: '#think-code-repeat', order: 7 },
    { label: '13', description: '#5-coffees', order: 8 },
    { label: '20', description: '#100-push-ups', order: 9 },
    { label: '40', description: '#40-days-40-nights', order: 10 },
    { label: '100', description: '#fighting-aliens', order: 11 },
    { label: '?', description: '#god-knows', order: 12 },
  ],
};

export const mockedParticipants = [
  { id: '1', username: 'Foo', voteLabel: '8' },
  { id: '2', username: 'React', voteLabel: undefined },
  { id: '12345', username: 'Bar', voteLabel: '8' },
  { id: '4', username: 'Elixir', voteLabel: '3' },
  { id: '5', username: 'Baz', voteLabel: '8' },
  { id: '6', username: 'Golang', voteLabel: '1' },
  { id: '7', username: 'GraphQL', voteLabel: '8' },
];

export const mockedObservers: Array<Observer> = [
  { id: 8, username: 'Observer 1' },
  { id: 9, username: 'Observer 2' },
];
