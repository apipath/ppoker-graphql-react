import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import ReactTooltip from 'react-tooltip';

import { fireCanceleableConfirm, swalWithButtons } from '../../../../utils';
import { ClockIcon, CheckIcon } from '../../../../components/Icons';
import {
  Participant,
  Observer,
  User,
  useKickUserMutation,
} from '../../../../generated/graphql';
import CogIcon from '../../../../components/Icons/CogIcon';
import XCircleIcon from '../../../../components/Icons/XCircleIcon';

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
  user: currentUser,
  roomId,
}) => {
  const [kickUserMutation] = useKickUserMutation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const getVoteOrIcon = (participant: Participant) => {
    if (participant.id === currentUser.id) {
      return participant.votedPoint?.label;
    }

    if (showVotes) return participant.votedPoint?.label;

    return participant.votedPoint ? (
      <CheckIcon className="w-6 text-green-400" />
    ) : (
      <>
        <ClockIcon
          data-tip
          data-for={`clock-${participant.id}`}
          className="w-6 text-orange-500"
        />
        <ReactTooltip id={`clock-${participant.id}`} effect="solid">
          Waiting for vote
        </ReactTooltip>
      </>
    );
  };

  const currentUserPill = (
    <span className="px-3 py-2 mr-2 text-xs font-semibold bg-green-300 rounded-full">
      YOU
    </span>
  );

  const handleOnDelete = (user: Participant) => {
    fireCanceleableConfirm({
      title: 'Are you sure?',
      text: `The participant "${user.name}" will be kicked out from the session. You won't be able to revert this!`,
      icon: 'warning',
      preConfirm: () =>
        kickUserMutation({
          variables: { exitRoomInput: { userId: user.id, roomId } },
        }),
      doneText: 'Participant has been kicked out.',
      doneTitle: 'Done',
      confirmButtonText: "Yes, I'm sure!",
      doneCallback: () => setIsSettingsOpen(false),
    });
  };

  const handleSettingsClick = () => setIsSettingsOpen(!isSettingsOpen);
  const thereIsAtLeastOneParticipantAndIsNotCurrentUser =
    participants.length > 1 ||
    (participants.length === 1 && currentUser.id !== participants[0].id);

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
            <header className="relative">
              <h3 className="py-2 font-semibold text-center text-indigo-100 bg-indigo-900 rounded-tl rounded-tr">
                Participants
              </h3>
              {thereIsAtLeastOneParticipantAndIsNotCurrentUser && (
                <CogIcon
                  className={cn(
                    'absolute top-0 right-0 w-6 py-2 mr-2 text-gray-300 cursor-pointer',
                    {
                      'animate-spin': isSettingsOpen,
                    },
                  )}
                  onClick={handleSettingsClick}
                />
              )}
            </header>
            <ul>
              <AnimatePresence>
                {participants.map((participant) => {
                  const isCurrentUser = participant.id === currentUser.id;
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
                        {isSettingsOpen && !isCurrentUser && (
                          <div
                            className="flex items-center text-gray-600 cursor-pointer hover:text-gray-800"
                            onClick={() => handleOnDelete(participant)}
                          >
                            <span className="mr-2 text-sm font-thin leading-normal">
                              Kick Participant
                            </span>
                            <XCircleIcon className="w-6" />
                          </div>
                        )}
                        {!isSettingsOpen && getVoteOrIcon(participant)}
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
                  const isCurrentUser = observer.id === currentUser.id;
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
                        {isCurrentUser && currentUserPill}
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
