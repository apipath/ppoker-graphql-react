import React from 'react';
import cn from 'classnames';
import { useToasts } from 'react-toast-notifications';
import { AnimatePresence, motion } from 'framer-motion';

import PointCard from '../PointCard';
import Results from '../Results';
import Button from '../../../../components/Button';
import Participants from '../Participants';
import {
  Room,
  useJoinRoomSubscription,
  useVoteMutation,
  Point,
  User,
  useShowVotesMutation,
  useClearVotesMutation,
  Role,
} from '../../../../generated/graphql';

const transition = { ease: 'easeOut', duration: 0.5 };
const initial = { opacity: 0 };
const animate = { opacity: 1 };
const exit = { opacity: 0 };

type Props = {
  room: Room;
  user: User;
};

const VoteRoom: React.FC<Props> = ({ room, user }) => {
  const { addToast } = useToasts();
  const { data, loading: subscriptionLoading, error } = useJoinRoomSubscription(
    {
      variables: {
        roomId: room.id,
        userId: user.id,
        userName: user.name,
        role: user.role,
      },
      shouldResubscribe: true,
    },
  );
  const [
    showVotesMutation,
    { loading: showVotesLoading },
  ] = useShowVotesMutation();
  const [
    clearVotesMutation,
    { loading: clearVotesLoading },
  ] = useClearVotesMutation();
  const [voteMutation, { loading: voteLoading }] = useVoteMutation();

  if (subscriptionLoading || !data || !data.joinRoom)
    return <div>Loading...</div>;

  if (error) throw error; // Will be catched by error boundary

  const { participants, observers, showVotes: roomShowVotes } = data.joinRoom;
  const participatingCurrentUser = participants.find(
    ({ id }) => id === user.id,
  );
  const selectedPoint = participatingCurrentUser
    ? participatingCurrentUser.votedPoint?.label ?? ''
    : '';
  const everyoneVoted =
    participants.length > 0 && participants.every((p) => p.votedPoint);
  const showVotes = roomShowVotes || everyoneVoted;

  const handleShowVotes = () =>
    showVotesMutation({
      variables: { showVotesInput: { roomId: room.id } },
    }).then((res) => {
      if (res.errors && res.errors.length > 0) {
        addToast(`Could not show votes`, {
          autoDismiss: true,
          appearance: 'error',
        });
        return;
      }
    });

  const handleClearVotes = () =>
    clearVotesMutation({
      variables: { clearVotesInput: { roomId: room.id } },
    }).then((res) => {
      if (res.errors && res.errors.length > 0) {
        addToast(`Could not clear votes`, {
          autoDismiss: true,
          appearance: 'error',
        });
        return;
      }
    });

  const handleClick = (point: Point) => {
    if (!user || !participatingCurrentUser) return;
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
      {user.role === Role.Participant && (
        <>
          <ul className={cn('w-full grid gap-2 grid-cols-fill-40', 'lg:w-1/2')}>
            {room.points.map((point) => (
              <li
                onClick={() => !voteLoading && handleClick(point)}
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
        </>
      )}
      <div className="flex-grow lg:mt-0">
        <div className="flex flex-col w-full md:grid md:grid-cols-2 md:gap-4">
          <div>
            <Participants
              user={user}
              participants={participants}
              observers={observers}
              showVotes={showVotes}
            />
          </div>
          <div className="w-full mt-6 md:mt-0">
            <div className="flex justify-around mb-12">
              <Button
                onClick={handleShowVotes}
                disabled={showVotesLoading || showVotes}
              >
                Show Votes
              </Button>
              <Button onClick={handleClearVotes} disabled={clearVotesLoading}>
                Clear Votes
              </Button>
            </div>
            <AnimatePresence>
              {showVotes && (
                <motion.div
                  key="results"
                  initial={initial}
                  animate={animate}
                  exit={exit}
                  transition={transition}
                >
                  <Results participants={participants} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteRoom;
