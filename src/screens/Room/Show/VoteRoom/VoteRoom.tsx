import React from 'react';
import cn from 'classnames';

import PointCard from '../PointCard';
import Results from '../Results';
import Button from '../../../../components/Button';
import Participants from '../Participants';
import { useTypedSelector } from '../../../../store';
import {
  Room,
  Role,
  useJoinRoomSubscription,
} from '../../../../generated/graphql';
import { Session } from '../../../../types';

type Props = {
  showVotes: boolean;
  room: Room;
  session: Session;
};

const VoteRoom: React.FC<Props> = ({ showVotes, room, session }) => {
  const observersById = useTypedSelector((state) => state.observers);
  const participantsById = useTypedSelector((state) => state.participants);
  console.log('RENDER');
  const { data, loading, error } = useJoinRoomSubscription({
    variables: {
      roomId: room.id,
      username: session.username,
      role: session.role,
    },
    shouldResubscribe: true,
  });

  console.log('joinRoom', data?.joinRoom);

  if (loading || !data || !data.joinRoom) return <div>Loading...</div>;

  if (error) throw error; // Will be catched by error boundary

  const participants = Object.values(participantsById);
  const observers = Object.values(observersById);
  const participatingCurrentUser = participants.find(
    ({ id }) => id === 'TODO', // TODO: implement this
  );
  const selectedPoint = participatingCurrentUser
    ? participatingCurrentUser.voteLabel ?? ''
    : '';

  const handleClick = (...args: any) => {
    if (!session || session.role === Role.Observer) return;
    console.log('CLICKED', args);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <ul className={cn('w-full grid gap-2 grid-cols-fill-40', 'lg:w-1/2')}>
        {room.points.map((point) => (
          <li
            onClick={() => handleClick(point)}
            className="flex justify-center"
            key={point.label}
          >
            <PointCard point={point} selected={point.label === selectedPoint} />
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
