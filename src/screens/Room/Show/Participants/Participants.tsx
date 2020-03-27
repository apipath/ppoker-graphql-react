import React from 'react';

import { Participant, Observer } from '../../../../types';
import { ClockIcon, CheckIcon } from '../../../../components/Icons';

type Props = {
  participants: Array<Participant>;
  observers: Array<Observer>;
  showVotes: boolean;
};

const Participants: React.FC<Props> = ({
  participants,
  observers,
  showVotes,
}) => {
  // TODO: only display current user vote when showVotes is false
  const session = { id: null };

  const getVoteOrIcon = (participant: Participant) => {
    if (participant.id === session?.id) {
      return participant.voteLabel;
    }

    return showVotes ? (
      participant.voteLabel
    ) : participant.voteLabel ? (
      <CheckIcon className="w-6 text-green-400" />
    ) : (
      <ClockIcon className="w-6 text-orange-500" />
    );
  };
  return (
    <div className="w-full bg-white rounded shadow">
      <h3 className="py-2 font-semibold text-center text-indigo-100 bg-indigo-900 rounded-tl rounded-tr">
        Participants
      </h3>
      <ul className="p-4">
        {participants.map((participant) => (
          <li key={participant.id} className="flex justify-between">
            <div>{participant.username}</div>
            <div>{getVoteOrIcon(participant)}</div>
          </li>
        ))}
      </ul>
      <h3 className="py-2 bg-indigo-900 text-indigo-100 text-center">
        Observers
      </h3>
      <ul className="p-4">
        {observers.map((observer) => (
          <li key={observer.id}>{observer.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;
