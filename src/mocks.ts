import { Observer } from './types';
import { Room } from './generated/graphql';

export const mockedRoom: Room = {
  id: '12345',
  name: 'Impact',
  points: [
    { label: '0', description: '#its-free' },
    { label: '0.5', description: '#switch-it-on' },
    { label: '1', description: '#eating-cookie' },
    { label: '2', description: '#push-up' },
    { label: '3', description: '#mix-bake-eat' },
    { label: '5', description: '#its-onto-something' },
    { label: '8', description: '#think-code-repeat' },
    { label: '13', description: '#5-coffees' },
    { label: '20', description: '#100-push-ups' },
    { label: '40', description: '#40-days-40-nights' },
    { label: '100', description: '#fighting-aliens' },
    { label: '?', description: '#god-knows' },
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
