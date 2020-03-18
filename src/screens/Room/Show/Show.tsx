import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import Button from '../../../components/Button';

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
  { id: 1, name: 'Foo', observer: false, voteLabel: '8' },
  { id: 2, name: 'React', observer: false, voteLabel: '3' },
  { id: 3, name: 'Bar', observer: false, voteLabel: '8' },
  { id: 4, name: 'Elixir', observer: false, voteLabel: '3' },
  { id: 5, name: 'Baz', observer: false, voteLabel: '8' },
  { id: 6, name: 'Golang', observer: false, voteLabel: '1' },
  { id: 7, name: 'GraphQL', observer: false, voteLabel: '8' },
];

const mockedObservers = [
  { id: 8, name: 'Observer 1', observer: true },
  { id: 9, name: 'Observer 2', observer: true },
];

type CardProps = {
  point: Point;
};

const Card: React.FC<CardProps> = ({ point }) => {
  return (
    <div className="flex flex-col w-40 h-40 p-2 bg-white rounded shadow-md cursor-pointer hover:shadow-lg p4">
      <header className="flex items-center justify-center flex-grow">
        <h3 className="text-4xl">{point.label}</h3>
      </header>
      <div className="text-xs">
        <span className="px-2 py-1 bg-blue-100 rounded-full">
          {point.description}
        </span>
      </div>
    </div>
  );
};

function RoomShow() {
  const { id } = useParams();
  console.log('Fetch room:', id);
  const [room] = useState(mockedRoom);
  const [participants] = useState(mockedParticipants);
  const [observers] = useState(mockedObservers);
  const pointsById = room.points.reduce(
    (obj: { [key: string]: Point }, point) => {
      obj[point.label] = point;
      return obj;
    },
    {},
  );

  // TODO: only when there's no consensus
  const statistics = participants.reduce(
    (obj: { [key: string]: number }, participant) => {
      obj[participant.voteLabel] = obj[participant.voteLabel] || 0;
      obj[participant.voteLabel]++;
      return obj;
    },
    {},
  );
  const sortedStatistics = Object.entries(statistics).sort(
    ([, a], [, b]) => b - a,
  );

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
              <Card point={point} />
            </li>
          ))}
        </ul>
        <div className="flex-grow mt-6 lg:mt-0">
          <div className="flex flex-col w-full md:grid md:grid-cols-2 md:gap-4">
            <div className="w-full border border-gray-300 rounded">
              <h3 className="py-2 font-semibold text-center text-indigo-100 bg-indigo-900 border-b border-gray-300 rounded-tl rounded-tr">
                Participants
              </h3>
              <ul className="p-4">
                {participants.map(participant => (
                  <li key={participant.id} className="flex justify-between">
                    <div>{participant.name}</div>
                    <div>{pointsById[participant.voteLabel].label}</div>
                  </li>
                ))}
              </ul>
              <h3 className="py-2 text-center border-t border-b border-gray-300">
                Observers
              </h3>
              <ul className="p-4">
                {observers.map(observer => (
                  <li key={observer.id}>{observer.name}</li>
                ))}
              </ul>
            </div>
            <div className="w-full mt-6 md:mt-0">
              <div className="flex justify-between mx-12 mb-12">
                <Button>Show Votes</Button>
                <Button>Clear Votes</Button>
              </div>
              <div className="flex flex-col mb-6 text-xl ">
                <span className="text-4xl text-center">8</span>
                <div className="flex justify-center">
                  <span className="px-4 py-1 text-white uppercase bg-green-400 rounded-full">
                    Consensus
                  </span>
                </div>
              </div>
              <div className="flex justify-center mb-6 bg-white rounded shadow">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-sm font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                        Point
                      </th>
                      <th className="px-6 py-4 text-sm font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedStatistics.map(([label, count]) => (
                      <tr key={label}>
                        <td className="px-6 py-4">{label}</td>
                        <td className="flex items-center px-6 py-4">
                          <span className="text-indigo-100 rounded-full bg-indigo-500 uppercase px-4 py-1 text-xs font-bold mr-3">
                            {count}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoomShow;
