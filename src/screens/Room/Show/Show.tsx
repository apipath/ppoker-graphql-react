import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useTypedSelector } from '../../../store';
import JoinRoom from './JoinRoom';
import VoteRoom from './VoteRoom';
import { Participant, Observer, Room } from '../../../types';

const mockedRoom: Room = {
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

const mockedParticipants: Array<Participant> = [
  { id: 1, username: 'Foo', voteLabel: '8' },
  { id: 2, username: 'React', voteLabel: undefined },
  { id: '12345', username: 'Bar', voteLabel: '8' },
  { id: 4, username: 'Elixir', voteLabel: '3' },
  { id: 5, username: 'Baz', voteLabel: '8' },
  { id: 6, username: 'Golang', voteLabel: '1' },
  { id: 7, username: 'GraphQL', voteLabel: '8' },
];

const mockedObservers: Array<Observer> = [
  { id: 8, username: 'Observer 1' },
  { id: 9, username: 'Observer 2' },
];

function RoomShow() {
  const { id } = useParams<{ id: string }>();
  const [room] = useState(mockedRoom);
  const [participants] = useState(mockedParticipants);
  const [observers] = useState(mockedObservers);
  const [showVotes] = useState(false);
  const session = useTypedSelector(state => state.session);

  return (
    <section className="p-4 lg:p-5">
      <h1 className="mb-8 text-2xl font-medium text-center">
        <span className="text-gray-800">{room.name}</span>
        <span className="text-gray-700">#{room.id}</span>
      </h1>
      <div>
        {session ? (
          <VoteRoom
            room={room}
            showVotes={showVotes}
            participants={participants}
            observers={observers}
          />
        ) : (
          <JoinRoom id={id} onLogin={(() => {}) as any} />
        )}
      </div>
    </section>
  );
}

export default RoomShow;
