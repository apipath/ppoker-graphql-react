import React from 'react';
import cn from 'classnames';
import { useToasts } from 'react-toast-notifications';

import PointCard from '../PointCard';
import Results from '../Results';
import Button from '../../../../components/Button';
import Participants from '../Participants';
import {
  Room,
  useJoinRoomSubscription,
  useVoteMutation,
  Point,
  Session,
} from '../../../../generated/graphql';

type Props = {
  showVotes: boolean;
  room: Room;
  session: Session;
};

const VoteRoom: React.FC<Props> = ({ showVotes, room, session }) => {
  const { addToast } = useToasts();
  const { data, loading: subscriptionLoading, error } = useJoinRoomSubscription(
    {
      variables: {
        roomId: room.id,
        userId: session.id,
        userName: session.userName,
        role: session.role,
      },
      shouldResubscribe: true,
    },
  );

  const [voteMutation, { loading: voteLoading }] = useVoteMutation();

  if (subscriptionLoading || !data || !data.joinRoom)
    return <div>Loading...</div>;

  if (error) throw error; // Will be catched by error boundary

  const { participants, observers } = data.joinRoom;
  const participatingCurrentUser = participants.find(
    ({ id }) => id === session.id,
  );
  const selectedPoint = participatingCurrentUser
    ? participatingCurrentUser.votedPoint?.label ?? ''
    : '';

  const handleClick = (point: Point) => {
    if (!session || !participatingCurrentUser) return;
    voteMutation({
      variables: {
        voteInput: {
          roomId: room.id,
          userId: participatingCurrentUser.id,
          pointLabel: point.label,
        },
      },
    })
      .then((response) => {
        if (response.errors && response.errors.length > 0) {
          // TODO: handle errors gracefully
          throw response.errors;
        }

        if (!response.data) {
          throw new Error('Unexpected error'); // Let error boundary take care of it
        }

        if (!response.data.vote) {
          addToast(`Could not vote "${point.label}", unexpected error`, {
            autoDismiss: true,
            appearance: 'error',
          });
        }
      })
      .catch((err) => {
        throw err; // Let error boundary to take care of it
      });
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
            <PointCard
              point={point}
              disabled={voteLoading}
              selected={point.label === selectedPoint}
            />
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
