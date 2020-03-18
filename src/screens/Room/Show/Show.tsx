import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import Button from '../../../components/Button';
import Participants from './Participants';
import PointCard from './PointCard';
import Results from './Results';

type Room = {
  id: string;
  name: string;
  description?: string;
  points: Array<Point>;
};

type Point = {
  label: string;
  description?: string;
  order: number;
};

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
  const { id } = useParams();
  console.log('Fetch room:', id);
  const [room] = useState(mockedRoom);
  const [participants] = useState(mockedParticipants);
  const [observers] = useState(mockedObservers);
  const [showVotes] = useState(false);

  return (
    <section className="p-4 lg:p-5">
      <h1 className="mb-8 text-2xl font-medium text-center">
        <span className="text-gray-800">{room.name}</span>
        <span className="text-gray-700">#{room.id}</span>
      </h1>
      <div className="flex flex-col lg:flex-row">
        <ul className={cn('w-full grid gap-2 grid-cols-fill-40', 'lg:w-1/2')}>
          {room.points.map(point => (
            <li className="flex justify-center" key={point.label}>
              <PointCard point={point} />
            </li>
          ))}
        </ul>
        <div className="flex-grow mt-6 lg:mt-0">
          <div className="flex flex-col w-full md:grid md:grid-cols-2 md:gap-4">
            <Participants
              participants={participants}
              observers={observers}
              showVotes={showVotes}
            />
            <div className="w-full mt-6 md:mt-0">
              <div className="flex justify-between mx-12 mb-12">
                <Button>Show Votes</Button>
                <Button>Clear Votes</Button>
              </div>
              <Results participants={participants} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoomShow;
