import React from 'react';
import cn from 'classnames';

import PointCard from '../PointCard';
import Results from '../Results';
import Button from '../../../../components/Button';
import Participants from '../Participants';
import { Observer, Room } from '../../../../types';
import { useTypedSelector } from '../../../../store';
import { Redirect } from 'react-router-dom';

type Props = {
  room: Room;
  observers: Array<Observer>;
  showVotes: boolean;
};

const VoteRoom: React.FC<Props> = ({ room, observers, showVotes }) => {
  const session = useTypedSelector(state => state.session);
  const participantsById = useTypedSelector(state => state.participants);

  if (!session) {
    return <Redirect to="/" />;
  }

  const participants = Object.values(participantsById);

  const handleClick = (...args: any) => {
    if (!session || session.role === 'observer') return;
    console.log('CLICKED', args);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <ul className={cn('w-full grid gap-2 grid-cols-fill-40', 'lg:w-1/2')}>
        {room.points.map(point => (
          <li
            onClick={() => handleClick(point)}
            className="flex justify-center"
            key={point.label}
          >
            <PointCard point={point} />
          </li>
        ))}
      </ul>
      <div className="my-8 border-b border-gray-300 lg:hidden"></div>
      <div className="flex-grow lg:mt-0">
        <div className="flex flex-col w-full md:grid md:grid-cols-2 md:gap-4">
          <Participants
            participants={participants}
            observers={observers}
            showVotes={showVotes}
          />
          <div className="w-full mt-6 md:mt-0">
            <div className="flex justify-around mb-12">
              <Button>Show Votes</Button>
              <Button>Clear Votes</Button>
            </div>
            <Results participants={participants} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteRoom;
