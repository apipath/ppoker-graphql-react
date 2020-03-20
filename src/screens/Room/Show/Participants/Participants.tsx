import React from 'react';

import { Participant, Observer } from '../../../../types';

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

    return showVotes
      ? participant.voteLabel
      : participant.voteLabel
      ? checkIcon
      : clockIcon;
  };
  return (
    <div className="w-full border border-gray-300 rounded shadow">
      <h3 className="py-2 font-semibold text-center text-indigo-100 bg-indigo-900 border-b border-gray-300 rounded-tl rounded-tr">
        Participants
      </h3>
      <ul className="p-4">
        {participants.map(participant => (
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
        {observers.map(observer => (
          <li key={observer.id}>{observer.username}</li>
        ))}
      </ul>
    </div>
  );
};

const clockIcon = (
  <svg
    className="text-orange-500"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const checkIcon = (
  <svg
    className="text-green-400"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 13L9 17L19 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Participants;
