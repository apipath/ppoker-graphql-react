import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UseAnimations from 'react-useanimations';
import trash2 from 'react-useanimations/lib/trash2';

import { swalWithButtons } from '../../../../utils';
import { ClockIcon, CheckIcon } from '../../../../components/Icons';
import {
  Participant,
  Observer,
  User,
  useKickUserMutation,
} from '../../../../generated/graphql';

const transition = { ease: 'easeOut', duration: 0.5 };
const initial = { opacity: 0 };
const animate = { opacity: 1 };
const exit = { opacity: 0 };

type Props = {
  participants: Array<Participant>;
  observers: Array<Observer>;
  showVotes: boolean;
  user: User;
  roomId: string;
};

const Participants: React.FC<Props> = ({
  participants,
  observers,
  showVotes,
  user,
  roomId,
}) => {
  const [kickUserMutation] = useKickUserMutation();
  const getVoteOrIcon = (participant: Participant) => {
    if (participant.id === user.id) {
      return participant.votedPoint?.label;
    }

    return showVotes ? (
      participant.votedPoint?.label
    ) : participant.votedPoint ? (
      <CheckIcon className="w-6 text-green-400" />
    ) : (
      <ClockIcon className="w-6 text-orange-500" />
    );
  };

  const currentUserPill = (
    <span className="px-3 py-2 mr-2 text-xs font-semibold bg-green-300 rounded-full">
      YOU
    </span>
  );

  const handleOnDelete = (userId: string) => {
    swalWithButtons
      .fire({
        title: 'Are you sure?',
        text:
          "This participant will be kicked out from the session. You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes, I'm sure!",
        preConfirm: () =>
          kickUserMutation({
            variables: { exitRoomInput: { userId, roomId } },
          }),
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithButtons.fire(
            'Done',
            'Participant has been kicked out.',
            'success',
          );
        }
      });
  };

  return (
    <div className="w-full bg-white rounded shadow">
      <AnimatePresence>
        {participants.length > 0 && (
          <motion.div
            key="participants"
            initial={initial}
            animate={animate}
            exit={exit}
            transition={transition}
          >
            <h3 className="py-2 font-semibold text-center text-indigo-100 bg-indigo-900 rounded-tl rounded-tr">
              Participants
            </h3>
            <ul>
              <AnimatePresence>
                {participants.map((participant) => {
                  const isCurrentUser = participant.id === user.id;
                  return (
                    <motion.li
                      className="flex justify-between p-4"
                      key={participant.id}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={transition}
                    >
                      <div>
                        {isCurrentUser && currentUserPill}
                        <span>{participant.name}</span>
                      </div>
                      <div className="flex items-center font-bold">
                        {!isCurrentUser && (
                          <UseAnimations
                            size={32}
                            animation={trash2}
                            disabled={isCurrentUser}
                            onClick={() => handleOnDelete(participant.id)}
                            className="flex items-center pb-1 mr-2 outline-none cursor-pointer"
                          />
                        )}
                        {getVoteOrIcon(participant)}
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </motion.div>
        )}
        {observers.length > 0 && (
          <motion.div
            key="observers"
            initial={initial}
            animate={animate}
            exit={exit}
            transition={transition}
          >
            <h3 className="py-2 text-center text-indigo-100 bg-indigo-900">
              Observers
            </h3>
            <ul>
              <AnimatePresence>
                {observers.map((observer) => {
                  const currentUser = observer.id === user.id;
                  return (
                    <motion.li
                      className="flex items-center p-4"
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      key={observer.id}
                      transition={transition}
                    >
                      <div>
                        {currentUser && currentUserPill}
                        {observer.name}
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Participants;
