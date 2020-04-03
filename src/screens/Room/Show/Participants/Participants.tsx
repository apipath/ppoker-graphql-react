import React from 'react';
import cn from 'classnames';

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
  return (
    <div className="w-full bg-white rounded shadow">
      <h3 className="py-2 font-semibold text-center text-indigo-100 bg-indigo-900 rounded-tl rounded-tr">
        Participants
      </h3>
      <ul className="p-4">
        {participants.map((participant) => (
          <li key={participant.id} className="flex justify-between">
            <div
              className={cn({
                [`font-semibold`]: participant.id === user.id,
              })}
            >
              {participant.name}
            </div>
            <div>{getVoteOrIcon(participant)}</div>
          </li>
        ))}
      </ul>
      {observers.length > 0 && (
        <>
          <h3 className="py-2 bg-indigo-900 text-indigo-100 text-center">
            Observers
          </h3>
          <ul className="p-4">
            {observers.map((observer) => (
              <li key={observer.id}>{observer.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Participants;
