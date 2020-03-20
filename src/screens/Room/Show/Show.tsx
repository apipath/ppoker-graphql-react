import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useSession from '../../../hooks/use-session';
import JoinRoom from './JoinRoom';
import VoteRoom from './VoteRoom';

const mockedRoom = {
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

const mockedParticipants = [
  { id: 1, name: 'Foo', voteLabel: '8' },
  { id: 2, name: 'React', voteLabel: undefined },
  { id: 3, name: 'Bar', voteLabel: '8' },
  { id: 4, name: 'Elixir', voteLabel: '3' },
  { id: 5, name: 'Baz', voteLabel: '8' },
  { id: 6, name: 'Golang', voteLabel: '1' },
  { id: 7, name: 'GraphQL', voteLabel: '8' },
];

const mockedObservers = [
  { id: 8, name: 'Observer 1' },
  { id: 9, name: 'Observer 2' },
];

function RoomShow() {
  const { id } = useParams<{ id: string }>();
  const [room] = useState(mockedRoom);
  const [participants] = useState(mockedParticipants);
  const [observers] = useState(mockedObservers);
  const [showVotes] = useState(false);
  const [session] = useSession();

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
          <JoinRoom id={id} />
        )}
      </div>
    </section>
  );
}

export default RoomShow;
