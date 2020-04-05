import React from 'react';

import { ClockIcon, CheckIcon } from '../../../../components/Icons';
import { Participant, Observer, User } from '../../../../generated/graphql';

type Props = {
  participants: Array<Participant>;
  observers: Array<Observer>;
  showVotes: boolean;
  user: User;
};

const Participants: React.FC<Props> = ({
  participants,
  observers,
  showVotes,
  user,
}) => {
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
  return (
    <div className="w-full bg-white rounded shadow">
      <h3 className="py-2 font-semibold text-center text-indigo-100 bg-indigo-900 rounded-tl rounded-tr">
        Participants
      </h3>
      <ul>
        {participants.map((participant) => {
          const currentUser = participant.id === user.id;
          return (
            <li key={participant.id} className="flex justify-between p-4">
              <div>
                {currentUser && currentUserPill}
                <span>{participant.name}</span>
              </div>
              <div className="flex items-center font-bold">
                {getVoteOrIcon(participant)}
              </div>
            </li>
          );
        })}
      </ul>
      {observers.length > 0 && (
        <>
          <h3 className="py-2 bg-indigo-900 text-indigo-100 text-center">
            Observers
          </h3>
          <ul className="p-4">
            {observers.map((observer) => {
              const currentUser = observer.id === user.id;
              return (
                <li key={observer.id}>
                  {currentUser && currentUserPill}
                  <span>{observer.name}</span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Participants;
